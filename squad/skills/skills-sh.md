# Skills.sh — Superteam's Superpower Store

## What It Is
[skills.sh](https://skills.sh/) is the open agent skills ecosystem. Skills are modular SKILL.md files that extend Claude Code (and other agents) with specialised knowledge, workflows, and tool guidance. Think of it as an app store for agent capabilities.

## The Two Types of "Skills" in Superteam

| Type | Location | Purpose |
|------|----------|---------|
| `squad/skills/*.md` | `~/.claude/squad/skills/` | Knowledge reference cards — domain guides, tool patterns |
| skills.sh skills | `~/.claude/skills/` (symlinked) | Installable slash commands and capability extensions |

These are different. The squad skills cards are internal knowledge. The skills.sh skills are installable extensions.

## How to Add a Superpower

**Athanasios is the capability scout.** When the team hits a capability gap:

1. **Identify the gap** — "we need X and don't have a skill for it"
2. **Search:** `npx skills find [domain query]`
3. **Evaluate quality:**
   - Install count: prefer 1K+ installs
   - Source: `vercel-labs`, `anthropics`, `microsoft` = trusted
   - <100 installs = treat with caution
4. **Install:** `npx skills add <owner/repo@skill-name> --yes --global`
5. **Report to Superman** with skill name, what it does, and install count

## Installed Skills

| Skill | Source | Installs | Installed |
|-------|--------|----------|-----------|
| find-skills | vercel-labs/skills | 1.9M | 2026-06-08 |

> Update this table whenever a new skill is installed.

## Browsing the Catalogue
- Full catalogue: https://skills.sh/
- Leaderboard shows most popular skills first
- `npx skills find [query]` for keyword search

## CLI Reference
```bash
npx skills find [query]          # search the catalogue
npx skills add <owner/repo@skill> --yes --global  # install globally
npx skills list                  # see installed skills
npx skills update                # update all installed skills
npx skills remove <skill>        # uninstall
npx skills init <name>           # create a custom skill
```

## When No Skill Fits
Athanasios reports "nothing found" to Superman. Options:
1. Proceed with native Claude Code capability
2. Commission a custom skill with `npx skills init <name>` (Eric builds the SKILL.md)
3. Log the gap in the patterns library if it recurs

## Squad Rule
- Check skills.sh **before** building a custom capability
- Never recommend a skill with <100 installs
- After installing any skill: update the table above and write a brief to the recon file
