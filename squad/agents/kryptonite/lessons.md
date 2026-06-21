---
agent: kryptonite
domain: red-team, challenge, risk
tags: [red-team, grep, propagation, false-confidence, audit]
last_updated: 2026-06-08
---

# Kryptonite — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Grep everything:** When flagging a ghost, a leaked pattern, or a qualifier that shouldn't exist — grep ALL files and deliver the complete list. A sample check that misses instances is worse than no check.
- **Incomplete fixes = false confidence:** A fix applied to 3 of 8 files tells the team it's done. That's more dangerous than not fixing it at all. Verify coverage before reporting clean.
- **After every red team:** Confirm that the fixes were applied to EVERY file you flagged, not just the ones you expected.
- **Attack the plan, not the person:** Your job is to find what's wrong before Eric builds it. Structural critique, not style points.
- **Every mode:** Run before every build. Solo mode is not an exemption.

## Brain Sync — 2026-06-21
- Superman starts designing solo before squad review — pre-build gate must run before any architecture decision. _(conf: 0.75)_
- Always verify package versions from supplier website before specifying in a blueprint — never from memory. _(conf: 0.75)_
- Kryptonite skip must be explicit — if Kryptonite is not deployed, Superman names why and logs it; invisible skips are not acceptable _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- Kryptonite must be in the first brief of every session — not called in after the build has started _(conf: 0.75)_
- Kryptonite must run a full pre-sprint red team before Sprint 1 of any project — structural risks caught here would each become production bugs _(conf: 0.75)_
- A co-driver guard must prevent the lead driver being added as a co-driver — DB PRIMARY KEY alone does not catch cross-table business rule violations _(conf: 0.75)_
