---
title: Vault Rules
type: reference
layer: overview
status: VERIFIED
---

# Vault Rules

How to use this vault, how to add to it, and how to keep it correct. Read this note before you
write your first note. The text is in ASD-STE100 Simplified Technical English.

Replace each `<placeholder>` when you make a new vault. [[Building a New Vault]] gives the
steps.

## 1. What this vault is

This vault is a graph of the `<Project>` codebase. There is one note for each class, model,
controller and feature that a reader must know.

Each note gives the behavior of the code as it is now. A note is not a changelog. Do not keep a
record of old behavior in a note. If the code changes, change the note.

[[Drift Sweep Log]] keeps the record of the checks. It gives the date of each check and the
commit that the vault was checked against.

## 2. How to find a note

1. Start at [[README]]. It has one line for each note in the vault.
2. If you know the class name, type it in the Obsidian search box. Each note name is unique.
3. If you know the source file, use the folder tree. The folder agrees with the source path.

## 3. Rule 1 -- the folder comes from the `path:` field

Each code note has a `path:` field. The field gives the source file, relative to
`<SourceRoot>/`. The folder of the note must agree with that path.

| `path:` starts with | Put the note in |
| --- | --- |
| `<Folder>/` | `<Folder>/` -- the default: the vault copies the source tree |
| `<GroupedFolder>/<dir>/` | `<GroupedFolder>/<subsystem>/` -- only for a folder that the linter groups |
| `<OtherFolder>/` | `<VaultFolder>/` -- only for a folder that the linter renames |

Copy the source tree where you can. Group or rename a folder only if a direct copy gives many
folders with one to three notes each. Write each group and each rename in the linter
configuration and in this table.

A note of type `layer-overview`, `feature`, `incident-report`, `plan`, `work-item` or
`review-record` goes in a fixed folder. The type decides the folder, not the `path:` field:

| `type:` | Put the note in |
| --- | --- |
| `layer-overview` | `01-Overviews/` |
| `feature` | `02-Features/` |
| `incident-report` | `03-Incidents/` |
| `plan`, `work-item` | `04-Plans/` |
| `review-record` | `05-Reviews/` |

The rule has one large advantage: to file a note, you read one field. You do not make a
judgement. A note in the wrong folder is drift, and the linter finds it.

## 4. Rule 2 -- a link gives the note name only

Correct: `[[ExampleComponent]]`

Wrong: `[[Components/ExampleComponent]]`

Each note name is unique in the vault. Because the name is unique, a short link resolves from
any folder. You can then move a note to a different folder and no link breaks.

## 5. Rule 3 -- each note has the same fields

Copy a template from [[Note Template]] when you make a new note.

| Field | What it gives | Necessary |
| --- | --- | --- |
| `title` | the class name, or the name of the note | yes |
| `type` | see the list below | yes |
| `layer` | the subsystem, from the closed list below | yes |
| `path` | the source file, relative to `<SourceRoot>/` | yes, for a code note |
| `status` | see the table in section 7 | yes |
| `log_prefix` | the log prefix that this code writes, for example `[LANE-DIAG]` | if there is one |
| `flags` | the feature flags that gate this code | if there are some |
| `verified_against_commit` | the commit that you read the source at | yes, if the status is `VERIFIED`, `VERIFIED-WITH-CAVEAT` or `DRIFT` |
| `verified_against_branch` | the branch that you read the source at | the same as above |
| `verified_against_date` | the date of your read, as `YYYY-MM-DD` | the same as above |

Values for `type`: `component`, `model`, `layer-overview`, `feature`, `incident-report`,
`plan`, `work-item`, `review-record`, `reference`.

Values for `layer`: `<layer-1>`, `<layer-2>`, `frontend`, `overview`, `incident`, `plan`,
`review`. The linter keeps the same list.

Do not add a new `layer` value on your own. The list agrees with the folder names. If the code
gets a new subsystem, add the folder and the value together, and tell the team.

## 6. Rule 4 -- stamp each note that you change

The stamp lets a later reader find drift with one command. Do these steps each time you write
or verify a note:

1. Read the source file. Do not write from memory.
2. Get the commit number:
   ```bash
   git -C <path-to-repo> rev-parse --short HEAD
   ```
3. Get the branch name:
   ```bash
   git -C <path-to-repo> branch --show-current
   ```
4. Write the three `verified_against_` fields in the note.

CAUTION: Do not write a commit number that you did not see in the output of the command. A wrong
stamp makes a stale note look current, and the next reader trusts it.

## 7. Rule 5 -- give the correct status

For a code note, a feature, an overview, an incident and a reference note:

