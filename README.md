---
title: <Project> - Map of Content
type: overview
layer: overview
status: SKELETON
---
# <Project> - Map of Content

> Living graph of the `<Project>` codebase. There is one note for each class, model, controller
> and feature that a reader must know to change the code safely.
>
> **Source of truth**: the `<repo>` repository, branch `<branch>`. Code notes cite paths
> relative to `<SourceRoot>/`. If a note disagrees with the code, the code wins and the note
> gets fixed.
>
> **Before you add or change a note, read [[Vault Rules]].** It is the one place the rules for
> this vault live. Start a new note from [[Note Template]].
>
> **When the vault was last checked against which commit**: [[Drift Sweep Log]]. That is a
> verification log, not a changelog. The notes themselves describe current code only.
>
> **To make a new vault in this style**, read [[Building a New Vault]] first. Then delete this
> quote block line and the example notes.

## Vault layout

A note lives in the folder that agrees with its own `path:` field, so filing needs no
judgement and a note in the wrong folder is visible drift.

| Folder | What lives here |
| --- | --- |
| `00-Index/` | the rules, the templates, the linter, the logs and the pointer notes |
| `01-Overviews/` | the system explained layer by layer; start here |
| `02-Features/` | shipped features, end to end, with the user surface that each one adds |
| `03-Incidents/` | what broke, why, and the guard that now prevents it |
| `04-Plans/` | proposed or in-flight work; not a description of current code |
| `05-Reviews/` | the review record for each change that reached origin; see [[Review Log]] |
| `Components/` | example code folder; replace it with folders that mirror `<SourceRoot>/` |

**Links are bare note names.** A wikilink names the note only, for example `[[ExampleComponent]]`,
never a form with a folder in front. Note names are unique in the vault, so links resolve from
any folder and notes can move to a new folder with no broken link.

## The map

### Index

> rules, templates, logs and pointers

- [[Vault Rules]] -- the rules for this vault; read before your first note
- [[Note Template]] -- the list of note templates and the rules that are easy to forget
- [[Building a New Vault]] -- how to make a new vault in this style from this template
- [[Drift Sweep Log]] -- when the vault was last checked against which commit
- [[Review Log]] -- one row for each review record, and the open deviation ledger
- [[External References]] -- pointer note for documents that live outside the vault

### Layered overviews

> the system explained layer by layer; start here

- [[00 - System Overview]] -- example overview: the top-level data flow in one diagram

### Features

> shipped features, end to end

- [[Example Feature]] -- example feature note: what the user sees and the code behind it

### Incidents

> what broke, why, and the guard that now prevents it

- [[Incident - Example]] -- example incident note: symptom, cause, guard, log markers

### Plans and work items

> proposed or in-flight work; not a description of current code

- [[Plan - Example]] -- example plan note: why, what exists, the steps, the non-goals

### Reviews

> one record for each change that reached origin

- [[REV-EXAMPLE-A]] -- example review record

### Components

> example code folder

- [[ExampleComponent]] -- example code note: one class, with line citations
