---
title: Review Log
type: reference
layer: overview
status: VERIFIED
---

# Review Log

One row for each change that has a review record, newest first. Read this note to answer the
question "is this codebase held to the standard?".

A record comes into `05-Reviews/` only after the commit is on origin. Before that, it stays in a
staging folder outside the repository. Write each record from [[Review Template]].

CAUTION: the `Status` column gives the location of the record. It does not give a pass. Read the
`Verdict` column for that. An empty verdict means that no review was made.

| Review | Date | Verdict | Files | BLOCK | FIX | Deviations | Status | Approved |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [[REV-EXAMPLE-A]] | 2026-10-19 | PASS | 1 | 0 | 0 | 0 | pushed | (example) |

## Open deviations

Each rule that a pushed change breaks on purpose. Remove a row when the code obeys the rule.

| Deviation | Rule | Where | Approved by |
| --- | --- | --- | --- |
| None | | | |

## Records that shipped without a review

Each change that went to origin with no independent review. Each row is a gap in the record,
not a pass. Remove a row when a review is made.

| Review | What was not done |
| --- | --- |
| None | |
