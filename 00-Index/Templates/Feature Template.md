---
title: <Feature Name>
type: feature
layer: <frontend or the main backend layer>
path: <the main source file of the feature>
status: VERIFIED
flags: [<SettingsClass.FlagName>]
verified_against_commit: <short sha>
verified_against_branch: <branch>
verified_against_date: <YYYY-MM-DD>
---

# <Feature Name>

One paragraph. Say what the user sees, where they see it, and what problem it solves.

**Frontend**: `<path to the page or component>`.
**Backend**: `<path to the controller or service>`.

## What the user can do

| Action | Where | Result |
| --- | --- | --- |
| <action> | <page, button or route> | <what changes> |

## How it works

The path from the user action to the data. Cite a line number for each step.

1. `<Component>` **L88** calls `GET <route>`.
2. [[<Controller>]] **L40** gives the call to [[<Service>]].

## Settings and flags

| Setting | Default | Effect |
| --- | --- | --- |
| `<Key>` | `<value>` | one sentence |

## Limits

What the feature does not do, and why. A reader must not have to find a limit in the code.

## See also

- [[<Related note>]] -- one sentence.
