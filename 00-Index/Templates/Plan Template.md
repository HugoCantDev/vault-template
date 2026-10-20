---
title: Plan - <Short Name>
type: plan
layer: plan
status: PROPOSED
created: <YYYY-MM-DD>
owner: <the person who approves>
verified_against_commit: <short sha that the plan read>
verified_against_branch: <branch>
verified_against_date: <YYYY-MM-DD>
---

# Plan - <Short Name>

One paragraph. Say the problem and the change that this plan proposes.

## Why

The evidence for the problem. Cite the code, the logs or the incident note. Do not give an
opinion as a fact.

## What already exists

The code that the plan reuses. Link each note. A plan that builds a second copy of an existing
tool must say why.

## The change

| Step | What changes | Files | Proof that it works |
| --- | --- | --- | --- |
| 1 | <change> | `<path>` | <test or measurement> |

## Not in this plan

What the plan does not do, and why. This list stops scope creep.

## Decisions still open

| Decision | Options | Who decides |
| --- | --- | --- |
| <question> | <A or B> | <owner> |

## Result

Leave this section empty until the work is on origin. Then give the commit, and move the facts
into the code notes.
