---
title: Building a New Vault
type: reference
layer: overview
status: VERIFIED
---

# Building a New Vault

How to make a new codebase vault from this template. The style comes from the SpaceMaker Dev
Vault. That vault documents a backend of about 500 notes. The rules in [[Vault Rules]] come from
the problems that it had. This note gives the steps, the decisions, and the reason for each rule.

## 1. The principles

Keep these principles in each vault. They are the style. The rest is configuration.

| Principle | Why |
| --- | --- |
| One note for each code unit, named as the unit | A reader finds a note by the class name, with no index |
| A note gives the code as it is now | A changelog in a note hides the current behavior under old text |
| The code wins | A note that disagrees with the code is drift. Correct the note, not the code |
| One field decides the folder | Filing needs no judgement, and the linter finds a misfiled note |
| A link gives the note name only | Notes can move to a new folder with no broken link |
| Each claim cites a line | A reader can check a claim in one step. A claim with no line is a guess |
| Each note has a commit stamp | One `git log` command shows if a note is stale |
| A note follows the push | The vault never describes code that does not exist on origin |
| The linter is the gate | Each rule that a person can forget, the linter checks |
| The text is in STE | Short, clear sentences are easy to read for each reader and for an agent |
| The vault is the one entry point | A document that lives outside the vault gets a pointer note |

## 2. Decisions to make before you start

| Decision | Example | Where it goes |
| --- | --- | --- |
| The repository and the branch that the vault follows | `yusen`, `development` | [[README]] header, [[Vault Rules]] section 6 |
| The source root that `path:` is relative to | `Anyware/` | [[README]], [[Vault Rules]] section 3, `SOURCE_PREFIX` in the linter |
| The owner who approves a note before it ships | Hugo | [[Vault Rules]] section 8 |
| The folders that copy the source tree, and the folders that group or rename | `Services/` grouped by subsystem | [[Vault Rules]] section 3, `GROUPED` and `RENAMED` in the linter |
| The closed list of `layer` values | `lane`, `routing`, `opc` | [[Vault Rules]] section 5, `LAYERS` in the linter |
| The review process, if there is one | standards review records | `05-Reviews/`, [[Review Log]] |

If you do not know the answer to a decision, copy the source tree with no groups. Add a group
later, when a folder holds many small notes.

## 3. The procedure

1. Copy the folder `Template Vault` to the new location. Give it the name of the new vault.
2. Open the folder as a vault in Obsidian. The settings in `.obsidian/` load with it.
3. Replace each `<placeholder>` in [[README]] and [[Vault Rules]]. Search the vault for `<` to
   find them.
4. Set the configuration block at the top of `00-Index/vault-verify.js`:
   1. Set `SOURCE_PREFIX` to the source root.
   2. Add each grouped folder to `GROUPED`.
   3. Add each renamed folder to `RENAMED`.
   4. Replace the example values in `LAYERS` with the closed list.
5. Make one folder for each source folder that will get notes. Delete the `Components/` folder.
6. Write `00 - <System> Overview` first. It is the top of the graph, and each other note links
   up to it.
7. Write the code notes for one layer. Use [[Component Template]]. Read the source for each note.
8. Write the overview of that layer. Use [[Overview Template]]. Link each code note.
9. Add one line for each note in [[README]].
10. Delete the example notes and their lines in [[README]]: [[00 - System Overview]],
    [[Example Feature]], [[Incident - Example]], [[Plan - Example]], [[REV-EXAMPLE-A]] and
    [[ExampleComponent]].
11. Delete the example rows in [[Drift Sweep Log]] and [[Review Log]].
12. Write the first entry in [[Drift Sweep Log]]. Give the commit that you read.
13. Run the linter. Correct each finding until it prints `PASS`.
14. Give the vault to the owner for approval. Do not commit it yourself.
15. Delete this note, or keep it as the record of how the vault was made.

CAUTION: Do not write the notes from memory or from an old document. Read the source for each
note. A vault with guessed content is worse than an empty vault, because the reader trusts it.

## 4. What to keep, and what to change

| Keep the same in each vault | Change for each vault |
| --- | --- |
| The numbered folders `00-Index` to `05-Reviews` | The code folders |
| The frontmatter field names | The `layer` values |
| The status values | The source root and the branch |
| The bare-name link rule | The grouped and renamed folders |
| The line citation style **L123** | The note types for code, if the language needs more |
| The 40 KB split rule | The owner |
| The linter checks | The pointer notes in `00-Index` |

If a vault does not need reviews, delete `05-Reviews/`, [[Review Log]] and the
`review-record` type. Remove them from the linter too.

## 5. Mistakes that the Dev Vault made

Each rule in [[Vault Rules]] came from one of these mistakes. Do not make them again.

| Mistake | Result | The rule now |
| --- | --- | --- |
| Links with a folder in front, 4565 of them | The folder tree could not change | Section 4, the `folder-qualified` check |
| Notes filed by judgement | The same kind of note went to three folders | Section 3, the `misfiled` check |
| A 9 KB `caveat:` field in the frontmatter | Each open of the note was slow | Section 10 |
| Notes above 40 KB | An agent used too much context to read one note | Section 9, the `oversize` check |
| A changelog in the body of a note | The current behavior was hard to find | Section 1 |
| A commit stamp that nobody saw in a command | A stale note looked current | Section 6 |
| A note about local work that never landed | Readers looked for code that did not exist | Section 8 |
| The sweep history in [[README]] | The map was slow to open | [[Drift Sweep Log]] as its own note |
| Standards and skills copied into the vault | Two copies, and they disagreed | Pointer notes, [[External References]] |

## 6. How agents use the vault

An agent reads the vault the same way that a person does. Give each agent that writes notes
these instructions:

1. Read [[Vault Rules]] before the first note.
2. Start each note from a template in [[Note Template]].
3. Run the linter before the handover. Give the linter output in the handover.
4. Do not write a note about work that is not on origin.

A light agent can answer most questions from [[README]] and the overviews. Tell it to read the
code only to check a claim.

## 7. Settings in this template

| File | What it sets |
| --- | --- |
| `.obsidian/app.json` | Obsidian updates the links when you rename a note |
| `.obsidian/templates.json` | the Templates plugin reads `00-Index/Templates` |
| `.obsidian/core-plugins.json` | the plugins that the Dev Vault uses |
| `.obsidian/graph.json` | the graph shows orphans, so a missing link is visible |
| `.obsidian/snippets/FileWidth.css` | the text is 900 px wide, for wide tables |
| `.gitignore` | `workspace.json` stays out of git, because it changes each time you open a note |
