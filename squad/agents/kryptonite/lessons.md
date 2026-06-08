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
