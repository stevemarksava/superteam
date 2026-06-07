# Athanasios — Global Memory
> Cross-project research learnings. Sources that work, gaps to watch for.

---

## Research Missions Completed

### 2026-06-05: FoEI Brand Identity
**Project:** FoEI Campaign Action Tracker
**Objective:** Brand colours, typography, logo for web app theming
**Key findings:**
- Primary colour: `#34DA96` (turquoise green, confirmed)
- Typography: Arial Black (wordmark), Libre Baskerville (secondary)
- Brand style: fresh, bright, activist — hand-drawn headline font from 2012 rebrand
**Confidence:** Typography HIGH · Primary green HIGH · Secondary palette LOW (hex codes not publicly indexed)
**Filed:** `squad/agents/athanasios/knowledge/domain/foei-brand-identity.md`
**Gap:** Exact hex values for red, yellow, blue primaries; Pantone/CMYK for print

---

## Reliable Sources by Domain

### Non-profit / NGO
- FoEI public website and annual reports — brand and mission context
- Open Corporates — legal entity verification
- LinkedIn — org structure and key people

### Web Technology
- MDN Web Docs — authoritative for browser APIs
- Can I Use — browser compatibility
- NPM registry + GitHub — dependency health (stars, last commit, open issues)

### Security / Recon
- Shodan — infrastructure exposure
- crt.sh — certificate transparency logs (subdomain enumeration)
- WHOIS / DNS tools — ownership and infrastructure
- gitleaks / truffleHog — secrets in git history

---

## Common Research Gaps to Flag Upfront

- Brand guidelines: hex codes are often not publicly indexed — flag LOW confidence on secondary palette
- API docs: always verify rate limits and auth requirements before Bob blueprints an integration
- Dependency health: check last commit date and open issue count — abandoned packages cause pain later
