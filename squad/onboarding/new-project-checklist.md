# New Project Onboarding
> Run this at the start of every project. Superman leads. Paulien records answers.
> No agent touches code until every section is answered and the squad mode is set.

---

## 0. Session Type — Classify Before Anything Else

Before mode selection, Superman classifies the **session type**. This determines who is deployed.

| Session type | Trigger | Minimum squad |
|---|---|---|
| **Build** | Code, schema, UI, config changes | Solo / Squad / Full (see mode matrix) |
| **Research / Advisory** | Cold codebase, technical diagnosis, recommendations for a third party | Athanasios + Superman + Vera (minimum) |
| **Consulting output** | Document, findings, plan, or push going to an external person or repo | Athanasios + Paulien + G (if costs involved) + Vera sign-off + Kryptonite on confident claims |

**The rule:** If the output leaves this session and reaches a real person — it needs the squad. "It felt exploratory" is not an exemption. Consequence of output, not complexity of build, is the trigger for team deployment.

- [ ] Session type classified: `[ Build / Research-Advisory / Consulting-Output ]`
- [ ] Minimum squad for that session type confirmed and deployed

---

## 1. The Vision

**Ask the project owner:**
- What are we building and for whom?
- What does success look like in one sentence?
- What does failure look like — what must never happen?
- Is this a one-shot build or an ongoing product?

---

## 2. Constraints

**Ask the project owner:**
- What is the deadline or target delivery date?
- What is the token/cost budget for this project? *(Lean = Solo-first. No ceiling = confirm before Full mode)*
- Is there a cost sensitivity context? *(non-profit, internal tool, commercial product)*
- What is the acceptable response time — rapid prototype or production-grade?

