# Superteam

A personal AI squad for [Claude Code](https://claude.ai/code). 12 specialist agents that coordinate like a team — one voice in, clean answer out.

## Setup

```bash
git clone https://github.com/stevemarksava/superteam.git ~/.claude
```

If `~/.claude` already exists, copy `agents/`, `squad/`, and `CLAUDE.md` manually.

Reload Claude Code. Superman answers.

---

## The Squad

| Agent | Role | Disciple |
|-------|------|---------|
| **Superman** | Lead — your single point of contact | Peter · The Bold Leader |
| **Paulien** | Scrum master, planner, backlog | James (Alphaeus) · The Quiet Backbone |
| **Bob** | Solution architect | Philip · The Practical Questioner |
| **Eric** | Superstar coder | James (Zebedee) · The Focused Achiever |
| **Marlo** | UX designer | Andrew · The Connector |
| **Kevin** | Reports and documentation | Matthew · The Systematic Analyst |
| **Georgiana** | Motivator, Coach bridge | John · The Relational Visionary |
| **Vera** | Quality gate — nothing ships without her | Thomas · The Careful Doubter |
| **Athanasios** | Researcher, intelligence, knowledge bank | Thaddaeus · The Hidden Faithful |
| **G** | Finance — costs, pricing, economics | Bartholomew · The Honest Skeptic |
| **Coach** | Watches team performance, writes game tape | Simon the Zealot · The Passionate Idealist |
| **Kryptonite** | Red team — attacks plans before builds | Judas · The Warning |

> Disciple labels are from the **Racecar Discipleship Framework** — character archetypes, not personality tests.

### Specialist Tier

Outside the core 12 — activated per-project when needed. Specialists live in `agents/` so they work in both Claude Code and Copilot Chat.

| Agent | Role |
|-------|------|
| **Nexus** | Avanade/Microsoft platform expert — Azure, M365, Fabric, Copilot, Avanade service lines |

---

## Usage

Just start a Claude Code session. Superman is the default.

Address any agent by name to switch:

```
Bob — blueprint the data model for this
Eric — build the campaigns API
Vera — what test cases are missing?
Kryptonite — attack this plan before we build it
Nexus — what's the right Azure service for this?
```

### GitHub Copilot

Copy `.github/copilot-instructions.md` into any repo to load squad context into Copilot Chat.

Or install the VS Code extension for `@superman`, `@eric`, `@vera`, `@nexus` etc. as real Copilot Chat participants:

```powershell
code --install-extension "vscode-extension/superteam-copilot-participants-0.2.0.vsix"
```

---

## New Project

Copy the squad template into your project:

```powershell
Copy-Item -Recurse squad-template\ your-project\.squad\
```

Then run `squad/onboarding/NEW_PROJECT.md` with Superman before any agent touches code.

---

## What's in This Repo

```
agents/                  All agent definitions — 12 core + specialists (Nexus)
squad/
  SYSTEM.md              Immutable rules — all agents follow these
  identity/PLAYBOOK.md   Squad identity and operating principles
  architecture/          Squad modes, cost model, token budgets
  ceremonies/            Sprint planning, standup, retro, review, grooming
  skills/                Skill cards — graph, spatial, DS/ML, DevOps, compliance, etc.
  onboarding/            New project checklist, how to add agents, how to adapt
  coach/drills/          Drills from real game tape
  agents/                Cross-project agent memory and knowledge bank
  specialists/           Specialist context docs (agent definitions live in agents/)
squad-template/          Copy this into any project as .squad/
.github/                 Copilot instructions, PR template, issue templates
vscode-extension/        @agent Copilot Chat participants for VS Code
```

---

## Adapting for Your Team

1. Fork this repo
2. Update `CLAUDE.md` — replace Steve's context with yours
3. Update `agents/superman.md` — change "Steve" to your name
4. Update `squad/identity/PLAYBOOK.md` — make it your team's principles
5. See `squad/onboarding/ADAPT_TO_YOUR_DOMAIN.md` for a full guide

---

Built with [Claude Code](https://claude.ai/code) · Powered by [Anthropic](https://anthropic.com)
