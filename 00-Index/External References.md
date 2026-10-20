---
title: External References
type: reference
layer: overview
status: VERIFIED
---

# External References

Pointer note. Some documents that a reader needs are **not** vault notes: the coding standards,
the agent skills, and the runbooks. This note keeps the vault as the one entry point. Write one
pointer note for each large group, from [[Pointer Template]].

Why not in the vault: the vault gives what the code does now, and it changes after a push. A
standard or a skill gives how to work, and it changes before the code does. The two follow
different rules, so they stay apart.

Why not in the repository: the repository holds the product only. Nothing that an agent reads
or runs goes in it.

## The documents

Replace the example rows with the real locations.

| Document | Location | Use it when |
| --- | --- | --- |
| Coding standards | `<path>/Standards/README.md` | you write or review code |
| Agent skills | `<path>/.claude/skills/` | you set up or change an agent procedure |
| Runbooks | `<path>/Runbooks/` | you deploy, restore or debug a site |

## Related

- [[Vault Rules]] -- this vault is written in the same STE as the standards.
- [[Review Log]] -- the records of the reviews against the standards.