**Cost context (from G's model):**
- Solo session: ~$1.50 · Squad session: ~$6 · Full session: ~$12
- Typical month (2 Full + 5 Squad + 10 Solo): **~$55/month**
- Alert Steve if any single session exceeds $10, or monthly spend heads toward $100
- Non-profit / cost-conscious default: prefer Squad-first, Full only when justified

**G's question:** Does this project have defined economics? Revenue model, grant, internal budget line?
If no: G flags before any build starts.

---

## 3. Squad Mode Selection
> Full decision tree and agent rosters: `.squad/architecture/squad-modes.md`
> Cost model and token budgets: `.squad/architecture/cost-model.md`

**Superman's classification logic:**
1. 1-2 file change, no design/architecture decisions needed → **Solo**
2. New domain / financial integration / auth system / multi-tenant / migration → **Full**
3. Everything else → **Squad** (the default)

| Mode | Agents | Token budget | Cost ceiling | Typical time |
|------|--------|-------------|--------------|--------------|
| **Solo** | Superman + Eric + Vera | 50K | ~$1.50 | <1 hour |
| **Squad** | Superman + Paulien + Bob + Marlo + Eric + Vera (± conditionals) | 150K | ~$6 | <1 day |
| **Full** | All 12 agents | 400K | ~$12 | <1 week |

**Rules:**
- Agents can spawn smaller, never larger. Only Superman escalates up.
- Squad is the default. Go Full only when scope genuinely demands it.
- Kryptonite is mandatory in every mode — red team before Eric starts. No exceptions.

**Checklist:**
- [ ] Squad mode assigned: `[ Solo / Squad / Full ]`
- [ ] Mode tag written into the DoR as the first line
- [ ] Token budget confirmed with G before Full mode is used
- [ ] Kryptonite briefed before Eric starts *(every mode — no exceptions)*

---

## 4. Reconnaissance (Athanasios — Before Everything Else)

Before any blueprint, plan, or line of code — Athanasios runs a recon pass on anything the project touches. Full tooling: `.squad/skills/recon-intelligence.md`.

**For a web system or domain:**
- [ ] WHOIS + DNS — who owns it, what's the infrastructure, SPF/DMARC present?
- [ ] Shodan / crt.sh — what's visible from the internet, what subdomains are exposed?
- [ ] HTTP headers + tech fingerprinting — stack, misconfigurations, version leaks
- [ ] SSL certificate quality check

**For a codebase:**
- [ ] Secrets scan (gitleaks / truffleHog) — hardcoded credentials, API keys, private keys in history
- [ ] Dependency audit (pnpm audit / snyk) — known CVEs in current dependencies
- [ ] Hardcoded grep — IPs, debug code, `eval()`, `dangerouslySetInnerHTML`, connection strings

**For a network (authorised):**
- [ ] Live host discovery — what's on the network?
- [ ] Open ports on identified hosts — anything that shouldn't be public-facing?
- [ ] Service versions — known vulnerabilities on running versions?

**Recon deliverable:** Athanasios files a Reconnaissance Brief to `.squad/agents/athanasios/knowledge/recon/[project].md` before Bob starts the blueprint. Superman reads it before the squad is briefed.

- [ ] Recon brief complete and filed
- [ ] Critical findings actioned or acknowledged before build starts

---

## 5. Technology

**Ask the project owner / Athanasios confirms:**
- What is the tech stack? *(default: React + Hono + SQLite → Azure SQL)*
- Any new libraries or integrations not already in the starter?
- What is the deployment target? *(local dev / Azure SWA / other)*
- Auth: Entra ID enabled in prod? Local dev escape hatch (`ENTRA_ENABLED=false`) confirmed?
- Database: SQLite local + Azure SQL prod, or different?

**Athanasios researches any unknowns before Bob blueprints.**

**Capabilities check — Athanasios runs this before Eric starts:**
- [ ] Does this project need capabilities the team hasn't used before?
- [ ] If yes: `npx skills find [domain]` — search the skills.sh catalogue first
- [ ] If a quality skill exists (1K+ installs, trusted source): install with `npx skills add <owner/repo@skill> --yes --global`
- [ ] If nothing found: proceed with native capability or queue for custom build
- [ ] File the result (skill installed or "none found") in the recon brief

---

## 6. Data Model & Data Type

**Ask the project owner / Bob drafts:**
- What are the main entities? *(e.g. Campaigns, Actions, Partners)*
- What are the key relationships? *(FK references, cascade rules)*
- Any existing data to migrate? If yes — migration strategy before any schema changes.
- Multi-tenant? *(does each user see only their own data, or is it shared?)*

**Data type questions — ask these before Bob blueprints:**

| Question | If yes → |
|----------|----------|
| Does any entity have a location (lat/lng, address, region)? | Spatial stack needed — SpatiaLite/PostGIS + Leaflet/Mapbox. See `.squad/skills/spatial-gis.md`. Consult Steve. |
| Are relationships between entities as important as the entities themselves? | Graph DB consideration — Neo4j or Graphology. See `.squad/skills/graphdb.md`. Consult Steve. |
| Do users need to see charts, maps, or network diagrams? | Reporting stack decision needed. See `.squad/skills/reporting-outputs.md`. |
| Do reports need to be exported as PDF, Excel, or GeoJSON? | Kevin + Eric plan this upfront, not as an afterthought. |

**The project owner is the domain expert on graph and spatial.** If either applies, flag to Superman — their input on the data model is worth more than a library search.

**Bob delivers schema definitions before Paulien's plan is written.**

---

## 7. Users & Access

**Ask the project owner:**
- Who are the users? *(internal team / external stakeholders / public)*
- Are there multiple roles with different access levels?
- How do users authenticate? *(Azure Entra / local stub / other)*
- What does an unauthorised user see?

---

## 8. Quality & Delivery

**Confirm with the project owner:**
- What are the acceptance criteria for "done"? *(beyond the standard DoD)*
- Are there any edge cases Steve knows about upfront?
- Does Steve want to see a demo before Vera signs off, or after?
- Is there a performance floor? *(page load, API response time)*

**Kryptonite runs a pre-build red team before Eric starts. This is not optional — every mode, every build.**

---

## 9. Known Risks

**Athanasios + Kryptonite flag:**
- [ ] Any new library that hasn't been used in this stack before?
- [ ] Any ShadCN/Radix components with known constraints?
- [ ] Any third-party API dependency (rate limits, auth, costs)?
- [ ] Any regulatory or compliance consideration? *(GDPR, financial data, etc.)*
- [ ] Any assumption the team is making that Steve hasn't confirmed?

---

## 10. Squad Briefing Checklist

Before any agent starts work, Superman confirms:

- [ ] Vision answered — one-sentence success and failure defined
- [ ] Squad mode set and token budget confirmed
- [ ] Tech stack confirmed — no unknowns
- [ ] Entities and relationships defined — Bob has the schema
- [ ] Users and access defined
- [ ] Kryptonite briefed *(every mode — always)*
- [ ] Acceptance criteria written — Vera knows what to test
- [ ] Paulien has a plan — ordered tasks, dependencies, done-criteria per task
- [ ] G has cleared the economics *(Full mode and any external-facing product)*

**Superman does not brief Eric until every box above is ticked.**

---

## 11. Project Memory

After onboarding, Superman writes to `.squad/agents/superman/memory/MEMORY.md`:
- Project name and one-sentence summary
- Squad mode and token budget
- Key tech decisions made at onboarding
- Risks flagged and how they were mitigated
- What Steve cares about most — the thing that cannot go wrong

---

*Template owner: Paulien · Last updated: 2026-06-05*
