// ── CSV PARSER ──────────────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = [];
  let i = 0, n = text.length;

  while (i < n) {
    const row = [];
    while (i < n && text[i] !== '\n') {
      if (text[i] === '"') {
        let cell = '';
        i++; // skip opening quote
        while (i < n) {
          if (text[i] === '"' && text[i + 1] === '"') { cell += '"'; i += 2; }
          else if (text[i] === '"') { i++; break; }
          else { cell += text[i++]; }
        }
        row.push(cell);
        if (text[i] === ',') i++;
      } else {
        let cell = '';
        while (i < n && text[i] !== ',' && text[i] !== '\n') cell += text[i++];
        row.push(cell.trim());
        if (text[i] === ',') i++;
      }
    }
    if (text[i] === '\n') i++;
    if (row.length > 1 || (row.length === 1 && row[0] !== '')) rows.push(row);
  }

  if (rows.length === 0) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = (row[idx] || '').trim(); });
    return obj;
  });
}

// ── CHECK NAMES ───────────────────────────────────────────────────────────
const CHECK_NAMES = {
  S1: 'Summary Format',
  S2: 'Attachment',
  S3: 'Platform URL',
  S4: 'Auth State',
  S5: 'Context Structure',
  S6: 'Issue Type / Step 1',
  S7: 'Step Numbering',
  S8: 'Resource Link',
  S9: 'Screen Name',
  S10: 'Automation Checks',
};
const CHECK_KEYS = Object.keys(CHECK_NAMES);

// ── DESCRIPTION SECTION SPLITTER ──────────────────────────────────────────
const SECTION_HEADERS = [
  'Environment', 'Context', 'Steps to reproduce', 'Expected results',
  'Actual results', 'Affected user population', 'Applicable WCAG Success Criterion',
  'Code Snippet', 'Remediation Recommendation', 'Resource Link', 'Screen Name',
];

function splitSections(desc) {
  const sections = { __intro__: [] };
  if (!desc) return sections;
  const lines = desc.replace(/\r\n/g, '\n').split('\n');
  let current = '__intro__';
  const headerRe = new RegExp(
    '^\\s*(' + SECTION_HEADERS.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\s*:\\s*$',
    'i'
  );
  for (const line of lines) {
    const m = line.match(headerRe);
    if (m) {
      const found = SECTION_HEADERS.find(h => h.toLowerCase() === m[1].toLowerCase());
      current = found || m[1];
      sections[current] = [];
    } else {
      if (!sections[current]) sections[current] = [];
      sections[current].push(line);
    }
  }
  const out = {};
  for (const k in sections) out[k] = sections[k].join('\n').trim();
  return out;
}

