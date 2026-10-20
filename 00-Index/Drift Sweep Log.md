---
title: Drift Sweep Log
type: reference
layer: overview
status: VERIFIED
---

# Drift Sweep Log

When the vault was last checked against which commit. This is a verification log, not a
changelog of code changes. The notes themselves describe only current code. Newest first.

Write each entry from [[Drift Entry Template]]. [[Vault Rules]] section 14 gives the procedure.
When this note is near 40 KB, move the old entries into
`Drift Sweep Log - <first date> to <last date>` and link that note here.

## Archives

None yet.

## 2026-10-19 at `0000000` on `<branch>` (example entry, delete it)

**Scope.** The whole vault: [[ExampleComponent]].

**Method.** `git log --oneline 0000000..HEAD -- <SourceRoot>/Components/ExampleComponent.cs`.

| Result | Count | Notes |
| --- | --- | --- |
| No change since the stamp | 0 | |
| Corrected | 0 | |
| Marked `DRIFT` | 0 | |

**Not checked.** Nothing. The template has no real code.
