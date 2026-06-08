# Skills.sh — Superteam's Superpower Store

## The Core Philosophy
Skills.sh skills are SKILL.md files that load into the context window. **Installing everything is the wrong move** — it bloats every session regardless of what the project needs.

The rule: **one permanent install, everything else on demand.**

| Permanent (always loaded) | On-demand (per project) |
|---------------------------|------------------------|
| `find-skills` — the meta-skill that finds others | Everything else |

When a project needs a skill, Athanasios installs it. When the project is done, it gets removed.

## The Two Types of "Skills" in Superteam

| Type | Location | Purpose |
|------|----------|---------|
| `squad/skills/*.md` | `~/.claude/squad/skills/` | Knowledge reference cards — loaded deliberately, not automatically |
| skills.sh skills | `~/.claude/skills/` (symlinked) | Installable context extensions — load only when the project needs them |

## How to Add a Superpower (Athanasios — on demand)

When a project needs a capability the team doesn't have:

1. **Identify the gap** — "we need X and don't have a skill for it"
2. **Search:** `npx skills find [domain query]`
3. **Evaluate quality** — prefer 1K+ installs, trusted sources (`vercel-labs`, `anthropics`, `microsoft`)
4. **Install for this project:** `npx skills add <owner/repo@skill-name> --yes`
5. **Report to Superman** — skill name, what it does, install count
6. **Remove when the project ships:** `npx skills remove <skill-name>`

## Permanently Installed

| Skill | Source | Installs | Purpose |
|-------|--------|----------|---------|
| find-skills | vercel-labs/skills | 1.9M | Discovers and installs other skills on demand |

## Skills Catalogue by Domain

These exist on skills.sh. Install per-project when needed, remove after.

| Domain | Recommended Skill | Source | Installs |
|--------|------------------|--------|----------|
| Frontend & React | `vercel-react-best-practices` | vercel-labs/agent-skills | 457K |
| Design & UI | `web-design-guidelines` | vercel-labs/agent-skills | 372K |
| Design & UI | `frontend-design` | anthropics/skills | 513K |
| Next.js | `vercel-composition-patterns` | vercel-labs/agent-skills | 202K |
| Next.js | `nextjs-app-router-patterns` | wshobson/agents | 20K |
| Mobile | `vercel-react-native-skills` | vercel-labs/agent-skills | 136K |
| Testing | `webapp-testing` | anthropics/skills | 90K |
| Testing | `e2e-testing-patterns` | wshobson/agents | 17K |
| Databases | `database-migration` | wshobson/agents | 12K |
| Marketing | `seo-audit` | coreyhaines31/marketingskills | 130K |
| Marketing | `copywriting` | coreyhaines31/marketingskills | 120K |
| Documents | `pptx` | anthropics/skills | 137K |
| Documents | `docx` | anthropics/skills | 117K |
| Documents | `xlsx` | anthropics/skills | 104K |
| Custom skills | `skill-creator` | anthropics/skills | 257K |

> Full catalogue: https://skills.sh/ — Athanasios searches live before recommending.

## CLI Reference
```bash
npx skills find [query]                          # search the catalogue
npx skills add <owner/repo@skill> --yes          # install for this project
npx skills add <owner/repo@skill> --yes --global # install permanently (use sparingly)
npx skills list                                  # see what's installed
npx skills remove <skill>                        # uninstall when done
npx skills init <name>                           # create a custom skill
```

## When No Skill Fits
1. Proceed with native Claude Code capability
2. Commission a custom skill with `npx skills init <name>` — Eric builds the SKILL.md, Athanasios files it
3. Log the gap in the patterns library if it recurs across projects
