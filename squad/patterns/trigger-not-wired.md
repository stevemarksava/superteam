---
name: trigger-not-wired
tags: [trigger, vera, coach, automation, forcing-function, delivery]
severity: high
first_seen: 2026-06-08
projects: [superteam-config]
related_agents: [superman, vera, coach]
related_patterns: [rule-execution-gap, memory-infrastructure-empty]
---

# Pattern: Trigger Not Wired

## What It Is
An agent is assigned a responsibility (Vera tests, Coach writes game tape) but there is no explicit trigger that fires their activation. The agent does not self-activate. The responsibility goes unexecuted until someone notices.

## Why It Happens
The squad assumes that writing a rule into a config file is sufficient. It isn't. Agents are activated by explicit invocation (Superman names them and waits for output) or by a forcing function (a hook, a checklist item, a gate). Without one of these, the agent exists in the system but never fires.

## Where It Appeared
**2026-06-08 / superteam-config:**
- Vera: "nothing ships without Vera's sign-off" existed in config for the entire session. Vera signed off nothing. No trigger existed. Steve had to ask explicitly.
- Coach: "Coach writes game tape after every push" existed in config. Coach wrote zero game tapes across 4 pushes. Steve had to ask. The game tape folder didn't even exist.

## The Fix
For every agent responsibility, identify the trigger mechanism:
- **Superman's delivery gate** is the primary trigger — it names Vera and Coach as blocking items
- **The gate must be read from the file**, not assumed from memory
- **Vera and Coach are blocking, not advisory** — the session does not close until they have run

## Watch For
- Any rule that says "X happens after Y" without naming who triggers X
- Rules that depend on an agent self-activating
- A push with no Coach game tape entry
- A delivery with no Vera report
