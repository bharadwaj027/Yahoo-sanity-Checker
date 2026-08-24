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

  // Native fixture: Platform maps to a native app, so runChecks classifies it as
  // native. No Code Snippet (not required for native). Used by the S12 native
  // conditional-required-fields tests below.
  function nativeSections() {
    return {
      'Environment': 'App Version tested: 7.42.1\nAuthentication State: Logged In',
      'Context': 'Platform: Native Android Tablet App\nOperating System: Android 13\nDevice Model: Pixel Tablet\nTest Method: TalkBack on Android',
      'Steps to reproduce': '1. Turn on the screen reader (TalkBack).\n2. Navigate to the above-mentioned element.\n3. Observe the issue.',
      'Expected results': 'The above-mentioned button element(s) is provided with an accessible name.',
      'Actual results': 'The above-mentioned button element(s) is missing an accessible name.',
      'Affected user population': 'Screen reader users.',
      'Applicable WCAG Success Criterion': '4.1.2 Name, Role, Value (Level A)',
      'Remediation Recommendation': 'Add an accessible name to the button using its content description.',
      'Resource Link': 'https://dequeuniversity.com/rules/axe/4.7/button-name',
      'Screen Name': 'Home page',
    };
  }

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

  s = fullSections(); s['Expected results'] = 'N/A';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "N/A" (content-validated field)', r, 'S12', 'fail');

  s = fullSections(); s['Affected user population'] = '-';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "-"', r, 'S12', 'fail');

  s = fullSections(); s['Code Snippet'] = 'TBD';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 field "TBD"', r, 'S12', 'fail');

  // Remediation Recommendation — structural validation ONLY (no content checks)
  s = fullSections(); s['Remediation Recommendation'] = 'N/A';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 remediation "N/A" accepted (no content check)', r, 'S12', 'pass');

  s = fullSections(); s['Remediation Recommendation'] = 'Fix the issue';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 remediation any text accepted', r, 'S12', 'pass');

  s = fullSections(); s['Remediation Recommendation'] = 'Rule\nElements must have alternative text.';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 remediation with "Rule" heading fails', r, 'S12', 'fail');
  record('S12 remediation "Rule" message', (chk(r, 'S12').note || '').includes('"Rule" section'), chk(r, 'S12').note);

  s = fullSections(); s['Remediation Recommendation'] = 'Background\nThis explains the issue.';
  r = runChecks(row({ Description: serialize(s) }));
  assertStatus('S12 remediation with "Background" heading fails', r, 'S12', 'fail');
  record('S12 remediation "Background" message', (chk(r, 'S12').note || '').includes('"Background" section'), chk(r, 'S12').note);

  (function () {
    const s2 = fullSections(); delete s2['Remediation Recommendation'];
    const d = serialize(s2) + '\n\nRecommendation to fix:\nDo the thing.';
    const rr = runChecks(row({ Description: d }));
    assertStatus('S12 Recommendation to fix alternative label passes', rr, 'S12', 'pass');
    record('S12 accepted alternative label is not rejected', !(chk(rr, 'S12').note || '').includes('Invalid field name'), chk(rr, 'S12').note);
  })();

  // ── S12 — Native audits: conditional required fields ─────────────
  // Audit type comes from the deterministic Platform classification (`native`),
  // never from wording. Native: Code Snippet NOT required; Resource Link OR
  // Reference satisfies the link requirement (at least one, non-empty).
  (function () {
    // sanity: the fixture is actually classified native
    const base = runChecks(row({ Method: 'Manual', Description: serialize(nativeSections()) }));
    record('native fixture is classified native', base.native === true, 'native=' + base.native);

    // Native + Resource Link present + Code Snippet absent → PASS
    let rr = runChecks(row({ Method: 'Manual', Description: serialize(nativeSections()) }));
    assertStatus('S12 native: Resource Link present, no Code Snippet', rr, 'S12', 'pass');
    record('S12 native: Code Snippet never reported missing',
      !(chk(rr, 'S12').note || '').includes('Code Snippet is missing'), chk(rr, 'S12').note);

    // Native + Reference present (no Resource Link) + Code Snippet absent → PASS
    let s = nativeSections(); delete s['Resource Link'];
    let d = serialize(s) + '\n\nReference:\nhttps://developer.android.com/guide/topics/ui/accessibility';
    rr = runChecks(row({ Method: 'Manual', Description: d }));
    assertStatus('S12 native: Reference satisfies the link requirement', rr, 'S12', 'pass');

    // Native + Resource Link present + Reference missing → PASS (both not required)
    rr = runChecks(row({ Method: 'Manual', Description: serialize(nativeSections()) }));
    assertStatus('S12 native: Resource Link only, Reference missing', rr, 'S12', 'pass');

    // Native + both Resource Link and Reference missing → FAIL
    s = nativeSections(); delete s['Resource Link'];
    rr = runChecks(row({ Method: 'Manual', Description: serialize(s) }));
    assertStatus('S12 native: neither link field present', rr, 'S12', 'fail');
    record('S12 native: link FAIL names both fields',
      (chk(rr, 'S12').note || '').includes('Resource Link or Reference'), chk(rr, 'S12').note);

    // Native + both present but empty → FAIL
    s = nativeSections(); s['Resource Link'] = '   ';
    d = serialize(s) + '\n\nReference:\n   ';
    rr = runChecks(row({ Method: 'Manual', Description: d }));
    assertStatus('S12 native: both link fields empty', rr, 'S12', 'fail');

    // Native + a "References:" label is NOT flagged as a wrong label by S8.
    s = nativeSections(); delete s['Resource Link'];
    d = serialize(s) + '\n\nReferences:\nhttps://www.w3.org/WAI/';
    rr = runChecks(row({ Method: 'Manual', Description: d }));
    assertStatus('S8 native: References label accepted', rr, 'S8', 'pass');

    // Web control: Code Snippet still required (missing → FAIL)
    let w = fullSections(); delete w['Code Snippet'];
    rr = runChecks(row({ Description: serialize(w) }));
    assertStatus('S12 web: Code Snippet still required', rr, 'S12', 'fail');
    record('S12 web: names missing Code Snippet',
      (chk(rr, 'S12').note || '').includes('Code Snippet'), chk(rr, 'S12').note);

    // Web: Reference substitutes for Resource Link in S12. S8 may still flag
    // the label convention separately for Web audits.
    w = fullSections(); delete w['Resource Link'];
    d = serialize(w) + '\n\nReference:\nhttps://example.com/ref';
    rr = runChecks(row({ Description: d }));
    assertStatus('S12 web: Reference satisfies the link requirement', rr, 'S12', 'pass');
  })();

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

  // ── S14 — Native recommendation vs authoritative Excel reference ─
  // Deterministic lookup + exact (formatting-normalised) comparison. Fixtures are
  // built from the real NATIVE_RECOMMENDATIONS reference so tests track the data.
  (function () {
    if (typeof NATIVE_RECOMMENDATIONS === 'undefined') {
      record('S14 reference data loaded', false, 'NATIVE_RECOMMENDATIONS global is missing');
      return;
    }
    record('S14 reference data loaded', NATIVE_RECOMMENDATIONS.length > 0, 'entries=' + NATIVE_RECOMMENDATIONS.length);

    // normRec tolerates CSV doubled-quote escaping ("" == ") so a ticket copied
    // with escaped quotes still matches the authoritative reference.
    if (typeof normRec === 'function') {
      record('normRec collapses doubled quotes', normRec('setContentDescription(""Gesture Name"")') === normRec('setContentDescription("Gesture Name")'), 'doubled-quote normalization');
      record('normRec keeps distinct text distinct', normRec('foo "bar"') !== normRec('foo "baz"'), 'sanity: different text stays different');
    }

    const iosE = NATIVE_RECOMMENDATIONS.find(e => e.platform === 'iOS' && e.issueDescription);
    const andE = NATIVE_RECOMMENDATIONS.find(e => e.platform === 'Android' && e.issueDescription);
    const androidContrastE = NATIVE_RECOMMENDATIONS.find(e => e.platform === 'Android' && e.checkpoint === '1.4.11.a');
    const androidOrE = NATIVE_RECOMMENDATIONS.find(e => e.platform === 'Android' && e.checkpoint === '1.3.2.a' && e.issueDescription.startsWith('Screen reader focus falls'));

    // Build a native issue: platformLine sets iOS/Android, Summary carries the
    // Excel Issue Description, and the Remediation Recommendation section holds
    // the recommendation text under test.
    function nrRow(platformLine, entry, remediation, summaryExtra) {
      const s = nativeSections();
      const dev = platformLine.indexOf('Android') >= 0 ? 'Pixel Tablet' : 'iPhone 15';
      const osl = platformLine.indexOf('Android') >= 0 ? 'Android 13' : 'iOS 17';
      const at  = platformLine.indexOf('Android') >= 0 ? 'TalkBack' : 'VoiceOver';
      s['Context'] = `Platform: ${platformLine}\nOperating System: ${osl}\nDevice Model: ${dev}\nTest Method: ${at}`;
      s['Remediation Recommendation'] = remediation;
      const summary = entry.issueDescription + (summaryExtra || ' - Home page (element)');
      return row({ Checkpoint: entry.checkpoint, Summary: summary, Method: 'Manual', Description: serialize(s) });
    }
    const IOS = 'Native iPhone Mobile App', AND = 'Native Android Tablet App';

    // iOS — exact recommendation → PASS
    let rr = runChecks(nrRow(IOS, iosE, iosE.recommendation));
    record('S14 native fixture classified iOS', chk(rr, 'S14') && (chk(rr, 'S14').detail || {}).platform === 'iOS', (chk(rr,'S14')||{}).note);
    assertStatus('S14 iOS exact recommendation', rr, 'S14', 'pass');

    // iOS — authoritative recommendation + an appended per-issue note → PASS
    // (the field may START WITH the reference; trailing additions are allowed).
    rr = runChecks(nrRow(IOS, iosE, iosE.recommendation + '\n\nNote: This is applicable to the following screens\n- Inbox\n- Settings'));
    assertStatus('S14 iOS recommendation + trailing note (prefix match)', rr, 'S14', 'pass');

    // iOS — a LEADING addition before the reference → still FAIL (must start with it)
    rr = runChecks(nrRow(IOS, iosE, 'Note: see below.\n\n' + iosE.recommendation));
    assertStatus('S14 iOS leading text before reference', rr, 'S14', 'fail');

    // Dropping a leading structural header line (e.g. "HOW TO FIX: Swift:") still
    // matches — header labels are ignored on both sides.
    (function () {
      const noHeader = iosE.recommendation.replace(/^HOW TO FIX[^\n]*:\r?\n/i, '');
      if (noHeader !== iosE.recommendation) {
        const rH = runChecks(nrRow(IOS, iosE, noHeader));
        assertStatus('S14 iOS recommendation with leading header dropped', rH, 'S14', 'pass');
      }
    })();

    // iOS — a substantive change WITHIN the recommendation → FAIL (a mid-text edit
    // breaks the prefix; only trailing additions are tolerated).
    (function () {
      const mid = Math.floor(iosE.recommendation.length / 2);
      const modified = iosE.recommendation.slice(0, mid) + ' XX-EDITED-XX ' + iosE.recommendation.slice(mid);
      rr = runChecks(nrRow(IOS, iosE, modified));
      assertStatus('S14 iOS modified recommendation (mid-text)', rr, 'S14', 'fail');
    })();

    // iOS — Android recommendation pasted in → FAIL
    rr = runChecks(nrRow(IOS, iosE, andE.recommendation));
    assertStatus('S14 iOS with Android recommendation', rr, 'S14', 'fail');

    // iOS — missing recommendation → FAIL
    (function () {
      const s = nativeSections();
      s['Context'] = `Platform: ${IOS}\nOperating System: iOS 17\nDevice Model: iPhone 15\nTest Method: VoiceOver`;
      delete s['Remediation Recommendation'];
      const rMiss = runChecks(row({ Checkpoint: iosE.checkpoint, Summary: iosE.issueDescription + ' - Home page (x)', Method: 'Manual', Description: serialize(s) }));
      assertStatus('S14 skipped when recommendation is missing', rMiss, 'S14', 'na');
      record('S14 missing recommendation defers to S12', (chk(rMiss, 'S14').note || '').includes('S12'), chk(rMiss, 'S14').note);
    })();

    // Android — exact → PASS ; modified → FAIL ; iOS rec → FAIL
    rr = runChecks(nrRow(AND, andE, andE.recommendation));
    record('S14 native fixture classified Android', (chk(rr, 'S14').detail || {}).platform === 'Android', (chk(rr,'S14')||{}).note);
    assertStatus('S14 Android exact recommendation', rr, 'S14', 'pass');

    // Android real-data tolerance: the audit recommendation omits the word
    // "color" from "background color" but otherwise matches the reference.
    const androidMissingWord = androidContrastE.recommendation.replace('background color', 'background');
    rr = runChecks(nrRow(AND, androidContrastE, androidMissingWord));
    assertStatus('S14 Android recommendation with one omitted word', rr, 'S14', 'pass');

    const androidMissingThreeWords = androidContrastE.recommendation.replace('background color', 'background').replace('either the inner or outer', 'either inner or outer');
    rr = runChecks(nrRow(AND, androidContrastE, androidMissingThreeWords));
    assertStatus('S14 Android recommendation with two omitted words', rr, 'S14', 'pass');

    const androidMissingFourWords = androidMissingThreeWords.replace('user interface component', 'component');
    rr = runChecks(nrRow(AND, androidContrastE, androidMissingFourWords));
    assertStatus('S14 Android recommendation with more than two omitted words', rr, 'S14', 'fail');

    const alternatives = androidOrE.recommendation.split(/\n\s*OR\s*\n/i);
    rr = runChecks(nrRow(AND, androidOrE, alternatives[1]));
    assertStatus('S14 accepts second OR recommendation alternative', rr, 'S14', 'pass');
    rr = runChecks(nrRow(AND, androidOrE, alternatives.join('\n\nOR\n\n')));
    assertStatus('S14 accepts both OR recommendation alternatives', rr, 'S14', 'pass');

    (function () {
      const mid = Math.floor(andE.recommendation.length / 2);
      const modified = andE.recommendation.slice(0, mid) + ' XX-EDITED-XX ' + andE.recommendation.slice(mid);
      rr = runChecks(nrRow(AND, andE, modified));
      assertStatus('S14 Android modified recommendation (mid-text)', rr, 'S14', 'fail');
    })();

    rr = runChecks(nrRow(AND, andE, iosE.recommendation));
    assertStatus('S14 Android with iOS recommendation', rr, 'S14', 'fail');

    // Checkpoint not found in the correct tab → ERROR (reported as fail)
    rr = runChecks(nrRow(IOS, { checkpoint: '9.9.9.z', issueDescription: iosE.issueDescription }, iosE.recommendation));
    assertStatus('S14 checkpoint not found → ERROR', rr, 'S14', 'fail');
    record('S14 checkpoint-not-found says ERROR', (chk(rr, 'S14').note || '').startsWith('ERROR'), chk(rr, 'S14').note);

    // Formatting normalisation: leading/trailing whitespace → PASS
    rr = runChecks(nrRow(IOS, iosE, '   \n' + iosE.recommendation + '   \n\n'));
    assertStatus('S14 iOS whitespace-only difference', rr, 'S14', 'pass');

    // Formatting normalisation: CRLF line endings + collapsed blank lines → PASS
    rr = runChecks(nrRow(IOS, iosE, iosE.recommendation.replace(/\n/g, '\r\n').replace(/\r\n/g, '\r\n\r\n')));
    assertStatus('S14 iOS line-ending/blank-line difference', rr, 'S14', 'pass');

    // Checkpoint format tolerance: "1.1.1.a" vs "1.1.1 a" still resolves the row
    (function () {
      const spaced = iosE.checkpoint.replace(/\.([a-z])$/i, ' $1');
      if (spaced !== iosE.checkpoint) {
        const rf = runChecks(nrRow(IOS, { checkpoint: spaced, issueDescription: iosE.issueDescription }, iosE.recommendation));
        assertStatus('S14 checkpoint format-tolerant match', rf, 'S14', 'pass');
      }
    })();

    // normCheckpoint: extract the id from a full WCAG label (real audit format)
    if (typeof normCheckpoint === 'function') {
      record('normCheckpoint parenthesised id', normCheckpoint('Name, Role, Value (4.1.2.a)') === '4.1.2a', normCheckpoint('Name, Role, Value (4.1.2.a)'));
      record('normCheckpoint bare id', normCheckpoint('4.1.2.a') === '4.1.2a', normCheckpoint('4.1.2.a'));
      record('normCheckpoint spaced id', normCheckpoint('4.1.2 a') === '4.1.2a', normCheckpoint('4.1.2 a'));
      record('normCheckpoint N/A trailer', normCheckpoint('1.1.1.e - N/A') === '1.1.1e', normCheckpoint('1.1.1.e - N/A'));
    }

    // Checkpoint carried as a full WCAG label with the id in parentheses (the real
    // audit format that produced the reported ERROR) must still resolve the row.
    (function () {
      const s = nativeSections();
      s['Context'] = `Platform: ${IOS}\nOperating System: iOS 17\nDevice Model: iPhone 15\nTest Method: VoiceOver`;
      s['Remediation Recommendation'] = iosE.recommendation;
      const wrapped = 'Name, Role, Value (' + iosE.checkpoint + ')';
      const rw = runChecks(row({ Checkpoint: wrapped, Summary: iosE.issueDescription + ' - Home page (x)', Method: 'Manual', Description: serialize(s) }));
      assertStatus('S14 checkpoint as WCAG label with parenthesised id', rw, 'S14', 'pass');
    })();

    // RULE / BACKGROUND must not be present in the recommendation → FAIL
    rr = runChecks(nrRow(IOS, iosE, 'RULE:\nSomething.\n\n' + iosE.recommendation));
    assertStatus('S14 recommendation contains RULE → FAIL', rr, 'S14', 'fail');
    record('S14 RULE message', (chk(rr, 'S14').note || '').includes('RULE'), chk(rr, 'S14').note);

    rr = runChecks(nrRow(IOS, iosE, iosE.recommendation + '\n\nBACKGROUND:\nSome background.'));
    assertStatus('S14 recommendation contains BACKGROUND → FAIL', rr, 'S14', 'fail');

    // Real-data shape: the Summary carries short text + page + element and does NOT
    // contain the verbose Excel Issue Description, so the exact row can't be pinned.
    // Any authoritative recommendation for the checkpoint+platform is then accepted
    // verbatim (PASS); a rewritten recommendation is rejected (FAIL).
    (function () {
      const label = 'WCAG label (' + andE.checkpoint + ')';
      const unrelated = 'Short issue phrasing here - Settings page (some element)';
      const sOk = nativeSections();
      sOk['Context'] = `Platform: ${AND}\nOperating System: Android 13\nDevice Model: Pixel Tablet\nTest Method: TalkBack`;
      sOk['Remediation Recommendation'] = andE.recommendation;
      const rOk = runChecks(row({ Checkpoint: label, Summary: unrelated, Method: 'Manual', Description: serialize(sOk) }));
      assertStatus('S14 any-row fallback accepts verbatim rec', rOk, 'S14', 'pass');
      record('S14 fallback uses any-row match mode', (chk(rOk, 'S14').detail || {}).matchMode === 'any', JSON.stringify((chk(rOk, 'S14').detail || {}).matchMode));

      const sBad = nativeSections();
      sBad['Context'] = `Platform: ${AND}\nOperating System: Android 13\nDevice Model: Pixel Tablet\nTest Method: TalkBack`;
      sBad['Remediation Recommendation'] = 'A completely rewritten recommendation not taken from the reference sheet.';
      const rBad = runChecks(row({ Checkpoint: label, Summary: unrelated, Method: 'Manual', Description: serialize(sBad) }));
      assertStatus('S14 any-row fallback rejects rewritten rec', rBad, 'S14', 'fail');
    })();

    // Web issue → NA (does not apply)
    rr = runChecks(row({ Description: serialize(fullSections()) }));
    assertStatus('S14 web issue is NA', rr, 'S14', 'na');
  })();

  // ── Checkpoint-owned Context / Test Method validation ────────────
  (function () {
    function typedSections(platform, testMethod, at) {
      const s = fullSections();
      s['Context'] = `Platform: ${platform}\nOperating System: ${platform === 'Mobile Web' ? 'iOS' : 'Windows 11'}\nBrowser: ${platform === 'Mobile Web' ? 'Safari' : 'Chrome 120'}\n${at ? `Assistive Technology: ${at}\n` : ''}Test Method: ${testMethod}`;
      return serialize(s);
    }
    function s5(checkpoint, platform, testMethod, at) {
      return chk(runChecks(row({ Checkpoint: checkpoint, Description: typedSections(platform, testMethod, at) })), 'S5');
    }

    record('checkpoint classifier uses Checkpoint, not Test Method', classifyCheckpoint('1.4.10') === 'Visual', classifyCheckpoint('1.4.10'));
    record('checkpoint label with subtype is classified', classifyCheckpoint('Keyboard Navigation (2.1.1.a)') === 'Keyboard', classifyCheckpoint('Keyboard Navigation (2.1.1.a)'));
    record('missing Checkpoint is reported', s5('', 'Web', 'Chrome on windows using keyboard', '').note.includes('Checkpoint is missing'), s5('', 'Web', 'Chrome on windows using keyboard', '').note);
    record('2.1.1 defaults to Keyboard', classifyCheckpoint('2.1.1') === 'Keyboard', classifyCheckpoint('2.1.1'));
    record('2.1.1 exception is Screen Reader', classifyCheckpoint('2.1.1 - Action cannot be performed with a screen reader turned on') === 'Screen Reader', classifyCheckpoint('2.1.1 - Action cannot be performed with a screen reader turned on'));

    assertStatus('Screen Reader Web valid', runChecks(row({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows using NVDA Assistive Technology', 'NVDA') })), 'S5', 'pass');
    assertStatus('Screen Reader Web missing AT fails', runChecks(row({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows', '') })), 'S5', 'fail');
    record('Screen Reader missing AT message', s5('1.3.1', 'Web', 'Chrome on windows', '').note.includes('Assistive Technology is required'), s5('1.3.1', 'Web', 'Chrome on windows', '').note);
    assertStatus('Screen Reader iOS Mobile Web valid', runChecks(row({ Checkpoint: '1.3.1', Description: typedSections('Mobile Web', 'Safari on iOS mobile using VoiceOver', 'VoiceOver') })), 'S5', 'pass');
    assertStatus('Screen Reader Native iOS valid', runChecks(row({ Checkpoint: '1.3.1', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iOS\nOperating System: iOS 17\nDevice Model: iPhone\nAssistive Technology: VoiceOver\nTest Method: iOS using VoiceOver' })) })), 'S5', 'pass');
    assertStatus('Screen Reader correct AT but wrong method fails', runChecks(row({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows', 'NVDA') })), 'S5', 'fail');
    assertStatus('Screen Reader placeholder AT fails', runChecks(row({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows using NVDA Assistive Technology', 'N/A') })), 'S5', 'fail');

    assertStatus('Color Web valid', runChecks(row({ Checkpoint: '1.4.3', Description: typedSections('Web', 'Chrome on windows using Deque color contrast Analyser', '') })), 'S5', 'pass');
    assertStatus('Color rejects AT', runChecks(row({ Checkpoint: '1.4.3', Description: typedSections('Web', 'Chrome on windows using Deque color contrast Analyser', 'NVDA') })), 'S5', 'fail');
    assertStatus('Visual rejects AT', runChecks(row({ Checkpoint: '1.4.10', Description: typedSections('Web', 'Chrome on windows', 'NVDA') })), 'S5', 'fail');
    assertStatus('Text Spacing Web valid', runChecks(row({ Checkpoint: '1.4.12', Description: typedSections('Web', 'Chrome on windows using Text spacing extension', '') })), 'S5', 'pass');
    assertStatus('Text Spacing iOS Mobile Web valid', runChecks(row({ Checkpoint: '1.4.12', Description: typedSections('iOS Mobile Web', 'Safari on iOS mobile using Text spacing extension', '') })), 'S5', 'pass');
    assertStatus('Keyboard Web valid', runChecks(row({ Checkpoint: '2.4.7', Description: typedSections('Web', 'Chrome on windows using keyboard', '') })), 'S5', 'pass');
    assertStatus('Keyboard rejects AT', runChecks(row({ Checkpoint: '2.4.7', Description: typedSections('Web', 'Chrome on windows using keyboard', 'NVDA') })), 'S5', 'fail');
    const keyboardNvda = s5('2.4.7', 'Web', 'Chrome on windows using NVDA Assistive Technology', '');
    assertStatus('Keyboard rejects NVDA Test Method without AT field', { checks: [keyboardNvda] }, 'S5', 'fail');
    record('Keyboard NVDA message is explicit', keyboardNvda.note.includes('Assistive Technology must not be used in the Test Method'), keyboardNvda.note);
    const realKeyboardRow = row({
      Checkpoint: 'Keyboard Navigation (2.1.1.a)',
      'Assistive technology': 'NVDA',
      Description: typedSections('Web', 'Chrome on Windows using keyboard', ''),
    });
    const realKeyboardResult = runChecks(realKeyboardRow);
    assertStatus('Real Keyboard export row fails S5', realKeyboardResult, 'S5', 'fail');
    record('Real Keyboard export flags CSV AT', (chk(realKeyboardResult, 'S5').note || '').includes('Assistive Technology must not be provided'), chk(realKeyboardResult, 'S5').note);

    assertStatus('Visual Native iOS valid', runChecks(row({ Checkpoint: '2.4.2', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS' })) })), 'S5', 'pass');
    assertStatus('Color Native iOS valid', runChecks(row({ Checkpoint: '1.4.11', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS using Deque color contrast Analyser' })) })), 'S5', 'pass');
    assertStatus('Text Spacing Native iOS unsupported', runChecks(row({ Checkpoint: '1.4.12', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS' })) })), 'S5', 'fail');
    record('unsupported rule message is explicit', s5('1.4.12', 'Web', 'Chrome on windows using Text spacing extension', '').status === 'pass', s5('1.4.12', 'Web', 'Chrome on windows using Text spacing extension', '').note);
    assertStatus('Keyboard Mobile Web unsupported', runChecks(row({ Checkpoint: '2.1.2', Description: typedSections('Mobile Web', 'Safari on iOS mobile', '') })), 'S5', 'fail');
  })();

  // ── 3.3.2 (Labels or Instructions) must not reference Assistive Technology.
  //    Folded into S5 (Context / Test Method) and S6 (Step 1). ────────
  (function () {
    // Clean 3.3.2 issue (no AT in Context or steps) → both S5 and S6 pass
    let s = fullSections();
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Summary: 'Label is missing - Home page (search field)', Description: serialize(s) }));
    assertStatus('3.3.2 clean → S5', r, 'S5', 'pass');
    assertStatus('3.3.2 clean → S6', r, 'S6', 'pass');

    // AT in the Test Method line → S5 fail carrying the 3.3.2 message
    s = fullSections();
    s['Context'] = 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nTest Method: NVDA on Windows';
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 AT in Test Method → S5', r, 'S5', 'fail');
    record('S5 carries the 3.3.2 Context message', (chk(r, 'S5').note || '').includes('Context should not have Assistive Technology'), chk(r, 'S5').note);

    // Assistive Technology line in Context → S5 fail carrying the 3.3.2 message
    s = fullSections();
    s['Context'] = 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nAssistive Technology: NVDA\nTest Method: Chrome on Windows';
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 AT line in Context → S5', r, 'S5', 'fail');
    record('S5 carries the 3.3.2 Context message (AT line)', (chk(r, 'S5').note || '').includes('Context should not have Assistive Technology'), chk(r, 'S5').note);

    // Switch Access reference in the Test Method → S5 fail
    s = fullSections();
    s['Context'] = 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nTest Method: Switch Access navigation';
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 Switch Access in Context → S5', r, 'S5', 'fail');

    // "Turn on screen reader" in Step 1 → S6 fail carrying the 3.3.2 message
    s = fullSections();
    s['Steps to reproduce'] = '1. Turn on the screen reader (NVDA).\n2. Navigate to the field.\n3. Observe the issue.';
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 "turn on screen reader" Step 1 → S6', r, 'S6', 'fail');
    record('S6 carries the 3.3.2 Step message', (chk(r, 'S6').note || '').includes('Step 1 should not start with'), chk(r, 'S6').note);

    // AT enabled in a later step (Enable VoiceOver) → S6 fail
    s = fullSections();
    s['Steps to reproduce'] = '1. Open the above-mentioned URL.\n2. Enable VoiceOver.\n3. Observe the issue.';
    r = runChecks(row({ Checkpoint: '3.3.2', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 AT in a later step → S6', r, 'S6', 'fail');

    // Checkpoint as the full WCAG label + AT step → still detected → S6 fail
    s = fullSections();
    s['Steps to reproduce'] = '1. Enable TalkBack.\n2. Observe.';
    r = runChecks(row({ Checkpoint: 'Labels or Instructions (3.3.2.a)', Method: 'Manual', Description: serialize(s) }));
    assertStatus('3.3.2 from WCAG label + AT step → S6', r, 'S6', 'fail');

    // Scope: a NON-3.3.2 screen-reader issue keeps AT normally — the 3.3.2 rule
    // must NOT fire (no 3.3.2 message in S5 or S6).
    s = fullSections();
    s['Context'] = 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nAssistive Technology: NVDA\nTest Method: NVDA on Windows';
    s['Steps to reproduce'] = '1. Turn on the screen reader (NVDA).\n2. Navigate to the field.\n3. Observe.';
    r = runChecks(row({ Checkpoint: '4.1.2', Method: 'Manual', Summary: 'Button does not have a name - Home page (btn)', Description: serialize(s) }));
    record('non-3.3.2: no 3.3.2 Context message in S5', !((chk(r, 'S5').note || '').includes('Context should not have Assistive Technology')), chk(r, 'S5').note);
    record('non-3.3.2: no 3.3.2 Step message in S6', !((chk(r, 'S6').note || '').includes('Step 1 should not start with')), chk(r, 'S6').note);
  })();

  // ── Regression — every check still produces a result ─────────────
  r = runChecks(row({ Description: serialize(fullSections()) }));
  ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14'].forEach(id => {
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
