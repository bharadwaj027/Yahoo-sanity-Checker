/* checks.js
 * Implements the Yahoo Mail Plus JIRA sanity-check logic (Web + Native platforms:
 * Android Tablet, Android Mobile, iPad, iPhone) as defined in the yahoo-mail-sanity skill.
 */

const PLATFORM_MAP = {
  'web': 'Web',
  'desktop web': 'Web',
  'mobile web': 'Mobile Web',
  'ios mobile web': 'Mobile Web',
  'android mobile web': 'Android Mobile Web',
  'native app': 'Native App',
  'native ios': 'Native iOS',
  'native ios mobile app': 'Native iOS',
  'native android': 'Native Android',
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

// Assistive-technology reference matcher. Used by the 3.3.2 (Labels or
// Instructions) rule folded into S5 (Context) and S6 (Step 1): a 3.3.2 issue
// needs no AT, so any of these terms in the Context/Test Method or the test
// steps is an error.
const AT_REFERENCE_RE = /screen[\s-]?reader|talk\s?back|voice\s?over|\bnvda\b|\bjaws\b|\bnarrator\b|switch\s?access|voice\s?control|assistive\s+technolog/i;

function normalizePlatform(rawPlatform) {
  if (!rawPlatform) return null;
  const key = rawPlatform.trim().toLowerCase();
  return PLATFORM_MAP[key] || rawPlatform.trim();
}

function isNative(platform) {
  return ['Native App', 'Native iOS', 'Native Android', 'Android Tablet', 'Android Mobile', 'iPad', 'iPhone'].includes(platform);
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

// ── Description → named sections (for the new S11/S12/S13 checks) ────────────
// The axe Auditor description is organised under these top-level headings. This
// splitter is additive — the S1–S10 checks keep using extractField/extractBlock.
const SECTION_HEADERS = [
  'Environment', 'Context', 'Steps to reproduce', 'Expected results',
  'Actual results', 'Affected user population', 'Applicable WCAG Success Criterion',
  'Code Snippet', 'Remediation Recommendation', 'Recommendation to fix', 'Resource Link', 'Screen Name',
];

function splitSections(desc) {
  const out = {};
  if (!desc) return out;
  const lines = String(desc).replace(/\r\n/g, '\n').split('\n');
  const headerRe = new RegExp(
    '^\\s*(' + SECTION_HEADERS.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\s*:\\s*(.*)$',
    'i'
  );
  const buf = {};
  let current = null;
  for (const line of lines) {
    const m = line.match(headerRe);
    if (m) {
      current = SECTION_HEADERS.find(h => h.toLowerCase() === m[1].toLowerCase()) || m[1];
      if (!buf[current]) buf[current] = [];
      if (m[2] && m[2].trim()) buf[current].push(m[2]);   // inline content after "Label:"
    } else if (current) {
      buf[current].push(line);
    }
  }
  for (const k in buf) out[k] = buf[k].join('\n').trim();
  return out;
}

// Content of a required field: prefer the parsed section, fall back to an inline
// "Label: value" line (some exports keep e.g. Screen Name on a single line).
// The fallback only reads the remainder of the label's own line — it must not
// spill onto later lines, or an empty field would swallow the next heading.
function fieldContent(sections, desc, name) {
  const v = sections[name];
  if (v && v.trim()) return v.trim();
  const re = new RegExp('^\\s*' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:[ \\t]*([^\\n]*)', 'im');
  const m = String(desc || '').match(re);
  return m ? m[1].trim() : '';
}

// Values that look present but carry no real, issue-specific information.
const MEANINGLESS_RE = /^(n\/?a|na|n\.a\.?|none|nil|tbd|tba|todo|to be (?:done|added|updated|filled)|null|undefined|[-–—.·•*?]+)$/i;
function isMeaningless(text) {
  if (text == null) return true;
  const t = String(text).trim();
  if (!t) return true;
  const core = t.replace(/^[\s\-–—:*•·.>#]+|[\s\-–—:*•·.]+$/g, '').trim();
  if (!core) return true;
  if (MEANINGLESS_RE.test(core)) return true;
  if (/^\[?\s*placeholder\b[^\]]*\]?$/i.test(core)) return true;         // only an unfilled placeholder
  if (!/\n/.test(core) && hasPlaceholder(core) && core.length < 60) return true; // single-line stub
  return false;
}

// "Reference" / "References" is accepted in place of "Resource Link" for native
// audits only (see S12). Reads the label's inline value plus any following lines,
// stopping at a blank line or the next known section header. Line-based (like
// splitSections) so a URL on the line *after* the label is still captured.
// Returns '' when the label is absent or carries no value.
function referenceFieldContent(desc) {
  const lines = String(desc || '').replace(/\r\n/g, '\n').split('\n');
  const labelRe = /^\s*References?\s*:\s*(.*)$/i;
  const headerLineRe = new RegExp(
    '^\\s*(' + SECTION_HEADERS.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\s*:',
    'i'
  );
  const out = [];
  let capturing = false;
  for (const line of lines) {
    if (!capturing) {
      const m = line.match(labelRe);
      if (m) { capturing = true; if (m[1].trim()) out.push(m[1]); }
    } else {
      if (/^\s*$/.test(line)) break;                 // blank line ends the block
      if (headerLineRe.test(line)) break;            // next known section header
      if (/^\s*References?\s*:/i.test(line)) break;   // a second Reference label
      out.push(line);
    }
  }
  return out.join('\n').trim();
}

// These common variant labels are still rejected, except for "Recommendation
// to fix", which is an accepted alternative to "Remediation Recommendation".
const REMEDIATION_VARIANTS = ['Fix Recommendation', 'How to Fix', 'Suggested Fix', 'Recommendation'];
function detectRemediationVariant(desc) {
  for (const v of REMEDIATION_VARIANTS) {
    const re = new RegExp('^\\s*' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*:', 'im');
    if (re.test(String(desc || ''))) return v;
  }
  return null;
}

// Remediation Recommendation is validated structurally only (no content-meaning
// checks). Returns an error string, or null when it passes.
function remediationFieldProblem(sections, desc) {
  const labelPresent = /^\s*(?:Remediation Recommendation|Recommendation to fix)\s*:/im.test(String(desc || ''));
  if (!labelPresent) {
    const variant = detectRemediationVariant(desc);
    return variant
      ? `Invalid field name "${variant}" used instead of "Remediation Recommendation".`
      : 'Remediation Recommendation is missing.';
  }
  const content = fieldContent(sections, desc, 'Remediation Recommendation') || fieldContent(sections, desc, 'Recommendation to fix');
  if (!content) return 'Remediation Recommendation is empty.';   // empty or whitespace only
  if (/^\s*Rule\b/im.test(content)) return 'Remediation Recommendation contains a "Rule" section.';
  if (/^\s*Background\b/im.test(content)) return 'Remediation Recommendation contains a "Background" section.';
  return null;   // any non-empty content is valid
}

// ── Summary-mapping lookup (S11) ────────────────────────────────────────────
function normSummaryText(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Extra exact old-summary wordings that appear in real axe output but differ
// from the sheet's transcription. Kept here (not in the generated summary-map.js)
// so they survive regenerating that file. Keyed by checkpoint; each string is
// matched exactly (as a substring), like the entry's own oldSummary.
const OLD_SUMMARY_ALIASES = {
  '1.4.1 b': ['Links must be distinguishable without relying on color',
              'Links must be distinguishable without relying on colour'],
};

// Find the mapping entry for an issue. Prefers a match on the NEW (corrected)
// wording, then the OLD (axe) wording (incl. aliases), then a unique checkpoint.
function findSummaryMapping(summary, checkpoint) {
  if (typeof SUMMARY_MAP === 'undefined' || !Array.isArray(SUMMARY_MAP)) return null;
  const nSum = normSummaryText(summary);
  if (!nSum) return null;
  const aliases = (typeof OLD_SUMMARY_ALIASES !== 'undefined') ? OLD_SUMMARY_ALIASES : {};
  const newHits = [], oldHits = [];
  for (const e of SUMMARY_MAP) {
    const nNew = normSummaryText(e.newSummary);
    if (nNew && nSum.includes(nNew)) newHits.push({ entry: e, matched: 'new', len: nNew.length });
    const olds = [e.oldSummary].concat(aliases[e.checkpoint] || []);
    for (const o of olds) {
      const nOld = normSummaryText(o);
      if (nOld && nSum.includes(nOld)) oldHits.push({ entry: e, matched: 'old', len: nOld.length, oldText: o });
    }
  }
  const longest = arr => arr.sort((a, b) => b.len - a.len)[0];
  if (newHits.length) return longest(newHits);
  if (oldHits.length) return longest(oldHits);
  const cp = String(checkpoint || '').trim().toLowerCase();
  if (cp) {
    const m = SUMMARY_MAP.filter(e => String(e.checkpoint).trim().toLowerCase() === cp);
    if (m.length === 1) return { entry: m[0], matched: 'none', len: 0 };
  }
  return null;
}

// Which of Expected Results / Actual Results / Remediation Recommendation the
// issue's CSV text does NOT match the mapping's expected value. Only mismatches
// are surfaced (so a correctly-filled field isn't repeated back).
function mismatchedRefFields(e, desc) {
  const sections = splitSections(desc || '');
  const norm = s => normSummaryText(s);
  const rows = [
    ['Expected Results', fieldContent(sections, desc, 'Expected results'), e.expectedResults],
    ['Actual Results', fieldContent(sections, desc, 'Actual results'), e.actualResults],
    ['Remediation Recommendation', fieldContent(sections, desc, 'Remediation Recommendation'), e.remediation],
  ];
  return rows
    .filter(([, got, exp]) => exp && norm(got) !== norm(exp))
    .map(([label, , exp]) => ({ label, expected: exp }));
}

// Shared builder for the automation summary check (S11). automation-only.
function buildSummaryCheck(id, name, summary, checkpoint, method, verbose, desc) {
  if (!/^automat/i.test(String(method || ''))) {
    return { id, name, status: 'na', note: 'Only applies to automation issues.' };
  }
  const match = findSummaryMapping(summary, checkpoint);
  if (!match) {
    return { id, name, status: 'na', note: 'No summary-mapping entry matched this automation issue, so the wording could not be validated.' };
  }
  const e = match.entry;
  const fields = mismatchedRefFields(e, desc);
  const detail = {
    checkpoint: e.checkpoint, oldSummary: e.oldSummary, newSummary: e.newSummary,
    matched: match.matched, fields,
  };
  if (match.matched === 'new') {
    const chk = { id, name, status: 'pass', note: `The summary matches the expected new Adobe wording: "${e.newSummary}".` };
    if (verbose) chk.detail = detail;
    return chk;
  }
  const oldText = match.oldText || e.oldSummary;
  const why = match.matched === 'old'
    ? `The summary still uses the old AXE wording ("${oldText}") and needs to be updated.`
    : `The summary does not match the expected new wording for checkpoint ${e.checkpoint}.`;
  const chk = { id, name, status: 'fail', note: `${why} Expected summary: "${e.newSummary}".` };
  if (verbose) {
    chk.notes = [
      `${why} Expected: "${e.newSummary}".`,
      `Old (AXE) summary: ${e.oldSummary || '(none)'}`,
      `Expected (new) summary: ${e.newSummary || '(none)'}`,
    ].concat(fields.map(f => `${f.label} (expected): ${f.expected}`));
    chk.detail = detail;
  }
  return chk;
}

// ── Colour-contrast issue detection (S13) ───────────────────────────────────
// Deliberately narrow: only genuine colour / colour-contrast issues qualify, so
// the details check never fires on unrelated accessibility issues.
function isColorContrastIssue(summary, checkpoint, mapEntry) {
  const cp = String(checkpoint || '').trim();
  if (/^1\.4\.3\b/.test(cp) || /^1\.4\.11\b/.test(cp)) return true;   // contrast success criteria
  const hay = (String(summary || '') + ' ' +
    (mapEntry ? String(mapEntry.newSummary || '') + ' ' + String(mapEntry.oldSummary || '') : '')).toLowerCase();
  if (/^1\.4\.1\b/.test(cp) && /contrast|colou?r/.test(hay)) return true;   // use-of-colour with a contrast angle
  return /colou?r contrast|contrast ratio|sufficient (?:colou?r )?contrast|minimum colou?r contrast|contrast is not at least|not distinguishable without relying on colou?r/.test(hay);
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

  if (!isNative(platform)) {   // Web and Mobile Web
    if (tm.includes('keyboard')) return 'Keyboard';
    return 'Other';
  }

  // Native platforms
  if (tm.includes('voice control')) return 'Voice Control';
  if (tm.includes('switch access')) return 'Switch Access';
  if (tm.includes('color contrast') || tm.includes('analyser') || tm.includes('analyzer')) return 'Color Contrast Tool';
  return 'Device-only';
}

// ── Native recommendation reference (S14) ───────────────────────────────────
// Looks up the authoritative "Recommendation to fix" for a native issue in the
// embedded NATIVE_RECOMMENDATIONS reference (generated verbatim from the Native
// Mobile Excel: tabs 'native iOS' / 'native Android'). This is a deterministic
// lookup-and-compare — no semantic similarity, no cross-platform fallback, no
// closest-match. If an exact platform → checkpoint → row mapping can't be made
// it reports an error rather than guessing.

// Determine the native platform (iOS / Android) from the existing deterministic
// audit metadata only (platform classification, then the OS / AT lines). Returns
// 'iOS', 'Android', or null when it genuinely can't be determined.
function resolveNativePlatform(platform, osVal, atVal) {
  if (platform === 'iPad' || platform === 'iPhone') return 'iOS';
  if (platform === 'Android Tablet' || platform === 'Android Mobile') return 'Android';
  const os = String(osVal || '').toLowerCase();
  const at = String(atVal || '').toLowerCase();
  if (/\bios\b|ipados|iphone|ipad/.test(os) || at.includes('voiceover')) return 'iOS';
  if (/android|one ui/.test(os) || at.includes('talkback')) return 'Android';
  return null;
}

// Checkpoint key. The audit's Checkpoint column carries the full WCAG label with
// the id in parentheses — e.g. "Name, Role, Value (4.1.2.a)" — while the Excel
// tab stores the bare id "4.1.2.a". Extract the id (preferring a parenthesised
// one), drop a " - N/A"-style trailer, remove spaces, and treat a dot before a
// trailing letter the same as none, so "Name, Role, Value (4.1.2.a)" ==
// "4.1.2.a" == "4.1.2 a" == "4.1.2a".
function normCheckpoint(s) {
  let t = String(s || '').trim().toLowerCase();
  // Prefer an id inside parentheses that looks like a checkpoint (x.y[.z…][ .letter]).
  const paren = t.match(/\(([^)]*\d+(?:\.\d+)+[^)]*)\)/);
  let core = paren ? paren[1] : t;
  const id = core.match(/\d+(?:\.\d+)+\s*\.?\s*[a-z]?/);   // "4.1.2.a" / "4.1.2 a" / "4.1.2"
  if (id) core = id[0];
  core = core.split(/\s[-–—]\s/)[0];        // drop a " - N/A" style trailer
  core = core.replace(/\s+/g, '');          // "4.1.2 a" -> "4.1.2a"
  core = core.replace(/\.([a-z])$/, '$1');  // "4.1.2.a" -> "4.1.2a"
  return core;
}

// Deterministic comparison key for recommendation text. Formatting only —
// substantive text and case are preserved. Normalises line endings; folds the
// typographic characters Excel auto-inserts (curly quotes, dashes, ellipsis,
// non-breaking spaces) to their ASCII equivalents so a ticket typed with plain
// quotes still matches; collapses runs of spaces/tabs; trims each line; collapses
// blank lines.
// Structural header labels reviewers often keep or drop when copying a
// recommendation (no remediation substance). Removed from both sides so their
// presence/absence doesn't affect the match. Whole-line match: "HOW TO FIX:",
// "HOW TO FIX: Swift:/SwiftUI:/Java:", and a bare "Using JAVA:/XML:/Swift:" etc.
const REC_HEADER_LINE_RE = /^(?:how to fix\b[^\n]*:|using\s+(?:java|kotlin|xml|swift|swiftui)\s*:)$/i;
function normRec(s) {
  return String(s || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[‘’‚‛′]/g, "'")   // curly / prime single quotes
    .replace(/[“”„‟″]/g, '"')   // curly / prime double quotes
    .replace(/"{2,}/g, '"')      // collapse doubled quotes (CSV "" escaping artifact)
    .replace(/[‒–—―−]/g, '-')   // en/em/figure dashes, minus
    .replace(/…/g, '...')                            // ellipsis
    .replace(/[   ]/g, ' ')                // non-breaking / narrow spaces
    .replace(/[ \t]+/g, ' ')
    .split('\n').map(l => l.trim())
    .filter(l => !REC_HEADER_LINE_RE.test(l))         // drop boilerplate header labels
    .join('\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

// Loose key for matching a Summary's issue text against an Excel Issue
// Description: normalise (lower-case, quotes, whitespace) then drop trailing
// punctuation / brackets so "…display orientation." == "…display orientation".
function normDesc(s) {
  return normSummaryText(s).replace(/[)\].,;:!?\s]+$/, '').trim();
}

// Try to pin the exact Excel row for a native issue from its Summary. The Summary
// is "<issue text> - <page> (<element>)", so compare its leading segment (before
// the first " - ") against each row's Issue Description. A pin requires a strong
// signal: normalised equality, or the full Issue Description appearing inside the
// Summary text. Returns the row, or null when no confident pin is possible.
function pinNativeRow(rows, summary) {
  const seg = String(summary || '').split(/\s[-–—]\s/)[0];
  const sIssue = normDesc(seg);
  const sFull = normDesc(summary);
  if (!sIssue) return null;
  let hit = rows.find(r => normDesc(r.issueDescription) && normDesc(r.issueDescription) === sIssue);
  if (!hit) {
    const incl = rows
      .filter(r => {
        const d = normDesc(r.issueDescription);
        return d && (sIssue.includes(d) || sFull.includes(d));
      })
      .sort((a, b) => normDesc(b.issueDescription).length - normDesc(a.issueDescription).length);
    if (incl.length) hit = incl[0];
  }
  return hit || null;
}

// Gather the authoritative reference rows for a native issue. Returns one of:
//   {status:'found', rows, pinned}   rows = all rows for platform+checkpoint;
//                                     pinned = the exact row if the Summary
//                                     confidently identifies it, else null.
//   {status:'no-data'|'no-checkpoint'|'checkpoint-not-found'}
// No cross-tab fallback and no closest-match: only the correct platform tab and
// the exact checkpoint are ever considered.
function findNativeRecommendation(platformKind, checkpoint, summary) {
  if (typeof NATIVE_RECOMMENDATIONS === 'undefined' || !Array.isArray(NATIVE_RECOMMENDATIONS)) return { status: 'no-data' };
  const cp = normCheckpoint(checkpoint);
  if (!cp) return { status: 'no-checkpoint' };
  const rows = NATIVE_RECOMMENDATIONS.filter(e => e.platform === platformKind && normCheckpoint(e.checkpoint) === cp);
  if (!rows.length) return { status: 'checkpoint-not-found' };
  return { status: 'found', rows, pinned: pinNativeRow(rows, summary) };
}

const CHECKPOINT_TYPES = {
  'Screen Reader': ['1.1.1', '1.3.1', '2.4.4', '2.4.6', '2.5.3', '3.1.1', '3.3.2.b', '4.1.2', '4.1.3'],
  'Visual': ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.3.3', '1.3.4', '1.3.5', '1.4.2', '1.4.4', '1.4.5', '1.4.10', '1.4.13', '2.2.1', '2.2.2', '2.3.1', '2.4.2', '2.4.5', '2.5.1', '2.5.2', '2.5.4', '2.5.7', '2.5.8', '3.1.2', '3.2.6', '3.3.2.a', '3.3.2.c', '3.3.3', '3.3.4', '3.3.7', '3.3.8'],
  'Color': ['1.4.1', '1.4.3', '1.4.11'],
  'Text Spacing': ['1.4.12'],
  'Keyboard': ['2.1.1', '2.1.2', '2.1.4', '2.4.1', '2.4.3', '2.4.7', '2.4.11', '3.2.1', '3.2.2'],
};

function classifyCheckpoint(checkpoint) {
  const value = String(checkpoint || '').trim().toLowerCase();
  if (!value) return null;
  const idMatch = value.match(/\b\d+\.\d+\.\d+(?:\.[a-z])?\b/);
  const checkpointId = idMatch ? idMatch[0] : value;
  const matches = cp => checkpointId === cp || checkpointId.startsWith(cp + '.');
  if (CHECKPOINT_TYPES['Screen Reader'].some(matches)) return 'Screen Reader';
  if (matches('2.1.1') && /action cannot be performed with a screen reader turned on/i.test(value)) return 'Screen Reader';
  for (const type of ['Visual', 'Color', 'Text Spacing', 'Keyboard']) {
    if (CHECKPOINT_TYPES[type].some(matches)) return type;
  }
  return null;
}

// Some checkpoints are a different type depending on the platform. On iOS
// platforms (iOS Mobile Web, Native iOS) checkpoint 2.1.1 — Keyboard on desktop
// and Android — is verified with the screen reader, so it is a Screen Reader
// checkpoint there (AT required in the Context + the VoiceOver Test Method).
// Every other checkpoint uses the platform-independent classifyCheckpoint result.
function resolveCheckpointType(checkpoint, matrixPlatform) {
  const m = String(checkpoint || '').match(/\b(\d+\.\d+\.\d+)(?:\.[a-z])?\b/);
  const id3 = m ? m[1] : '';
  if (id3 === '2.1.1' && (matrixPlatform === 'iOS Mobile Web' || matrixPlatform === 'Native iOS')) {
    return 'Screen Reader';
  }
  return classifyCheckpoint(checkpoint);
}

// ── Centralized Context / Test-Method matrix (spec §8–§14) ──────────────────
// Single authoritative source for the required Test Method of every supported
// platform × checkpoint-type combination, keyed platform → checkpoint type. A
// `null` (or absent) cell means "no Test Method rule is defined" for that combo:
// the Unsupported Platform Rule then applies and the tool must not infer or
// invent a Test Method. New platforms are added here alone — no other logic
// changes. The Assistive-Technology rule is uniform and derived from the
// checkpoint type (Screen Reader → AT required in Context; every other type →
// AT not allowed), so it is not duplicated per cell. Automation issues are
// validated separately (see AUTOMATION_TEST_METHOD and runChecks / spec §12).
// The Test Method strings are verbatim, with the exact capitalisation the spec
// mandates (e.g. lower-case "windows", "text spacing bookmarklet" not
// "Text spacing extension") — do not "correct" them.
const TEST_METHOD_MATRIX = {
  'Web': {
    'Screen Reader': 'Chrome on Windows using NVDA Assistive Technology',
    'Color': 'Chrome on windows using Deque color contrast Analyser',
    'Visual': 'Chrome on windows',
    'Text Spacing': 'Chrome on windows using Text spacing extension',
    'Keyboard': 'Chrome on windows using keyboard',
  },
  'iOS Mobile Web': {
    'Screen Reader': 'Safari on iPhone using VoiceOver screen reader',
    'Color': 'Safari on iOS mobile using Deque color contrast Analyser',
    'Visual': 'Safari on iOS mobile',
    'Text Spacing': 'Safari on iOS mobile using Text spacing extension',
    'Keyboard': null,
  },
  'Native iOS': {
    'Screen Reader': 'iPhone using VoiceOver screen reader',
    'Color': 'iOS using Deque color contrast Analyser',
    'Visual': 'iOS',
    'Text Spacing': null,
    'Keyboard': null,
  },
  'Android Mobile Web': {
    'Screen Reader': 'Chrome on Android using TalkBack screen reader',
    'Color': 'Chrome on Android using Deque color contrast Analyser',
    'Visual': 'Chrome on Android',
    'Text Spacing': 'Chrome on Android using text spacing bookmarklet',
    'Keyboard': 'Chrome on Android using keyboard',
  },
  'Native Android': {
    'Screen Reader': 'Android using TalkBack screen reader',
    'Color': 'Android using Deque color contrast Analyser',
    'Visual': 'Android',
    'Text Spacing': null,
    'Keyboard': null,
  },
};

// Automation issues are independent of platform and checkpoint type: identified
// first (Method = Automated/Automation) and always validated against this one
// Test Method, with Assistive Technology not allowed in the Context (spec §8F).
const AUTOMATION_TEST_METHOD = 'Chrome on Windows using axe DevTools Chrome browser extension';

function expectedTestMethod(checkpointType, platform) {
  const row = TEST_METHOD_MATRIX[platform];
  if (!row) return null;
  return row[checkpointType] || null;
}

// Map the tool's normalised platform to a matrix platform key. Accepts the spec
// platform names verbatim and also folds the tool's existing platform values:
//   Web                                       → Web
//   Mobile Web / iOS Mobile Web               → iOS Mobile Web  (Mobile Web has always meant iOS mobile web here)
//   Android Mobile Web                        → Android Mobile Web
//   iPad / iPhone / Native iOS                → Native iOS
//   Android Tablet / Android Mobile / Native Android → Native Android
//   Native App                                → inferred iOS/Android from the OS / AT metadata
function checkpointPlatform(platform, osVal, atVal) {
  if (platform === 'Web') return 'Web';
  if (platform === 'Mobile Web' || platform === 'iOS Mobile Web') return 'iOS Mobile Web';
  if (platform === 'Android Mobile Web') return 'Android Mobile Web';
  if (platform === 'iPad' || platform === 'iPhone' || platform === 'Native iOS') return 'Native iOS';
  if (platform === 'Android Tablet' || platform === 'Android Mobile' || platform === 'Native Android') return 'Native Android';
  if (platform === 'Native App') {
    const kind = resolveNativePlatform(platform, osVal, atVal);
    if (kind === 'iOS') return 'Native iOS';
    if (kind === 'Android') return 'Native Android';
  }
  return platform || 'Unknown';
}

// A Platform line may name more than one platform, e.g.
// "Desktop Web, iOS Mobile Web" or "Web & Android Mobile Web". Split it on
// commas / & / + / " and ", resolve each token to a matrix platform key, and
// return the de-duplicated list (unrecognised tokens are dropped). The Test
// Method then passes if it matches ANY listed platform's required method.
function matrixPlatformsFor(rawPlatform, osVal, atVal) {
  const tokens = String(rawPlatform || '')
    .split(/\s*(?:,|&|\/|\+)\s*|\s+and\s+/i)
    .map(t => t.trim())
    .filter(Boolean);
  const keys = [];
  for (const tok of tokens) {
    const key = checkpointPlatform(normalizePlatform(tok), osVal, atVal);
    if (key && key !== 'Unknown' && !keys.includes(key)) keys.push(key);
  }
  return keys;
}

// Case- and whitespace-insensitive comparison key for a Test Method string, so
// "Chrome on Windows" matches the matrix "Chrome on windows" (capitalisation and
// spacing are not meaningful; genuinely different wording is still caught).
function normTestMethod(s) {
  return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// Any Assistive-Technology / tool name that may appear in a Test Method. Used to
// verify a Visual entry names NO tool (environment only).
const TOOL_WORDS_RE = /\bnvda\b|voice\s?over|talk\s?back|\bjaws\b|\bnarrator\b|switch\s?access|voice\s?control|keyboard|deque|colou?r contrast|analy[sz]er|text spacing|bookmarklet|extension/i;

// The trailing wording every Screen Reader Test Method must carry after the
// screen-reader name (spec / user rule): NVDA → "Assistive Technology";
// VoiceOver / TalkBack → "screen reader". When this suffix is the ONLY thing
// missing, the tool reports a specific "<suffix> is missing after <tool>" error
// rather than a generic invalid-method error.
const SR_TOOL_BY_PLATFORM = {
  'Web':                { name: 'NVDA',     re: /\bnvda\b/,       suffixLabel: 'Assistive Technology', suffixRe: /assistive\s+technolog/i },
  'iOS Mobile Web':     { name: 'VoiceOver', re: /voice\s?over/,  suffixLabel: 'Screen reader',        suffixRe: /screen\s?reader/i },
  'Native iOS':         { name: 'VoiceOver', re: /voice\s?over/,  suffixLabel: 'Screen reader',        suffixRe: /screen\s?reader/i },
  'Android Mobile Web': { name: 'TalkBack',  re: /talk\s?back/,   suffixLabel: 'Screen reader',        suffixRe: /screen\s?reader/i },
  'Native Android':     { name: 'TalkBack',  re: /talk\s?back/,   suffixLabel: 'Screen reader',        suffixRe: /screen\s?reader/i },
};

// Classify ONE Test Method entry against a checkpoint type + platform. Returns
// { code: 'ok' }               — the entry names the right environment + tool
//                                (+ Screen-Reader suffix); phrasing/case/version
//                                suffixes/synonyms are ignored (user's tolerant rule).
// { code: 'missing-suffix', tool, suffixLabel } — Screen Reader only: right
//                                environment + screen-reader name, but the
//                                required "Assistive Technology"/"screen reader"
//                                wording is absent.
// { code: 'no' }               — wrong environment, wrong tool, or (Visual) a
//                                tool is named where none should be.
function classifyTestMethodEntry(entry, checkpointType, platform) {
  const t = ' ' + normTestMethod(entry) + ' ';
  const has = (...ws) => ws.every(w => Array.isArray(w) ? w.some(x => t.includes(x)) : t.includes(w));
  const lacks = (...ws) => ws.every(w => !t.includes(w));

  let envOk;
  switch (platform) {
    case 'Web':                envOk = has('chrome', 'windows'); break;
    case 'iOS Mobile Web':     envOk = has('safari', ['ios', 'iphone', 'ipad']); break;
    case 'Native iOS':         envOk = has(['ios', 'iphone', 'ipad']) && lacks('safari', 'chrome'); break;
    case 'Android Mobile Web': envOk = has('chrome', 'android'); break;
    case 'Native Android':     envOk = has('android') && lacks('chrome'); break;
    default:                   return { code: 'no' };
  }
  if (!envOk) return { code: 'no' };

  switch (checkpointType) {
    case 'Screen Reader': {
      const sr = SR_TOOL_BY_PLATFORM[platform];
      if (!sr || !sr.re.test(t)) return { code: 'no' };          // wrong / missing screen-reader name
      if (!sr.suffixRe.test(t)) return { code: 'missing-suffix', tool: sr.name, suffixLabel: sr.suffixLabel };
      return { code: 'ok' };
    }
    case 'Color':
      return /deque|colou?r contrast|analy[sz]er/.test(t) ? { code: 'ok' } : { code: 'no' };
    case 'Keyboard':
      return t.includes('keyboard') ? { code: 'ok' } : { code: 'no' };
    case 'Text Spacing':
      return (t.includes('text spacing') && (platform === 'Android Mobile Web' ? t.includes('bookmarklet') : t.includes('extension')))
        ? { code: 'ok' } : { code: 'no' };
    case 'Visual':
      return !TOOL_WORDS_RE.test(t) ? { code: 'ok' } : { code: 'no' };   // environment only — no AT/tool named
    default:
      return { code: 'no' };
  }
}

// Boolean convenience wrapper: does the entry fully match (code === 'ok')?
function testMethodMatches(entry, checkpointType, platform) {
  return classifyTestMethodEntry(entry, checkpointType, platform).code === 'ok';
}

function runChecks(row) {
  const desc = String(row.Description || '');
  const summary = String(row.Summary || '');
  const testUnit = String(row['Test Unit'] || '').trim();
  const method = String(row.Method || '').trim();
  const attachments = String(row.Attachments || '').trim();
  const url = String(row.URL || '').trim();
  const checkpoint = String(row.Checkpoint || '').trim();
  const checkpointType = classifyCheckpoint(checkpoint);
  // 3.3.2 (Labels or Instructions) — tolerant of the full WCAG-label form, e.g.
  // "Labels or Instructions (3.3.2.a)". Such issues must not reference Assistive
  // Technology (enforced in S5 for the Context and S6 for the steps).
  const is332 = /\b3\.3\.2\b/.test(checkpoint);

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
  const appVersion = extractField(desc, '(?:iOS|Android|iOS\\/Android)?\\s*(?:[Aa]pp\\s+)?[Vv]ersion tested:');
  const resourceLinkLine = extractField(desc, '(?:Resource [Ll]ink|References):');
  // Web expects the label "Resource Link:"; a "References:" label is wrong there.
  // Native audits accept "Resource Link" OR "Reference(s)", so don't flag it.
  const resourceLinkLabelWrong = !native && /References:/.test(desc) && !/Resource [Ll]ink:/i.test(desc);

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
    if (!checkpoint) issues.push('Checkpoint is missing, so Context and Test Method rules cannot be classified.');
    if (!rawPlatform) issues.push('The Platform line is missing.');
    
    if (!native) {
      // Web platform requirements
      if (!osVal) issues.push('The Operating System line is missing.');
      if (!browserVal) issues.push('The Browser line is missing (it is needed for Web).');
    } else {
      // Native app requirements
      if (!osVal) issues.push('The Operating System line is missing (it is needed for app testing).');
      if (!deviceModel) issues.push('The Device Model line is missing (it is needed for app testing).');
    }

    if (issueType === 'Screen Reader') {
      if (!atVal) {
        issues.push('This is a screen reader issue but the Assistive Technology line is missing.');
      } else if (native) {
        let expectedAT = null;
        const atLower = (atVal || '').toLowerCase();
        const osLower = (osVal || '').toLowerCase();
        const tmLower = (testMethod || '').toLowerCase();
        
        if (platform === 'Android Tablet' || platform === 'Android Mobile') {
          expectedAT = 'talkback';
        } else if (platform === 'iPad' || platform === 'iPhone') {
          expectedAT = 'voiceover';
        } else if (platform === 'Native App') {
          // For generic 'Native App', accept combined VoiceOver/TalkBack or infer from context
          // If AT contains both or either TalkBack/VoiceOver, it's valid
          if (atLower.includes('voiceover') && atLower.includes('talkback')) {
            // Combined format is acceptable
            expectedAT = null;
          } else if (atLower.includes('voiceover') || atLower.includes('talkback')) {
            // Single AT mentioned, accept it
            expectedAT = null;
          } else if (osLower.includes('android') || osLower.includes('one ui') || tmLower.includes('android')) {
            expectedAT = 'talkback';
          } else if (osLower.includes('ios') || osLower.includes('ipados') || tmLower.includes('iphone')) {
            expectedAT = 'voiceover';
          }
        }
        if (expectedAT && !atLower.includes(expectedAT)) {
          issues.push(`The Assistive Technology "${atVal}" is not the one expected for this platform (${expectedAT}).`);
        }
      }
      // Web screen-reader AT expectations are handled by the platform-tag block below.
    }

    if (!testMethod) issues.push('The Context section does not end with a "Test Method:" line.');

    // Context AT + Test Method rules. Automation issues are identified FIRST and
    // validated independently of the checkpoint-type rules (spec §12): AT must
    // not appear in the Context and the Test Method must be the axe DevTools
    // string — this prevents an Automation issue from being validated against a
    // checkpoint-type Test Method. Otherwise the checkpoint classification is
    // authoritative. (issueType — inferred from the submitted Test Method — is
    // used only by the older S6 step-consistency validation, not here.)
    const isAutomationIssue = /^autom/i.test(method);
    if (isAutomationIssue || checkpointType) {
      // AT presence is judged from the CONTEXT TEXT ONLY (the Assistive
      // Technology / Screen Reader line, or an AT name in the Context). The CSV
      // "Assistive technology" column is deliberately NOT consulted — real
      // exports populate it regardless, so it produced false positives.
      const contextMetadata = contextText.split('\n').filter(line => !/^\s*Test Method\s*:/i.test(line)).join('\n');
      const namedAT = /\bnvda\b|\bjaws\b|\bnarrator\b|talk\s?back|voice\s?over/i.test(contextMetadata);
      const labelledAT = contextMetadata.match(/(?:assistive technology|screen reader)\s*:\s*([^\n]+)/i);
      const contextHasAT = namedAT || !!(labelledAT && !isMeaningless(labelledAT[1]));

      if (isAutomationIssue) {
        if (contextHasAT) {
          issues.push('Assistive Technology must not be provided in the Context for an Automation issue.');
        }
        // Tolerant: the Automation Test Method must name axe DevTools (any phrasing).
        if (testMethod && !/axe\s*dev\s*tools/i.test(testMethod)) {
          issues.push(`Invalid Test Method for Automation issue. Expected: "Test Method: ${AUTOMATION_TEST_METHOD}".`);
        }
      } else {
        // Checkpoint type can depend on the platform (e.g. 2.1.1 is Keyboard on
        // desktop / Android but a Screen Reader checkpoint on iOS). Resolve the
        // platforms first, then the type per platform, then apply the AT rule and
        // the Test Method for each. A Platform line may name several platforms;
        // the Test Method is then a comma-separated list, one entry per platform,
        // and EVERY listed platform must be covered by a tolerant-matching entry.
        const methodPlatforms = matrixPlatformsFor(rawPlatform, osVal, atVal);
        const platformsToCheck = methodPlatforms.length ? methodPlatforms : [checkpointPlatform(platform, osVal, atVal)];
        const tmEntries = String(testMethod || '').split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);
        const perPlatform = platformsToCheck.map(p => ({ p, type: resolveCheckpointType(checkpoint, p) }));

        // Assistive Technology rule (per platform → aggregate): Screen Reader
        // requires AT in the Context; every other type forbids it. When platforms
        // disagree (a mixed issue), a Screen-Reader platform's requirement wins
        // and the "no AT" side is not additionally flagged.
        const requiresAT = perPlatform.some(x => x.type === 'Screen Reader');
        const forbidType = (perPlatform.find(x => x.type && x.type !== 'Screen Reader') || {}).type;
        if (requiresAT && !contextHasAT) {
          issues.push('Assistive Technology is required in the Context for Screen Reader checkpoints.');
        } else if (!requiresAT && forbidType && contextHasAT) {
          issues.push(`Assistive Technology must not be provided in the Context for ${forbidType} checkpoints.`);
        }
        if (!requiresAT && forbidType && AT_REFERENCE_RE.test(testMethod || '')) {
          issues.push(`Assistive Technology must not be used in the Test Method for ${forbidType} checkpoints.`);
        }

        perPlatform.forEach(({ p, type }) => {
          const expected = type ? expectedTestMethod(type, p) : null;
          if (!expected) {
            issues.push(`No Test Method rule is currently defined for ${type || 'this'} checkpoints on ${p}. Do not infer or invent a Test Method.`);
            return;
          }
          if (!testMethod) return;   // a missing Test Method line is flagged separately above
          const cls = tmEntries.map(e => classifyTestMethodEntry(e, type, p));
          if (cls.some(c => c.code === 'ok')) return;                 // this platform is covered
          const miss = cls.find(c => c.code === 'missing-suffix');
          if (miss) {
            // Screen Reader: right environment + screen-reader named, only the
            // trailing wording is missing — give the specific guidance.
            const msg = `${miss.suffixLabel} is missing after ${miss.tool} in the Test Method for ${p}.`;
            if (!issues.includes(msg)) issues.push(msg);
          } else {
            issues.push(`Invalid or missing Test Method for ${type} checkpoint on ${p}. Expected: "${expected}".`);
          }
        });
      }
    }

    // Desktop Web only: the Summary prefix declares which environment(s) were
    // tested, and the Context must match — Windows→Windows/Chrome,
    // MAC→macOS/Safari, both→both. Mobile Web and native use no prefix.
    if (platform === 'Web') {
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
        envAllowed = l => l.includes('version tested') || l.includes('app version') || l === 'authentication state';
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

    // 3.3.2 (Labels or Instructions) needs no Assistive Technology — flag any AT
    // referenced anywhere in the Context, including the Test Method line.
    if (is332 && AT_REFERENCE_RE.test(contextText)) {
      issues.push('Context should not have Assistive Technology, also in the Test Method (e.g. NVDA, VoiceOver, TalkBack).');
    }

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
    const mentionsScreenReaderTurnOn = /turn on (the )?(screen reader|nvda|voice ?over|talkback|jaws|narrator)/.test(t1);
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

    // 3.3.2 (Labels or Instructions) needs no Assistive Technology: no test step
    // should enable it, whatever the Test Method classified the issue as. This
    // overrides the issue-type expectation above.
    if (is332 && AT_REFERENCE_RE.test(steps.map(s => s.text).join('\n'))) {
      ok = false;
      note = 'Step 1 should not start with "Turn on screen reader".';
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

  // 11. Automation Summary validation (detailed) — automation issues only.
  // Automation is read from the Method column (tolerant of "Automated" /
  // "Automation" spellings). Manual issues are not summary-checked.
  checks.push(buildSummaryCheck('S11', 'Summary validation', summary, checkpoint, method, true, desc));

  // 12. Required fields present + meaningful content — conditional by audit type.
  // The audit type is the tool's existing deterministic platform classification
  // (`native`), derived from the Environment "Platform:" line — never inferred
  // from issue wording, remediation, WCAG criterion, or the presence of a field.
  //   • Web:    Code Snippet REQUIRED; Resource Link OR Reference REQUIRED.
  //   • Native: Code Snippet NOT required; Resource Link OR Reference REQUIRED.
  (function () {
    const sections = splitSections(desc);
    const required = native
      ? ['Environment', 'Context', 'Steps to reproduce', 'Expected results',
         'Actual results', 'Affected user population', 'Applicable WCAG Success Criterion',
        'Remediation Recommendation', 'Screen Name']
      : ['Environment', 'Context', 'Steps to reproduce', 'Expected results',
         'Actual results', 'Affected user population', 'Applicable WCAG Success Criterion',
        'Code Snippet', 'Remediation Recommendation', 'Screen Name'];
    const problems = [];
    required.forEach(name => {
      // Remediation Recommendation: structural validation only (see the helper).
      if (name === 'Remediation Recommendation') {
        const p = remediationFieldProblem(sections, desc);
        if (p) problems.push(p);
        return;
      }
      const content = fieldContent(sections, desc, name);
      if (!content) {
        problems.push(`${name} is missing.`);
      } else if (isMeaningless(content)) {
        problems.push(`${name} has no meaningful content ("${content.replace(/\s+/g, ' ').slice(0, 40)}").`);
      }
    });
    // S12 accepts either link label on every platform. At least one must have
    // non-empty content; S8 separately validates the Web label convention.
    {
      const rlOk = !!fieldContent(sections, desc, 'Resource Link').trim();
      const refOk = !!referenceFieldContent(desc).trim();
      if (!rlOk && !refOk) {
        const anyLabel = /^\s*(?:Resource Link|References?)\s*:/im.test(desc);
        problems.push(anyLabel
          ? 'Resource Link or Reference is empty.'
          : 'Resource Link or Reference is missing.');
      }
    }
    if (problems.length) {
      checks.push({ id: 'S12', name: 'Required fields', status: 'fail', note: problems.join(' '), notes: problems });
    } else {
      checks.push({ id: 'S12', name: 'Required fields', status: 'pass', note: 'All required fields are present with meaningful content.' });
    }
  })();

  // 13. Colour-contrast Actual Results details (colour-contrast issues only)
  (function () {
    const mapEntry = (findSummaryMapping(summary, checkpoint) || {}).entry || null;
    if (!isColorContrastIssue(summary, checkpoint, mapEntry)) {
      checks.push({ id: 'S13', name: 'Color contrast', status: 'na', note: 'Not a colour-contrast issue.' });
      return;
    }
    const sections = splitSections(desc);
    const actual = fieldContent(sections, desc, 'Actual results');
    if (!actual) {
      checks.push({ id: 'S13', name: 'Color contrast', status: 'fail', note: 'Actual Results is missing, so the colour-contrast details could not be found.' });
      return;
    }
    if (/\[\s*placeholder/i.test(actual)) {
      checks.push({
        id: 'S13', name: 'Color contrast', status: 'fail',
        note: 'Actual Results still contains an unfilled "[PLACEHOLDER … CONTRAST DETAILS]" marker — add the real foreground colour, background colour, and contrast ratio.',
      });
      return;
    }
    const hasColorValue = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/i.test(actual);
    const hasFg = hasColorValue || /(foreground|text colou?r|link text colou?r|link colou?r|focus indicator colou?r|foreground colou?r)/i.test(actual);
    const hasBg = hasColorValue || /(background colou?r|surrounding (?:text )?colou?r|adjacent colou?r|background)/i.test(actual);
    const hasRatio = /(contrast ratio|ratio\s*[:=]|\b\d+(?:\.\d+)?\s*:\s*1\b)/i.test(actual);
    const missing = [];
    if (!hasFg) missing.push('Foreground / text colour');
    if (!hasBg) missing.push('Background colour');
    if (!hasRatio) missing.push('Contrast ratio');
    if (missing.length) {
      checks.push({
        id: 'S13', name: 'Color contrast', status: 'fail',
        note: 'Actual Results do not include ' + missing.join(', ') + '.',
        notes: ['Colour-contrast details are missing from Actual Results.'].concat(missing.map(m => `Missing: ${m}`)),
      });
    } else {
      checks.push({ id: 'S13', name: 'Color contrast', status: 'pass', note: 'Actual Results include the foreground colour, background colour, and contrast ratio.' });
    }
  })();

  // 14. Native recommendation vs authoritative Excel reference (native only).
  // Deterministic lookup: platform → tab → checkpoint + Summary(Issue Description)
  // → Recommendation to fix, then a formatting-normalised comparison against the
  // audit's Remediation Recommendation — the field must EQUAL or START WITH an
  // authoritative reference (trailing per-issue notes are allowed). No semantic
  // matching, no cross-platform fallback, no closest-match; a broken mapping is
  // reported as an ERROR rather than guessed. "RULE"/"BACKGROUND" must not appear.
  (function () {
    if (!native) {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'na', note: 'Only applies to Native app issues.' });
      return;
    }
    const platformKind = resolveNativePlatform(platform, osVal, atVal);
    if (!platformKind) {
      checks.push({
        id: 'S14', name: 'Native recommendation', status: 'fail',
        note: 'ERROR – The Native platform (iOS or Android) could not be determined from the audit metadata, so the recommendation could not be validated.',
      });
      return;
    }
    const tabName = platformKind === 'iOS' ? 'native iOS' : 'native Android';
    const lookup = findNativeRecommendation(platformKind, checkpoint, summary);
    if (lookup.status === 'no-data') {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'na', note: 'The Native recommendation reference is not loaded, so the recommendation could not be validated.' });
      return;
    }
    if (lookup.status === 'no-checkpoint') {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'fail', note: 'ERROR – The issue has no Checkpoint, so the Native recommendation could not be looked up.' });
      return;
    }
    if (lookup.status === 'checkpoint-not-found') {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'fail', note: `ERROR – Checkpoint "${checkpoint}" was not found in the "${tabName}" reference tab.` });
      return;
    }
    const rows = lookup.rows;
    const pinned = lookup.pinned;
    const cpId = (pinned || rows[0]).checkpoint;
    const sectionsN = splitSections(desc);
    const actual = fieldContent(sectionsN, desc, 'Remediation Recommendation') || fieldContent(sectionsN, desc, 'Recommendation to fix');
    const mkDetail = (expected, issueDescription, matchMode) => ({
      platform: platformKind, tab: tabName, checkpoint: cpId,
      issueDescription: issueDescription || null, expected, actual,
      variantCount: rows.length, matchMode,
    });
    if (!actual) {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'na', note: 'N/A – Remediation Recommendation is missing; S12 reports the missing required field.' });
      return;
    }
    if (/^\s*RULE\b/im.test(actual)) {
      const exp = (pinned || rows[0]).recommendation;
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'fail', note: 'FAIL – Recommendation to fix contains a "RULE" section, which must be removed.', detail: mkDetail(exp, (pinned || {}).issueDescription, pinned ? 'row' : 'any') });
      return;
    }
    if (/^\s*BACKGROUND\b/im.test(actual)) {
      const exp = (pinned || rows[0]).recommendation;
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'fail', note: 'FAIL – Recommendation to fix contains a "BACKGROUND" section, which must be removed.', detail: mkDetail(exp, (pinned || {}).issueDescription, pinned ? 'row' : 'any') });
      return;
    }
    const na = normRec(actual);
    // The authoritative recommendation must be present verbatim, but the ticket
    // may append extra per-issue content (e.g. a "Note: applicable screens"
    // list). So a reference matches when the field EQUALS it or STARTS WITH it.
    const refMatches = (rec) => {
      const recommendationBody = value => normRec(value).split(/\n\s*REFERENCE\s*:\s*/i)[0].trim();
      const actualAlternatives = recommendationBody(actual).split(/\n\s*OR\s*\n/i).map(s => s.trim()).filter(Boolean);
      const expectedAlternatives = recommendationBody(rec).split(/\n\s*OR\s*\n/i).map(s => s.trim()).filter(Boolean);

      return actualAlternatives.some(actualBody => expectedAlternatives.some(nr => {
        if (actualBody === nr || actualBody.startsWith(nr)) return true;

        // Permit up to two omitted words in the submitted recommendation, while
        // requiring every submitted word to remain in the authoritative order.
        const expectedWords = nr.toLowerCase().match(/[a-z0-9]+(?:['’][a-z0-9]+)*/g) || [];
        const actualWords = actualBody.toLowerCase().match(/[a-z0-9]+(?:['’][a-z0-9]+)*/g) || [];
        let actualIndex = 0;
        let omitted = 0;
        for (const expectedWord of expectedWords) {
          if (actualIndex < actualWords.length && expectedWord === actualWords[actualIndex]) {
            actualIndex++;
          } else {
            omitted++;
          }
        }
        return actualIndex === actualWords.length && omitted <= 2;
      }));
    };
    if (pinned) {
      // Summary confidently identified the exact row → compare against it only.
      const ok = refMatches(pinned.recommendation);
      checks.push(ok
        ? { id: 'S14', name: 'Native recommendation', status: 'pass', note: `The Recommendation to fix matches the authoritative "${tabName}" reference for checkpoint ${cpId}.`, detail: mkDetail(pinned.recommendation, pinned.issueDescription, 'row') }
        : { id: 'S14', name: 'Native recommendation', status: 'fail', note: `FAIL – Recommendation to fix does not match the authoritative "${tabName}" reference for checkpoint ${cpId}.`, detail: mkDetail(pinned.recommendation, pinned.issueDescription, 'row') });
      return;
    }
    // Summary didn't identify a specific row → accept a match against any
    // authoritative row for this platform + checkpoint.
    const match = rows.find(r => refMatches(r.recommendation));
    if (match) {
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'pass', note: `The Recommendation to fix matches an authoritative "${tabName}" reference for checkpoint ${cpId}.`, detail: mkDetail(match.recommendation, match.issueDescription, 'any') });
    } else {
      const note = rows.length > 1
        ? `FAIL – Recommendation to fix does not match any of the ${rows.length} authoritative "${tabName}" references for checkpoint ${cpId}.`
        : `FAIL – Recommendation to fix does not match the authoritative "${tabName}" reference for checkpoint ${cpId}.`;
      checks.push({ id: 'S14', name: 'Native recommendation', status: 'fail', note, detail: mkDetail(rows[0].recommendation, rows[0].issueDescription, 'any') });
    }
  })();

  return {
    platform: platform || 'Unknown',
    native,
    issueType,
    checkpointType,
    method,
    checks,
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runChecks, splitSections, isMeaningless, findSummaryMapping, isColorContrastIssue,
    resolveNativePlatform, normCheckpoint, normRec, findNativeRecommendation,
    classifyCheckpoint, resolveCheckpointType, expectedTestMethod, checkpointPlatform, matrixPlatformsFor,
    testMethodMatches, classifyTestMethodEntry, TEST_METHOD_MATRIX, AUTOMATION_TEST_METHOD,
  };
}
