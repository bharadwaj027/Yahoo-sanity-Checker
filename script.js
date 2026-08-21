/* script.js — UI wiring for the Yahoo Mail Plus sanity-check dashboard
 * Reuses the check engine in checks.js (runChecks). Platform is auto-detected
 * per issue; the upload screen disappears the instant a file is chosen/dropped.
 */

// Stable labels for the 10 checks (used by pass-rate cards + Issue-details columns)
const CHECK_LABELS = {
  S1:  'Summary format',
  S2:  'Attachment',
  S3:  'Platform URL',
  S4:  'Auth state',
  S5:  'Context structure',
  S6:  'Issue type / Step 1',
  S7:  'Step numbering',
  S8:  'Resource link',
  S9:  'Screen name',
  S10: 'Automation checks',
  S11: 'Summary validation',
  S12: 'Required fields',
  S13: 'Color contrast',
};
const CHECK_KEYS = Object.keys(CHECK_LABELS);

let allIssues = [];        // processed issues
let currentTab = 'pages';
const expanded = new Set(); // issueIds whose detail row is open

// ── element refs ──────────────────────────────────────────────
const uploadScreen  = document.getElementById('uploadScreen');
const dashboard     = document.getElementById('dashboard');
const dropzone      = document.getElementById('dropzone');
const fileInput     = document.getElementById('fileInput');
const browseBtn     = document.getElementById('browseBtn');
const uploadStatus  = document.getElementById('uploadStatus');
const resetBtn      = document.getElementById('resetBtn');
const dashSubtitle  = document.getElementById('dashSubtitle');
const statGrid      = document.getElementById('statGrid');
const rateGrid      = document.getElementById('rateGrid');
const tabBar        = document.getElementById('tabBar');
const tabPanel      = document.getElementById('tabPanel');
const controls      = document.getElementById('controls');
const searchBox     = document.getElementById('searchBox');
const platformFilter= document.getElementById('platformFilter');
const methodFilter  = document.getElementById('methodFilter');
const statusFilter  = document.getElementById('statusFilter');

// ── upload wiring ─────────────────────────────────────────────
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

['dragenter', 'dragover'].forEach(evt =>
  dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.querySelector('.upload-drop').classList.add('dragover'); }));
['dragleave'].forEach(evt =>
  dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.querySelector('.upload-drop').classList.remove('dragover'); }));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.querySelector('.upload-drop').classList.remove('dragover');
  const f = e.dataTransfer.files[0];
  if (f) handleFile(f);
});

resetBtn.addEventListener('click', () => {
  allIssues = [];
  expanded.clear();
  fileInput.value = '';
  searchBox.value = '';
  platformFilter.value = 'all';
  methodFilter.value = 'all';
  statusFilter.value = 'all';
  uploadStatus.textContent = '';
  uploadStatus.classList.remove('error');
  dashboard.classList.add('hidden');
  uploadScreen.classList.remove('hidden');
});

function handleFile(file) {
  if (!/\.csv$/i.test(file.name)) {
    uploadStatus.textContent = 'Please choose a .csv export from axe Auditor.';
    uploadStatus.classList.add('error');
    return;
  }
  uploadStatus.classList.remove('error');
  uploadStatus.textContent = `Parsing ${file.name}…`;
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: results => {
      processRows(results.data);
      if (!allIssues.length) {
        uploadStatus.textContent = 'No rows with an "Issue ID" were found in this CSV.';
        uploadStatus.classList.add('error');
        return;
      }
      // upload screen disappears the moment a valid file is loaded
      dashSubtitle.textContent =
        `${allIssues.length} issues from "${file.name}" — analyzed across ${CHECK_KEYS.length} checks`;
      uploadScreen.classList.add('hidden');
      dashboard.classList.remove('hidden');
      render();
    },
    error: err => {
      uploadStatus.textContent = 'Could not parse this CSV: ' + err.message;
      uploadStatus.classList.add('error');
    },
  });
}

function processRows(rows) {
  allIssues = rows
    .filter(r => r['Issue ID'])
    .map(r => {
      const result = runChecks(r);
      const byId = {};
      result.checks.forEach(c => { byId[c.id] = c; });
      const anyFail = result.checks.some(c => c.status === 'fail');
      return {
        issueId:    String(r['Issue ID']).trim(),
        issueUrl:   getIssueUrl(r),
        summary:    String(r.Summary || '').trim(),
        testUnit:   String(r['Test Unit'] || '').trim(),
        checkpoint: String(r.Checkpoint || '').trim(),
        impact:     String(r.Impact || '').trim(),
        platform:   result.platform,
        issueType:  result.issueType,
        method:     result.method || '—',
        checks:     result.checks,
        byId,
        flagged:    anyFail,
      };
    });
  populatePlatformFilter();
}

