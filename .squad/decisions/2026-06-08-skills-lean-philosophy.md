---
date: 2026-06-08
status: active
owner: Athanasios (capability scout), Superman (installs per project)
---

# Decision: Lean Skills Philosophy (skills.sh)

## Context

skills.sh (`npx skills`) provides installable SKILL.md context extensions for specific domains (React, Next.js, databases, design systems, etc.). Each installed skill loads its SKILL.md content into every session's context window automatically. Installing broadly means burning context on every session — even sessions that have nothing to do with those domains.

The mistake made early in this project: treating "installed" as equivalent to "ready to use". It is not. Ready = reachable. Loaded = eating context.

## Decision

Only `find-skills` is installed globally and permanently. Everything else is per-project, on demand, removed when the project ships.

## Rules

**Permanent (global install):**
- `find-skills` only — it is the meta-skill, lightweight, needed to discover everything else

**Per-project install:**
- Athanasios scouts for relevant skills using `npx skills find [domain]`
- Superman approves and installs: `npx skills add <owner/repo@skill-name> --yes`
- Skill is removed when the project ships: `npx skills remove <skill-name>`
- Only install what the current project actually needs, not what might be useful

**Never:**
- Install skills globally except find-skills
- Install skills pre-emptively "just in case"
- Leave skills installed after a project ships

## Routing Clarity

Two things are called "skills" in this repo. They are different:

| What you want | Where to look |
|---------------|---------------|
| Internal expertise the squad already has | `squad/skills/*.md` — read the card |
| New external capability from the marketplace | `npx skills find [domain]` — don't browse the folder |

If you find yourself thinking "I need a skill for X" and opening `squad/skills/` — stop. That folder is for knowledge the squad already has. Run `npx skills find X` instead.

## Catalogue

Known skills by domain: see `squad/skills/skills-sh.md`

## Why This Matters

One skill loaded = one skill eating context in every session, on every project, forever. Context is the squad's scarcest resource. Guard it.
