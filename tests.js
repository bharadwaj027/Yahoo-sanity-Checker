/* tests.js — unit tests for the new validations (S11 Summary, S12 Required
 * fields, S13 Colour contrast) plus a light regression over S1–S13.
 *
 * Depends on the globals defined by summary-map.js (SUMMARY_MAP) and
 * checks.js (runChecks). Call runTests() to get { pass, fail, failures }.
 * When a DOM is present the results are also rendered into #summary / #out.
 */
function runTests() {
  let pass = 0, fail = 0;
  const failures = [];
  function record(name, ok, detail) {
    if (ok) { pass++; } else { fail++; failures.push({ name, detail: detail || '' }); }
  }
  const chk = (res, id) => res.checks.find(c => c.id === id);
  const status = (res, id) => { const c = chk(res, id); return c ? c.status : '(absent)'; };
  function assertStatus(name, res, id, expected) {
    const got = status(res, id);
    record(`${name} → ${id}=${expected}`, got === expected,
      `expected ${expected}, got ${got}\nnote: ${(chk(res, id) || {}).note || ''}`);
  }

  const ORDER = [
    'Environment', 'Context', 'Steps to reproduce', 'Expected results',
    'Actual results', 'Affected user population', 'Applicable WCAG Success Criterion',
    'Code Snippet', 'Remediation Recommendation', 'Resource Link', 'Screen Name',
  ];
  function fullSections() {
    return {
      'Environment': 'Platform URL: https://example.com\nAuthentication State: Logged In',
      'Context': 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nTest Method: Chrome on Windows using axe DevTools Chrome browser extension',
      'Steps to reproduce': '1. Open the above-mentioned URL.\n2. Press F12 to open the browser Inspect panel.\n3. Run the Axe DevTools extension.\n4. Observe the issue for the above-mentioned element(s).',
      'Expected results': 'The above-mentioned button element(s) is provided with an accessible name.',
      'Actual results': 'The above-mentioned button element(s) is missing an accessible name.',
      'Affected user population': 'Screen reader users and keyboard-only users.',
      'Applicable WCAG Success Criterion': '4.1.2 Name, Role, Value (Level A)',
      'Code Snippet': '<button class="apply-btn"></button>',
      'Remediation Recommendation': 'Add an accessible name to the button using aria-label or inner text.',
      'Resource Link': 'https://dequeuniversity.com/rules/axe/4.7/button-name',
      'Screen Name': 'Home page',
    };
  }
  const serialize = secs => ORDER.filter(k => k in secs).map(k => `${k}:\n${secs[k]}`).join('\n\n');
  const row = over => Object.assign({
    'Issue ID': '1', 'Summary': 'Button does not have a name - Home page (Sign in button)',
    'Test Unit': 'Home page', 'Method': 'Automated', 'Attachments': 'shot.png',
    'URL': 'https://example.com', 'Checkpoint': '4.1.2',
  }, over || {});

  // ── S11 — Summary validation ─────────────────────────────────────
  let r = runChecks(row({ Summary: 'Button does not have a name - Home page (Sign in button)', Description: serialize(fullSections()) }));
  assertStatus('S11 new-wording matches', r, 'S11', 'pass');

  r = runChecks(row({ Summary: 'Buttons must have discernible text - Home page (Sign in button)', Description: serialize(fullSections()) }));
  assertStatus('S11 old-wording still used', r, 'S11', 'fail');
  record('S11 fail shows expected new summary', (chk(r, 'S11').note || '').includes('Button does not have a name'), (chk(r, 'S11') || {}).note);

  r = runChecks(row({ Summary: 'Totally different wording here - Home page (x)', Checkpoint: '2.4.2', Description: serialize(fullSections()) }));
  assertStatus('S11 unique-checkpoint, wrong wording', r, 'S11', 'fail');

  // Summary matching applies to automation issues only — a manual issue is NA
  r = runChecks(row({ Method: 'Manual', Summary: 'Buttons must have discernible text - Home page (x)', Description: serialize(fullSections()) }));
  assertStatus('S11 manual issue is NA (automation-only)', r, 'S11', 'na');

  // The reported rule, as an automation issue → flagged as old wording
  r = runChecks(row({ Method: 'Automated', Summary: 'Links are not distinguishable without relying on color - Home page (nav link)', Checkpoint: '1.4.1 b', Description: serialize(fullSections()) }));
  assertStatus('S11 old link wording (automation)', r, 'S11', 'fail');

  // "Automation" spelling is still treated as an automation issue
  r = runChecks(row({ Method: 'Automation', Summary: 'Buttons must have discernible text - Home page (x)', Description: serialize(fullSections()) }));
  assertStatus('S11 "Automation" spelling recognised', r, 'S11', 'fail');

  r = runChecks(row({ Summary: 'Some brand-new automation rule text - Home page (x)', Checkpoint: '9.9.9', Description: serialize(fullSections()) }));
  assertStatus('S11 unknown rule handled gracefully', r, 'S11', 'na');

  r = runChecks(row({ Summary: '  Button   does not   have a name  - Home page (x)', Description: serialize(fullSections()) }));
  assertStatus('S11 whitespace-normalised match', r, 'S11', 'pass');

  // Reported case: real axe wording "Links must be distinguishable…" (alias for
  // the sheet's "…are not distinguishable…") flags on automation issues.
  r = runChecks(row({ Method: 'Automated', Summary: 'Links must be distinguishable without relying on color - Home page (nav link)', Checkpoint: '1.4.1 b', Description: serialize(fullSections()) }));
  assertStatus('S11 alias old wording (must be)', r, 'S11', 'fail');
  r = runChecks(row({ Method: 'Manual', Summary: 'Links must be distinguishable without relying on color - Home page (nav link)', Checkpoint: '1.4.1 b', Description: serialize(fullSections()) }));
  assertStatus('S11 alias old wording, manual is NA', r, 'S11', 'na');

  // S11 detail: no currentSummary; reference fields only when CSV values differ
  (function () {
    const be = SUMMARY_MAP.find(x => x.newSummary === 'Button does not have a name');
    const sMatch = fullSections();
    sMatch['Expected results'] = be.expectedResults;
    sMatch['Actual results'] = be.actualResults;
    sMatch['Remediation Recommendation'] = be.remediation;
    const dMatch = chk(runChecks(row({ Summary: 'Buttons must have discernible text - Home page (x)', Description: serialize(sMatch) })), 'S11').detail;
    record('S11 no ref fields when CSV matches expected', dMatch && dMatch.fields.length === 0, 'fields=' + JSON.stringify(dMatch && dMatch.fields));
    const sMis = fullSections();
    sMis['Expected results'] = 'Some different expected result text.';
    sMis['Actual results'] = 'Some different actual result text.';
    sMis['Remediation Recommendation'] = 'Some different remediation text.';
    const dMis = chk(runChecks(row({ Summary: 'Buttons must have discernible text - Home page (x)', Description: serialize(sMis) })), 'S11').detail;
    record('S11 ref fields shown when CSV differs', dMis && dMis.fields.length === 3, 'fields=' + JSON.stringify(dMis && dMis.fields.map(f => f.label)));
    record('S11 detail drops currentSummary', dMis && !('currentSummary' in dMis), 'keys=' + Object.keys(dMis || {}).join(','));
  })();

  // ── S12 — Required fields ────────────────────────────────────────
  r = runChecks(row({ Description: serialize(fullSections()) }));
  assertStatus('S12 all fields present', r, 'S12', 'pass');

  let s = fullSections(); delete s['Remediation Recommendation'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 remediation missing', r, 'S12', 'fail');
  record('S12 names the missing Remediation field', (chk(r, 'S12').note || '').includes('Remediation Recommendation'), chk(r, 'S12').note);

  s = fullSections(); delete s['Resource Link'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 resource link missing', r, 'S12', 'fail');

  s = fullSections(); delete s['Code Snippet'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 code snippet missing', r, 'S12', 'fail');

  s = fullSections(); delete s['Expected results'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 expected results missing', r, 'S12', 'fail');

  s = fullSections(); delete s['Actual results'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 actual results missing', r, 'S12', 'fail');

  s = fullSections(); delete s['Code Snippet']; delete s['Resource Link']; delete s['Affected user population'];
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 multiple missing', r, 'S12', 'fail');

  s = fullSections(); s['Remediation Recommendation'] = '';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field empty', r, 'S12', 'fail');

  s = fullSections(); s['Remediation Recommendation'] = '   \n  ';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field whitespace only', r, 'S12', 'fail');

  s = fullSections(); s['Remediation Recommendation'] = 'N/A';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "N/A"', r, 'S12', 'fail');

  s = fullSections(); s['Affected user population'] = '-';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "-"', r, 'S12', 'fail');

  s = fullSections(); s['Code Snippet'] = 'TBD';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "TBD"', r, 'S12', 'fail');

  // ── S13 — Colour contrast ────────────────────────────────────────
  function contrastRow(actual, over) {
    const sec = fullSections();
    sec['Actual results'] = actual;
    return runChecks(row(Object.assign({
      Summary: 'Text content lacks 4.5:1 contrast ratio - Home page (body text)',
      Checkpoint: '1.4.3', Description: serialize(sec),
    }, over || {})));
  }
  r = contrastRow('Foreground color: #767676\nBackground color: #ffffff\nContrast Ratio: 4.3:1 (fails 4.5:1)');
  assertStatus('S13 full contrast details', r, 'S13', 'pass');

  r = contrastRow('Contrast Details\nLink text color: \nSurrounding text color: \nContrast Ratio: ');
  assertStatus('S13 labels present, values blank', r, 'S13', 'pass');

  r = contrastRow('Foreground color: #767676\nBackground color: #ffffff');
  assertStatus('S13 missing ratio', r, 'S13', 'fail');
  record('S13 lists missing ratio', (chk(r, 'S13').note || '').toLowerCase().includes('ratio'), chk(r, 'S13').note);

  r = contrastRow('The contrast is 3:1 which is insufficient.');
  assertStatus('S13 missing colours', r, 'S13', 'fail');

  r = contrastRow('The text does not have sufficient color contrast.');
  assertStatus('S13 generic actual results', r, 'S13', 'fail');

  r = contrastRow('The above-mentioned text element(s) do not meet the required 4.5:1 color contrast ratio.\n\n[PLACEHOLDER ADD CONTRAST DETAILS]');
  assertStatus('S13 unfilled placeholder', r, 'S13', 'fail');

  r = runChecks(row({ Summary: 'Button does not have a name - Home page (x)', Checkpoint: '4.1.2', Description: serialize(fullSections()) }));
  assertStatus('S13 non-contrast issue', r, 'S13', 'na');

  let s2 = fullSections();
  s2['Actual results'] = 'The text does not have sufficient color contrast.';
  r = runChecks(row({ Summary: 'Link contrast is not at least 3:1 with surrounding text - Home page (nav link)', Checkpoint: '', Description: serialize(s2) }));
  assertStatus('S13 detected via summary wording', r, 'S13', 'fail');

  // ── Regression — every check still produces a result ─────────────
  r = runChecks(row({ Description: serialize(fullSections()) }));
  ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13'].forEach(id => {
    record('regression: ' + id + ' produced a result', !!chk(r, id), 'check ' + id + ' missing from result');
  });

  const result = { pass, fail, failures };

  // Optional DOM rendering
  if (typeof document !== 'undefined' && document.getElementById('summary')) {
    const sum = document.getElementById('summary');
    sum.textContent = `${pass} passed, ${fail} failed`;
    sum.className = fail === 0 ? 'ok' : 'bad';
    const out = document.getElementById('out');
    if (out) {
      failures.forEach(f => {
        const div = document.createElement('div');
        div.className = 'case';
        div.innerHTML = `<span class="f">FAIL</span> ${f.name}<div class="detail">${String(f.detail).replace(/</g, '&lt;')}</div>`;
        out.appendChild(div);
      });
      if (!failures.length) {
        const div = document.createElement('div');
        div.className = 'case';
        div.innerHTML = '<span class="p">All assertions passed.</span>';
        out.appendChild(div);
      }
    }
  }
  return result;
}

if (typeof module !== 'undefined' && module.exports) { module.exports = { runTests }; }
if (typeof window !== 'undefined') { window.runTests = runTests; }
