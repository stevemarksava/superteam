---
date: 2026-06-08
status: active
owner: Athanasios (capability scout), Superman (installs per project)
---

# Decision: Lean Skills Philosophy (skills.sh)

## What Is skills.sh

[skills.sh](https://www.skills.sh) is a package manager for AI context. It hosts a marketplace of community-built `SKILL.md` files — curated, domain-specific knowledge cards that extend what a coding agent knows. Examples: Next.js best practices, React composition patterns, mobile development, database design, testing strategies.

Each skill is a `SKILL.md` file. When installed, it is automatically loaded into every Claude Code session's context window — the same way `CLAUDE.md` is. The agent gains that domain knowledge without you having to explain it.

Install: `npx skills add <owner/repo@skill-name> --yes`
Browse: `npx skills find [domain]`
Remove: `npx skills remove <skill-name>`

## The Problem With Installing Everything

Every installed skill loads its full content into every session — forever, on every project. A Next.js skill loaded in a Python data pipeline project costs the same tokens as it would on a Next.js project. Multiply that by ten skills and the team starts every session carrying dead weight.

The mistake made early in this project: installing the whole catalogue to be "ready." Ready ≠ loaded. Ready = reachable.

## Decision

**Only `find-skills` is installed globally and permanently. Everything else loads on demand per project and is removed when the project ships.**

## The On-Demand Cycle

This is the intended workflow — not a shortcut, the design:

```
1. Project starts
   └── Athanasios: npx skills find [project domain]
       └── Review results, check install count (quality proxy)
           └── Superman approves relevant skills

2. Project in flight
   └── npx skills add <owner/repo@skill-name> --yes
       └── Skill loads into context for this project's sessions
           └── Squad has the capability — without permanent overhead

3. Project ships
   └── npx skills remove <skill-name>
       └── Skill leaves context — next project starts lean again
```

## Rules

**Permanent (global install — one skill only):**
- `find-skills` — the meta-skill, lightweight, needed to discover everything else

**Per-project install:**
- Athanasios scouts: `npx skills find [domain]`
- Superman approves and installs: `npx skills add <owner/repo@skill-name> --yes`
- Only install what the current project demonstrably needs
- Remove when the project ships: `npx skills remove <skill-name>`

**Never:**
- Install skills globally except `find-skills`
- Install pre-emptively "just in case"
- Leave skills installed after a project ships

## Routing Clarity

Two things are called "skills" in this repo. They are different:

| What you want | Where to look |
|---------------|---------------|
| Internal expertise the squad already has | `squad/skills/*.md` — read the card |
| New external capability from the marketplace | `npx skills find [domain]` — don't browse the folder |

If you find yourself thinking "I need a skill for X" and opening `squad/skills/` — stop. That folder is internal knowledge the squad already carries. The marketplace is `npx skills find X`.

## Catalogue

Known skills by domain (pre-researched, ready to install): see `squad/skills/skills-sh.md`

## Why This Matters

One skill loaded = one skill eating context in every session, on every project, until removed. Context is the squad's scarcest resource. The team that ships with lean context is faster than the team that ships with every capability pre-loaded. Guard it.
