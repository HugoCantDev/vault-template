---
title: <NN> - <Layer Name>
type: layer-overview
layer: <one value from Vault Rules section 5>
status: VERIFIED
verified_against_commit: <short sha>
verified_against_branch: <branch>
verified_against_date: <YYYY-MM-DD>
---

# <NN> - <Layer Name>

One paragraph. Say what this layer does, where its data comes from, and where its data goes.
Number the overviews in reading order: `00 - <System> Overview` is the top level.

## The flow

```mermaid
flowchart LR
    A["<Entry point>"] --> B["<Main class>"]
    B --> C["<Next layer>"]
```

Under the diagram, give one line for each box. Each line links the code note:

- [[<EntryClass>]] -- what it receives, and from where.
- [[<MainClass>]] -- what it decides.

## Rules this layer keeps

The invariants that each change in this layer must keep. Cite the line that enforces each one.

1. <Invariant>. Enforced at `<Class>` **L123**.

## Configuration

| Setting | Default | Read at | Effect |
| --- | --- | --- | --- |
| `<Section:Key>` | `<value>` | `<Class>` **L45** | one sentence |

## See also

- [[<Next Overview>]] -- the layer after this one.
