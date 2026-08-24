# Checkpoint → Type Classification

Authoritative mapping of WCAG Success Criteria to the checkpoint **type** used by
the sanity checker's Context / Test-Method validation (check **S5**). This list is
the source of truth; it is mirrored verbatim by the `CHECKPOINT_TYPES` object in
[`checks.js`](checks.js) and enforced by `classifyCheckpoint()`. A guard test in
`tests.js` asserts the code still matches this document.

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
- 3.3.2.b
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
- 3.1.2
- 3.2.6
- 3.3.2.a
- 3.3.2.c
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
- **2.1.1 exception**: normally Keyboard, but when the checkpoint label reads
  "…action cannot be performed with a screen reader turned on" it is treated as
  Screen Reader.
- **Automation** is not a checkpoint type: an automation issue is identified first
  from the Method column and validated against the axe DevTools Test Method,
  regardless of the checkpoint's type.
- **Unlisted Success Criteria** classify as `null` — S5 does not apply a
  checkpoint-type Test-Method rule to them (other checks still run).
- Checkpoint ids are matched tolerantly of the full WCAG label form the audits use,
  e.g. `Name, Role, Value (4.1.2.a)` resolves to `4.1.2`.
