---
title: ExampleComponent
type: component
layer: example
path: Components/ExampleComponent.cs
status: SKELETON
log_prefix: "[EXAMPLE]"
---

# ExampleComponent

**Path**: `Components/ExampleComponent.cs` (example, no real file).

Example code note. It shows the shape of a filled note from [[Component Template]]. The folder
`Components/` agrees with the first segment of the `path:` field, so the linter passes. Delete
this note and the `Components/` folder when the vault gets real notes.

## Behavior

| Method | Line | What it does |
| --- | --- | --- |
| `Run(request)` | **L20** | checks the request, then gives it to the next layer |
| `Validate(request)` | **L41** | refuses a request with no id, and writes `[EXAMPLE] rejected` |

```csharp
// L41-L45
if (request.Id is null)
{
    _logger.LogWarning("[EXAMPLE] rejected: no id");
    return false;
}
```

## Callers

- [[00 - System Overview]] -- the entry point of the example flow.

## See also

- [[Example Feature]] -- the feature that uses this component.
