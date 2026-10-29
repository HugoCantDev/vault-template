---
title: Building a New Vault
type: reference
layer: overview
status: VERIFIED
---

# Building a New Vault

How to make a codebase vault from this template. The style comes from the SpaceMaker Dev Vault.
That vault documents a backend of about 500 notes. The rules in [[Vault Rules]] come from the
problems that it had. This note gives the decisions, the setup, and the procedure for two
cases: a brand-new project and an existing project.

[[Example Prompts]] gives a prompt for each step, ready to give to an agent.

## 1. Which path to follow

| Your project | Follow | Why the paths are different |
| --- | --- | --- |
| A new project, with little or no code on origin | section 3, then section 4 | There is no code to document yet. The vault grows with each push |
| An existing project, with code that has no vault | section 3, then section 5 | There is too much code to document at one time. You choose the order |
| An existing project that has old documents | section 3, then section 5 | The old documents are leads only. You check each claim against the code |

Each path ends with the same result: a vault that passes the linter, where each note describes
code on origin.

## 2. The principles

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

## 3. The setup, for each path

### 3.1 Decisions to make before you start

| Decision | Example | Where it goes |
| --- | --- | --- |
| The repository and the branch that the vault follows | `yusen`, `development` | [[README]] header, [[Vault Rules]] section 6 |
| The source root that `path:` is relative to | `Anyware/` | [[README]], [[Vault Rules]] section 3, `SOURCE_PREFIX` in the linter |
| The owner who approves a note before it ships | Hugo | [[Vault Rules]] section 8 |
| The folders that copy the source tree, and the folders that group or rename | `Services/` grouped by subsystem | [[Vault Rules]] section 3, `GROUPED` and `RENAMED` in the linter |
| The closed list of `layer` values | `lane`, `routing`, `opc` | [[Vault Rules]] section 5, `LAYERS` in the linter |
| The review process, if there is one | standards review records | `05-Reviews/`, [[Review Log]] |

If you do not know the answer to a decision, copy the source tree with no groups. Add a group
later, when a folder holds many small notes. For an existing project, prompt 2 in
[[Example Prompts]] gets the data for these decisions.

### 3.2 The setup steps

1. Copy the folder `Template Vault` to the new location. Give it the name of the new vault.
2. Open the folder as a vault in Obsidian. The settings in `.obsidian/` load with it.
3. Replace each `<placeholder>` in [[README]] and [[Vault Rules]]. Search the vault for `<` to
   find them.
4. Set the configuration block at the top of `00-Index/vault-verify.js`:
   1. Set `SOURCE_PREFIX` to the source root.
   2. Add each grouped folder to `GROUPED`.
   3. Add each renamed folder to `RENAMED`.
   4. Replace the example values in `LAYERS` with the closed list.
5. Delete the example notes and their lines in [[README]]: [[Example Feature]],
   [[Incident - Example]], [[Plan - Example]], [[REV-EXAMPLE-A]] and [[ExampleComponent]].
   Delete the `Components/` folder.
6. Delete the example rows in [[Drift Sweep Log]] and [[Review Log]].
7. Keep [[00 - System Overview]], but set its status to `SKELETON` until you write it. Keep the
   note name, because [[Start Here]] links to it.
8. Read [[Start Here]]. Correct each part that does not agree with the new vault.
9. Run the linter. Correct each finding until it prints `PASS`.

Then follow section 4 or section 5.

## 4. Path A: a brand-new project

In a new project, the design comes before the code. The vault rule "a note follows the push"
still applies. The design goes in a plan, and the code notes come with the code.

1. Write the design as a plan in `04-Plans/`, from [[Plan Template]]. Give it the status
   `PROPOSED`. Use prompt 3 in [[Example Prompts]].
2. Get the approval of the owner. Change the status to `APPROVED`.
3. Write [[00 - System Overview]] when the first working code is on origin. Describe the code
   that exists, not the design. Link the plan for the parts that do not exist yet.
4. After each push, write or update the notes for the files that the push changed. Use
   prompt 9 in [[Example Prompts]]. Make this step part of the definition of done for each task.
5. When a new source folder gets its first class, add the vault folder and the `layer` value
   together. Update the linter configuration in the same change.
