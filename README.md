# Superteam

A personal AI squad for Claude Code — 12 specialist agents that work as a coordinated team. Built by Steve Marks.

## What It Is

Superteam replaces the single-assistant model with a squad of named agents, each with a distinct role, character, and set of responsibilities. Superman leads. You talk to him. He routes to the right people and delivers one clean answer back.

The squad covers the full build cycle: research → architecture → planning → design → code → quality → reporting — with a coach watching the team's performance across every project.

## The Squad

| Agent | Role |
|-------|------|
| **Superman** | Lead — your single point of contact |
| **Paulien** | Scrum master, planner, backlog owner |
| **Bob** | Solution architect — blueprints before builds |
| **Eric** | Superstar coder |
| **Marlo** | UX designer + product voice |
| **Kevin** | Reports, summaries, documentation |
| **Georgiana** | Motivator, bridge between Coach and the team |
| **Vera** | Quality gate — nothing ships without her sign-off |
| **Athanasios** | Researcher, intelligence, knowledge bank |
| **G** | Finance — costs, pricing, economics |
| **Coach** | Watches team performance, writes game tape |
| **Kryptonite** | Red team — attacks plans before Eric builds them |

## How to Use It

### Prerequisites
- [Claude Code](https://claude.ai/code) CLI installed
- Anthropic API access

### Setup

1. **Clone this repo into your Claude config directory:**
   ```bash
   git clone https://github.com/stevemarksava/superteam.git ~/.claude
   ```
   > If you already have a `~/.claude` directory, clone it elsewhere and copy the `agents/` and `squad/` folders in manually.

2. **That's it.** Claude Code loads `~/.claude/CLAUDE.md` automatically on every session.

### Talking to the Squad

Just start a Claude Code session. Superman is always the default.

```
> What are we building?
```

To activate a specific agent, say their name:

```
> Athanasios — research the competitive landscape for X
> Paulien — break this into a sprint plan
> Kryptonite — attack this architecture before we build it
```

### Squad Modes

Superman assigns a mode before any build starts:

| Mode | Agents | Cost ceiling | When to use |
|------|--------|-------------|-------------|
| **Solo** | Superman + Eric + Vera | ~$1.50 | 1-2 file change |
| **Squad** | 5-8 agents | ~$6 | New feature, established patterns |
| **Full** | All 12 | ~$12 | New domain, architecture, complex build |

### Per-Project Setup

Each project gets its own `.squad/` folder for decisions, coach game tape, and agent memories:

```
your-project/
└── .squad/
    ├── decisions/       # Every architectural decision logged here
    ├── coach/
    │   └── game-tape/   # Coach's sprint reviews
    └── agents/
        └── <name>/
            └── memory/  # Agent memory per project
```

Superman creates this on first run. See `squad/onboarding/NEW_PROJECT.md` for the full onboarding checklist.

## What's in This Repo

```
agents/          Agent definition files — each agent's identity, role, and rules
squad/
  SYSTEM.md          Immutable system rules all agents follow
  identity/
    PLAYBOOK.md      How the team plays — the squad identity doc
  architecture/
    squad-modes.md   Mode definitions and agent mesh
    cost-model.md    Token budgets and cost ceilings
  skills/            Specialist knowledge cards (graph, GIS, reporting, etc.)
  onboarding/
    NEW_PROJECT.md   Checklist for starting a new project with the squad
  agents/
    athanasios/
      knowledge/     Athanasios's accumulated research across projects
CLAUDE.md        Global loader — activates the squad in every session
settings.json    Claude Code permissions and config
```

## Philosophy

- **Simple beats clever.** Always.
- **Working beats perfect** on first pass.
- **No bluffing** — if an agent doesn't know, it says so.
- **Every decision logged** — nothing lives in memory that should be in a file.
- **Human first** — we build for people, not for other developers.

## Adapting It for Yourself

1. Fork the repo
2. Edit `CLAUDE.md` — replace Steve's context with yours
3. Edit `agents/superman.md` — update the routing table and delivery style to match how you work
4. Edit `squad/identity/PLAYBOOK.md` — make it your team's identity, not Steve's
5. Add or remove agents in `agents/` as needed — the squad is yours to shape

Each agent file is a standalone markdown prompt. They are simple to read, edit, and extend.

---

Built with [Claude Code](https://claude.ai/code) · Powered by [Anthropic](https://anthropic.com)
