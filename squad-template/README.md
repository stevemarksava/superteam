# Squad Template

Copy this folder into any project as `.squad/` to give Superteam its full operational structure.

```powershell
Copy-Item -Recurse "$env:USERPROFILE\.claude\squad-template\" "your-project\.squad\"
```

```bash
cp -r ~/.claude/squad-template/ your-project/.squad
```

---

## What's Inside

| File / Folder | Purpose |
|---------------|---------|
| `DEFINITION_OF_READY.md` | Superman's gate before Eric starts anything |
| `DEFINITION_OF_DONE.md` | Superman's gate before Steve sees anything |
| `decisions/_template.md` | One file per architectural decision |
| `coach/game-tape/_template.md` | Coach's sprint review format |
| `ceremonies/backlog/BACKLOG.md` | Superteam product backlog |
| `agents/<name>/memory/MEMORY.md` | Memory template for each of the 12 agents |

---

## First Steps on a New Project

1. Copy this folder to `your-project/.squad/`
2. Run `squad/onboarding/NEW_PROJECT.md` with Superman — no agent touches code until it's complete
3. Log every architectural decision in `decisions/` using the template
4. After each sprint, Coach writes a game tape to `coach/game-tape/`

---

*Owner: Paulien*
