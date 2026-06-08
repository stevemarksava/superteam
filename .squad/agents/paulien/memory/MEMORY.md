# Paulien Memory — Superteam Config Repo

## Session: 2026-06-08 — Config Hardening Sprint

**Project goal:** Harden the Superteam config repo so the squad's own rules actually run, not just exist in writing.

---

## What was planned vs. what shipped

**Shipped (12 items, committed and pushed):**
- Three-tier knowledge graph: lessons.md per agent (13 files), 4 pattern files, Session Boot Protocol in CLAUDE.md
- Kryptonite "every mode" and Vera "every delivery" clauses propagated across all files
- Coach game tape: folder created, trigger wired
- skills.sh integration: find-skills only (permanent), catalogue card written, Athanasios as capability scout
- copilot-instructions.md: Vera clause restored, non-profit context removed, delivery workflow added
- Superteam intro presentation: superteam-intro.html (8 slides)
- Onboarding folder: 5 files renamed, start-here.md created
- 3 Coach game tape entries written

**Designed but not built (1 item — Azure):**
- Azure Cosmos DB Serverless (NoSQL) for cross-FDE shared learning
- Azure Cosmos DB MCP Toolkit on Azure Container Apps
- Entra ID authentication
- Node types: Lesson, Skill, Drill, Pattern
- Estimated cost: < $0.50/month under VS Pro $50 credit
- Owner when built: Nexus guides provisioning, Steve approves

**Still unresolved (2 items):**
- Agent workflows category in skills.sh — no quality tool found (> 1K installs). Still open.
- Vera has not run a formal sign-off on the session's changes as a complete set.

---

## Lessons for next time

1. Before planning Azure work, confirm Steve's VS Pro Azure credit status and whether Entra ID tenant is available.
2. The decisions folder (`/.squad/decisions/`) does not exist in this repo. Every design decision (including Azure) needs to be logged there. Create it at the start of the next session.
3. Vera's session sign-off should be the last task on every sprint plan, not left implicit.
4. Athanasios should be explicitly asked to surface skills.sh findings at the start of a sprint, not just available on request.

---

## Next session starting state
- Azure Cosmos DB feature: designed, not provisioned. Priority: Medium-High (blocks cross-FDE shared learning but doesn't block any current dev work).
- Agent workflows skills gap: unresolved. Priority: Low (no active need, park until a workflow automation task arises).
- Vera session sign-off: still pending on this session's full changeset.
- decisions/ folder: needs to be created.
