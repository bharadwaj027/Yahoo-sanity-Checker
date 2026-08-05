/* checks.js
 * Implements the Yahoo Mail Plus JIRA sanity-check logic (Web + Native platforms:
 * Android Tablet, Android Mobile, iPad, iPhone) as defined in the yahoo-mail-sanity skill.
 */

const PLATFORM_MAP = {
  'web': 'Web',
  'native android tablet app': 'Android Tablet',
  'native android mobile app': 'Android Mobile',
  'native ipad tablet app': 'iPad',
  'native iphone mobile app': 'iPhone',
};

const PLACEHOLDER_PATTERNS = [
  /\(or specify version\)/i,
  /\(e\.g\.,?[^)]*\)/i,
  /specify version/i,
  /specify modal/i,
  /\btbd\b/i,
];

function normalizePlatform(rawPlatform) {
  if (!rawPlatform) return null;
  const key = rawPlatform.trim().toLowerCase();
  return PLATFORM_MAP[key] || rawPlatform.trim();
}

function isNative(platform) {
  return ['Android Tablet', 'Android Mobile', 'iPad', 'iPhone'].includes(platform);
}

function extractField(desc, label) {
  // label is a regex source string, e.g. 'Platform:' — captures rest of the line
  const re = new RegExp(label + '\\s*(.*)', 'i');
  const m = desc.match(re);
  return m ? m[1].trim() : null;
}

function extractBlock(desc, startLabel, endLabels) {
  const endAlt = endLabels.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const re = new RegExp(startLabel + '\\s*([\\s\\S]*?)(?:\\n\\s*\\n|' + endAlt + ')', 'i');
  const m = desc.match(re);
  return m ? m[1].trim() : null;
}

function hasPlaceholder(text) {
  if (!text) return false;
  return PLACEHOLDER_PATTERNS.some(p => p.test(text));
}

function getStepsList(desc) {
  const block = extractBlock(desc, 'Steps to reproduce:', ['Expected results:', 'Expected Results:']);
  if (!block) return [];
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  const steps = [];
  lines.forEach(line => {
    const m = line.match(/^(\d+)\.\s*(.*)$/);
    if (m) steps.push({ num: parseInt(m[1], 10), text: m[2].trim() });
  });
  return steps;
}

function determineIssueType(testMethod, platform) {
  if (!testMethod) return 'Unknown';
  const tm = testMethod.toLowerCase();

  // Screen-reader indicators apply on any platform (NVDA / VoiceOver / TalkBack,
  // or the generic "screen reader" / "assistive technology" wording). Checked
  // first so a screen-reader issue is classified correctly even when the
  // Platform line is missing or not recognised as Web.
  if (tm.includes('nvda') || tm.includes('voiceover') || tm.includes('talkback') ||
      tm.includes('screen reader') || tm.includes('assistive technology')) return 'Screen Reader';

  if (platform === 'Web') {
    if (tm.includes('keyboard')) return 'Keyboard';
    return 'Other';
  }

  // Native platforms
  if (tm.includes('voice control')) return 'Voice Control';
  if (tm.includes('switch access')) return 'Switch Access';
  if (tm.includes('color contrast') || tm.includes('analyser') || tm.includes('analyzer')) return 'Color Contrast Tool';
  return 'Device-only';
}

