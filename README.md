```
  ____  _   _ ____  _____ ____  _____ _____    _    __  __ 
 / ___|| | | |  _ \| ____|  _ \|_   _| ____|  / \  |  \/  |
 \___ \| | | | |_) |  _| | |_) | | | |  _|   / _ \ | |\/| |
  ___) | |_| |  __/| |___|  _ <  | | | |___ / ___ \| |  | |
 |____/ \___/|_|   |_____|_| \_\ |_| |_____/_/   \_\_|  |_|

            Personal AI Squad · Claude Code + GitHub Copilot
```

---

12 specialist AI agents that work like a coordinated team. You talk to **Superman**. He routes your request to the right expert, gets the work done, and delivers you a clean answer.

**New to Superteam?** Open [`squad/onboarding/start-here.md`](squad/onboarding/start-here.md) — it maps every file in this repo in plain English.

**Want a visual intro first?** Open [`squad/onboarding/superteam-intro.html`](squad/onboarding/superteam-intro.html) in any browser. Arrow keys or spacebar to navigate.

---

## Built for FDEs

**FDE = Forward Deployed Engineer.** Avanade/Microsoft are building an AI-focused FDE practice across Europe. The mission: attend client workshops during the sales phase and deliver a working proof of concept **within 24 hours** — on the fly, in front of the client, using AI.

Superteam is the squad that makes that possible.

- **In a client workshop?** Superman takes your brief. Bob sketches the architecture. Eric builds the PoC. Marlo designs the UX. Vera signs it off. All fast enough to hand something to the client the same day or the next morning.
- **Training new FDEs?** Point them to [`squad/onboarding/start-here.md`](squad/onboarding/start-here.md) and the intro deck first.
- **Using Azure / M365 / Power Platform?** Nexus knows the Microsoft stack cold — WAF, AI Foundry, Copilot Studio, Fabric, the lot.

> Not an FDE? Superteam works for any software delivery team. The FDE use case is the sharpest version of what it does: fast, coordinated, AI-first delivery under real pressure.

---

---

## Get Started — Pick Your Path

### Path 1 — Claude Desktop or claude.ai
**Best for:** Anyone with a Claude account. No installation, no VS Code, no command line. Works in a browser or the Claude app.

