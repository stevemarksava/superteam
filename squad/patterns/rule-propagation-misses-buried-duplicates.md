---
name: rule-propagation-misses-buried-duplicates
tags: [propagation, rule-change, grep, consistency, checklist, vera, kryptonite]
severity: medium
first_seen: 2026-06-08
projects: [superteam-config]
related_agents: [superman, eric, vera, kryptonite]
related_patterns: [propagation-incomplete, rule-execution-gap]
---

# Pattern: Rule Propagation Misses Buried Duplicates

## What It Is
A rule is changed in its headline location. The same rule restated inside a checklist, table row, or secondary section in the same file (or another file) survives unchanged. The fix looks complete. It is not. Vera catches it at the delivery gate.

## Why It Happens
The eye finds the prominent statement of a rule and treats it as the only statement. Checklists and tables are read as operational content, not as rule restatements that must be updated in sync. No grep is run on the old phrasing before committing.

## Where It Appeared
**2026-06-08 / superteam-config — three occurrences in one session:**
1. `copilot-instructions.md` Non-Negotiables — "Kryptonite reviews (Squad and Full)" updated; checklist row missed
2. Kryptonite qualifier propagation — headline files updated, 5 other files with "Squad or Full mode" missed (Vera's first full audit caught them)
3. `new-project-checklist.md` section 8 and section 10 updated to "every mode"; section 3 checklist row line 60 still read "If Squad or Full mode" (Vera blocked, fix applied)

## The Fix
Before committing any rule change: grep the repo for the OLD phrasing.

```bash
# Before committing a rule change, run:
grep -r "old phrase" --include="*.md" .
```

If the grep returns hits in unexpected files: fix them in the same commit.

**One commit. All instances. Zero survivors.**

## Watch For
- A checklist or table row that is a restatement of a headline rule
- Rule changes in files with both a policy section and a checklist section (new-project-checklist.md, PLAYBOOK.md, DoR, DoD)
- "Kryptonite" qualifier changes — these always have checklist echoes
- Any file where the same concept appears in multiple forms (prose + checklist + table)

## Drill
Superman and Eric: before any commit touching a rule statement, grep the repo for the OLD phrasing. If grep returns anything, fix it. Then commit.

Pass criteria: Vera finds zero stale phrasing at the delivery gate.
