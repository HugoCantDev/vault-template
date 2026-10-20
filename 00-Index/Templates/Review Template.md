---
title: REV-<YYYY-MM-DD>-<letter>
type: review-record
layer: review
status: PUSHED
review_id: REV-<YYYY-MM-DD>-<letter>
date: <YYYY-MM-DD>
branch: <branch>
commit: <short sha on origin>
verdict: <PASS, FAIL or null if no review was made>
reviewer: <the review agent or person, or null>
approved_by: <the owner, or null>
---

> `status: PUSHED` gives the location of this record. It does not give a pass. Read `verdict`.

# REV-<YYYY-MM-DD>-<letter> - <one-line title of the change>

## Files

| File | Change | Last reviewer |
| --- | --- | --- |
| `<path>` | added, modified or deleted | <reviewer> |

## Developer notes

**What this does.** One paragraph.

**What was tested.** The test runs and their results. Give the command and the count.

**What was not tested.** Each gap. Write "Nothing" only if that is true.

## Review findings

| Rule | File and line | Finding | Severity | Outcome |
| --- | --- | --- | --- | --- |
| <rule id> | `<path>` **L12** | one sentence | BLOCK, FIX or NOTE | fixed, accepted or deviation |

## Deviations

Each rule that the change breaks on purpose, with the reason and the approver. Copy each row to
the open deviation ledger in [[Review Log]].
