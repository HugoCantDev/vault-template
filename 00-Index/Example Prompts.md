---
title: Example Prompts
type: reference
layer: overview
status: VERIFIED
---

# Example Prompts

Prompts to give to an agent, for example Claude Code, for each task in this vault. Copy a
prompt, replace each `<placeholder>`, and send it. [[Building a New Vault]] tells you when to use
each prompt.

Each prompt gives the agent the vault path and the rules to read. An agent that does not read
[[Vault Rules]] first makes the mistakes that the rules prevent. Keep that part of the prompt.

## How to use the prompts

1. Give one task in one prompt. Do one layer in one session.
2. Tell the agent the path of the vault and the path of the source repository.
3. Read the result before you accept it. Check two or three line citations against the code.
4. Make sure that the agent ran the linter and that the output says `PASS`.
5. Commit the change yourself, after your review.

CAUTION: Tell the agent not to commit. The owner commits each change to the vault.

## Prompts for each path

| Prompt | Task | Path A, new project | Path B, existing project |
| --- | --- | --- | --- |
| 1 | Set up the vault from the template | yes | yes |
| 2 | Make an inventory of the code | | yes |
| 3 | Write the design as a plan | yes | |
| 4 | Write the system overview | yes, after the first push | yes |
| 5 | Make skeleton notes for one layer | | yes |
| 6 | Fill the notes of one layer | | yes |
| 7 | Write the overview of one layer | yes | yes |
| 8 | Document a feature | yes | yes |
| 9 | Update the notes after a push | yes | yes |
| 10 | Write an incident note | yes | yes |
| 11 | Do a drift sweep | yes | yes |
| 12 | Correct the linter findings | yes | yes |
| 13 to 15 | Use the vault to answer a question | yes | yes |

## Setup

### Prompt 1: set up the vault from the template

```text
Make a new codebase vault for <project> at <new vault path>.
Copy the template vault from <template vault path>.
Read 00-Index/Building a New Vault.md and do the setup steps in section 3.2.
The source repository is <repo path>, branch <branch>. The source root is <source root>/.
The owner is <owner>.
Use these layers: <layer list>. Group these folders: <none, or folder to subsystem list>.
Run node 00-Index/vault-verify.js and correct each finding until it prints PASS.
Do not commit. Give me the list of the files that you changed and the linter output.
```

### Prompt 2: make an inventory of an existing codebase

```text
Read <repo path>, branch <branch>. Do not write any vault notes yet.
Give me an inventory for a new vault in the style of <template vault path>:
1. Each source folder under <source root>/, with its number of source files.
2. The folders that changed most in the last 6 months, from git log.
3. The entry points: controllers, message handlers, hosted services, main.
4. A proposed layer list, and the folders that the vault must group because they hold
   one to three files each.
5. The old documents that exist, and where they are.
Give the commands that you ran for each number. Do not guess a number.
```

### Prompt 3: write the design of a new project as a plan

```text
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Plan Template.md.
Write the design of <project> as a plan note in 04-Plans/, named "Plan - <short name>".
Use this design input: <description, or path to the design document>.
Give it the status PROPOSED. Fill the sections "Why", "The change", "Not in this plan"
and "Decisions still open". There is no code yet, so do not cite line numbers.
Add a line for the note in README.md. Run the linter. Do not commit.
```

## Writing notes

### Prompt 4: write the system overview

```text
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Overview Template.md.
Read the entry points and the main flow of <repo path>, branch <branch>.
Write 01-Overviews/00 - System Overview.md. Keep that note name.
Give one Mermaid diagram of the top-level data flow, and one line for each box.
Describe only code that is on origin. Cite a line for each claim.
Stamp the note with the commit from git rev-parse --short HEAD.
Run the linter. Do not commit.
```

### Prompt 5: make skeleton notes for one layer

```text
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Component Template.md.
For each class in <source folder> of <repo path>, make one note with status SKELETON.
Give each note the full frontmatter, with the correct path: field, and a one-line summary.
Do not write a body yet. Put each note in the folder that its path: field gives.
Add one line for each note in README.md, in the group of its folder.
Run the linter and correct each finding. Do not commit.
```

### Prompt 6: fill the notes of one layer