function populatePlatformFilter() {
  const platforms = [...new Set(allIssues.map(i => i.platform))].sort();
  platformFilter.innerHTML = '<option value="all">All platforms</option>' +
    platforms.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join('');
}

// ── tab + filter events ───────────────────────────────────────
tabBar.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  currentTab = btn.dataset.tab;
  [...tabBar.querySelectorAll('.tab-btn')].forEach(b => b.classList.toggle('active', b === btn));
  renderTab();
});
[platformFilter, methodFilter, statusFilter].forEach(el => el.addEventListener('change', renderTab));
searchBox.addEventListener('input', renderTab);

// ── "Check pass rates" expand / collapse (collapsed by default) ────
const ratesToggle  = document.getElementById('ratesToggle');
const ratesSection = document.getElementById('ratesSection');
if (ratesToggle && ratesSection) {
  ratesToggle.addEventListener('click', () => {
    const willExpand = ratesToggle.getAttribute('aria-expanded') !== 'true';
    ratesToggle.setAttribute('aria-expanded', String(willExpand));
    ratesSection.classList.toggle('is-collapsed', !willExpand);
    rateGrid.hidden = !willExpand;
  });
}

// ── filtering ─────────────────────────────────────────────────
function getFiltered() {
  const platform = platformFilter.value;
  const method   = methodFilter.value;
  const status   = statusFilter.value;
  const q        = searchBox.value.trim().toLowerCase();
  return allIssues.filter(i => {
    if (platform !== 'all' && i.platform !== platform) return false;
    if (method === 'manual'    && i.method.toLowerCase() !== 'manual')    return false;
    if (method === 'automated' && i.method.toLowerCase() !== 'automated') return false;
    if (status === 'flagged' && !i.flagged) return false;
    if (status === 'clean'   &&  i.flagged) return false;
    if (q && !(i.issueId.toLowerCase().includes(q) ||
               i.summary.toLowerCase().includes(q) ||
               i.testUnit.toLowerCase().includes(q))) return false;
    return true;
  });
}

// ── top-level render ──────────────────────────────────────────
function render() {
  renderStats();
  renderRates();
  renderTab();
}

function renderStats() {
  const total = allIssues.length;
  const flagged = allIssues.filter(i => i.flagged).length;
  const clean = total - flagged;
  const manual = allIssues.filter(i => i.method.toLowerCase() === 'manual').length;
  const automated = allIssues.filter(i => i.method.toLowerCase() === 'automated').length;
  const cleanPct = total ? Math.round((clean / total) * 100) : 0;

  statGrid.innerHTML = `
    <div class="stat-card accent">
      <span class="stat-label">Issues checked</span>
      <span class="stat-value">${total}</span>
      <span class="stat-note">across ${new Set(allIssues.map(i => i.platform)).size} platform(s)</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Manual / Automated</span>
      <span class="stat-value">${manual} / ${automated}</span>
      <span class="stat-note">by test method</span>
    </div>
    <div class="stat-card ${clean === total ? 'good' : (flagged ? 'bad' : '')}">
      <span class="stat-label">Fully clean</span>
      <span class="stat-value">${clean}</span>
      <span class="stat-note">${cleanPct}% of issues · ${flagged} flagged</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Checks run</span>
      <span class="stat-value">${CHECK_KEYS.length}</span>
      <span class="stat-note">per issue</span>
    </div>
  `;
}

function renderRates() {
  rateGrid.innerHTML = CHECK_KEYS.map(key => {
    let pass = 0, fail = 0, na = 0;
    allIssues.forEach(i => {
      const c = i.byId[key];
      if (!c) { na++; return; }
      if (c.status === 'pass') pass++;
      else if (c.status === 'fail') fail++;
      else na++;
    });
    const applicable = pass + fail;
    const pct = applicable ? Math.round((pass / applicable) * 100) : null;
    let cls, pctLabel;
    if (pct === null) { cls = 'is-na'; pctLabel = 'N/A'; }
    else if (pct === 100) { cls = 'is-full'; pctLabel = '100%'; }
    else if (pct >= 60)   { cls = 'is-part'; pctLabel = pct + '%'; }
    else                  { cls = 'is-low';  pctLabel = pct + '%'; }

    return `
      <div class="rate-card ${cls}">
        <div class="rate-key">${key} · ${escapeHtml(CHECK_LABELS[key])}</div>
        <div class="rate-pct">${pctLabel}</div>
        <div class="rate-detail">${applicable ? `${pass} pass · ${fail} fail` : `${na} not applicable`}</div>
        <div class="rate-bar"><span style="width:${pct === null ? 0 : pct}%"></span></div>
      </div>`;
  }).join('');
}