function getField(text, field) {
  if (!text) return null;
  const re = new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:?\\s*(.+)', 'i');
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function normalizeUrl(u) {
  if (!u) return null;
  return u.trim().split('?')[0].replace(/\/+$/, '');
}

function isSameUrlIgnoringLastToken(a, b) {
  const urlA = normalizeUrl(a);
  const urlB = normalizeUrl(b);
  if (!urlA || !urlB) return false;
  if (urlA === urlB) return true;

  const stripProtocol = value => value.replace(/^https?:\/\//i, '');
  const pathA = stripProtocol(urlA).split('/').filter(Boolean);
  const pathB = stripProtocol(urlB).split('/').filter(Boolean);

  if (pathA.length <= 1 || pathB.length <= 1) return false;

  const baseA = pathA.slice(0, -1).join('/');
  const baseB = pathB.slice(0, -1).join('/');
  return baseA === baseB;
}

function classifyIssueType(line) {
  if (!line) return null;
  const l = line.toLowerCase();
  if (l.includes('nvda') || l.includes('screen reader') || l.includes('voiceover') || l.includes('assistive technology')) return 'Screen Reader';
  if (l.includes('voice control') || l.includes('talkback') || l.includes('talk back')) return 'Voice Control';
  if (l.includes('keyboard')) return 'Keyboard';
  if (l.includes('deque') || l.includes('color contrast') || l.includes('color analyser') || l.includes('color analyzer')) return 'Accessibility Tool';
  if (l.includes('ipad device') || l.includes('iphone device') || l.includes('android device')) return 'Device Testing';
  if (l.includes('chrome on windows')) return 'Other';
  return null;
}

function wordsOf(s) {
  return new Set((s || '').toLowerCase().match(/\w+/g) || []);
}

// ── RUN ALL 10 CHECKS FOR ONE ROW ────────────────────────────────────────
function runChecks(row, selectedPlatform) {
  const summary = row['Summary'] || '';
  const desc = row['Description'] || '';
  const method = (row['Method'] || '').trim();
  const testUnit = (row['Test Unit'] || '').trim();
  const checkpoint = row['Checkpoint'] || '';
  const attachments = row['Attachments'] || '';
  const urlCol = row['URL'] || '';
  const impact = row['Impact'] || '';

  const sec = splitSections(desc);
  const intro = sec['__intro__'] || '';
  const env = sec['Environment'] || '';
  const ctx = sec['Context'] || '';
  const steps = sec['Steps to reproduce'] || '';
  const resourceLink = Object.prototype.hasOwnProperty.call(sec, 'Resource Link') ? sec['Resource Link'] : null;
  const screenNameSec = sec['Screen Name'] || '';

  const checks = {};
  const fail = (key, reason) => { checks[key] = { status: 'fail', reason }; };
  const pass = (key, reason = '') => { checks[key] = { status: 'pass', reason }; };
  const na = (key, reason = 'N/A') => { checks[key] = { status: 'na', reason }; };

  // S1: Summary Format
  {
    const problems = [];
    if (testUnit) {
      const tuWords = wordsOf(testUnit);
      const summWords = wordsOf(summary);
      const subset = [...tuWords].every(w => summWords.has(w));
      if (!summary.toLowerCase().includes(testUnit.toLowerCase()) && !subset && testUnit.toLowerCase() !== 'project-wide') {
        problems.push(`Page Name doesn't match Test Unit ("${testUnit}")`);
      }
    }
    if (!summary.includes('(') || !summary.includes(')')) problems.push('no element name in parentheses');
    const firstLine = (intro.split('\n')[0] || '').trim();
    if (firstLine) {
      const stop = new Set(['a', 'the', 'is', 'are', 'not', 'on', 'in', 'to', 'of', 'and', 'by']);
      const descWords = [...wordsOf(firstLine)].filter(w => !stop.has(w));
      const summWords = wordsOf(summary);
      const overlap = descWords.filter(w => summWords.has(w));
      if (descWords.length > 2 && overlap.length === 0) problems.push('Summary text seems unrelated to Description first line');
    }
    problems.length ? fail('S1', problems.join('; ')) : pass('S1');
  }

  // S2: Attachment
  attachments.trim() === '' ? fail('S2', 'missing attachment') : pass('S2');

  // S3: Platform URL (Web) or Platform field (Native Apps)
  {
    const isNativeSelectedPlatform = selectedPlatform && (selectedPlatform.includes('iPad') || selectedPlatform.includes('iOS') || selectedPlatform.includes('Android'));
    
    if (selectedPlatform === 'Web') {
      const platformUrl = getField(env, 'Platform URL');
      if (!platformUrl) {
        fail('S3', 'Platform URL missing from Description');
      } else {
        const normEnv = normalizeUrl(platformUrl);
        const normCsv = urlCol ? normalizeUrl(urlCol) : null;
        if (normCsv && normEnv && !isSameUrlIgnoringLastToken(normEnv, normCsv) && normEnv !== normCsv) {
          fail('S3', `URL mismatch (Desc: ${normEnv} vs CSV: ${normCsv})`);
        } else {
          pass('S3');
        }
      }
    } else if (isNativeSelectedPlatform) {
      const platformField = getField(env, 'Platform');
      let expectedPlatformText = '';
      
      if (selectedPlatform === 'iPad') {
        expectedPlatformText = 'Native iPad Tablet app';
      } else if (selectedPlatform === 'iOS mobile') {
        expectedPlatformText = 'Native iOS Mobile app';
      } else if (selectedPlatform === 'Android tablet') {
        expectedPlatformText = 'Native Android Tablet app';
      } else if (selectedPlatform === 'Android mobile') {
        expectedPlatformText = 'Native Android Mobile app';
      }
      
      if (!platformField) {
        fail('S3', 'Platform field missing from Description');
      } else if (!platformField.toLowerCase().includes(expectedPlatformText.toLowerCase())) {
        fail('S3', `Platform mismatch: expected "${expectedPlatformText}", found "${platformField}"`);
      } else {
        pass('S3');
      }
    }
  }

  // S4: Auth State
  {
    const auth = getField(env, 'Authentication State');
    if (!auth) fail('S4', 'missing');
    else if (!['logged in', 'logged out'].includes(auth.toLowerCase())) fail('S4', `invalid/missing ("${auth}")`);
    else pass('S4');
  }

  // S5: Context Structure (Platform: Web/Native App, OS, Browser (if Web), AT, Test Method last line)
  let testMethodLine = null;
  {
    const problems = [];
    const ctxLines = ctx.split('\n').map(l => l.trim()).filter(l => l);

    const platformLine = getField(ctx, 'Platform');
    if (!platformLine) {
      problems.push('missing Platform line');
    } else {
      // Validate Platform field matches selected platform
      const platformLower = platformLine.toLowerCase();
      let expectedMatch = false;
      
      if (selectedPlatform === 'Web') {
        expectedMatch = platformLower.includes('web');
      } else if (selectedPlatform === 'iPad') {
        expectedMatch = platformLower.includes('ipad');
      } else if (selectedPlatform === 'iOS mobile') {
        expectedMatch = platformLower.includes('iphone') || platformLower.includes('ios');
      } else if (selectedPlatform === 'Android tablet') {
        expectedMatch = platformLower.includes('android') && platformLower.includes('tablet');
      } else if (selectedPlatform === 'Android mobile') {
        expectedMatch = platformLower.includes('android') && !platformLower.includes('tablet');
      }
      
      if (!expectedMatch) {
        problems.push(`Platform mismatch: found "${platformLine}", expected to match "${selectedPlatform}"`);
      }
      
      // Browser is only required for Web platform
      if (selectedPlatform === 'Web') {
        const browserVal = getField(ctx, 'Browser');
        if (!browserVal || !/\d/.test(browserVal)) problems.push('Browser+version missing (required for Web platform)');
      }
    }

    const osVal = getField(ctx, 'Operating System');
    if (!osVal) problems.push('OS missing');

    const atVal = getField(ctx, 'Assistive Technology');
    const lastLine = ctxLines[ctxLines.length - 1] || '';
    const tmMatch = lastLine.match(/^test method\s*:\s*(.+)/i);
    if (tmMatch) {
      testMethodLine = tmMatch[1].trim();
    } else {
      problems.push('Context does not end with a "Test Method:" line');
    }

    const tmAnywhere = getField(ctx, 'Test Method');
    const issueTypeGuess = tmAnywhere ? classifyIssueType(tmAnywhere) : classifyIssueType(ctx);
    if (issueTypeGuess === 'Screen Reader' && !atVal) problems.push('Assistive Technology line missing for screen reader issue');

    problems.length ? fail('S5', problems.join('; ')) : pass('S5');
  }

  // S6: Issue Type vs Step 1
  const step1Match = steps.match(/^\s*1[.)]\s*(.+)/m);
  const step1Text = step1Match ? step1Match[1].trim() : '';
  const step1Lower = step1Text.toLowerCase();
  {
    let issueType;
    if (method.toLowerCase() === 'automated') {
      issueType = 'Automated';
    } else if (testMethodLine) {
      issueType = classifyIssueType(testMethodLine);
    } else {
      const tmAnywhere = getField(ctx, 'Test Method');
      issueType = tmAnywhere ? classifyIssueType(tmAnywhere) : classifyIssueType(ctx);
    }

    if (method.toLowerCase() === 'automated') {
      na('S6', 'see S10');
    } else if (issueType === 'Screen Reader') {
      step1Lower.includes('turn on the screen reader') ? pass('S6') : fail('S6', `expected screen reader Step1, got: "${step1Text.slice(0, 60)}"`);
    } else if (issueType === 'Voice Control') {
      step1Lower.includes('turn on voice control') ? pass('S6') : fail('S6', `expected Voice Control Step1, got: "${step1Text.slice(0, 60)}"`);
    } else if (issueType === 'Accessibility Tool') {
      pass('S6', '(tool-based testing)');
    } else if (issueType === 'Device Testing') {
      pass('S6', '(device manual testing)');
    } else if (issueType === 'Keyboard' || issueType === 'Other') {
      step1Lower.includes('turn on the screen reader') ? fail('S6', `Step1 mentions screen reader but issue type is ${issueType}`) : pass('S6');
    } else {
      fail('S6', 'could not determine issue type from Test Method line');
    }
  }

  // S7: Step Numbering
  {
    const stepNumbers = [...steps.matchAll(/^\s*(\d+)[.)]\s/gm)].map(m => parseInt(m[1], 10));
    if (stepNumbers.length === 0) {
      fail('S7', 'no numbered steps found');
    } else {
      const expected = stepNumbers.map((_, idx) => idx + 1);
      const matches = stepNumbers.every((v, idx) => v === expected[idx]);
      matches ? pass('S7') : fail('S7', `non-sequential numbering: ${stepNumbers.join(',')}`);
    }
  }

  // S8: Resource Link
  {
    if (/^\s*References\s*:/im.test(desc)) fail('S8', 'uses "References:" instead of "Resource Link:"');
    else pass('S8', resourceLink !== null ? '' : '(absent, not required)');
  }

  // S9: Screen Name
  {
    const screenNames = screenNameSec.split(/[\n,]/).map(s => s.trim()).filter(s => s);
    if (screenNames.length > 1) na('S9', 'multiple screen names');
    else if (screenNames.length === 1) {
      const sn = screenNames[0].toLowerCase();
      const tu = testUnit.toLowerCase();
      if (testUnit && !sn.includes(tu) && !tu.includes(sn)) fail('S9', `Screen Name "${screenNames[0]}" != Test Unit "${testUnit}"`);
      else pass('S9');
    } else {
      fail('S9', 'Screen Name missing');
    }
  }

  // S10: Automation-Specific Checks
  if (method.toLowerCase() === 'automated') {
    const problems = [];
    const ctxLines = ctx.split('\n').map(l => l.trim()).filter(l => l);
    const lastLine = ctxLines[ctxLines.length - 1] || '';
    const expectedLast = 'test method: chrome on windows using axe devtools chrome browser extension';
    const normalizedLastLine = lastLine.trim().toLowerCase();
    const normalizedExpectedLast = expectedLast.trim().toLowerCase();
    if (normalizedLastLine !== normalizedExpectedLast) problems.push(`Context last line mismatch: "${lastLine}"`);
    if (!/open.*url/i.test(step1Text)) problems.push(`Step1 does not convey opening URL: "${step1Text.slice(0, 60)}"`);
    if (!/f12|inspect panel/i.test(steps)) problems.push('No step mentions F12/inspect panel');
    problems.length ? fail('S10', problems.join('; ')) : pass('S10');
    // Update S6 per automation note (10b)
    const step1Problem = problems.find(p => p.startsWith('Step1'));
    checks['S6'] = step1Problem ? { status: 'fail', reason: step1Problem } : { status: 'pass', reason: '(per 10b)' };
  } else {
    na('S10');
  }

  return checks;
}

