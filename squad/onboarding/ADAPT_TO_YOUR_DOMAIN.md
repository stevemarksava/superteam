# How to Adapt Superteam to Your Domain
> Superteam ships with Steve's context baked in. This guide strips it out and replaces it with yours.

---

## What's Steve-Specific vs What's Universal

**Universal (keep as-is):**
- All 12 agent identities and characters
- Squad modes (Solo / Squad / Full)
- Ceremonies structure
- Definitions of Ready and Done
- Coach / Georgiana loop
- Kryptonite red team process
- Memory protocol

**Steve-specific (replace with your context):**
- `CLAUDE.md` — Steve's name, location, expertise, values, project context
- `agents/superman.md` — "Steve" references in the opening and delivery gate
- `squad/identity/PLAYBOOK.md` — "Steve's principles" section
- `squad/onboarding/NEW_PROJECT.md` — tech stack defaults (React + Hono + SQLite → Azure SQL is Steve's stack)
- `squad/skills/spatial-gis.md` and `graphdb.md` — Steve is the domain expert; replace with your domain expert
- `.github/copilot-instructions.md` — Team Principles section (last two bullets are Steve's domain + values; replace with yours)

---

## Step-by-Step Adaptation

### 1. Fork the Repo
Fork `https://github.com/stevemarksava/superteam` and clone it to your `~/.claude/`:

```bash
git clone https://github.com/YOUR_USERNAME/superteam.git ~/.claude
```

If you already have a `~/.claude` directory, clone elsewhere and copy `agents/` and `squad/` manually.

### 2. Update CLAUDE.md

Replace Steve's context block with yours:

```markdown
## Your Context (Always Active)
- Based in [your city, country]
- Works on [your domain]
- Comfortable with code: [your level]
- [Organisation context]
- Values: [your values]
- Domain expert: [your specialisms]
```

### 3. Update Superman

In `agents/superman.md`, find all references to "Steve" and replace with your name or "the user." The routing table is universal — keep it.

### 4. Update the Playbook

In `squad/identity/PLAYBOOK.md`, replace the "Steve's Principles" section with your own principles. These shape every agent's defaults.

### 5. Update the Tech Stack Default

In `squad/onboarding/NEW_PROJECT.md`, find the tech stack section and replace the defaults with yours. Steve's defaults:
- Frontend: React (Vite)
- Backend: Hono on Node
- DB: SQLite local, Azure SQL prod
- Auth: Microsoft Entra ID
- Deploy: Azure SWA

Replace with your preferred stack. If you don't have a default, delete the defaults and let the onboarding process decide per-project.

### 6. Replace or Extend Skill Cards

Steve has skill cards for graph DBs, spatial/GIS, reporting, and recon — his domain specialisms. If those aren't your domain:
- Delete what's irrelevant
- Write new skill cards for your domain in `squad/skills/`

A skill card is a single markdown file that tells the squad when to use a technology, how to use it, and what to avoid. See `squad/skills/graphdb.md` for an example.

### 7. Set Your Cost Context

In `squad/onboarding/NEW_PROJECT.md`, update the cost context section to match your situation. Adjust the mode ceilings and alert thresholds to match your budget and client context.

### 8. Commit and Push

Commit your changes to your fork. Your squad config is now version-controlled and backed up.

---

## Minimal Adaptation (30 minutes)

If you just want to get started fast, do only these three things:

1. Replace `CLAUDE.md` user context block with your name and domain
2. Update Superman's opening: change "Steve" to your name
3. Update the tech stack defaults in `NEW_PROJECT.md`

Everything else can evolve as you use the squad.

---

## Adding Domain-Specific Intelligence to Athanasios

Athanasios's knowledge bank at `squad/agents/athanasios/knowledge/` is Steve's accumulated research. For your domain, seed it with your own research briefs:

```
squad/agents/athanasios/knowledge/
├── domain/        → your industry, organisation, key context
├── tech/          → frameworks and tools you use
├── recon/         → per-project research briefs
└── ...
```

The more you seed here, the smarter Athanasios is from day one of each project.

---

## Common Adaptations by Domain

| Domain | Key changes |
|--------|-------------|
| Healthcare | Add GDPR/HIPAA skill card · Update Athanasios knowledge bank with compliance context · Update Team Principles with your regulatory context |
| SaaS product | Update economics to commercial model · Update G's defaults to revenue-focused · Add a "customer" agent if needed |
| Agency work | Add a "client" context to Superman's briefing format · Create per-client CLAUDE.md overrides at project level |
| Education | Replace tech stack defaults with your ed-tech stack · Add a "learner" perspective to Marlo's UX approach |
| Internal tooling | Simplify Athanasios recon (internal threat model only) · Update Superman's delivery gate to match internal approval process |