function runChecks(row) {
  const desc = String(row.Description || '');
  const summary = String(row.Summary || '');
  const testUnit = String(row['Test Unit'] || '').trim();
  const method = String(row.Method || '').trim();
  const attachments = String(row.Attachments || '').trim();
  const url = String(row.URL || '').trim();

  const rawPlatform = extractField(desc, 'Platform:');
  const platform = normalizePlatform(rawPlatform);
  const native = isNative(platform);

  const authState = extractField(desc, 'Authentication State:');
  const osVal = extractField(desc, 'Operating System:');
  const deviceModel = extractField(desc, 'Device [Mm]odel:');
  const browserVal = extractField(desc, 'Browser:');
  const atVal = extractField(desc, 'Assistive Technology:');
  // Test Method belongs to the Context section (its last line). Read it from
  // there only, so a stray "Test Method:" in Environment can't stand in for a
  // missing Context one, and classification scans the whole Context block.
  const contextText = extractBlock(desc, 'Context:', ['Steps to reproduce:', 'Steps to Reproduce:']) || '';
  const testMethod = extractField(contextText, 'Test Method:');
  const screenName = extractField(desc, 'Screen Name:');
  const platformUrl = extractField(desc, 'Platform URL:');
  const appVersion = extractField(desc, '[A-Za-z]*\\s*[Aa]pp [Vv]ersion tested:');
  const resourceLinkLine = extractField(desc, '(?:Resource [Ll]ink|References):');
  const resourceLinkLabelWrong = /References:/.test(desc) && !/Resource [Ll]ink:/i.test(desc);

  const steps = getStepsList(desc);
  const step1 = steps.find(s => s.num === 1);
  // Classify from the Test Method descriptor: the labelled line if present, else
  // the last unlabelled Context line (the descriptor missing its label). Field
  // lines like "Assistive Technology:" are metadata, not the descriptor.
  const tmDescriptor = testMethod || contextText.split('\n').map(l => l.trim())
    .filter(Boolean).reverse().find(l => !/^[A-Za-z][A-Za-z ]{1,40}?\s*:/.test(l)) || '';
  let issueType = determineIssueType(tmDescriptor, platform);
  // Fallback: the Test Method didn't name a type, but the Assistive Technology
  // line names a screen reader → treat it as a screen-reader issue. (S5 still
  // flags the missing / non-screen-reader Test Method line separately.)
  if ((issueType === 'Unknown' || issueType === 'Other' || issueType === 'Device-only') &&
      /nvda|voiceover|talkback|jaws|narrator|screen reader/i.test(atVal || '')) {
    issueType = 'Screen Reader';
  }

  // A Web Summary may start with a platform tag declaring which environment(s)
  // were tested — e.g. "Windows - ", "MAC - ", "MAC & Windows - ", "[MAC] ".
  // The tag may name the OS (Windows / MAC), the browser (Chrome / Safari), or
  // the screen reader (NVDA / VoiceOver). Chrome & NVDA imply the Windows
  // environment; Safari & VoiceOver imply the macOS environment. The Context
  // must then match whatever the prefix declares.
  const prefixMatch = String(summary).match(
    /^\s*[\[(]?\s*((?:mac(?:\s?os)?|windows|win|chrome|nvda|safari|voice\s?over)(?:\s*(?:&|\/|\+|,|and|\s)\s*(?:mac(?:\s?os)?|windows|win|chrome|nvda|safari|voice\s?over))*)\s*[\])]?\s*[-–:|]/i
  );
  const platformTag = prefixMatch ? prefixMatch[1].toLowerCase() : '';
  const wantWin = /win|chrome|nvda/.test(platformTag);
  const wantMac = /mac|safari|voice\s?over/.test(platformTag);

  const checks = [];

  // 1. Summary Format
  (function () {
    const hasDash = summary.includes(' - ');
    const pageNameMatch = testUnit && summary.toLowerCase().includes(testUnit.toLowerCase());
    const hasElement = /\([^)]*\)/.test(summary);
    if (!hasDash) {
      checks.push({ id: 'S1', name: 'Summary format', status: 'fail', note: 'Page name is missing in the summary (there should be a " - " between the issue and the page name).' });
    } else if (!pageNameMatch) {
      checks.push({ id: 'S1', name: 'Summary format', status: 'fail', note: `The page name in the summary does not match the test unit "${testUnit}".` });
    } else if (!hasElement) {
      checks.push({ id: 'S1', name: 'Summary format', status: 'fail', note: 'The element name (in brackets) is missing from the summary.' });
    } else {
      checks.push({ id: 'S1', name: 'Summary format', status: 'pass', note: 'The summary has the issue, the page name, and the element name.' });
    }
  })();

  // 2. Attachment Present
  (function () {
    if (!attachments) {
      checks.push({ id: 'S2', name: 'Attachment present', status: 'fail', note: 'No attachment or screenshot has been added to this issue.' });
    } else {
      checks.push({ id: 'S2', name: 'Attachment present', status: 'pass', note: 'An attachment is present.' });
    }
  })();

  // 3. Platform URL (Web) / App Version completeness (Native)
  (function () {
    if (!native) {
      if (!platformUrl) {
        checks.push({ id: 'S3', name: 'Platform URL', status: 'fail', note: 'The Platform URL is missing from the Environment section.' });
        return;
      }
      const norm = u => u.replace(/^https?:\/\//, '').replace(/\/+$/, '').split('?')[0].toLowerCase();
      const normHasScheme = /^https:\/\//.test(platformUrl) ? 'https' : (/^http:\/\//.test(platformUrl) ? 'http' : null);
      const urlScheme = /^https:\/\//.test(url) ? 'https' : (/^http:\/\//.test(url) ? 'http' : null);
      if (url && norm(platformUrl) !== norm(url)) {
        checks.push({ id: 'S3', name: 'Platform URL', status: 'fail', note: `The Platform URL does not match the test unit's URL. Written: "${platformUrl}", expected: "${url}".` });
      } else if (url && normHasScheme && urlScheme && normHasScheme !== urlScheme) {
        checks.push({ id: 'S3', name: 'Platform URL', status: 'fail', note: 'The Platform URL uses a different protocol (http vs https) than the test unit\'s URL.' });
      } else {
        checks.push({ id: 'S3', name: 'Platform URL', status: 'pass', note: 'The Platform URL matches the test unit.' });
      }
    } else {
      if (!appVersion) {
        checks.push({ id: 'S3', name: 'App version', status: 'fail', note: 'The app version tested is missing from the Environment section.' });
      } else if (hasPlaceholder(appVersion)) {
        checks.push({ id: 'S3', name: 'App version', status: 'fail', note: `The app version still has placeholder text and was not filled in: "${appVersion}".` });
      } else {
        checks.push({ id: 'S3', name: 'App version', status: 'pass', note: `The app version tested is filled in: ${appVersion}.` });
      }
    }
  })();

  // 4. Authentication State
  (function () {
    if (!authState || !/^logged (in|out)$/i.test(authState)) {
      checks.push({ id: 'S4', name: 'Authentication state', status: 'fail', note: `The Authentication State should be "Logged In" or "Logged Out". Written: "${authState || '(missing)'}".` });
    } else {
      checks.push({ id: 'S4', name: 'Authentication state', status: 'pass', note: `The Authentication State is set to ${authState}.` });
    }
  })();

  // 5. Context — Structure (+ 5a placeholder detection)
  (function () {
    const issues = [];
    if (!rawPlatform) issues.push('The Platform line is missing.');
    if (!osVal) issues.push('The Operating System line is missing.');

    if (!native) {
      if (!browserVal) issues.push('The Browser line is missing (it is needed for Web).');
    } else {
      if (!deviceModel) issues.push('The Device Model line is missing (it is needed for app testing).');
    }

    if (issueType === 'Screen Reader') {
      if (!atVal) {
        issues.push('This is a screen reader issue but the Assistive Technology line is missing.');
      } else if (native) {
        const expectedAT = (platform === 'Android Tablet' || platform === 'Android Mobile') ? 'talkback' : 'voiceover';
        if (!atVal.toLowerCase().includes(expectedAT)) {
          issues.push(`The Assistive Technology "${atVal}" is not the one expected for this platform (${expectedAT}).`);
        }
      }
      // Web screen-reader AT expectations are handled by the platform-tag block below.
    }

    if (!testMethod) issues.push('The Context section does not end with a "Test Method:" line.');

    // Web: the Summary prefix declares which environment(s) were tested, and the
    // Context must match — Windows→Windows/Chrome, MAC→macOS/Safari, both→both.
    if (!native) {
      const osl = (osVal || '').toLowerCase();
      const bl  = (browserVal || '').toLowerCase();
      const tml = (testMethod || '').toLowerCase();
      const atl = (atVal || '').toLowerCase();
      const envText = osl + ' ' + tml;
      const ctxHasMac = /mac\s?os|macos/.test(envText) || bl.includes('safari');
      const ctxHasWin = /\bwindows\b/.test(envText) || bl.includes('chrome');
      const sr = issueType === 'Screen Reader' && !!atVal;

      if (wantWin && wantMac) {
        if (!ctxHasWin) issues.push('The Summary prefix includes Windows, so the Context should include the Windows/Chrome environment details.');
        if (!ctxHasMac) issues.push('The Summary prefix includes MAC, so the Context should include the macOS/Safari environment details.');
        if (sr && !atl.includes('nvda')) issues.push('The Summary prefix includes Windows, so the Assistive Technology line should list NVDA.');
        if (sr && !atl.includes('voiceover')) issues.push('The Summary prefix includes MAC, so the Assistive Technology line should list VoiceOver.');
      } else if (wantWin) {
        if (!ctxHasWin) issues.push('The Summary prefix says Windows, so the Context should include the Windows/Chrome environment details.');
        if (ctxHasMac) issues.push('The Summary prefix says Windows only, but the Context includes macOS/Safari details. Remove them, or add MAC to the prefix.');
        if (sr && atl.includes('voiceover')) issues.push('The Summary prefix says Windows only, but the Assistive Technology line lists VoiceOver (a macOS screen reader).');
      } else if (wantMac) {
        if (!ctxHasMac) issues.push('The Summary prefix says MAC, so the Context should include the macOS/Safari environment details.');
        if (ctxHasWin) issues.push('The Summary prefix says MAC only, but the Context includes Windows/Chrome details. Remove them, or add Windows to the prefix.');
        if (sr && atl.includes('nvda')) issues.push('The Summary prefix says MAC only, but the Assistive Technology line lists NVDA (a Windows screen reader).');
      } else if (ctxHasMac && ctxHasWin) {
        issues.push('The Context includes both a Windows/Chrome and a macOS/Safari environment. Add a platform prefix ("Windows", "MAC", or "MAC & Windows") to the Summary, or keep only the environment that was tested.');
      }
    }

    // Only the fields listed for this platform may appear in Environment / Context;
    // flag any others. (Missing required fields are flagged by the checks above.)
    {
      const unexpected = (block, isAllowed) => (block || '').split('\n').reduce((out, line) => {
        const m = line.match(/^\s*([A-Za-z][A-Za-z /]{1,40}?)\s*:/);
        if (m) { const lbl = m[1].trim().toLowerCase().replace(/\s+/g, ' '); if (!isAllowed(lbl)) out.push(m[1].trim()); }
        return out;
      }, []);
      const envBlock = extractBlock(desc, 'Environment:', ['Context:']) || '';
      const srOk = issueType === 'Screen Reader';
      let envAllowed, ctxAllowed, envList, ctxList;
      if (!native) {
        envAllowed = l => ['platform url', 'authentication state'].includes(l);
        ctxAllowed = l => ['platform', 'operating system', 'browser', 'test method'].includes(l) || (srOk && l === 'assistive technology');
        envList = 'Platform URL and Authentication State';
        ctxList = `Platform, Operating System, Browser, Test Method${srOk ? ', and Assistive Technology' : ''}`;
      } else {
        envAllowed = l => l.includes('app version') || l === 'authentication state';
        ctxAllowed = l => ['platform', 'operating system', 'device model', 'assistive technology', 'test method'].includes(l);
        envList = 'the app version tested and Authentication State';
        ctxList = 'Platform, Operating System, Device Model, Assistive Technology, and Test Method';
      }
      unexpected(envBlock, envAllowed).forEach(f =>
        issues.push(`The Environment section has an unexpected field "${f}" — only ${envList} belong here.`));
      unexpected(contextText, ctxAllowed).forEach(f =>
        issues.push(`The Context section has an unexpected field "${f}" — only ${ctxList} belong here.`));
    }

    [
      ['The app version', appVersion], ['The Operating System', osVal], ['The Device Model', deviceModel],
    ].forEach(([label, val]) => {
      if (hasPlaceholder(val)) issues.push(`${label} still has placeholder text: "${val}".`);
    });

    if (issues.length) {
      checks.push({ id: 'S5', name: 'Context structure', status: 'fail', note: issues.join(' '), notes: issues });
    } else {
      checks.push({ id: 'S5', name: 'Context structure', status: 'pass', note: 'The Context has all the required lines.' });
    }
  })();

  // 6. Issue Type + Step 1 consistency
  (function () {
    if (!step1) {
      checks.push({ id: 'S6', name: `Issue type + Step 1 (${issueType})`, status: 'fail', note: 'Step 1 is missing from the Steps to Reproduce.' });
      return;
    }
    const t1 = step1.text.toLowerCase();
    const mentionsScreenReaderTurnOn = /turn on (the )?screen reader|turn on nvda|turn on voiceover|turn on talkback/.test(t1);
    const mentionsVoiceControl = /voice control/.test(t1);
    const mentionsSwitchAccess = /switch access/.test(t1);
    const mentionsAnyAT = mentionsScreenReaderTurnOn || mentionsVoiceControl || mentionsSwitchAccess;
    const mentionsUrl = /\burl\b/.test(t1);

    let ok = true, note = '';
    const got = step1.text ? `It currently says: "${step1.text.slice(0, 90)}".` : '';
    if (issueType === 'Screen Reader') {
      ok = mentionsScreenReaderTurnOn;
      note = ok ? 'Step 1 turns on the screen reader, which matches this issue type.' : `Step 1 should turn on the screen reader. ${got}`.trim();
    } else if (issueType === 'Voice Control') {
      ok = mentionsVoiceControl;
      note = ok ? 'Step 1 turns on Voice Control, which matches this issue type.' : `Step 1 should turn on Voice Control. ${got}`.trim();
    } else if (issueType === 'Switch Access') {
      ok = mentionsSwitchAccess;
      note = ok ? 'Step 1 turns on Switch Access, which matches this issue type.' : `Step 1 should turn on Switch Access. ${got}`.trim();
    } else if (issueType === 'Keyboard' || issueType === 'Device-only' || issueType === 'Color Contrast Tool' || issueType === 'Other') {
      ok = !mentionsAnyAT;
      note = ok ? 'Step 1 does not turn on a screen reader or tool, which matches this issue type.' : `Step 1 should not turn on a screen reader or tool for a ${issueType} issue. ${got}`.trim();
    } else {
      ok = true;
      note = 'The issue type could not be worked out from the Test Method line, so this was skipped.';
    }

    // Platform mismatch flags
    let mismatch = null;
    if (issueType === 'Voice Control' && (platform === 'Android Tablet' || platform === 'Android Mobile')) {
      mismatch = 'Voice Control is an iPhone/iPad feature, but this is an Android issue.';
    }
    if (issueType === 'Switch Access' && (platform === 'iPad' || platform === 'iPhone')) {
      mismatch = 'Switch Access is an Android feature, but this is an iPhone/iPad issue.';
    }
    if (native && mentionsUrl) {
      mismatch = (mismatch ? mismatch + ' ' : '') + 'Step 1 mentions a "URL", which does not apply to app testing — it looks copied from a Web template.';
    }

    if (!ok || mismatch) {
      checks.push({ id: 'S6', name: `Issue type + Step 1 (${issueType})`, status: 'fail', note: [!ok ? note : null, mismatch].filter(Boolean).join(' ') });
    } else {
      checks.push({ id: 'S6', name: `Issue type + Step 1 (${issueType})`, status: 'pass', note });
    }
  })();

  // 7. Steps to Reproduce Numbering
  (function () {
    if (!steps.length) {
      checks.push({ id: 'S7', name: 'Step numbering', status: 'fail', note: 'No numbered steps were found.' });
      return;
    }
    const nums = steps.map(s => s.num);
    let ok = nums[0] === 1;
    for (let i = 1; i < nums.length && ok; i++) {
      if (nums[i] !== nums[i - 1] + 1) ok = false;
    }
    checks.push({
      id: 'S7', name: 'Step numbering', status: ok ? 'pass' : 'fail',
      note: ok ? `The steps are numbered in order, 1 to ${nums[nums.length - 1]}.` : `The steps are not numbered in order. Found: ${nums.join(', ')}.`,
    });
  })();

  // 8. Resource Link
  (function () {
    if (!resourceLinkLine) {
      checks.push({ id: 'S8', name: 'Resource link', status: 'pass', note: 'No Resource Link, which is fine — it is optional.' });
    } else if (resourceLinkLabelWrong) {
      checks.push({ id: 'S8', name: 'Resource link', status: 'fail', note: 'This section is labelled "References:" — it should be labelled "Resource Link:".' });
    } else {
      checks.push({ id: 'S8', name: 'Resource link', status: 'pass', note: 'The Resource Link is present with the correct label.' });
    }
  })();

  // 9. Screen Name vs Page Name / Test Unit
  (function () {
    if (!screenName) {
      checks.push({ id: 'S9', name: 'Screen name', status: 'fail', note: 'The Screen Name is missing.' });
      return;
    }
    const names = screenName.split(/,|\n/).map(s => s.trim()).filter(Boolean);
    if (names.length > 1) {
      checks.push({ id: 'S9', name: 'Screen name', status: 'na', note: 'More than one screen name is listed, so this check was skipped.' });
      return;
    }
    const single = names[0].toLowerCase();
    const matchesUnit = testUnit && single === testUnit.toLowerCase();
    const matchesSummary = summary.toLowerCase().includes(single);
    if (matchesUnit && matchesSummary) {
      checks.push({ id: 'S9', name: 'Screen name', status: 'pass', note: `The Screen Name "${names[0]}" matches the test unit and the summary.` });
    } else {
      checks.push({ id: 'S9', name: 'Screen name', status: 'fail', note: `The Screen Name "${names[0]}" does not match the test unit ("${testUnit}") or the summary.` });
    }
  })();

  // 10. Automation-Specific Checks (Web only, Method=Automated)
  (function () {
    if (native) {
      checks.push({ id: 'S10', name: 'Automation checks', status: 'na', note: 'Does not apply — app issues are always tested manually.' });
      return;
    }
    if (method.toLowerCase() !== 'automated') {
      checks.push({ id: 'S10', name: 'Automation checks', status: 'na', note: 'Does not apply — this is a manual issue.' });
      return;
    }
    const contextBlock = extractBlock(desc, 'Context:', ['Steps to reproduce:']);
    const lastLine = contextBlock ? contextBlock.split('\n').map(l => l.trim()).filter(Boolean).pop() : '';
    const lastLineOk = /chrome on windows using axe devtools chrome browser extension/i.test(lastLine || '');
    const disallowed = /(nvda|screen reader|assistive technology|keyboard)/i.test(lastLine || '');

    const issues = [];
    if (!lastLineOk || disallowed) issues.push(`The last line of Context should be "Chrome on Windows using axe DevTools Chrome browser extension". Written: "${lastLine || '(missing)'}".`);
    if (!step1 || !/open the (above[- ]mentioned )?url/i.test(step1.text)) issues.push('Step 1 should say to open the URL mentioned above.');
    const inspectStep = steps.some(s => /f12|inspect panel/i.test(s.text));
    if (!inspectStep) issues.push('No step mentions opening the browser inspect panel (F12).');

    if (issues.length) {
      checks.push({ id: 'S10', name: 'Automation checks', status: 'fail', note: issues.join(' '), notes: issues });
    } else {
      checks.push({ id: 'S10', name: 'Automation checks', status: 'pass', note: 'The Context last line, Step 1, and the F12 inspect-panel step are all correct.' });
    }
  })();

  return {
    platform: platform || 'Unknown',
    native,
    issueType,
    method,
    checks,
  };
}
