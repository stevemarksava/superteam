```
  ____  _   _ ____  _____ ____  _____ _____    _    __  __ 
 / ___|| | | |  _ \| ____|  _ \|_   _| ____|  / \  |  \/  |
 \___ \| | | | |_) |  _| | |_) | | | |  _|   / _ \ | |\/| |
  ___) | |_| |  __/| |___|  _ <  | | | |___ / ___ \| |  | |
 |____/ \___/|_|   |_____|_| \_\ |_| |_____/_/   \_\_|  |_|

            Personal AI Squad · Claude Code + GitHub Copilot
```

---

12 specialist AI agents that coordinate like a team. One voice in, clean answer out.

Works with **Claude Code** (Anthropic CLI) and **GitHub Copilot Chat** (VS Code extension).

---

## Setup

### Claude Code

```bash
git clone https://github.com/stevemarksava/superteam.git ~/.claude
```

If `~/.claude` already exists, copy `agents/`, `squad/`, and `CLAUDE.md` manually.

Reload Claude Code. Superman answers.

### GitHub Copilot Chat (VS Code)

**Option A — Copilot Instructions (any repo, zero install)**

Copy `.github/copilot-instructions.md` into any repo. Copilot picks it up automatically and the whole squad is available by name.

**Option B — VS Code Extension (real `@agent` participants)**

Install the extension to get `@superman`, `@eric`, `@vera`, `@nexus` etc. as proper Copilot Chat participants with full agent context:

```powershell
code --install-extension "vscode-extension/superteam-copilot-participants-0.2.0.vsix"
```

Build from source: `cd vscode-extension && pnpm install && pnpm run package`

---

## The Squad

| Agent | Role | Disciple |
|-------|------|---------|
| **Superman** | Lead — your single point of contact | Peter · The Bold Leader |
| **Bob** | Solution architect — blueprints before builds | Philip · The Practical Questioner |
| **Eric** | Superstar coder | James (Zebedee) · The Focused Achiever |
| **Marlo** | UX designer + product voice | Andrew · The Connector |
| **Paulien** | Scrum master, planner, backlog owner | James (Alphaeus) · The Quiet Backbone |
| **Vera** | Quality gate — nothing ships without her | Thomas · The Careful Doubter |
| **Athanasios** | Researcher, intelligence, knowledge bank | Thaddaeus · The Hidden Faithful |
| **Kryptonite** | Red team — attacks plans before builds | Judas · The Warning |
| **Kevin** | Reports and documentation | Matthew · The Systematic Analyst |
| **G** | Finance — costs, pricing, economics | Bartholomew · The Honest Skeptic |
| **Coach** | Watches team performance, writes game tape | Simon the Zealot · The Passionate Idealist |
| **Georgiana** | Motivator, Coach bridge | John · The Relational Visionary |

> Disciple labels are from the **Racecar Discipleship Framework** — character archetypes that shape how each agent thinks and communicates.

### Specialist Tier

Outside the core 12 — activated per-project when needed. Lives in `agents/` so it works in both Claude Code and Copilot Chat.

| Agent | Role |
|-------|------|
| **Nexus** | Avanade/Microsoft platform expert — Azure WAF + CAF, microsoft.ai ecosystem (AI Foundry, Phi, Copilot family, Responsible AI), Power Platform (architect-level), Fabric, Databricks, data governance (Purview, Unity Catalog), all Avanade service lines |

---

## Usage

Start a Claude Code session or open Copilot Chat. Superman is the default.

Address any agent by name to activate them:

```
Bob — blueprint the data model for this
Eric — build the campaigns API
Vera — what test cases are missing here?
Kryptonite — attack this plan before we build it
Nexus — what Azure service fits this use case?
Athanasios — research the competitive landscape for X
```

In Copilot Chat with the VS Code extension: use `@superman`, `@eric`, `@vera` etc.

---

## New Project

Copy the squad template into your project to give Superteam its full operational structure:

```bash
cp -r ~/.claude/squad-template/ your-project/.squad/
```

```powershell
Copy-Item -Recurse "$env:USERPROFILE\.claude\squad-template\" "your-project\.squad\"
```

Then brief Superman: *"New project — run the onboarding checklist."* No agent touches code until it's done.

---

## What's in This Repo

```
agents/                  All agent definitions (12 core + Nexus specialist)
squad/
  SYSTEM.md              Immutable rules — every agent follows these
  identity/PLAYBOOK.md   Squad identity and operating principles
  architecture/          Squad modes (Solo/Squad/Full), cost model, token budgets
  ceremonies/            Sprint planning, standup, retro, review, grooming
  skills/                Skill cards — graph DB, spatial/GIS, DS/ML, dbt,
  |                      Databricks, LLM engineering, DevOps, compliance,
  |                      presentations, code review, testing, and more
  onboarding/            New project checklist, how to add agents, how to adapt
  coach/drills/          Drills from real game tape
  agents/                Cross-project agent memory and knowledge bank
squad-template/          Copy this into any project as .squad/
.github/                 copilot-instructions.md, PR template, issue templates
vscode-extension/        @agent Copilot Chat participants for VS Code
```

---

## Adapting for Your Team

1. Fork this repo
2. Update `CLAUDE.md` — replace Steve's personal context with yours
3. Update `agents/superman.md` — change "Steve" to your name
4. Update `squad/identity/PLAYBOOK.md` — make it your team's principles
5. Add domain-specific skill cards to `squad/skills/`
6. See `squad/onboarding/ADAPT_TO_YOUR_DOMAIN.md` for the full guide

---

Built with [Claude Code](https://claude.ai/code) · Powered by [Anthropic](https://anthropic.com)
