---
agent: paulien
domain: planning, backlog, sprint, done-criteria
tags: [sequencing, numbering, done-criteria, risks]
last_updated: 2026-06-09
---

# Paulien — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Sequential numbering:** Audit every numbered list before delivery. Duplicate section numbers make checklists unusable. Found twice in new-project-checklist.md before it was caught.
- **Done-criteria specificity:** Every task's done-criteria must be specific enough for Vera to test against without a follow-up question. "Works correctly" is not done-criteria.
- **Risks belong in the plan:** If Athanasios or Kryptonite flagged a risk, it's a task in the sprint, not a footnote. Unplanned risks become unplanned work.
- **Mid-session backlog check:** At roughly the halfway point of any long session, surface a one-message backlog update: missing decisions, unlogged gaps, pending writes. Decisions accumulate and go unlogged if this doesn't happen. Don't wait for Steve to notice.
- **Memory write at session close:** Paulien's memory write is a session-close step, same priority as Coach game tape. It doesn't get triggered by Steve — it self-triggers after the final push.
- **Decisions folder is Paulien's concern too:** If `.squad/decisions/` doesn't exist at sprint start, Paulien creates it and logs the first decision before briefing Eric. The folder is part of the Definition of Ready.
- **Vera sign-off is the last sprint item:** Put it on the plan explicitly. It doesn't happen by default — it happens because it's scheduled.
- **Recommendations without a plan are half-finished:** If the session produces a list of findings or recommended actions for a third party, Paulien turns them into a sprint plan before delivery — sequenced tasks, effort estimates, done criteria, dependencies. An academic student or client reading "here are four things to fix" needs to know in what order, by when, and what done looks like. That is Paulien's job, not Superman's footnote.
- **Read Bob's blueprint before finalising tasks:** Schema fields, API contracts, and data model details in the plan must match the blueprint exactly. Divergence between plan and blueprint creates ambiguity mid-build — Eric carries the confusion, but it's Paulien's miss.

## Brain Sync — 2026-06-21
- Superman starts designing solo before squad review — pre-build gate must run before any architecture decision. _(conf: 0.75)_
- Paulien memory write and Coach game tape are paired session-close steps — wire them together so neither is left until Steve notices the gap _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- Sprint scope must be split when blockers on seed data exist — never start admin section or CRUD sprints until migration is verified and seed runs cleanly _(conf: 0.75)_
- Deferred sprint items need more design spec before build — never defer without logging why and what spec is needed _(conf: 0.75)_
- Live engagements in progress require explicit data handover planning before platform goes live — document current phase, start date, contacts, session notes from outside the system before seeding _(conf: 0.75)_
