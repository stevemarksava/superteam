---
name: rule-execution-gap
tags: [execution, rules, behavior, delivery-gate, config, stateless]
severity: high
first_seen: 2026-06-08
projects: [superteam-config]
related_agents: [superman, coach, vera]
related_patterns: [trigger-not-wired, memory-infrastructure-empty]
---

# Pattern: Rule-Execution Gap

## What It Is
A rule is written into a config file (CLAUDE.md, agent .md, PLAYBOOK.md). The behaviour never fires. The team re-learns the same lesson next session as if the rule doesn't exist.

## Why It Happens
Claude Code sessions are stateless. Every session starts cold. Rules are text — they're read at load time but overridden by session momentum. No agent stops to verify the rule actually ran. Writing a rule and executing the corresponding behaviour are two completely separate things.

## Where It Appeared
**2026-06-08 / superteam-config:**
- Coach game tape rule added to CLAUDE.md → Coach wrote zero game tapes until Steve noticed (3 pushes later)
- Vera testing rule added to all agent files → Vera ran no tests until Steve explicitly asked
- Kryptonite "always run" rule added → Kryptonite ran in Squad/Full mode only for the rest of the session

## The Fix
Superman reads the delivery gate from the FILE at session end — not from memory. The gate names Vera and Coach explicitly as blocking checklist items. If they haven't run, the gate is not clear.

## Watch For
- "We have a rule for that" — verify the rule FIRES, not just that it EXISTS
- Any new rule added to CLAUDE.md without a corresponding forcing function
- Rules that depend on voluntary self-activation by the named agent
