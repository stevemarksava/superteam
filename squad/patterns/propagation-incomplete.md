---
name: propagation-incomplete
tags: [grep, propagation, ghost, removal, audit, consistency]
severity: high
first_seen: 2026-06-08
projects: [superteam-config]
related_agents: [kryptonite, vera, athanasios]
related_patterns: [rule-execution-gap]
---

# Pattern: Propagation Incomplete

## What It Is
A concept (a name, a rule, a qualifier, a piece of context) is removed or changed in one file. It survives in other files that weren't checked. The fix creates false confidence — the team believes it's clean when it isn't.

## Why It Happens
The fixer searches for the obvious locations and stops. They don't grep the whole repo. Sometimes the concept appears in files that are semantically unrelated to the change (e.g., "Madhavi" was fixed in PLAYBOOK.md and coach.md but survived in vera.md itself — the least obvious place to look).

## Where It Appeared
**2026-06-08 / superteam-config (Madhavi ghost):**
- "Madhavi" removed from PLAYBOOK.md and coach.md
- Survived in: vera.md (line 8 + line 44) — not found until Vera ran her own audit
- Two Kryptonite passes missed it

**2026-06-08 / superteam-config (Kryptonite "always" rule):**
- Rule updated in CLAUDE.md, superman.md, PLAYBOOK.md, copilot-instructions.md
- Survived in: new-project-checklist.md (×2), DEFINITION_OF_READY.md, feature.md, code-review.md, paste-into-claude.md
- Not caught until Vera's audit

## The Fix
Before marking any removal or replacement complete:
1. Grep the entire repo for the pattern — not a subset, the whole thing
2. Deliver the complete list of files to fix, not a sample
3. After fixing: re-grep to confirm zero matches remain (excluding deliberate references like game tape)

## Watch For
- "I've removed it" without a grep result showing zero matches
- Fixes applied to the 'obvious' files without checking the rest
- Any concept that appears in more than 2-3 files — those are the ones that will have survivors