function renderTab() {
  const showControls = currentTab !== 'findings';
  controls.classList.toggle('hidden', !showControls);
  if (currentTab === 'issues')       renderIssuesTab();
  else if (currentTab === 'failed')  renderFailedTab();
  else if (currentTab === 'pages')   renderPagesTab();
  else if (currentTab === 'findings')renderFindingsTab();
}

// ── Tab: Issue details ────────────────────────────────────────
function renderIssuesTab() {
  const items = getFiltered();
  if (!items.length) { tabPanel.innerHTML = `<div class="table-wrap"><p class="empty-state">No issues match the current filters.</p></div>`; return; }

  const headCells = CHECK_KEYS.map(k => `<th class="col-check" title="${escapeHtml(CHECK_LABELS[k])}">${k}</th>`).join('');
  const rows = items.map(i => {
    const failCount = i.checks.filter(c => c.status === 'fail').length;
    const checkCells = CHECK_KEYS.map(k => {
      const c = i.byId[k];
      const st = c ? c.status : 'na';
      const sym = st === 'pass' ? '✓' : st === 'fail' ? '✕' : '–';
      return `<td class="col-check"><span class="chk ${st}" title="${escapeHtml(c ? c.note : 'n/a')}">${sym}</span></td>`;
    }).join('');
    const methodCls = i.method.toLowerCase() === 'automated' ? 'method-automated' : 'method-manual';
    const isOpen = expanded.has(i.issueId);
    const detail = isOpen ? detailRowHtml(i) : '';
    return `
      <tr class="data-row" data-id="${escapeHtml(i.issueId)}">
        <td><span class="verdict ${i.flagged ? 'flagged' : 'clean'}">${i.flagged ? failCount + ' failed' : 'Clean'}</span></td>
        <td class="cell-id">${idCell(i)}</td>
        <td><span class="tag">${escapeHtml(i.platform)}</span></td>
        <td class="cell-summary"><span class="summary-text">${escapeHtml(i.summary)}</span></td>
        <td class="cell-testunit">${escapeHtml(i.testUnit || '—')}</td>
        <td>${escapeHtml(i.issueType)}</td>
        <td><span class="tag ${methodCls}">${escapeHtml(i.method)}</span></td>
        ${checkCells}
      </tr>${detail}`;
  }).join('');

  tabPanel.innerHTML = `
    <div class="table-wrap">
      <table class="grid">
        <thead><tr>
          <th>Verdict</th><th>Issue ID</th><th>Platform</th><th>Summary</th>
          <th>Test unit</th><th>Test type</th><th>Method</th>${headCells}
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  tabPanel.querySelectorAll('tr.data-row').forEach(tr => {
    tr.addEventListener('click', e => {
      if (e.target.closest('a')) return; // let the Issue ID link open normally
      const id = tr.dataset.id;
      if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
      renderIssuesTab();
    });
  });
}

function detailRowHtml(i) {
  const fails = i.checks.filter(c => c.status === 'fail');
  const colspan = 7 + CHECK_KEYS.length;
  const s11 = i.byId.S11;
  const s11Block = (s11 && s11.detail) ? summaryDetailHtml(s11) : '';
  const bodyFails = fails.filter(f => !(f.id === 'S11' && s11Block));
  const body = bodyFails.length
    ? bodyFails.map(f => `<div class="detail-line"><span class="dl-key">${f.id} ${escapeHtml(CHECK_LABELS[f.id] || f.name)}</span>${reasonHtml(f)}</div>`).join('')
    : (fails.length ? '' : `<div class="detail-line">All ${CHECK_KEYS.length} checks passed for this issue.</div>`);
  return `<tr class="detail-row"><td colspan="${colspan}"><div class="detail-inner">${validationBadgesHtml(i)}${s11Block}${body}</div></td></tr>`;
}

// The three new validations surfaced as an explicit status strip (req 4).
const STATUS_WORD = { pass: 'PASS', fail: 'FAIL', na: 'NOT APPLICABLE' };
function statusPill(check) {
  const st = check ? check.status : 'na';
  return `<span class="vstatus ${st}">${STATUS_WORD[st] || 'NOT APPLICABLE'}</span>`;
}
function validationBadgesHtml(i) {
  const overall = i.flagged ? 'FAIL' : 'PASS';
  return `
    <div class="validation-strip">
      <span class="vitem">Summary Validation: ${statusPill(i.byId.S11)}</span>
      <span class="vitem">Required Fields Validation: ${statusPill(i.byId.S12)}</span>
      <span class="vitem">Color Contrast Validation: ${statusPill(i.byId.S13)}</span>
      <span class="vitem overall">Overall Status: <span class="vstatus ${overall === 'PASS' ? 'pass' : 'fail'}">${overall}</span></span>
    </div>`;
}

// Structured Old / New summary comparison. The Expected Results / Actual Results
// / Remediation Recommendation are shown only when the issue's CSV values don't
// match the expected mapping values (check.detail.fields).
function summaryDetailHtml(check) {
  const d = check.detail;
  const row = (label, val) => `<div class="cmp-row"><span class="cmp-label">${escapeHtml(label)}</span><span class="cmp-val">${escapeHtml(val || '(none)')}</span></div>`;
  const pre = (label, val) => `<div class="cmp-row"><span class="cmp-label">${escapeHtml(label)}</span><pre class="cmp-pre">${escapeHtml(val || '(none provided)')}</pre></div>`;
  const verdict = check.status === 'pass'
    ? '<span class="vstatus pass">PASS</span> Summary matches the expected new summary.'
    : '<span class="vstatus fail">FAIL</span> Summary needs to be updated.';
  const fieldRows = (d.fields || []).map(f => pre(f.label + ' (expected)', f.expected)).join('');
  return `
    <div class="detail-line summary-cmp">
      <span class="dl-key">S11 ${escapeHtml(CHECK_LABELS.S11)}</span>
      <div class="cmp-body">
        <div class="cmp-verdict">${verdict}</div>
        ${row('Old (AXE) summary', d.oldSummary)}
        ${row('Expected (new) summary', d.newSummary)}
        ${fieldRows}
      </div>
    </div>`;
}

// ── Tab: Failed checks ────────────────────────────────────────
function renderFailedTab() {
  const items = getFiltered();
  const rows = [];
  items.forEach(i => {
    i.checks.filter(c => c.status === 'fail').forEach(c => {
      rows.push(`
        <tr>
          <td class="cell-id">${idCell(i)}</td>
          <td><span class="tag">${escapeHtml(i.platform)}</span></td>
          <td class="cell-summary"><span class="summary-text">${escapeHtml(i.summary)}</span></td>
          <td><strong>${c.id}</strong> ${escapeHtml(CHECK_LABELS[c.id] || c.name)}</td>
          <td>${reasonHtml(c)}</td>
        </tr>`);
    });
  });
  if (!rows.length) {
    tabPanel.innerHTML = `<div class="banner-clean">✓ No failed checks in the current view — every issue passed all applicable checks.</div>`;
    return;
  }
  tabPanel.innerHTML = `
    <div class="table-wrap">
      <table class="grid">
        <thead><tr><th>Issue ID</th><th>Platform</th><th>Summary</th><th>Failed check</th><th>Reason</th></tr></thead>
        <tbody>${rows.join('')}</tbody>
      </table>
    </div>`;
}

// ── Tab: Page-wise details ────────────────────────────────────
function renderPagesTab() {
  const items = getFiltered();
  const byPage = {};
  items.forEach(i => { const p = i.testUnit || 'Unknown'; (byPage[p] = byPage[p] || []).push(i); });
  const pages = Object.keys(byPage).sort();
  if (!pages.length) { tabPanel.innerHTML = `<div class="card"><p class="empty-state">No issues match the current filters.</p></div>`; return; }

  tabPanel.innerHTML = `<div class="cards">` + pages.map(page => {
    const list = byPage[page];
    const flagged = list.filter(i => i.flagged);
    const pill = flagged.length
      ? `<span class="count-pill">${flagged.length} of ${list.length} flagged</span>`
      : `<span class="count-pill zero">${list.length} clean</span>`;

    let body;
    if (flagged.length) {
      body = flagged.map(i => {
        const methodCls = i.method.toLowerCase() === 'automated' ? 'method-automated' : 'method-manual';
        const bullets = i.checks.filter(c => c.status === 'fail')
          .map(c => `<li><span class="pw-key">${c.id}</span> ${reasonHtml(c)}</li>`)
          .join('');
        return `
          <div class="pw-issue">
            <div class="pw-head">
              <span class="pw-id">${idCell(i)}</span>
              <span class="pw-summary">${escapeHtml(i.summary)}</span>
              <span class="tag ${methodCls}">${escapeHtml(i.method)}</span>
            </div>
            <ul class="pw-reasons">${bullets}</ul>
          </div>`;
      }).join('');
    } else {
      body = `<div class="page-fail-line">All issues on this page passed every applicable check.</div>`;
    }
    return `<div class="card"><div class="card-head"><h3>${escapeHtml(page)}</h3>${pill}</div>${body}</div>`;
  }).join('') + `</div>`;
}

// ── Tab: Key findings ─────────────────────────────────────────
function renderFindingsTab() {
  const total = allIssues.length;
  const counts = {};
  CHECK_KEYS.forEach(k => { counts[k] = { fail: 0, applicable: 0 }; });
  allIssues.forEach(i => {
    CHECK_KEYS.forEach(k => {
      const c = i.byId[k];
      if (!c || c.status === 'na') return;
      counts[k].applicable++;
      if (c.status === 'fail') counts[k].fail++;
    });
  });

  const ranked = CHECK_KEYS
    .map(k => ({ k, ...counts[k], rate: counts[k].applicable ? counts[k].fail / counts[k].applicable : 0 }))
    .filter(x => x.fail > 0)
    .sort((a, b) => b.fail - a.fail);

  const systemic = ranked.filter(x => x.rate >= 0.4);
  const oneoff  = ranked.filter(x => x.rate < 0.4);
  const flagged = allIssues.filter(i => i.flagged).length;

  let html = `<div class="cards">`;

  html += `
    <div class="card">
      <div class="card-head"><h3>Overview</h3>
        <span class="count-pill ${flagged ? '' : 'zero'}">${flagged} of ${total} issues flagged</span></div>
      <div class="page-fail-line">${total - flagged} issue(s) passed every applicable check; ${flagged} have at least one failure.</div>
    </div>`;

  if (systemic.length) {
    html += `<div class="card systemic"><div class="card-head"><h3>Systemic / process-level patterns</h3>
      <span class="count-pill">${systemic.length}</span></div>
      ${systemic.map(x => findingRow(x)).join('')}
      <div class="page-fail-line" style="margin-top:8px;color:var(--warn)">These affect ≥40% of applicable issues — likely a template or process gap rather than one-off mistakes.</div>
    </div>`;
  }

  if (oneoff.length) {
    html += `<div class="card"><div class="card-head"><h3>Per-issue anomalies</h3>
      <span class="count-pill">${oneoff.length}</span></div>
      ${oneoff.map(x => findingRow(x)).join('')}
    </div>`;
  }

  if (!ranked.length) {
    html += `<div class="banner-clean">✓ No failures across any check — all ${total} issues are clean.</div>`;
  }

  html += `</div>`;
  tabPanel.innerHTML = html;
}

function findingRow(x) {
  const pct = x.applicable ? Math.round((x.fail / x.applicable) * 100) : 0;
  return `
    <div class="finding-row">
      <span class="finding-key">${x.k}</span>
      <span class="finding-name">${escapeHtml(CHECK_LABELS[x.k])}</span>
      <span class="finding-bar"><span style="width:${pct}%"></span></span>
      <span class="finding-count">${x.fail} / ${x.applicable} (${pct}%)</span>
    </div>`;
}

// ── issue link ────────────────────────────────────────────────
// Find the per-issue link column in the CSV (JIRA / axe Auditor issue URL).
// The plain "URL" column is the test unit's page URL, so it is excluded.
function getIssueUrl(row) {
  const entries = Object.entries(row);
  const named = entries.find(([k]) => {
    const key = String(k).trim().toLowerCase();
    if (key === 'url') return false;
    return /jira/.test(key)
      || (/(issue|auditor)/.test(key) && /(url|link)/.test(key))
      || key === 'link';
  });
  if (named && /^https?:\/\//i.test(String(named[1]).trim())) return String(named[1]).trim();
  for (const [k, v] of entries) {
    if (String(k).trim().toLowerCase() === 'url') continue;
    const val = String(v || '').trim();
    if (/^https?:\/\/\S*(browse|jira|auditor)/i.test(val)) return val;
  }
  return '';
}

// Render a check's reason. When a check has multiple points (S5/S10), show them
// as a bullet sub-list; otherwise show the single sentence inline.
function reasonHtml(c) {
  const pts = (c.notes && c.notes.length > 1) ? c.notes : [c.note];
  if (pts.length === 1) return escapeHtml(pts[0]);
  return '<ul class="reason-list">' + pts.map(n => `<li>${escapeHtml(n)}</li>`).join('') + '</ul>';
}

// Render an Issue ID as a new-tab link when a URL is available, else plain text.
function idCell(i) {
  const id = escapeHtml(i.issueId);
  if (!i.issueUrl) return id;
  return `<a class="issue-link" href="${escapeHtml(i.issueUrl)}" target="_blank" rel="noopener noreferrer" title="Open issue ${id} in a new tab">${id}</a>`;
}

// ── util ──────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