function getIssueUrl(row) {
  const candidates = ['Issue URL', 'Issue Url', 'Auditor URL', 'Auditor Url', 'Issue Link', 'Link', 'URL'];
  for (const key of candidates) {
    const value = (row[key] || '').trim();
    if (value) return value;
  }
  return '';
}

function analyzeCSV(rows, platform) {
  return rows.map(row => ({
    id: row['Issue ID'] || '',
    url: getIssueUrl(row),
    summary: row['Summary'] || '',
    method: (row['Method'] || '').trim(),
    testUnit: (row['Test Unit'] || '').trim(),
    checkpoint: row['Checkpoint'] || '',
    impact: row['Impact'] || '',
    checks: runChecks(row, platform),
  }));
}

// ── DOM HELPERS ───────────────────────────────────────────────────────────
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function barColor(pct) {
  if (pct < 50) return '#c0392b';
  if (pct < 90) return '#d4a017';
  return '#2d7a3a';
}
function numClass(pct) {
  if (pct < 50) return 'red';
  if (pct < 90) return 'amber';
  return 'green';
}
function renderIssueId(issue) {
  const wrap = el('span');
  if (issue.url) {
    const link = document.createElement('a');
    link.href = issue.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = issue.id || '';
    link.className = 'issue-link';
    wrap.appendChild(link);
  } else {
    wrap.textContent = issue.id || '';
  }
  return wrap;
}

