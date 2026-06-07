# Squad Template

Copy this entire folder into the root of any new project as `.squad/` to give the Superteam squad its full operational structure.

```bash
cp -r squad-template/ your-project/.squad
```

Or on Windows:
```powershell
Copy-Item -Recurse squad-template\ your-project\.squad\
```

---

## What's Inside

```
.squad/
├── DEFINITION_OF_READY.md     Superman's gate before Eric starts anything
├── DEFINITION_OF_DONE.md      Superman's gate before Steve sees anything
├── decisions/
│   └── _template.md           One file per architectural decision
├── coach/
│   └── game-tape/
│       └── _template.md       Coach's sprint review format
└── agents/
    ├── superman/memory/        What Superman remembers about this project
    ├── eric/memory/            Eric's build log — patterns, gotchas, decisions
    ├── vera/memory/            Vera's test history — bugs, patterns, templates
    ├── bob/memory/             Bob's architecture log — decisions, trade-offs
    ├── paulien/memory/         Paulien's sprint and backlog retrospective
    ├── marlo/memory/           Marlo's design decisions and patterns
    ├── athanasios/memory/      Athanasios's recon summary and open questions
    ├── kryptonite/memory/      Kryptonite's red team findings
    ├── kevin/memory/           Kevin's report templates and delivery notes
    ├── g/memory/               G's cost log and financial decisions
    ├── coach/memory/           Coach's patterns and drill history
    └── georgiana/memory/       Georgiana's communication log
```

## First Thing on a New Project

Run `squad/onboarding/NEW_PROJECT.md` with Superman before any agent touches code.

Every architectural decision goes in `decisions/` — not in memory, not in chat. Use `decisions/_template.md`.

After each sprint, Coach writes a game tape to `coach/game-tape/` using `_template.md`, then Georgiana delivers it to the team.

---

*Template owner: Paulien*