1. Open [claude.ai](https://claude.ai) → **New Project** → name it `Superteam`
2. Open [`squad/onboarding/paste-into-claude.md`](squad/onboarding/paste-into-claude.md) from this repo
3. Copy the entire file → paste into the **Project Instructions** field
4. Scroll to the bottom — fill in **Your Team Context** with your name, domain, and stack
5. Start a conversation. Say: *"Superman — I'm [your name]. Let's start."*

Full setup guide: [`squad/onboarding/getting-started.md`](squad/onboarding/getting-started.md)

---

### Path 2 — Claude Code (CLI)
**Best for:** Developers who want automatic file writes, git commits, and terminal access.

```bash
git clone https://github.com/stevemarksava/superteam.git ~/.claude
```

If `~/.claude` already exists, copy `agents/`, `squad/`, and `CLAUDE.md` manually into it.

Reload Claude Code. Superman is the default agent.

---

### Path 3 — GitHub Copilot in VS Code
**Best for:** Teams already using Copilot Chat who want the squad available without switching tools.

**Option A — Quick setup (any repo, zero install)**
Copy [`.github/copilot-instructions.md`](.github/copilot-instructions.md) into the root of any repo. Copilot picks it up automatically. Address agents by name in Copilot Chat.

**Option B — Full agent participants (`@superman`, `@eric`, `@vera`)**
```powershell
code --install-extension "vscode-extension/superteam-copilot-participants-0.2.0.vsix"
```
Build from source: `cd vscode-extension && pnpm install && pnpm run package`

---

## Your First Project

Once you're set up, here's how to start delivering.

**Starting a brand new project:**
1. Copy the squad template into your project folder:
   ```bash
   cp -r ~/.claude/squad-template/ your-project/.squad/
   ```
   ```powershell
   Copy-Item -Recurse "$env:USERPROFILE\.claude\squad-template\" "your-project\.squad\"
   ```
2. Tell Superman: *"New project — run the onboarding checklist."*
3. Superman walks the team through [`squad/onboarding/new-project-checklist.md`](squad/onboarding/new-project-checklist.md)
4. No agent touches work until it's done

**Adding Superteam to an existing project:**
1. Copy the squad template into your existing project (same command above)
2. Tell Superman: *"Existing project — here's what we're working on: [brief description]. What do you need to know?"*
3. Superman briefs the relevant specialists and starts from where you are

**Your first delivery:**
Say what you need. Superman handles the routing:
- *"I need to build X"* → Paulien plans it, Kryptonite red-teams it, Eric builds it, Vera signs it off
- *"Research Y for me"* → Athanasios investigates and reports back
- *"Review this code"* → Vera tests it
- *"Design a data model for Z"* → Bob blueprints it

---

## The Squad

| Agent | What they do |
|-------|-------------|
| **Superman** | Your one voice in. Routes everything, makes the call, owns delivery |
| **Bob** | Architect — blueprints before anyone builds anything significant |
| **Eric** | Elite coder — clean, pragmatic, security-aware |
| **Marlo** | UX designer — thinks in user journeys, not just screens |
| **Paulien** | Planner — breaks work into ordered tasks with clear done-criteria |
| **Vera** | Quality gate — nothing ships without her sign-off |
| **Athanasios** | Researcher — goes deeper than anyone else would bother |
| **Kryptonite** | Red team — attacks every plan before it becomes a build |
| **Kevin** | Reports and documentation — readable by non-technical people |
| **G** | Finance — no feature ships with undefined economics |
| **Coach** | Watches team performance, writes game tape, makes everyone better |
| **Georgiana** | Translates Coach's analysis into team direction |
| **Nexus** | Azure / M365 / Power Platform / Fabric specialist (activated per-project) |

> Each agent has a **Disciple** archetype from the Racecar Discipleship Framework — a character lens that shapes how they think and communicate.

---

## What's in This Repo

```
agents/              The 13 agent definition files (who each agent is, how they work)
squad/
  SYSTEM.md          The squad's immutable rules — every agent follows these always
  identity/          Squad identity, playbook, principles
  architecture/      Squad modes (Solo/Squad/Full), cost model, token budgets
  skills/            Knowledge cards the squad carries (graph DB, spatial/GIS, AI/ML,
  |                  dbt, Databricks, DevOps, testing, presentations, and more)
  onboarding/        ← START HERE if you're new
  |  start-here.md         The map — which file you need and when
  |  superteam-intro.html  Visual intro deck (open in browser)
  |  getting-started.md    Setup guide for Claude Desktop / claude.ai
  |  paste-into-claude.md  The file you paste into Claude Projects
  |  new-project-checklist.md  Run this at the start of every new project
  |  adapt-for-your-team.md    How to customise Superteam for your domain
  |  add-an-agent.md           How to add a new specialist agent
  coach/drills/      Practice scenarios built from real game tape
  agents/            Cross-project memory and lessons for each agent
squad-template/      Copy this into any project as .squad/ to give the team its structure
.github/             copilot-instructions.md, PR template, issue templates
vscode-extension/    @agent Copilot Chat participants for VS Code
```

---

## Adapting Superteam for Your Team or Client

1. Fork this repo (or copy it)
2. Edit `CLAUDE.md` — replace the owner context with yours
3. Edit `agents/superman.md` — change "Steve" to your name
4. Edit `squad/identity/PLAYBOOK.md` — make it your team's principles
5. Add domain skill cards to `squad/skills/` for your area of expertise

Full guide: [`squad/onboarding/adapt-for-your-team.md`](squad/onboarding/adapt-for-your-team.md)

---

Built with [Claude Code](https://claude.ai/code) · Powered by [Anthropic](https://anthropic.com)
