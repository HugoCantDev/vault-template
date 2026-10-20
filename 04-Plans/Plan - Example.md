---
title: Plan - Example
type: plan
layer: plan
status: PROPOSED
created: 2026-10-19
owner: <owner>
---

# Plan - Example

Example plan note. It shows the shape of a note from [[Plan Template]]. A plan describes work
that is not on origin yet, so its status comes from the plan list in [[Vault Rules]] section 7.

## Why

[[Incident - Example]] shows that a request with no id can stop the queue.

## What already exists

[[ExampleComponent]] already checks the id. The plan reuses that check.

## The change

| Step | What changes | Files | Proof that it works |
| --- | --- | --- | --- |
| 1 | Call the check from the second entry point | `Components/ExampleComponent.cs` | one unit test |

## Not in this plan

A new validation framework.
