---
title: Start Here
type: reference
layer: overview
status: VERIFIED
---

# Start Here

This note tells you how to open this vault, how to find a note, and how to read a note. Read it
first. It takes about ten minutes. The text is in ASD-STE100 Simplified Technical English.

## 1. Which note to read first

There are three kinds of user. Find your kind in the table, then read the notes in that order.

| You want to | Read these notes, in this order |
| --- | --- |
| Learn how the code works | this note, [[README]], [[00 - System Overview]] |
| Write or correct a note | this note, [[Vault Rules]], [[Note Template]] |
| Make a vault for a brand-new project | this note, [[Building a New Vault]] sections 3 and 4, [[Example Prompts]] |
| Make a vault for an existing project | this note, [[Building a New Vault]] sections 3 and 5, [[Example Prompts]] |
| Get an agent to do a vault task | [[Example Prompts]] |

## 2. Open the vault

1. Install Obsidian from <https://obsidian.md>. The vault needs no community plugins.
2. Start Obsidian.
3. Select "Open folder as vault".
4. Select the vault folder, the folder that contains `README.md`.
5. If Obsidian asks if you trust the author, select "Trust author". The vault has no plugin code
   that runs, only settings for the core plugins.
6. Open [[README]] from the file tree.

The settings in `.obsidian/` load with the vault. They set the text width to 900 px, they set
the template folder, and they make Obsidian correct the links when you rename a note.

## 3. The shape of the vault

The vault is a map with one note for each part of the code. [[README]] is the top of the map.
Each other note links up to an overview, and across to the notes that it calls.

| Folder | What you find there | Read it when |
| --- | --- | --- |
| `00-Index/` | the rules, the templates, the logs, the linter and the pointer notes | you write a note, or you want to know how current the vault is |
| `01-Overviews/` | one note for each layer of the system, in reading order | you are new to an area of the code |
| `02-Features/` | one note for each feature that users see | you want to know what a feature does, end to end |
| `03-Incidents/` | what broke, why, and the guard that now prevents it | a failure looks familiar, or you change the code near a guard |
| `04-Plans/` | work that is proposed or in progress | you want to know what is going to change |
| `05-Reviews/` | one review record for each change on origin | you want to know if a change was reviewed |
| the code folders | one note for each class, with the same folders as the source | you know the class or the file name |

CAUTION: A note in `04-Plans/` describes work that does not exist yet, or that is not complete.
Do not read a plan as a description of the current code. Read its `status:` field first.

## 4. Find a note

Use the first method in this table that fits what you know.

| You know | Do this |
| --- | --- |
| The class name | Push `Ctrl+O` and type the name. Each note has the name of its class |
| The source file | Open the folder in the file tree. The folder agrees with the source path |
| A word or a log string | Push `Ctrl+Shift+F` and type the text. Put a log prefix in quotes, for example `"[EXAMPLE]"` |
| Only the area of the code | Open [[README]] and find the group for that area |
| Nothing yet | Open [[00 - System Overview]] and follow the links down |

## 5. Move through the graph

| To do this | Use |
| --- | --- |
| Open a link | Click it |
| Open a link in a new tab | `Ctrl` + click |
| See a note without opening it | Put the mouse on the link and push `Ctrl` |
| Go back to the last note | `Ctrl+Alt+Left arrow` |
| See which notes link to this note | The Backlinks pane in the right sidebar |
| See the headings of a long note | The Outline pane in the right sidebar |
| See the notes around this note | `Ctrl+G` for the graph view, or "Open local graph" in the command palette |
| Find a command | `Ctrl+P` for the command palette |

The backlinks are the fastest way to find the callers of a class. The `## Callers` section of a
note gives the important callers. The Backlinks pane gives all of them.

## 6. Read a note

Each note starts with a frontmatter block. Obsidian shows it as "Properties" at the top of the
note. Read it before you read the text.

| Field | What it tells you |
| --- | --- |
| `title` | the class name, or the name of the note |
| `type` | the kind of note: `component`, `feature`, `plan` and the other types in [[Vault Rules]] section 5 |
| `layer` | the subsystem. All notes with the same layer are about the same area |
| `path` | the source file that the note describes |
| `status` | how much you can trust the note. See the table below |
| `log_prefix` | the prefix of the log lines that this code writes. Search the logs for it |
| `flags` | the settings that turn this behavior on or off |
| `verified_against_commit` | the commit that the writer read. The note is correct at that commit |
| `verified_against_date` | the date of that read |

