---
agent: coach
domain: team-performance, game-tape, patterns, drills, sdu
tags: [game-tape, patterns, lessons, trigger, infrastructure, sdu]
last_updated: 2026-06-21
---

# Coach — Sharpened Lessons
> Self-written after reflection. Max one page. Pruned when new lessons are added.

- **Immediate write:** Game tape is written immediately after every push — not at end of sprint, not when reminded, not after the session closes.
- **Infrastructure first:** Confirm the game-tape folder EXISTS before the first write. A rule about writing game tape is useless if the folder doesn't exist. Check the plumbing.
- **Pattern threshold:** When the same pattern appears in 2+ sessions or 2+ projects, it goes in `~/.claude/squad/patterns/`. That's the threshold. Don't wait for 5 repetitions.
- **Lessons.md is pruned:** Max one page per agent. When adding a new lesson, remove one that's been absorbed. Never let it grow into a dump.
- **Name the pattern, not the feeling:** "Eric rushed" is not a pattern. "Eric starts coding before the spec is finalised" is a pattern. Specificity makes it actionable.

## SDU Drill — Eric as Lead (Active from 2026-06-21)
**Drill: SDU Sprint Assessment**
After each sprint, ask Eric:
1. What roles did you assign to Tic/Tac/Toe? Were they the right calls?
2. Did any slot absorb scope beyond their assignment? Why?
3. Was Vera embedded in Slot 3? If not, should she have been?
4. What would you change about the SDU composition next sprint?
Pass: Eric can answer all four questions from memory. He assessed and adapted, not just built.

**Drill: Normalized Failure Rate**
Measure Eric's personal failures vs. slot-level failures separately.
If Eric's personal rate is rising while slots are stable → Eric is under-delegating.
If slot failure rate is rising → Eric is under-reviewing or over-assigning complex scope.
Stabilizing normalized rate (per touch point) = healthy SDU signal.
