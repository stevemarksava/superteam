---
date: 2026-06-08
status: active
owner: Superman (orchestrates), Coach (observes), Athanasios (patterns)
---

# Decision: How the Team Matures (Three-Tier Knowledge Graph)

## Context

A squad that starts each session from scratch is not a team — it's a series of one-shot consultants. For Superteam to compound value over time, its accumulated knowledge needs to survive context compaction, repo forks, and new FDEs joining.

## Decision

Team maturity runs on three tiers. Every tier must be active for the team to grow.

## The Three Tiers

### Tier 1 — Agent Lessons (`lessons.md` per agent)
What each specialist has learned from real work. Not general best practice — specific things that went wrong or right on actual tasks.

- **Location:** `~/.claude/squad/agents/<name>/lessons.md` (global, all projects)
- **Written by:** The agent, after a significant task
- **Read by:** Superman, at session boot (Step 1 of Boot Protocol)
- **Format:** Numbered lessons, most recent first. Lesson + why it matters.

### Tier 2 — Pattern Library (`squad/patterns/`)
Recurring failure modes or success patterns extracted from game tape. When a lesson appears in more than one agent's lessons.md, it becomes a pattern.

- **Location:** `~/.claude/squad/patterns/<pattern-name>.md`
- **Written by:** Coach (promotes from game tape) or Athanasios (during research)
- **Read by:** Athanasios at session boot (Step 3 — pulls 3-5 relevant patterns per task domain)
- **Format:** What it is, why it happens, the fix, a drill

### Tier 3 — Session Boot Protocol
The mechanism that loads the right knowledge at the right time, every session, before any work starts.

- **Location:** CLAUDE.md `## Session Boot Protocol`
- **Steps:** Superman loads his lessons → last game tape → Athanasios queries patterns/ → active agent lessons → only then: brief the team
- **Cost:** ~2-4K tokens. Worth it. Prevents re-learning lessons the team already paid for.

## How a Lesson Becomes a Pattern Becomes a Drill

1. Something goes wrong on a task
2. The agent logs it in their `lessons.md`
3. Coach writes it in game tape
4. If it recurs (same session or next session): Coach writes a pattern file in `squad/patterns/`
5. Athanasios surfaces it via the Boot Protocol on relevant tasks
6. If it persists: Coach writes a drill in `squad/coach/drills/` — a repeatable exercise to fix the habit

## Future State: Azure Cosmos DB Hosted Graph

The file-based model works for repo forks. For FDEs who don't fork (Claude Desktop, shared environments), a hosted version is designed:
- Azure Cosmos DB Serverless (NoSQL) as the backing store
- MCP Toolkit on Container Apps as the query interface
- Entra ID auth — no new credentials
- All four node types (Lesson, Skill, Drill, Pattern) map to this schema

See: `2026-06-08-azure-cosmos-knowledge-graph.md`

## Why Files, Not a Database (For Now)

Files work offline, commit to git, diff cleanly, and require zero infrastructure. The three-tier model is fully operational today with zero cost and zero latency. The Azure upgrade is an enhancement for multi-FDE sharing, not a prerequisite for the model to work.