```text
Read <vault path>/00-Index/Vault Rules.md.
Fill each SKELETON note in <vault folder> from the source in <repo path>, branch <branch>.
For each note, read the source file first. Do not write from memory or from old documents.
Cite a line number for each claim. Link the callers and the classes that it calls.
If you cannot cite a claim, leave it out or set the status to UNKNOWN.
Set the status to VERIFIED only if each line number is correct, and write the stamp.
Run the linter. Give me the notes that you could not verify, and why. Do not commit.
```

### Prompt 7: write the overview of one layer

```text
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Overview Template.md.
Write the overview of the <layer> layer as 01-Overviews/<NN> - <Layer Name>.md.
Use the code notes in <vault folder> and check each claim against the source.
Give one diagram of the flow, the rules that the layer keeps, and its settings.
Link each code note of the layer. Link this overview from 00 - System Overview.
Run the linter. Do not commit.
```

### Prompt 8: document a feature

```text
The feature <feature name> is on origin at commit <sha>, branch <branch>.
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Feature Template.md.
Write 02-Features/<Feature Name>.md. Give what the user can do, the path from the
user action to the data with line citations, the settings, and the limits.
Link each code note that the feature uses. Make a SKELETON note for each class that
has no note yet. Add a line in README.md. Run the linter. Do not commit.
```

### Prompt 9: update the notes after a push

```text
These commits are on origin: <old sha>..<new sha> on <branch> in <repo path>.
Read <vault path>/00-Index/Vault Rules.md.
List the source files that the commits changed. For each file, find its note by the
path: field. Read the new source and correct the note. Write a new stamp.
Make a note for each new class. Remove the note for each deleted class, and correct
its backlinks. Update README.md. Run the linter.
Give me a table: note, what changed, new status. Do not commit.
```

### Prompt 10: write an incident note

```text
Read <vault path>/00-Index/Vault Rules.md and 00-Index/Templates/Incident Template.md.
The incident: <what the operator saw, date, site>. The fix is on origin at <sha>.
Evidence: <log bundle path, ticket, or description>.
Write 03-Incidents/Incident - <Short Name>.md. Cite the line that caused the failure
at the commit before the fix, and the line of the guard at the current commit.
Give the log markers that show the failure. If you cannot cite the guard, stop and
tell me. Do not write the note. Run the linter. Do not commit.
```

## Maintenance

### Prompt 11: do a drift sweep

```text
Do a drift sweep of <vault path> against <repo path>, branch <branch>, as in
Vault Rules section 14. Scope: <the whole vault, or a folder>.
For each note, run git log --oneline <its verified_against_commit>..HEAD -- <its path>.
If there are no commits, restamp the note only. If there are commits, read the new
source and correct the note. If you cannot correct a note now, set its status to DRIFT.
Add one entry to 00-Index/Drift Sweep Log.md from the Drift Entry Template.
Run the linter. Do not commit.
```

### Prompt 12: correct the linter findings

```text
Run node 00-Index/vault-verify.js in <vault path>. Read 00-Index/Vault Rules.md section 13.
Correct each finding. To split a note above 40 KB, do the steps in section 9.
Do not change the linter or its configuration to make a finding go away.
If a finding needs a decision, for example a new layer value, stop and ask me.
Give me the linter output before and after. Do not commit.
```

## Use the vault

### Prompt 13: answer a question from the vault

```text
Use the vault at <vault path> to answer this question: <question>.
Start at README.md and the overview of the area. Read the code in <repo path> only to
check a claim, or if the note status is not VERIFIED.
Give the notes and the line citations that support the answer. Say which claims you
checked in the code and which ones you took from the vault only.
```

### Prompt 14: find what a change touches

```text
I want to change <behavior> in <class or file>.
Use the vault at <vault path> to find what the change touches: the callers from the
backlinks, the guards in 03-Incidents, the open plans in 04-Plans, and the settings.
Check each item in the code at <repo path>. Give me a list with one line for each item.
Do not change any file.
```

### Prompt 15: check if a note is current

```text
Is the note <note name> in <vault path> still current?
Read its path: and verified_against_commit fields. Run
git log --oneline <commit>..HEAD -- <path> in <repo path>.
If there are commits, compare the note with the new source, and list each claim that is
now wrong. Do not change the note.
```
