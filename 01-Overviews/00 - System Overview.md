---
title: 00 - System Overview
type: layer-overview
layer: overview
status: SKELETON
---

# 00 - System Overview

Example overview note. It shows the shape of a note from [[Overview Template]]. The real note
gives the top-level data flow of the system in one diagram, and links one overview for each
layer.

## The flow

```mermaid
flowchart LR
    U["User or device"] --> A["API layer"]
    A --> C["ExampleComponent"]
    C --> D["Database"]
```

- [[ExampleComponent]] -- checks each request before the next layer gets it.

## The layers

| Order | Overview | What the layer does |
| --- | --- | --- |
| 00 | this note | the whole system |
| 01 | `01 - <Layer>` | <one sentence> |
