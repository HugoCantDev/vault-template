---
title: Note Template
type: reference
layer: overview
status: VERIFIED
---

# Note Template

There is one template for each note type. The templates are in `00-Index/Templates/`.
[[Vault Rules]] gives the meaning of each field.

To use a template in Obsidian, open the command palette and select "Templates: Insert
template". The vault settings already point the Templates plugin at that folder.

| Template | Note type | Folder |
| --- | --- | --- |
| [[Component Template]] | `component`, `model` | the folder from the `path:` field |
| [[Overview Template]] | `layer-overview` | `01-Overviews/` |
| [[Feature Template]] | `feature` | `02-Features/` |
| [[Incident Template]] | `incident-report` | `03-Incidents/` |
| [[Plan Template]] | `plan`, `work-item` | `04-Plans/` |
| [[Review Template]] | `review-record` | `05-Reviews/` |
| [[Pointer Template]] | `reference` | `00-Index/` |
| [[Drift Entry Template]] | one entry in [[Drift Sweep Log]] | not a note |

Do not put a template in a folder with real notes. A template has placeholder values, and the
linter does not read its links.

## Rules that are easy to forget

1. The file name is the class name. It has no folder in front of it and no number.
2. A link gives the note name only. Write `[[ExampleComponent]]`, not
   `[[Components/ExampleComponent]]`.
3. The folder comes from the `path:` field, or from the `type:` field. See [[Vault Rules]]
   section 3.
4. Cite a line number for each claim about the code, in bold: **L123** or **L123-L130**.
5. Add a line for the new note in [[README]].
6. Run `node 00-Index/vault-verify.js` before you give the change to the owner.