// ── UPLOAD SCREEN LOGIC ───────────────────────────────────────────────────
let selectedFile = null;
let selectedPlatform = null;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const filePills = document.getElementById('filePills');
const analyzeBtn = document.getElementById('analyzeBtn');
const uploadNote = document.getElementById('uploadNote');
const platformDropdown = document.getElementById('platformDropdown');

function updateAnalyzeButtonState() {
  analyzeBtn.disabled = !selectedFile || !selectedPlatform;
  if (!selectedPlatform && !selectedFile) {
    uploadNote.textContent = 'Select a platform and CSV file to continue';
  } else if (!selectedPlatform) {
    uploadNote.textContent = 'Select a platform to continue';
  } else if (!selectedFile) {
    uploadNote.textContent = 'Select a CSV file to continue';
  } else {
    uploadNote.textContent = 'Ready to analyze';
  }
}

platformDropdown.addEventListener('change', (e) => {
  selectedPlatform = e.target.value;
  updateAnalyzeButtonState();
});

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragging'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragging');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

function handleFile(file) {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    uploadNote.textContent = 'Please select a .csv file';
    return;
  }
  selectedFile = file;
  filePills.innerHTML = '';
  const pill = el('div', 'file-pill', `📄 ${file.name}`);
  filePills.appendChild(pill);
  updateAnalyzeButtonState();
}

