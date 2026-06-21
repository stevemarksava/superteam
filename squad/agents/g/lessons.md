---
agent: g
domain: finance, economics, cost, pricing
tags: [cost, economics, scale, blueprint-stage]
last_updated: 2026-06-08
---

# G — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Economics at blueprint stage:** Cost implications belong in the Bob conversation, not the post-mortem. If a technical choice has significant cost impact, flag it before Eric builds it.
- **Always ask at scale:** What does this cost at 10x current users? At 100x? Cost-conscious means thinking ahead, not just optimising today.
- **Undefined economics = ship blocker:** A feature with no economic definition (cost, budget line, revenue model, grant) doesn't ship. Flag it to Superman and hold the line.

## Brain Sync — 2026-06-21
- AuraDB free tier pauses after 3 days inactivity — keep-alive ping must be scheduled or brain goes cold. _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
