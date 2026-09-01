# Checkpoint → Type Classification

Authoritative mapping of WCAG Success Criteria to the checkpoint **type** used by
the sanity checker's Context / Test-Method validation (check **S5**). This file is
the source of truth and is **read at runtime**: [`checks.js`](checks.js) parses the
`## <Type>` sections and `- <id>` bullets below into the classification that
`classifyCheckpoint()` (and therefore S5) uses. Node reads it from disk on load;
the browser fetches it at startup (see [`script.js`](script.js)). An embedded copy
in `checks.js` (`DEFAULT_CHECKPOINT_TYPES`) is used only as a fallback when this
file cannot be read (e.g. opened from `file://`), and a guard test in `tests.js`
asserts that fallback — and this document — still match. Reclassifying a checkpoint
here changes S5's validation automatically; keep the format below (a `## Type`
heading followed by one bare `- <id>` per line) so the parser can read it.

The type selects which row of the Test-Method matrix applies (see
[`checks.js`](checks.js) `TEST_METHOD_MATRIX`) and whether Assistive Technology is
required in the Context (Screen Reader → required; every other type → not allowed).

## Screen Reader

- 1.1.1
- 1.3.1
- 2.4.4
- 2.4.6
- 2.5.3
- 3.1.1
- 3.1.2
- 3.3.2.b
- 3.3.2.c
- 3.3.3
- 4.1.2
- 4.1.3

## Visual

- 1.2.1
- 1.2.2
- 1.2.3
- 1.2.4
- 1.2.5
- 1.3.3
- 1.3.4
- 1.3.5
- 1.4.2
- 1.4.4
- 1.4.5
- 1.4.10
- 1.4.13
- 2.2.1
- 2.2.2
- 2.3.1
- 2.4.2
- 2.4.5
- 2.5.1
- 2.5.2
- 2.5.4
- 2.5.7
- 2.5.8
- 3.2.6
- 3.3.2.a
- 3.3.3
- 3.3.4
- 3.3.7
- 3.3.8

## Color

- 1.4.1
- 1.4.3
- 1.4.11

## Text Spacing

- 1.4.12

## Keyboard

- 2.1.1
- 2.1.2
- 2.1.4
- 2.4.1
- 2.4.3
- 2.4.7
- 2.4.11
- 3.2.1
- 3.2.2

## Notes

- **3.3.2 is split by sub-id**: `3.3.2.b` → Screen Reader, while `3.3.2.a` and
  `3.3.2.c` → Visual. A bare `3.3.2` (no sub-id) matches none of these and is left
  to the dedicated "3.3.2 needs no Assistive Technology" handling in S5/S6.
- **2.1.1 is platform-dependent**: Keyboard on Web and Android (Mobile Web /
  Native Android), but a **Screen Reader** checkpoint on **iOS Mobile Web** and
  **Native iOS** — on iOS it is verified with VoiceOver, so it requires Assistive
  Technology in the Context and uses the VoiceOver Test Method
  (`Safari on iPhone using VoiceOver screen reader` / `iPhone using VoiceOver
  screen reader`). Implemented by `resolveCheckpointType(checkpoint, platform)`.
- **2.1.1 text exception**: also treated as Screen Reader (on any platform) when
  the checkpoint label reads "…action cannot be performed with a screen reader
  turned on".
- **Automation** is not a checkpoint type: an automation issue is identified first
  from the Method column (`Automated`/`Automation`) **or from an axe DevTools Test
  Method**, and validated against the axe DevTools Test Method, regardless of the
  checkpoint's type. Assistive Technology is never required (and not allowed) for an
  automation issue — so a 4.1.2 automation issue is not held to the Screen-Reader
  "AT required" rule and passes with an empty Assistive Technology value.
- **Unlisted Success Criteria** classify as `null` — S5 does not apply a
  checkpoint-type Test-Method rule to them (other checks still run).
- Checkpoint ids are matched tolerantly of the full WCAG label form the audits use,
  e.g. `Name, Role, Value (4.1.2.a)` resolves to `4.1.2`.
