## <YYYY-MM-DD> at `<short sha>` on `<branch>`

**Scope.** <the notes or folders that this sweep read>

**Method.** `git log --oneline <old commit>..HEAD -- <SourceRoot>/<path>` for each note in scope.

| Result | Count | Notes |
| --- | --- | --- |
| No change since the stamp | <n> | restamped, body not changed |
| Corrected | <n> | [[<Note>]], [[<Note>]] |
| Marked `DRIFT` | <n> | [[<Note>]] -- <why it was not corrected now> |

**Not checked.** <what this sweep did not read, and why>