| Status | Use it when |
| --- | --- |
| `VERIFIED` | you read the source and each line number in the note is correct |
| `VERIFIED-WITH-CAVEAT` | you read the main parts, but not all of them. Say what you did not read |
| `DRIFT` | you know the note disagrees with the code, and you cannot correct it now |
| `SKELETON` | the note has the structure only. It has no content yet |
| `UNKNOWN` | you cannot cite a line. Say so, and do not guess |

For a plan and a work item:

| Status | Use it when |
| --- | --- |
| `PROPOSED` | the plan waits for a decision |
| `APPROVED` | the owner approved the plan, and no work started |
| `IN-PROGRESS` | some of the work is on origin |
| `DONE` | all of the work is on origin. Move the facts into the code notes |
| `SUPERSEDED` | a different plan replaced it. Link the new plan at the top |
| `REJECTED` | the owner said no. Give the reason at the top |

A review record has the status `PUSHED` only, because it comes into the vault after the push.

If you cannot cite a line number, write `UNKNOWN`. A guess is worse than an empty note.

## 8. Rule 6 -- write a note only after the code is on origin

Do not document work that is only in your local tree. Wait until the commit is on origin. Then
write the note.

**Why:** the team uses this vault as a source of truth. A note about untested code that never
lands sends the next reader to code that does not exist.

A plan is the one exception. A plan describes work that does not exist yet, so it goes in
`04-Plans/` and its status tells the reader that.

## 9. Rule 7 -- split a note that becomes too large

A note above 40 KB costs too much to open, for a person and for an agent. The linter fails on
it. Split it.

1. Keep the original file name. It becomes the hub. Every link to it stays correct.
2. Keep in the hub: the summary, the main loop, the callers, and a `## Sections` list.
3. Move each large section into a child note, named `<Hub> - <Section>`.
4. Give each child the same `path:`, `type:` and `layer:` as the hub. The child then stays in the
   correct folder.
5. Start each child with one line: `> Split out of [[<Hub>]].`
6. Add a link to each child in the `## Sections` list of the hub.

A log note, for example [[Drift Sweep Log]], splits by date range. Keep the newest entries in
the original note, and move the old entries into `<Log> - <first date> to <last date>`.

## 10. Rule 8 -- keep large text out of the frontmatter

Obsidian reads the frontmatter each time it opens a note. A long field makes every read
expensive. Keep the frontmatter to the fields in section 5. Put a long history in the body of
the note, or in a child note.

## 11. How to add a new note

1. Copy a template from [[Note Template]].
2. Give the file the name of the class. Do not add a number in front of the name.
3. Make sure the name is unique in the vault. Obsidian shows you if it is not.
4. Fill in the frontmatter. Use the `path:` field to find the folder, as in section 3.
5. Write the body. Cite a line number for each claim about the code.
6. Link the callers above this class, and the classes that it calls.
7. Add one line for the note in the map in [[README]], in the group of its folder.
8. Run the linter, as in section 13.

## 12. How to rename or remove a note

The file name is the link identity. If you change the name, each link to the old name breaks.

1. Rename the file in Obsidian, not in the file manager. Obsidian repairs the links for you.
2. If you rename outside Obsidian, search the vault for the old name and correct each link.
3. To remove a note, first look at its backlinks. Correct each one. Then delete the file.
4. Correct the line for the note in [[README]].

## 13. How to check the vault

Run the linter from the vault folder:

```bash
node 00-Index/vault-verify.js
```

| Line | What a value above 0 means |
| --- | --- |
| `folder-qualified` | a link gives a folder. Correct it to the note name only, as in section 4 |
| `broken targets` | a link points at a note that does not exist. Correct the name, or make the note |
| `orphans` | no note links to this note. Add a link, usually a line in [[README]] |
| `misfiled vs path:` | the folder does not agree with the `path:` or `type:` field. Move the note, or correct the field |
| `bad frontmatter` | a field is missing, or a value is not in the lists of section 5 and section 7 |
| `oversize` | the note is above 40 KB. Split it, as in section 9 |

The linter prints `PASS` or `FAIL`, and it exits with 1 on a failure. Run it before you give the
change to the owner. Each count must be 0.

The linter does not look inside a code fence or a code span, because Obsidian does not make a
link there. To show an example of a link in a note, put the example in backticks.

The linter does not read the links in `00-Index/Templates/`. A template has placeholder links
that point at no note.

## 14. How to do a drift sweep

A drift sweep is a check of the vault against the code. Do it after a large change lands.

1. For each note, read the `path:` and `verified_against_commit` fields.
2. Run this command:
   ```bash
   git -C <path-to-repo> log --oneline <commit>..HEAD -- <SourceRoot>/<path>
   ```
3. If there are no commits, the note is still correct. Do nothing.
4. If there are some commits, read the source again. Correct the note. Write a new stamp.
5. Add one entry to [[Drift Sweep Log]]. Give the date, the commit, and what you read.

Do not write in [[Drift Sweep Log]] what the code does. Write only what you checked, and what you
did not check.