### How much to trust a note

| Status | What it means for you |
| --- | --- |
| `VERIFIED` | The writer read the source. Each line number was correct at the stamped commit |
| `VERIFIED-WITH-CAVEAT` | The writer read the main parts. The note says what the writer did not read |
| `DRIFT` | The note is known to be wrong. Read the code, not the note |
| `SKELETON` | The note has headings only. Read the code |
| `UNKNOWN` | The writer could not cite the code. Do not trust the claims |

A plan has a different status list: `PROPOSED`, `APPROVED`, `IN-PROGRESS`, `DONE`,
`SUPERSEDED` and `REJECTED`. A review record has the status `PUSHED`, which gives where the
record is, not a pass. Read its `verdict:` field for the result.

### Line citations

A claim about the code cites a line in bold, for example **L123** or **L123-L130**. The line is
correct at the commit in `verified_against_commit`. If the file changed after that commit, the
line can move.

To see if a note is still current, run this command in the source repository:

```bash
git log --oneline <verified_against_commit>..HEAD -- <path>
```

If the command shows no commits, the note is current. If it shows commits, the note can be stale.
Read the code, and tell the vault owner.

### If a note and the code disagree

The code is correct. The note is drift. Do one of these:

1. Correct the note, as in [[Vault Rules]] section 6.
2. If you cannot correct it now, change its status to `DRIFT` and tell the vault owner.

## 7. Know how current the vault is

| Question | Where to look |
| --- | --- |
| When was the vault last checked against the code? | the newest entry in [[Drift Sweep Log]] |
| Was this change reviewed? | its row in [[Review Log]] |
| Which rules does the code break on purpose? | the open deviations in [[Review Log]] |
| Where are the coding standards and the agent skills? | [[External References]] |

## 8. Add or change a note

[[Vault Rules]] gives the full procedure. This is the short form:

1. Make sure that the code is on origin. Do not write about local work.
2. Push `Ctrl+P` and select "Templates: Insert template". Select the template for the note type.
   [[Note Template]] lists the templates.
3. Fill in the frontmatter. Get the commit with `git rev-parse --short HEAD`.
4. Write the body. Cite a line for each claim.
5. Add one line for the note in [[README]].
6. Run the linter from the vault folder:
   ```bash
   node 00-Index/vault-verify.js
   ```
7. Correct each finding until the linter prints `PASS`.
8. Give the change to the vault owner. The owner commits it.

CAUTION: Rename a note in Obsidian, not in the file manager. Obsidian then corrects each link to
it. A rename in the file manager breaks the links.

## 9. Use the vault with an agent

An agent reads the vault the same way that you do. Tell the agent to do these steps:

1. Read [[README]] and the overview of the area first.
2. Read the code only to check a claim, or when the status is not `VERIFIED`.
3. Read [[Vault Rules]] before it writes a note.
4. Give the linter output in its handover.

[[Example Prompts]] gives a prompt for each task, ready to copy. This prompt asks a question:

```text
Use the vault at <vault path> to answer this question: <question>.
Start at README.md and the overview of the area. Read the code in <repo path> only to
check a claim, or if the note status is not VERIFIED.
```

## 10. Common problems

| Problem | Cause | What to do |
| --- | --- | --- |
| A link shows in a lighter color, and a click makes a new empty note | The target note does not exist | Do not keep the new note. Correct the link name, or write the note |
| The linter gives `misfiled` | The folder does not agree with the `path:` or `type:` field | Move the note, or correct the field |
| The linter gives `orphans` | No note links to the note | Add a line for it in [[README]] |
| The linter gives `oversize` | The note is above 40 KB | Split it, as in [[Vault Rules]] section 9 |
| A line number points at the wrong code | The file changed after the stamped commit | Read the code. Correct the note, or mark it `DRIFT` |
| A link in a code block does not open | Obsidian does not make a link in a code block or in backticks | This is correct. A link in backticks is an example only |
