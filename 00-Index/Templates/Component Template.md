---
title: <ClassName>
type: component
layer: <one value from Vault Rules section 5>
path: <Folder>/<ClassName>.cs
status: VERIFIED
log_prefix: "[PREFIX]"
flags: [<SettingsClass.FlagName>]
verified_against_commit: <short sha from git rev-parse --short HEAD>
verified_against_branch: <branch>
verified_against_date: <YYYY-MM-DD>
---

# <ClassName>

**Path**: `<Folder>/<ClassName>.cs` (<N> lines).

One paragraph. Say what this class owns and why it exists. Name the caller above it and the
main class that it calls. This paragraph becomes the line for the note in [[README]].

## <The first behavior>

| Method | Line | What it does |
| --- | --- | --- |
| `MethodName(args)` | **L123** | one sentence |

Cite a line number for each claim. Use a fence for a quotation of the code:

```csharp
// L123-L130
if (lane.IsFull) throw new ConflictException(...);
```

## Log strings

| Prefix | Line | When it is written |
| --- | --- | --- |
| `[PREFIX]` | **L140** | one sentence |

## Callers

- [[<CallerClass>]] -- when it calls this class, and why.

## See also

- [[<RelatedClass>]] -- how the two classes divide the work.