analyzeBtn.addEventListener('click', () => {
  if (!selectedFile || !selectedPlatform) return;
  const reader = new FileReader();
  reader.onload = e => {
    const rows = parseCSV(e.target.result);
    const issues = analyzeCSV(rows, selectedPlatform);
    showDashboard(issues, selectedFile.name, selectedPlatform);
  };
  reader.readAsText(selectedFile);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('uploadScreen').classList.remove('hidden');
  selectedFile = null;
  selectedPlatform = null;
  platformDropdown.value = '';
  filePills.innerHTML = '';
  updateAnalyzeButtonState();
  fileInput.value = '';
});

// ── DASHBOARD RENDERING ───────────────────────────────────────────────────
let ISSUES = [];

function showDashboard(issues, filename, platform) {
  ISSUES = issues;
  document.getElementById('uploadScreen').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('statBoxes').innerHTML = '';
  document.getElementById('checkBoxes').innerHTML = '';
  document.getElementById('dashSubtitle').textContent =
    `${issues.length} issues from "${filename}" • Platform: ${platform} • analyzed across ${CHECK_KEYS.length} checks`;
  renderStats();
  renderCheckBoxes();
  showTab('issues');
}

function renderStats() {
  const total = ISSUES.length;
  const automated = ISSUES.filter(i => i.method.toLowerCase() === 'automated').length;
  const manual = total - automated;
  const cleanCount = ISSUES.filter(i => CHECK_KEYS.every(k => i.checks[k].status !== 'fail')).length;

  const boxes = [
    { label: 'Issues Checked', value: total, cls: 'blue' },
    { label: 'Manual / Automated', value: `${manual} / ${automated}`, cls: '' },
    { label: 'Fully Clean', value: cleanCount, sub: total ? `${Math.round(cleanCount / total * 100)}% of issues` : '', cls: (cleanCount / total) > 0.5 ? 'green' : 'amber' },
    { label: 'Checks Run', value: CHECK_KEYS.length, cls: '' },
  ];
  const wrap = document.getElementById('statBoxes');
  boxes.forEach(b => {
    const box = el('div', `stat-box ${b.cls}`);
    box.appendChild(el('div', 'label', b.label));
    box.appendChild(el('div', 'value', b.value));
    if (b.sub) box.appendChild(el('div', 'sub', b.sub));
    wrap.appendChild(box);
  });
}

function renderCheckBoxes() {
  const wrap = document.getElementById('checkBoxes');
  const total = ISSUES.length;
  CHECK_KEYS.forEach(k => {
    const fails = ISSUES.filter(i => i.checks[k].status === 'fail').length;
    const passes = total - fails;
    const pct = total ? Math.round(passes / total * 100) : 0;
    const box = el('div', 'ba-box');
    box.appendChild(el('div', 'ba-label', `${k} — ${CHECK_NAMES[k]}`));
    box.appendChild(el('div', `ba-num ${numClass(pct)}`, `${pct}%`));
    box.appendChild(el('div', 'ba-denom', `${passes} pass · ${fails} fail`));
    const barWrap = el('div', 'ba-bar-wrap');
    const barFill = el('div', 'ba-bar-fill');
    barFill.style.width = pct + '%';
    barFill.style.background = barColor(pct);
    barWrap.appendChild(barFill);
    box.appendChild(barWrap);
    wrap.appendChild(box);
  });
}

