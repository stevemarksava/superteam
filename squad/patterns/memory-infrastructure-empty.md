---
name: memory-infrastructure-empty
tags: [memory, infrastructure, seeding, templates, lessons, knowledge-bank]
severity: medium
first_seen: 2026-06-08
projects: [superteam-config]
related_agents: [coach, athanasios, superman]
related_patterns: [trigger-not-wired, rule-execution-gap]
---

# Pattern: Memory Infrastructure Empty

## What It Is
Memory folders, template files, and knowledge bank structures exist and are committed. They contain no real content — only templates and placeholders. The system looks like it has memory. It doesn't. The team starts every session as cold as if none of the infrastructure existed.

## Why It Happens
Creating the infrastructure is treated as completing the task. Seeding it with real content is assumed to happen "over time" — which means it never happens because there's no trigger for the first write. Templates are created. Game tape folders are created. Nothing is ever written into them.

## Where It Appeared
**2026-06-08 / superteam-config:**
- `.squad/coach/game-tape/` folder: didn't exist in the superteam repo. The rule to write game tape existed. The folder did not. First game tape written only after Steve noticed.
- `squad/agents/*/memory/MEMORY.md`: templates present in squad-template. All empty across all agents. No real entries despite months of project work.
- `squad/agents/athanasios/knowledge/`: folders created with `.gitkeep`. Minimal real content filed.

## The Fix
- When adding a new rule that writes to a folder: create the folder AND write the first entry in the same commit
- When creating memory infrastructure: seed it with real current content, not templates
- `lessons.md` files for each agent are the first real seeding — Coach maintains them from session 1

## Watch For
- A folder that exists only with `.gitkeep` or template files
- Memory files that have been open for more than 1 session without a real entry
- "The infrastructure is ready" without evidence of real content
