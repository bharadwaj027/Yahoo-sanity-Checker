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
  // These fixtures exercise the manual checkpoint-type rules, so they are Manual
  // issues (mrow injects Method: 'Manual'). Automation issues are covered by the
  // dedicated block further below.
  (function () {
    const mrow = over => row(Object.assign({ Method: 'Manual' }, over));
    function typedSections(platform, testMethod, at) {
      const s = fullSections();
      s['Context'] = `Platform: ${platform}\nOperating System: ${platform === 'Mobile Web' ? 'iOS' : 'Windows 11'}\nBrowser: ${platform === 'Mobile Web' ? 'Safari' : 'Chrome 120'}\n${at ? `Assistive Technology: ${at}\n` : ''}Test Method: ${testMethod}`;
      return serialize(s);
    }
    function s5(checkpoint, platform, testMethod, at) {
      return chk(runChecks(mrow({ Checkpoint: checkpoint, Description: typedSections(platform, testMethod, at) })), 'S5');
    }

    record('checkpoint classifier uses Checkpoint, not Test Method', classifyCheckpoint('1.4.10') === 'Visual', classifyCheckpoint('1.4.10'));
    record('checkpoint label with subtype is classified', classifyCheckpoint('Keyboard Navigation (2.1.1.a)') === 'Keyboard', classifyCheckpoint('Keyboard Navigation (2.1.1.a)'));
    record('missing Checkpoint is reported', s5('', 'Web', 'Chrome on windows using keyboard', '').note.includes('Checkpoint is missing'), s5('', 'Web', 'Chrome on windows using keyboard', '').note);
    record('2.1.1 defaults to Keyboard', classifyCheckpoint('2.1.1') === 'Keyboard', classifyCheckpoint('2.1.1'));
    record('2.1.1 exception is Screen Reader', classifyCheckpoint('2.1.1 - Action cannot be performed with a screen reader turned on') === 'Screen Reader', classifyCheckpoint('2.1.1 - Action cannot be performed with a screen reader turned on'));

    assertStatus('Screen Reader Web valid', runChecks(mrow({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows using NVDA Assistive Technology', 'NVDA') })), 'S5', 'pass');
    assertStatus('Screen Reader Web missing AT fails', runChecks(mrow({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows', '') })), 'S5', 'fail');
    record('Screen Reader missing AT message', s5('1.3.1', 'Web', 'Chrome on windows', '').note.includes('Assistive Technology is required'), s5('1.3.1', 'Web', 'Chrome on windows', '').note);
    assertStatus('Screen Reader iOS Mobile Web valid', runChecks(mrow({ Checkpoint: '1.3.1', Description: typedSections('Mobile Web', 'Safari on iPhone using VoiceOver screen reader', 'VoiceOver') })), 'S5', 'pass');
    assertStatus('Screen Reader Native iOS valid', runChecks(mrow({ Checkpoint: '1.3.1', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iOS\nOperating System: iOS 17\nDevice Model: iPhone\nAssistive Technology: VoiceOver\nTest Method: iPhone using VoiceOver screen reader' })) })), 'S5', 'pass');
    assertStatus('Screen Reader correct AT but wrong method fails', runChecks(mrow({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows', 'NVDA') })), 'S5', 'fail');
    assertStatus('Screen Reader placeholder AT fails', runChecks(mrow({ Checkpoint: '1.3.1', Description: typedSections('Web', 'Chrome on windows using NVDA Assistive Technology', 'N/A') })), 'S5', 'fail');

    assertStatus('Color Web valid', runChecks(mrow({ Checkpoint: '1.4.3', Description: typedSections('Web', 'Chrome on windows using Deque color contrast Analyser', '') })), 'S5', 'pass');
    assertStatus('Color rejects AT', runChecks(mrow({ Checkpoint: '1.4.3', Description: typedSections('Web', 'Chrome on windows using Deque color contrast Analyser', 'NVDA') })), 'S5', 'fail');
    assertStatus('Visual rejects AT', runChecks(mrow({ Checkpoint: '1.4.10', Description: typedSections('Web', 'Chrome on windows', 'NVDA') })), 'S5', 'fail');
    assertStatus('Text Spacing Web valid', runChecks(mrow({ Checkpoint: '1.4.12', Description: typedSections('Web', 'Chrome on windows using Text spacing extension', '') })), 'S5', 'pass');
    assertStatus('Text Spacing iOS Mobile Web valid', runChecks(mrow({ Checkpoint: '1.4.12', Description: typedSections('iOS Mobile Web', 'Safari on iOS mobile using Text spacing extension', '') })), 'S5', 'pass');
    assertStatus('Keyboard Web valid', runChecks(mrow({ Checkpoint: '2.4.7', Description: typedSections('Web', 'Chrome on windows using keyboard', '') })), 'S5', 'pass');
    assertStatus('Keyboard rejects AT', runChecks(mrow({ Checkpoint: '2.4.7', Description: typedSections('Web', 'Chrome on windows using keyboard', 'NVDA') })), 'S5', 'fail');
    const keyboardNvda = s5('2.4.7', 'Web', 'Chrome on windows using NVDA Assistive Technology', '');
    assertStatus('Keyboard rejects NVDA Test Method without AT field', { checks: [keyboardNvda] }, 'S5', 'fail');
    record('Keyboard NVDA message is explicit', keyboardNvda.note.includes('Assistive Technology must not be used in the Test Method'), keyboardNvda.note);
    // The CSV "Assistive technology" column is IGNORED (user's rule): a Keyboard
    // export with NVDA only in that column, and a clean Context, must NOT be
    // flagged for AT.
    const csvOnlyAtRow = mrow({
      Checkpoint: 'Keyboard Navigation (2.1.1.a)',
      'Assistive technology': 'NVDA',
      Description: typedSections('Web', 'Chrome on Windows using keyboard', ''),
    });
    const csvOnlyAtResult = runChecks(csvOnlyAtRow);
    assertStatus('CSV AT column is ignored (Keyboard export passes S5)', csvOnlyAtResult, 'S5', 'pass');
    record('CSV AT column raises no AT message', !(chk(csvOnlyAtResult, 'S5').note || '').includes('Assistive Technology must not be provided'), chk(csvOnlyAtResult, 'S5').note);

    assertStatus('Visual Native iOS valid', runChecks(mrow({ Checkpoint: '2.4.2', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS' })) })), 'S5', 'pass');
    assertStatus('Color Native iOS valid', runChecks(mrow({ Checkpoint: '1.4.11', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS using Deque color contrast Analyser' })) })), 'S5', 'pass');
    assertStatus('Text Spacing Native iOS unsupported', runChecks(mrow({ Checkpoint: '1.4.12', Description: serialize(Object.assign({}, nativeSections(), { Context: 'Platform: Native iPhone Mobile App\nOperating System: iOS 17\nDevice Model: iPhone\nTest Method: iOS' })) })), 'S5', 'fail');
    record('unsupported rule message is explicit', s5('1.4.12', 'Web', 'Chrome on windows using Text spacing extension', '').status === 'pass', s5('1.4.12', 'Web', 'Chrome on windows using Text spacing extension', '').note);
    assertStatus('Keyboard Mobile Web unsupported', runChecks(mrow({ Checkpoint: '2.1.2', Description: typedSections('Mobile Web', 'Safari on iOS mobile', '') })), 'S5', 'fail');
  })();

  // ── Android platforms + Automation (spec §8–§14) ─────────────────
  (function () {
    const mrow = over => row(Object.assign({ Method: 'Manual' }, over));

    // Web-like (non-native) Context with the given platform, Test Method and AT.
    function webCtx(platform, testMethod, at) {
      const s = fullSections();
      s['Context'] = `Platform: ${platform}\nOperating System: Android 14\nBrowser: Chrome 120\n${at ? `Assistive Technology: ${at}\n` : ''}Test Method: ${testMethod}`;
      return serialize(s);
    }
    // Native Context (Platform / OS / Device Model / [AT] / Test Method).
    function nativeCtx(platform, testMethod, at) {
      return serialize(Object.assign({}, nativeSections(), {
        Context: `Platform: ${platform}\nOperating System: Android 14\nDevice Model: Pixel Tablet\n${at ? `Assistive Technology: ${at}\n` : ''}Test Method: ${testMethod}`,
      }));
    }
    const amwS5 = (cp, tm, at) => chk(runChecks(mrow({ Checkpoint: cp, Description: webCtx('Android Mobile Web', tm, at) })), 'S5');
    const naS5  = (cp, tm, at) => chk(runChecks(mrow({ Checkpoint: cp, Description: nativeCtx('Native Android', tm, at) })), 'S5');

    // Android Mobile Web (§9 / §13)
    assertStatus('AMW Screen Reader valid', { checks: [amwS5('1.3.1', 'Chrome on Android using Talkback screen reader', 'TalkBack')] }, 'S5', 'pass');
    assertStatus('AMW Screen Reader missing AT fails', { checks: [amwS5('1.3.1', 'Chrome on Android using Talkback screen reader', '')] }, 'S5', 'fail');
    record('AMW SR missing AT message', amwS5('1.3.1', 'Chrome on Android using Talkback screen reader', '').note.includes('Assistive Technology is required'), amwS5('1.3.1', 'Chrome on Android using Talkback screen reader', '').note);
    assertStatus('AMW Color valid', { checks: [amwS5('1.4.3', 'Chrome on Android using Deque color contrast Analyser', '')] }, 'S5', 'pass');
    assertStatus('AMW Color rejects AT', { checks: [amwS5('1.4.3', 'Chrome on Android using Deque color contrast Analyser', 'TalkBack')] }, 'S5', 'fail');
    assertStatus('AMW Visual valid', { checks: [amwS5('2.4.2', 'Chrome on Android', '')] }, 'S5', 'pass');
    assertStatus('AMW Text Spacing valid (bookmarklet)', { checks: [amwS5('1.4.12', 'Chrome on Android using text spacing bookmarklet', '')] }, 'S5', 'pass');
    assertStatus('AMW Text Spacing rejects "extension" wording', { checks: [amwS5('1.4.12', 'Chrome on Android using Text spacing extension', '')] }, 'S5', 'fail');
    assertStatus('AMW Keyboard valid', { checks: [amwS5('2.4.7', 'Chrome on Android using keyboard', '')] }, 'S5', 'pass');
    assertStatus('AMW Keyboard rejects AT', { checks: [amwS5('2.4.7', 'Chrome on Android using keyboard', 'TalkBack')] }, 'S5', 'fail');
    // Existing CSV platform value that means Android mobile web is NOT one of ours,
    // but the verbatim spec name resolves; a wrong Test Method is flagged clearly.
    record('AMW wrong Test Method names Android Mobile Web', amwS5('1.4.3', 'Chrome on windows using Deque color contrast Analyser', '').note.includes('Android Mobile Web'), amwS5('1.4.3', 'Chrome on windows using Deque color contrast Analyser', '').note);

    // Native Android (§10 / §13)
    assertStatus('Native Android Screen Reader valid', { checks: [naS5('1.3.1', 'Android using Talkback screen reader', 'TalkBack')] }, 'S5', 'pass');
    assertStatus('Native Android Screen Reader missing AT fails', { checks: [naS5('1.3.1', 'Android using Talkback screen reader', '')] }, 'S5', 'fail');
    assertStatus('Native Android Color valid', { checks: [naS5('1.4.3', 'Android using Deque color contrast Analyser', '')] }, 'S5', 'pass');
    assertStatus('Native Android Color rejects AT', { checks: [naS5('1.4.3', 'Android using Deque color contrast Analyser', 'TalkBack')] }, 'S5', 'fail');
    assertStatus('Native Android Visual valid', { checks: [naS5('2.4.2', 'Android', '')] }, 'S5', 'pass');
    assertStatus('Native Android Text Spacing unsupported', { checks: [naS5('1.4.12', 'Android', '')] }, 'S5', 'fail');
    record('Native Android Text Spacing unsupported message', naS5('1.4.12', 'Android', '').note.includes('No Test Method rule is currently defined for Text Spacing checkpoints on Native Android'), naS5('1.4.12', 'Android', '').note);
    assertStatus('Native Android Keyboard unsupported', { checks: [naS5('2.4.7', 'Android', '')] }, 'S5', 'fail');
    record('Native Android Keyboard unsupported message', naS5('2.4.7', 'Android', '').note.includes('No Test Method rule is currently defined for Keyboard checkpoints on Native Android'), naS5('2.4.7', 'Android', '').note);
    // Existing CSV platform value "Native Android Tablet App" also maps to Native Android.
    assertStatus('Native Android via "Native Android Tablet App" value', { checks: [chk(runChecks(mrow({ Checkpoint: '1.3.1', Description: nativeCtx('Native Android Tablet App', 'Android using Talkback screen reader', 'TalkBack') })), 'S5')] }, 'S5', 'pass');

    // Automation (§8F / §12) — identified first, independent of checkpoint type.
    function autoRow(testMethod, over) {
      const s = fullSections();
      s['Context'] = `Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nTest Method: ${testMethod}`;
      return runChecks(row(Object.assign({ Method: 'Automated', Checkpoint: '4.1.2', Description: serialize(s) }, over || {})));
    }
    assertStatus('Automation correct Test Method', autoRow('Chrome on Windows using axe DevTools Chrome browser extension'), 'S5', 'pass');
    assertStatus('Automation wrong Test Method (NVDA) fails', autoRow('Chrome on Windows using NVDA Assistive Technology'), 'S5', 'fail');
    record('Automation wrong Test Method message', (chk(autoRow('Chrome on Windows using NVDA Assistive Technology'), 'S5').note || '').includes('Invalid Test Method for Automation issue'), chk(autoRow('Chrome on Windows using NVDA Assistive Technology'), 'S5').note);
    // Automation issue is NOT validated as a Screen Reader checkpoint (no "AT required")
    record('Automation not treated as Screen Reader checkpoint', !(chk(autoRow('Chrome on Windows using axe DevTools Chrome browser extension'), 'S5').note || '').includes('Assistive Technology is required'), chk(autoRow('Chrome on Windows using axe DevTools Chrome browser extension'), 'S5').note);
    // Automation with an Assistive Technology line in the Context TEXT → fail
    (function () {
      const s = fullSections();
      s['Context'] = 'Platform: Web\nOperating System: Windows 11\nBrowser: Chrome 120\nAssistive Technology: NVDA\nTest Method: Chrome on Windows using axe DevTools Chrome browser extension';
      const c = chk(runChecks(row({ Method: 'Automated', Checkpoint: '4.1.2', Description: serialize(s) })), 'S5');
      assertStatus('Automation with AT line in Context fails', { checks: [c] }, 'S5', 'fail');
      record('Automation AT-not-allowed message', (c.note || '').includes('must not be provided in the Context for an Automation issue'), c.note);
    })();
    // Automation with AT ONLY in the ignored CSV column → passes (column not consulted)
    assertStatus('Automation with AT only in CSV column passes', autoRow('Chrome on Windows using axe DevTools Chrome browser extension', { 'Assistive technology': 'NVDA' }), 'S5', 'pass');
    // "Automation" spelling of the Method column is honoured too
    assertStatus('Automation ("Automation" spelling) wrong Test Method fails', autoRow('Chrome on Windows using NVDA Assistive Technology', { Method: 'Automation' }), 'S5', 'fail');

    // Case-insensitive Test Method: "Chrome on Windows" (capital W) == matrix "Chrome on windows"
    assertStatus('Visual Web accepts capitalised "Chrome on Windows"', runChecks(mrow({ Checkpoint: '2.4.2', Description: webCtx('Web', 'Chrome on Windows', '') })), 'S5', 'pass');
    assertStatus('Keyboard Web accepts spacing/case variance', runChecks(mrow({ Checkpoint: '2.4.7', Description: webCtx('Web', '  Chrome   on   WINDOWS   using keyboard ', '') })), 'S5', 'pass');
    // Genuinely different wording is still caught
    assertStatus('Visual Web still rejects wrong wording', runChecks(mrow({ Checkpoint: '2.4.2', Description: webCtx('Web', 'Chrome on macOS', '') })), 'S5', 'fail');

    // "Desktop Web" is an accepted alias of Web
    assertStatus('Desktop Web alias resolves to Web (Visual)', runChecks(mrow({ Checkpoint: '2.4.2', Description: webCtx('Desktop Web', 'Chrome on windows', '') })), 'S5', 'pass');

    // Combined platform, EVERY platform must be covered (user's choice). This is
    // the real dual-platform shape: comma-separated fields, one entry per platform.
    const dualCtx = (tm) => serialize(Object.assign({}, fullSections(), {
      Context: `Platform: Desktop Web, iOS Mobile Web\nOperating System: Windows (Version: 11), iOS (Version: 17)\nBrowser: Chrome (Version: 120), Safari\nAssistive Technology: NVDA (Version: 2024), VoiceOver\nTest Method: ${tm}`,
    }));
    // Full canonical wording (with suffixes) for both platforms → pass.
    assertStatus('Combined SR: both platforms covered (full wording)', runChecks(mrow({ Checkpoint: '1.3.1', Description: dualCtx('Chrome on Windows using NVDA Assistive Technology, Safari on iPhone using VoiceOver screen reader') })), 'S5', 'pass');
    // Order-independent: reversed entries still cover both platforms → pass.
    assertStatus('Combined SR: reversed entry order still passes', runChecks(mrow({ Checkpoint: '1.3.1', Description: dualCtx('Safari on iPhone using VoiceOver screen reader, Chrome on Windows using NVDA Assistive Technology') })), 'S5', 'pass');
    // The user's earlier no-suffix wording → now fails with SPECIFIC per-tool errors.
    (function () {
      const c = chk(runChecks(mrow({ Checkpoint: '1.3.1', Description: dualCtx('Chrome on Windows using NVDA, Safari on iPhone using VoiceOver') })), 'S5');
      assertStatus('Combined SR: missing suffixes fails', { checks: [c] }, 'S5', 'fail');
      record('Combined SR: names "Assistive Technology is missing after NVDA"', (c.note || '').includes('Assistive Technology is missing after NVDA'), c.note);
      record('Combined SR: names "Screen reader is missing after VoiceOver"', (c.note || '').includes('Screen reader is missing after VoiceOver'), c.note);
    })();
    // Only one platform's method given → fail, names the uncovered platform.
    (function () {
      const c = chk(runChecks(mrow({ Checkpoint: '1.3.1', Description: dualCtx('Chrome on Windows using NVDA Assistive Technology') })), 'S5');
      assertStatus('Combined SR: missing iOS Mobile Web entry fails', { checks: [c] }, 'S5', 'fail');
      record('Combined SR failure names the uncovered platform', (c.note || '').includes('iOS Mobile Web'), c.note);
    })();
    // Both entries present but one names the wrong tool → fail.
    assertStatus('Combined SR: wrong tool for one platform fails', runChecks(mrow({ Checkpoint: '1.3.1', Description: dualCtx('Chrome on Windows using NVDA Assistive Technology, Safari on iPhone using TalkBack screen reader') })), 'S5', 'fail');
    record('matrixPlatformsFor splits a combined value', typeof matrixPlatformsFor === 'function' && matrixPlatformsFor('Desktop Web, iOS Mobile Web').join('|') === 'Web|iOS Mobile Web', typeof matrixPlatformsFor === 'function' ? matrixPlatformsFor('Desktop Web, iOS Mobile Web').join('|') : 'no fn');

    // Screen-Reader suffix rule: the trailing wording is required; when it is the
    // ONLY thing missing, the tool gives a specific "<suffix> is missing after
    // <tool>" error (single-platform issues).
    const srSuffix = (cp, plat, tm, at) => chk(runChecks(mrow({ Checkpoint: cp, Description: (plat === 'Native iOS' || plat === 'Native Android')
      ? serialize(Object.assign({}, nativeSections(), { Context: `Platform: ${plat}\nOperating System: OS\nDevice Model: Device\nAssistive Technology: ${at}\nTest Method: ${tm}` }))
      : (function(){ const s = fullSections(); s['Context'] = `Platform: ${plat}\nOperating System: OS\nBrowser: Browser\nAssistive Technology: ${at}\nTest Method: ${tm}`; return serialize(s); })() })), 'S5');
    (function () {
      const c = srSuffix('1.3.1', 'Web', 'Chrome on Windows using NVDA', 'NVDA');
      assertStatus('Web SR missing suffix fails', { checks: [c] }, 'S5', 'fail');
      record('Web SR missing-suffix message', (c.note || '').includes('Assistive Technology is missing after NVDA'), c.note);
    })();
    (function () {
      const c = srSuffix('1.3.1', 'Native iOS', 'iPhone using VoiceOver', 'VoiceOver');
      record('iOS SR missing-suffix message', (c.note || '').includes('Screen reader is missing after VoiceOver'), c.note);
    })();
    (function () {
      const c = srSuffix('1.3.1', 'Native Android', 'Android using TalkBack', 'TalkBack');
      record('Android SR missing-suffix message', (c.note || '').includes('Screen reader is missing after TalkBack'), c.note);
    })();
    // Full suffix present → no missing-suffix error, S5 passes.
    record('Web SR with suffix passes', srSuffix('1.3.1', 'Web', 'Chrome on Windows using NVDA Assistive Technology', 'NVDA').status === 'pass', srSuffix('1.3.1', 'Web', 'Chrome on Windows using NVDA Assistive Technology', 'NVDA').note);

    // Tolerant matcher unit checks (classifyTestMethodEntry / testMethodMatches)
    if (typeof classifyTestMethodEntry === 'function') {
      record('classify: Web SR full → ok', classifyTestMethodEntry('Chrome on Windows using NVDA Assistive Technology', 'Screen Reader', 'Web').code === 'ok', '');
      record('classify: Web SR no suffix → missing-suffix', classifyTestMethodEntry('Chrome on Windows using NVDA', 'Screen Reader', 'Web').code === 'missing-suffix', '');
      record('classify: iOS MW SR full (iPhone) → ok', classifyTestMethodEntry('Safari on iPhone using VoiceOver screen reader', 'Screen Reader', 'iOS Mobile Web').code === 'ok', '');
      record('classify: iOS MW SR no suffix → missing-suffix', classifyTestMethodEntry('Safari on iPhone using VoiceOver', 'Screen Reader', 'iOS Mobile Web').code === 'missing-suffix', '');
      record('classify: Web SR without NVDA → no', classifyTestMethodEntry('Chrome on Windows', 'Screen Reader', 'Web').code === 'no', '');
      record('classify: wrong tool (TalkBack on iOS) → no', classifyTestMethodEntry('Safari on iPhone using TalkBack screen reader', 'Screen Reader', 'iOS Mobile Web').code === 'no', '');
      record('classify: Native iOS full → ok', classifyTestMethodEntry('iPhone using VoiceOver screen reader', 'Screen Reader', 'Native iOS').code === 'ok', '');
      record('classify: Native iOS SR needs no Safari (iOS MW rejects)', classifyTestMethodEntry('iPhone using VoiceOver screen reader', 'Screen Reader', 'iOS Mobile Web').code === 'no', '');
      record('classify: Visual rejects a named tool', testMethodMatches('Chrome on windows using NVDA', 'Visual', 'Web') === false, '');
      record('classify: Visual accepts environment only', testMethodMatches('Chrome on Windows', 'Visual', 'Web') === true, '');
      record('classify: AMW text spacing bookmarklet ok', testMethodMatches('Chrome on Android using text spacing bookmarklet', 'Text Spacing', 'Android Mobile Web') === true, '');
      record('classify: AMW text spacing extension rejected', testMethodMatches('Chrome on Android using text spacing extension', 'Text Spacing', 'Android Mobile Web') === false, '');
    }

    // Exact wording + capitalisation of every required Test Method (spec §11 / §14)
    const M = (typeof TEST_METHOD_MATRIX !== 'undefined') ? TEST_METHOD_MATRIX : null;
    record('matrix present', !!M, 'TEST_METHOD_MATRIX global');
    if (M) {
      const eq = (p, t, v) => record(`matrix wording ${p} / ${t}`, M[p] && M[p][t] === v, `${p}/${t} = ${M[p] && M[p][t]}`);
      eq('Web', 'Screen Reader', 'Chrome on Windows using NVDA Assistive Technology');
      eq('Web', 'Color', 'Chrome on windows using Deque color contrast Analyser');
      eq('Web', 'Visual', 'Chrome on windows');
      eq('Web', 'Text Spacing', 'Chrome on windows using Text spacing extension');
      eq('Web', 'Keyboard', 'Chrome on windows using keyboard');
      eq('iOS Mobile Web', 'Screen Reader', 'Safari on iPhone using VoiceOver screen reader');
      eq('iOS Mobile Web', 'Color', 'Safari on iOS mobile using Deque color contrast Analyser');
      eq('iOS Mobile Web', 'Visual', 'Safari on iOS mobile');
      eq('iOS Mobile Web', 'Text Spacing', 'Safari on iOS mobile using Text spacing extension');
      eq('Native iOS', 'Screen Reader', 'iPhone using VoiceOver screen reader');
      eq('Native iOS', 'Color', 'iOS using Deque color contrast Analyser');
      eq('Native iOS', 'Visual', 'iOS');
      eq('Android Mobile Web', 'Screen Reader', 'Chrome on Android using TalkBack screen reader');
      eq('Android Mobile Web', 'Color', 'Chrome on Android using Deque color contrast Analyser');
      eq('Android Mobile Web', 'Visual', 'Chrome on Android');
      eq('Android Mobile Web', 'Text Spacing', 'Chrome on Android using text spacing bookmarklet');
      eq('Android Mobile Web', 'Keyboard', 'Chrome on Android using keyboard');
      eq('Native Android', 'Screen Reader', 'Android using TalkBack screen reader');
      eq('Native Android', 'Color', 'Android using Deque color contrast Analyser');
      eq('Native Android', 'Visual', 'Android');
      record('iOS Mobile Web Keyboard unsupported (null)', M['iOS Mobile Web'] && M['iOS Mobile Web']['Keyboard'] === null, String(M['iOS Mobile Web'] && M['iOS Mobile Web']['Keyboard']));
      record('Native iOS Text Spacing unsupported (null)', M['Native iOS'] && M['Native iOS']['Text Spacing'] === null, String(M['Native iOS'] && M['Native iOS']['Text Spacing']));
      record('Native Android Text Spacing unsupported (null)', M['Native Android'] && M['Native Android']['Text Spacing'] === null, String(M['Native Android'] && M['Native Android']['Text Spacing']));
      record('Native Android Keyboard unsupported (null)', M['Native Android'] && M['Native Android']['Keyboard'] === null, String(M['Native Android'] && M['Native Android']['Keyboard']));
    }
    if (typeof AUTOMATION_TEST_METHOD !== 'undefined') {
      record('automation Test Method wording', AUTOMATION_TEST_METHOD === 'Chrome on Windows using axe DevTools Chrome browser extension', AUTOMATION_TEST_METHOD);
    }
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

  // ── Checkpoint classification matches the authoritative list ─────
  // Guards checkpoint-classification.md against CHECKPOINT_TYPES / classifyCheckpoint.
  (function () {
    const AUTHORITATIVE = {
      'Screen Reader': ['1.1.1', '1.3.1', '2.4.4', '2.4.6', '2.5.3', '3.1.1', '3.3.2.b', '4.1.2', '4.1.3'],
      'Visual': ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.3.3', '1.3.4', '1.3.5', '1.4.2', '1.4.4', '1.4.5', '1.4.10', '1.4.13', '2.2.1', '2.2.2', '2.3.1', '2.4.2', '2.4.5', '2.5.1', '2.5.2', '2.5.4', '2.5.7', '2.5.8', '3.1.2', '3.2.6', '3.3.2.a', '3.3.2.c', '3.3.3', '3.3.4', '3.3.7', '3.3.8'],
      'Color': ['1.4.1', '1.4.3', '1.4.11'],
      'Text Spacing': ['1.4.12'],
      'Keyboard': ['2.1.1', '2.1.2', '2.1.4', '2.4.1', '2.4.3', '2.4.7', '2.4.11', '3.2.1', '3.2.2'],
    };
    if (typeof CHECKPOINT_TYPES !== 'undefined') {
      Object.keys(AUTHORITATIVE).forEach(type => {
        record(`CHECKPOINT_TYPES matches doc: ${type}`,
          (CHECKPOINT_TYPES[type] || []).join(',') === AUTHORITATIVE[type].join(','),
          `code=${(CHECKPOINT_TYPES[type] || []).join(',')}`);
      });
    }
    // classifyCheckpoint resolves every listed id to its type (3.3.2 exception:
    // classify a bare "3.3.2.x" sub-id directly).
    Object.keys(AUTHORITATIVE).forEach(type => {
      AUTHORITATIVE[type].forEach(cp => {
        record(`classify ${cp} → ${type}`, classifyCheckpoint(cp) === type, `got ${classifyCheckpoint(cp)}`);
      });
    });
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