function renderIssuesTab(container) {
  container.innerHTML = '';
  const filterBar = el('div', 'filter-bar');
  const searchInput = el('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search Issue ID, Test Unit, Summary...';

  const methodSelect = el('select');
  ['all', 'Manual', 'Automated'].forEach(m => {
    const opt = el('option', null, m === 'all' ? 'All Methods' : m);
    opt.value = m;
    methodSelect.appendChild(opt);
  });

  const statusSelect = el('select');
  [['all', 'All Issues'], ['fail', 'Has Failures'], ['clean', 'Fully Clean']].forEach(([v, l]) => {
    const opt = el('option', null, l);
    opt.value = v;
    statusSelect.appendChild(opt);
  });

  filterBar.appendChild(searchInput);
  filterBar.appendChild(methodSelect);
  filterBar.appendChild(statusSelect);
  container.appendChild(filterBar);

  const countLabel = el('div', 'count-label');
  container.appendChild(countLabel);
  const tableWrap = el('div');
  container.appendChild(tableWrap);

  function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const method = methodSelect.value;
    const status = statusSelect.value;
    const filtered = ISSUES.filter(i => {
      if (method !== 'all' && i.method !== method) return false;
      const hasFail = CHECK_KEYS.some(k => i.checks[k].status === 'fail');
      if (status === 'fail' && !hasFail) return false;
      if (status === 'clean' && hasFail) return false;
      if (term && !`${i.id} ${i.testUnit} ${i.summary}`.toLowerCase().includes(term)) return false;
      return true;
    });
    countLabel.textContent = `Showing ${filtered.length} of ${ISSUES.length} issues`;
    renderTable(filtered, tableWrap);
  }

  searchInput.addEventListener('input', applyFilters);
  methodSelect.addEventListener('change', applyFilters);
  statusSelect.addEventListener('change', applyFilters);
  applyFilters();
}

