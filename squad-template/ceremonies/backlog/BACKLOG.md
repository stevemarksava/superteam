# Superteam — Product Backlog
> Superteam treated as a product. This backlog tracks improvements to the squad itself — for adoption by any team, any project.
> Owner: Paulien · Reviewed: end of every retro · Prioritised by: Steve

---

## P1 — Must Ship (Blocking Adoption)

| ID | Title | Description | Size | Status |
|----|-------|-------------|------|--------|
| ST-01 | Core documentation suite | README, squad-template, onboarding, DoR/DoD, ceremonies — all present and complete enough for a new team to onboard without asking questions | M | ✅ Done |
| ST-02 | Agent definitions — all 12 | All agents defined with identity, character, job, standards, mesh behaviour, and memory protocol | M | ✅ Done |
| ST-03 | VS Code Copilot Chat extension | @superman, @eric, @vera etc. as real Copilot Chat participants — loads system prompts from ~/.claude/agents/ | M | ✅ Done |
| ST-04 | GitHub Copilot instructions | .github/copilot-instructions.md with full squad context, disciple labels, routing rules | S | ✅ Done |
| ST-05 | Squad template folder | .squad/ template with DoR, DoD, decisions, game-tape, all 12 agent memories | M | ✅ Done |
| ST-06 | LICENSE file | Open source licence so others can legally use and fork the squad | S | 📋 Backlog |
| ST-07 | CONTRIBUTING.md | How to contribute to Superteam — fork guide, agent authoring standard, PR process | S | 📋 Backlog |

---

## P2 — Should Ship (Next Sprint)

| ID | Title | Description | Size | Status |
|----|-------|-------------|------|--------|
| ST-08 | GitHub Actions CI | Lint + type-check on every PR to the superteam repo itself | S | 📋 Backlog |
| ST-09 | PR template | .github/PULL_REQUEST_TEMPLATE.md with DoD checklist, decisions-logged gate, Vera sign-off field | S | 📋 Backlog |
| ST-10 | Issue templates | Feature and bug issue templates that map to DoR and recon checklist | S | 📋 Backlog |
| ST-11 | MCP server integration | Expose Superteam agents via MCP protocol so any MCP-compatible AI tooling (Claude Desktop, Cursor, other IDEs) can use the squad without needing Claude Code. Medium priority — high value for portability, but not blocking adoption today. | L | 📋 Backlog |
| ST-12 | Agent voice style guide | One-page reference: how each agent speaks — tone, sentence structure, what each never says. Helps humans writing new agents match the squad's voice. | S | 📋 Backlog |
| ST-13 | VS Code extension — Marketplace publish | Package and publish superteam-copilot-participants to VS Code Marketplace so others can install without building from source | M | 📋 Backlog |

---

## P3 — Nice to Have (Later)

| ID | Title | Description | Size | Status |
|----|-------|-------------|------|--------|
| ST-14 | Cost tracker tooling | Script (Kevin uses) that parses Claude Code session logs and generates monthly cost CSV: date, mode, agents, tokens, cost | M | 📋 Backlog |
| ST-15 | Example project repo | A public minimal project showing a .squad/ folder in action — decisions, game tape, retro, one sprint completed | M | 📋 Backlog |
| ST-16 | Video walkthrough | 5-minute screen recording of Superteam in action — onboarding, sprint, delivery. Linked from README. | L | 📋 Backlog |
| ST-17 | Agent performance dashboard | Coach's progress files visualised — agent grades over time, recurring patterns, drill completion rate | XL | 📋 Backlog |
| ST-18 | Multi-model support | Allow agents to run on different LLM backends (GPT-4o, Gemini, local models via Ollama) — abstract the model layer from the agent identity | XL | 📋 Backlog |

---

## Done

| ID | Title | Shipped |
|----|-------|---------|
| ST-01 | Core documentation suite | 2026-06-08 |
| ST-02 | Agent definitions — all 12 | 2026-06-08 |
| ST-03 | VS Code Copilot Chat extension | 2026-06-08 |
| ST-04 | GitHub Copilot instructions | 2026-06-08 |
| ST-05 | Squad template folder | 2026-06-08 |

---

*Backlog owner: Paulien · Last groomed: 2026-06-08*
