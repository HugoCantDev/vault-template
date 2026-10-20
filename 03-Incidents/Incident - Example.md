---
title: Incident - Example
type: incident-report
layer: incident
status: SKELETON
---

# Incident - Example

> **The guard**: [[ExampleComponent]] refuses a request with no id (**L41-L45**).

Example incident note. It shows the shape of a note from [[Incident Template]].

## What the operator saw

A request with no id stopped the queue for ten minutes.

## Why it happened

No layer checked the id before the database write.

## Log markers

- `[EXAMPLE] rejected: no id` -- written by `ExampleComponent` **L43**.

## What is still open

Nothing.