6. When a part of the plan is on origin, move its facts into the code notes. When all of the
   plan is on origin, change its status to `DONE`.
7. Write the first entry in [[Drift Sweep Log]] after the first push that has notes.

The vault is small at the start. That is correct. Do not write notes for classes that do not
exist. A note for future code is a plan.

## 5. Path B: an existing project

In an existing project, the code is there, and the vault is empty. Do not try to document all
of the code at one time. Build the map first, then fill it in the order that gives the most
value.

### 5.1 The order

1. **Make an inventory.** List the source folders, the number of files in each folder, and the
   folders that change most. Use prompt 2 in [[Example Prompts]]. Use the result for the
   decisions in section 3.1.
2. **Write the system overview.** Read the entry points and the main flow. Write
   [[00 - System Overview]] with one diagram. Use prompt 4.
3. **Make skeleton notes for one layer.** Make one note for each class in the layer, with the
   frontmatter, a one-line summary, and the status `SKELETON`. The map is then complete for that
   layer, and the reader can see the gaps. Use prompt 5.
4. **Fill the notes of that layer.** Read the source for each note. Cite a line for each claim.
   Change the status to `VERIFIED` and write the stamp. Use prompt 6.
5. **Write the overview of that layer.** Use prompt 7.
6. **Do the next layer.** Do one layer in each session, and give each layer to the owner for
   approval.
7. **Write the first entry in [[Drift Sweep Log]].** It gives the commit that the vault was built
   at. Each later sweep starts from that commit.

### 5.2 Which layer to do first

Do the layers in this order. Stop at a layer when the team gets enough value.

| Order | Layer | Why |
| --- | --- | --- |
| 1 | The layer that the team changes most | Most of the questions are about this code |
| 2 | The layer with the most incidents | The guards in this code are easy to break |
| 3 | The entry points: controllers, message handlers, hosted services | They give the shape of the system |
| 4 | The data model | Each other layer uses it |
| 5 | All other layers | Do them when there is time |

To find the folders that change most, run this command in the source repository:

```bash
git log --since=6.months --name-only --pretty=format: | grep . | cut -d/ -f1-2 | sort | uniq -c | sort -rn | head -20
```

### 5.3 Old documents

An existing project often has old documents: a wiki, a README, design notes, or comments.

1. Do not copy an old document into the vault.
2. Use an old document as a lead only. Read the code to check each claim before you write it.
3. If a claim in an old document is wrong, do not write it. If the error is dangerous, tell the
   owner.
4. If an old document stays in use, write a pointer note for it, from [[Pointer Template]].

### 5.4 Old incidents

Write an incident note for an old incident only if you can cite the guard in the current code.
If you cannot cite the guard, write the incident as an open item in a plan. Use prompt 10.

## 6. What to keep, and what to change

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

CAUTION: Do not write the notes from memory or from an old document. Read the source for each
note. A vault with guessed content is worse than an empty vault, because the reader trusts it.

## 7. Mistakes that the Dev Vault made

Each rule in [[Vault Rules]] came from one of these mistakes. Do not make them again.

| Mistake | Result | The rule now, in [[Vault Rules]] |
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

## 8. How agents use the vault

An agent reads the vault the same way that a person does. Give each agent that writes notes
these instructions:

1. Read [[Vault Rules]] before the first note.
2. Start each note from a template in [[Note Template]].
3. Run the linter before the handover. Give the linter output in the handover.
4. Do not write a note about work that is not on origin.

A light agent can answer most questions from [[README]] and the overviews. Tell it to read the
code only to check a claim. [[Example Prompts]] gives a prompt for each task.

## 9. Settings in this template

| File | What it sets |
| --- | --- |
| `.obsidian/app.json` | Obsidian updates the links when you rename a note |
| `.obsidian/templates.json` | the Templates plugin reads `00-Index/Templates` |
| `.obsidian/core-plugins.json` | the plugins that the Dev Vault uses |
| `.obsidian/graph.json` | the graph shows orphans, so a missing link is visible |
| `.obsidian/snippets/FileWidth.css` | the text is 900 px wide, for wide tables |
| `.gitignore` | `workspace.json` stays out of git, because it changes each time you open a note |