function renderTable(issues, wrap) {
  wrap.innerHTML = '';
  if (issues.length === 0) {
    wrap.appendChild(el('div', 'empty-state', '<div class="empty-icon">🔍</div>No issues match these filters'));
    return;
  }
  const table = el('table', 'tbl');
  const thead = el('thead');
  const headRow = el('tr');
  ['Issue ID', 'Summary', 'Method', 'Test Unit', 'Checkpoint', ...CHECK_KEYS].forEach(h => headRow.appendChild(el('th', null, h)));
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = el('tbody');
  issues.forEach(i => {
    const row = el('tr');
    const issueCell = el('td');
    issueCell.appendChild(renderIssueId(i));
    row.appendChild(issueCell);
    row.appendChild(el('td', null, (i.summary || '').slice(0, 60)));
    row.appendChild(el('td', null, `<span class="badge ${i.method === 'Automated' ? 'blue' : 'grey'}">${i.method}</span>`));
    row.appendChild(el('td', null, i.testUnit));
    row.appendChild(el('td', null, i.checkpoint || ''));
    CHECK_KEYS.forEach(k => {
      const c = i.checks[k];
      let html;
      if (c.status === 'pass') html = '<span class="badge green">✓</span>';
      else if (c.status === 'fail') html = `<span class="badge red" title="${(c.reason || '').replace(/"/g, '&quot;')}">✗</span>`;
      else html = '<span class="badge grey">–</span>';
      row.appendChild(el('td', null, html));
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
}

function renderFailedTab(container) {
  container.innerHTML = '';
  CHECK_KEYS.forEach(k => {
    const failing = ISSUES.filter(i => i.checks[k].status === 'fail');
    if (failing.length === 0) return;
    const section = el('div', 'card');
    section.style.marginBottom = '14px';
    const h3 = el('h3', null, `${k} — ${CHECK_NAMES[k]} <span class="badge red">${failing.length} failing</span>`);
    h3.style.marginBottom = '8px';
    h3.style.fontSize = '13px';
    section.appendChild(h3);
    failing.forEach(i => {
      const row = el('div', 'issue-row');
      const issueCell = el('div', 'issue-id');
      issueCell.appendChild(renderIssueId(i));
      row.appendChild(issueCell);
      const body = el('div', 'issue-body');
      body.appendChild(el('div', 'issue-meta', `${i.testUnit} · <span class="badge ${i.method === 'Automated' ? 'blue' : 'grey'}">${i.method}</span>`));
      body.appendChild(el('div', 'issue-reason', i.checks[k].reason || ''));
      row.appendChild(body);
      section.appendChild(row);
    });
    container.appendChild(section);
  });
  if (!container.children.length) container.appendChild(el('div', 'empty-state', '<div class="empty-icon">✅</div>No failing checks'));
}

function renderPagesTab(container) {
  container.innerHTML = '';
  const grouped = ISSUES.reduce((acc, issue) => {
    const failing = CHECK_KEYS.filter(k => issue.checks[k].status === 'fail');
    if (failing.length === 0) return acc;

    const pageName = (issue.testUnit || issue.summary || '').trim() || 'Unknown Page';
    if (!acc[pageName]) acc[pageName] = [];
    acc[pageName].push(issue);
    return acc;
  }, {});

  const pages = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
  if (!pages.length) {
    container.appendChild(el('div', 'empty-state', '<div class="empty-icon">📄</div>No pages with failing checks'));
    return;
  }

  pages.forEach(pageName => {
    const section = el('div', 'card');
    section.style.marginBottom = '14px';
    const title = el('h3', null, `${pageName} <span class="badge blue">${grouped[pageName].length} issues</span>`);
    title.style.marginBottom = '8px';
    title.style.fontSize = '13px';
    section.appendChild(title);

    grouped[pageName].forEach(issue => {
      const row = el('div', 'issue-row');
      const issueCell = el('div', 'issue-id');
      issueCell.appendChild(renderIssueId(issue));
      row.appendChild(issueCell);

      const body = el('div', 'issue-body');
      body.appendChild(el('div', 'issue-meta', `${(issue.summary || '').slice(0, 90)} · <span class="badge ${issue.method === 'Automated' ? 'blue' : 'grey'}">${issue.method}</span>`));

      const failing = CHECK_KEYS.filter(k => issue.checks[k].status === 'fail');
      const reasonText = failing.map(k => `<div>• ${k}: ${issue.checks[k].reason || 'failed'}</div>`).join('');
      body.appendChild(el('div', 'issue-reason', reasonText));
      row.appendChild(body);
      section.appendChild(row);
    });

    container.appendChild(section);
  });
}

function renderFindingsTab(container) {
  container.innerHTML = '';
  const total = ISSUES.length || 1;
  const pct = k => Math.round(ISSUES.filter(i => i.checks[k].status === 'fail').length / total * 100);
  const findings = [
    { title: 'Platform URL / Platform', text: `${pct('S3')}% of issues have correct Platform info. Web: Platform URL present and matching. Native Apps: Platform field present with correct device type.` },
    { title: 'Context Structure', text: `${pct('S5')}% of issues have correct Context Structure (Platform matching selected platform, OS, Browser if Web, AT, and Test Method line).` },
    { title: 'Step Numbering', text: `${pct('S7')}% of issues have non-sequential Steps to Reproduce numbering.` },
    { title: 'Issue Type vs Step 1', text: `${pct('S6')}% of issues have a Step 1 that contradicts the detected issue type.` },
    { title: 'Summary Format', text: `${pct('S1')}% of issues have a Summary Format problem (Page Name mismatch, missing element name, or unrelated description).` },
    { title: 'Attachments & Screen Name', text: `${pct('S2')}% missing an attachment; ${pct('S9')}% have a Screen Name mismatch.` },
  ];
  findings.forEach(f => {
    const card = el('div', 'insight-card');
    card.appendChild(el('div', 'insight-title', f.title));
    card.appendChild(el('div', 'insight-text', f.text));
    container.appendChild(card);
  });
}

const tabRenderers = { issues: renderIssuesTab, failed: renderFailedTab, pages: renderPagesTab, findings: renderFindingsTab };
function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  tabRenderers[tab](document.getElementById('tabContent'));
}
document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.tab)));
