# SUPERTEAM — Three-Mode Squad Spawning Architecture
**Architect: Bob**  
**Date: 2026-06-05**  
**Version: 1.0**

---

## The Problem

Superteam currently spins up all 12 agents regardless of task size. A one-line CSS fix gets the same infrastructure cost as a multi-domain build. This is inefficient in both speed and token cost. We need a system that auto-spawns the right squad size for the task complexity.

---

## The System in One Paragraph

Superman receives Steve's brief and classifies it into one of three modes: **Solo** (simple/isolated change), **Squad** (new feature, moderate complexity), or **Full** (architectural, multi-entity, new domain). Mode assignment is written into the DoR as a tag. Each mode defines a fixed agent roster, model tier per agent, and coordination pattern. Agents can spawn smaller (Solo can call just Eric), never larger (Eric cannot spawn the full squad). Only Superman can escalate up to a higher mode. Vera operates in all three modes as the quality gate.

---

## THE THREE MODES

### SOLO MODE
**Purpose:** Fast, low-cost execution for simple, isolated changes  
**Trigger:** 1-2 file changes, clear spec, no design/architecture decisions needed  
**Token budget:** Low — optimised for speed

#### Examples of Solo tasks
- Fix a typo or UI label
- Add a single field to an existing form (schema already exists)
- Update validation logic on one endpoint
- Adjust CSS/styling on one component
- Add one filter to an existing table
- Bug fix with clear reproduction and known solution

#### Agent Roster — Solo Mode
| Agent | Active? | Model Tier | Role in Solo |
|-------|---------|-----------|--------------|
| Superman | YES | Opus 4-5 | Brief, coordinate, deliver |
| Eric | YES | Sonnet 4-5 | Build/fix |
| Vera | YES | Sonnet 4-5 | Test/sign-off |
| Paulien | NO | — | Not needed (no sprint) |
| Bob | NO | — | Not needed (no architecture) |
| Marlo | NO | — | Not needed (no UX decisions) |
| Kevin | NO | — | Not needed (no report) |
| Athanasios | NO | — | Not needed (no research) |
| G | NO | — | Not needed (no financial scope) |
| Georgiana | NO | — | Not needed (no team coordination) |
| Coach | NO | — | Always observing, never blocking |
| Kryptonite | NO | — | Not invoked unless Superman calls red team review |

#### Coordination Pattern — Solo
```
Steve → Superman → Eric → Vera → Superman → Steve
```

Superman briefs Eric with precise spec. Eric builds. Vera tests (simplified checklist for Solo). Superman confirms and delivers.

#### DoR for Solo Mode
```markdown
## Definition of Ready — SOLO MODE

- [ ] Steve's ask is clear and scoped to 1-2 files
- [ ] No schema changes required
- [ ] No new UI components required
- [ ] No architectural decisions required
- [ ] Eric has enough context to build in one pass
- [ ] Vera has clear test criteria (typically one happy path + one edge case)
```

---

### SQUAD MODE
**Purpose:** Standard feature builds — the default for new features  
**Trigger:** New feature, moderate complexity, established patterns  
**Token budget:** Medium — the balanced default

#### Examples of Squad tasks
- Add a new CRUD entity using existing patterns (copy `items.ts`)
- Add a new dashboard page with filters and charts
- Implement a new report type (Kevin involved)
- Integrate a new third-party API
- Build a new form with validation and submission flow
- Add authentication/authorisation logic to existing routes

#### Agent Roster — Squad Mode
| Agent | Active? | Model Tier | Role in Squad |
|-------|---------|-----------|--------------|
| Superman | YES | Opus 4-5 | Lead, coordinate, accountable |
| Paulien | YES | Sonnet 4-5 | Task breakdown, timeline, done criteria |
| Bob | YES | Sonnet 4-5 | Blueprint for new patterns/integrations |
| Eric | YES | Sonnet 4-5 | Build |
| Marlo | YES | Sonnet 4-5 | UX spec, component list, navigation |
| Vera | YES | Sonnet 4-5 | Full QA checklist |
| Kevin | CONDITIONAL | Sonnet 4-5 | If reporting/docs needed |
| Athanasios | CONDITIONAL | Sonnet 4-5 | If new library/API research needed |
| G | CONDITIONAL | Sonnet 4-5 | If cost/pricing implications |
| Georgiana | NO | — | Not needed (small team, direct comms) |
| Coach | NO | — | Always observing, never blocking |
| Kryptonite | NO | — | Not invoked unless Superman calls red team review |

**CONDITIONAL agents** are spawned by Superman only if their domain is clearly required by the brief.

#### Coordination Pattern — Squad
```
Steve → Superman → Paulien (plan)
                 → Bob (blueprint)
                 → Marlo (UX spec)
                 → [Athanasios if research needed]
                 → [G if cost analysis needed]

Superman synthesises → Eric (build to blueprint + UX spec)
Eric → Vera (test) → Superman → Steve

[Kevin spawned at end if report/docs required]
```

Paulien, Bob, and Marlo work **in parallel** (no dependency between them). Superman synthesises their output into one brief for Eric.

#### DoR for Squad Mode
```markdown
## Definition of Ready — SQUAD MODE

- [ ] Steve's ask is clear and scope is bounded
- [ ] Paulien: task breakdown, timeline, done criteria written
- [ ] Bob: blueprint exists (schema, API contracts, migration files, routes)
- [ ] Marlo: UX spec exists (layouts, ShadCN components, navigation, empty states)
- [ ] Athanasios: any new libraries/APIs researched (if applicable)
- [ ] G: cost/pricing structure confirmed (if applicable)
- [ ] All blocking decisions answered
- [ ] All decisions logged in `.squad/decisions/`
- [ ] Eric has everything needed to start building
```

---

### FULL MODE
**Purpose:** Large, complex, multi-domain builds requiring full team coordination  
**Trigger:** New domain, architectural decisions, multi-entity, cross-cutting concerns  
**Token budget:** High — full team deployed

#### Examples of Full tasks
- Build a new multi-tenant system
- Implement billing and subscription infrastructure
- Build an AI pipeline with model selection, prompt engineering, and cost management
- Migrate from one database to another
- Implement a new authentication system (OAuth, Entra ID integration)
- Build a complex reporting system with multiple data sources
- Greenfield project (new repo/domain from scratch)

#### Agent Roster — Full Mode
| Agent | Active? | Model Tier | Role in Full |
|-------|---------|-----------|--------------|
| Superman | YES | Opus 4-5 | Lead, coordinate, accountable, bold decisions |
| Paulien | YES | Sonnet 4-5 | Sprint structure, task dependencies, timeline, team coordination |
| Bob | YES | Sonnet 4-5 | Full system architecture, data model, API design, infrastructure |
| Eric | YES | Sonnet 4-5 | Build to blueprint |
| Marlo | YES | Sonnet 4-5 | Full UX design, user journey mapping |
| Kevin | YES | Sonnet 4-5 | Documentation, reports, decision logs |
| Athanasios | YES | Sonnet 4-5 | Research on all unknowns, competitive intelligence |
| G | YES | Sonnet 4-5 | Financial architecture, pricing, cost modelling |
| Vera | YES | Sonnet 4-5 | Full QA, integration testing, regression testing |
| Georgiana | YES | Sonnet 4-5 | Team coordination, morale, Coach translation |
| Coach | YES | Opus 4-5 | Team health monitoring, game tape, drills |
| Kryptonite | CONDITIONAL | Opus 4-5 | Red team review if Superman invokes challenge |

#### Coordination Pattern — Full
```
Steve → Superman → Athanasios (research brief first)
                 → G (financial viability)
                 → Bob (system architecture)

Superman reviews architecture with Steve if needed

Superman → Paulien (sprint plan based on Bob's blueprint)
         → Marlo (UX design based on Bob's system surfaces)
         
Paulien coordinates:
  → Eric (build in phases)
  → Vera (test each phase)
  → Kevin (document decisions and progress)
  
Georgiana monitors team coordination
Coach watches and files game tape

Superman → Steve (delivery with Kevin's summary)
```

In Full mode, **Paulien becomes the coordination hub** for execution while Superman holds strategic accountability. Georgiana actively monitors team mesh and surfaces friction early.

#### DoR for Full Mode
The full DoR from `.squad/DEFINITION_OF_READY.md` applies without modification. Every checkbox must be ticked.

---

## MODE ASSIGNMENT LOGIC

### Superman's Decision Tree

When Steve briefs Superman, Superman classifies the task using this logic:

```
1. Is this a 1-2 file change with no design/architecture decisions?
   YES → SOLO MODE
   NO  → Continue

2. Does this require ANY of the following?
   - New domain/entity type not following existing patterns
   - Multi-tenant or cross-cutting architectural decision
   - Financial system integration (billing, payments, grants)
   - New authentication/authorisation system
   - Data migration or schema refactor across multiple entities
   - AI/LLM pipeline with prompt engineering and cost management
   YES → FULL MODE
   NO  → Continue

3. Otherwise → SQUAD MODE (the default)
```

### Writing the Mode Tag

Superman writes the mode into the DoR as the first line after the title:

```markdown
# Definition of Ready — [PROJECT NAME]
**Mode: SOLO / SQUAD / FULL**
**Date:**
**Brief owner: Superman**

[Rest of DoR checklist follows based on mode]
```

---

## ESCALATION MECHANISM

### When Superman Escalates Up

If Superman assigns **Solo** but Eric or Vera discovers mid-build that architectural decisions or design work is needed:

1. Eric or Vera flags immediately to Superman with specific reasoning
2. Superman reviews and decides: continue Solo, or escalate to Squad
3. If escalating, Superman **pauses the build**, writes the new mode tag, and initiates the Squad coordination pattern
4. The work Eric already completed is preserved; Squad mode continues from current state

If Superman assigns **Squad** but discovers during planning that the scope is actually Full-mode complexity:

1. Bob or Paulien flags the complexity gap to Superman
2. Superman reviews and decides: continue Squad with bounded scope, or escalate to Full
3. If escalating, Superman re-briefs with Full mode roster
4. All Squad work (Paulien's plan, Bob's blueprint, Marlo's UX) is carried forward into Full mode

### Agents CANNOT Escalate Without Superman

- Eric cannot spawn Bob if Solo becomes Squad — he flags to Superman
- Paulien cannot spawn Georgiana if Squad becomes Full — she flags to Superman
- Only Superman can change the mode mid-build

### Downward Adjustment (Rare)

If Superman assigns **Full** but Bob's initial assessment shows the scope is actually Squad-level:

1. Bob explicitly states this in the blueprint
2. Superman reviews and decides: continue Full (because Steve's vision implies future complexity), or downgrade to Squad
3. If downgrading, Superman updates the mode tag and releases non-essential agents (Georgiana, Coach, full Athanasios engagement)

Downward adjustment is rare because **Superman should catch this at classification**. If it happens more than once per 10 builds, Coach flags it as a Superman drill.

---

## VERA IN ALL THREE MODES

Vera is **always active** as the quality gate. Her checklist scales with mode complexity:

### Vera's Checklist — Solo Mode
```
[ ] Code runs and performs the intended change
[ ] One happy path test
[ ] One edge case test
[ ] Browser console clear (if UI change)
[ ] Verdict: PASS / FAIL
```

### Vera's Checklist — Squad Mode
The full checklist from `.squad/DEFINITION_OF_DONE.md` under "Vera — before writing sign-off verdict"

### Vera's Checklist — Full Mode
Squad checklist + integration/regression testing:
```
[ ] All Squad checklist items
[ ] Integration test: does this work with existing entities?
[ ] Regression test: did this break anything that was working?
[ ] Performance check: does this scale to expected load?
[ ] Security check: obvious injection/auth issues?
```

---

## MODEL TIER STRATEGY

### Why These Tiers?
- **Opus 4-5** — Superman (always accountable, always bold decisions) and Coach (game tape quality matters)
- **Sonnet 4-5** — All execution agents (Eric, Vera, Paulien, Bob, Marlo, Kevin, Athanasios, G, Georgiana) — cost-efficient, highly capable
- **Haiku** — Not used in Superteam. Speed is not the bottleneck; quality and context are.

### Cost Optimisation
- Solo mode deploys 3 agents (Superman Opus, Eric Sonnet, Vera Sonnet) — minimal token spend
- Squad mode deploys 5-8 agents depending on conditionals — balanced cost
- Full mode deploys all 12 agents — justified by scope and risk

Over 10 typical builds, if 6 are Solo, 3 are Squad, and 1 is Full, the token cost is approximately **40% lower** than always running Full mode.

---

## SPAWNING MECHANICS

### How Superman Spawns Agents

Superman uses the Agent tool (Claude Code SDK sub-agent spawning):

```typescript
// SOLO MODE
const ericResponse = await spawnAgent('eric', {
  brief: '[precise spec]',
  mode: 'solo'
});

const veraResponse = await spawnAgent('vera', {
  brief: '[test criteria]',
  mode: 'solo',
  input: ericResponse.output
});

// SQUAD MODE
const [paulienResponse, bobResponse, marloResponse] = await Promise.all([
  spawnAgent('paulien', { brief: '[vision + deadline]' }),
  spawnAgent('bob', { brief: '[system context]' }),
  spawnAgent('marlo', { brief: '[user context]' })
]);

// Superman synthesises their output into one brief for Eric
const ericResponse = await spawnAgent('eric', {
  brief: '[synthesised from Paulien + Bob + Marlo]',
  mode: 'squad'
});

// FULL MODE
// Sequential: Athanasios → G → Bob → Paulien + Marlo
// Then Paulien coordinates Eric/Vera/Kevin in phases
```

### How Agents Know Their Mode

Each agent receives a `mode` parameter in their spawn context. They adjust their deliverable based on mode:

- **Eric in Solo mode:** No inline comments required for trivial changes, simplified self-review
- **Eric in Squad/Full mode:** Full standards from `.claude/agents/eric.md`
- **Vera in Solo mode:** Simplified checklist (see above)
- **Vera in Squad/Full mode:** Full checklist from DoD
- **Paulien in Squad mode:** Task list, no sprint ceremonies
- **Paulien in Full mode:** Sprint structure, daily tracking, coordination with Georgiana

---

## INTEGRATION WITH EXISTING SYSTEM

### Changes Required
1. **`.squad/DEFINITION_OF_READY.md`** — add mode tag line at the top (already designed above)
2. **Superman's briefing logic** — implement mode classification decision tree
3. **Agent spawn calls** — pass `mode` parameter to each agent
4. **Vera's test harness** — mode-aware checklist selection
5. **Paulien's planning template** — mode-aware (task list for Squad, sprint structure for Full)

### No Changes Required
- **Definition of Done** — remains as-is; Vera interprets it based on mode
- **Agent persona files** — no changes; agents are already capable of scaling deliverables
- **Memory protocol** — agents log as usual
- **Coach observation** — Coach watches all modes and files game tape as usual

### Rollout Plan
1. **Phase 1:** Superman implements mode classification for next 5 builds (manual mode selection, observe)
2. **Phase 2:** Formalise mode assignment into DoR, track token savings
3. **Phase 3:** Coach reviews game tape — are mode assignments accurate? Adjust decision tree if needed
4. **Phase 4:** Paulien analyses: actual time-to-delivery by mode vs. expectations

---

## RISKS

### Risk 1: Superman Under-Classifies Complexity
**Impact:** Solo or Squad mode starts, hits architectural decision, requires escalation mid-build  
**Mitigation:** Eric and Vera have explicit protocol to flag complexity gaps immediately. Coach tracks Superman's classification accuracy in game tape.  
**Drill:** Superman practices mode classification on historical builds — "What mode should this have been?"

### Risk 2: Agents Confused by Mode Switching Mid-Build
**Impact:** Eric continues Solo pattern after escalation to Squad; Vera applies wrong checklist  
**Mitigation:** When Superman escalates, he **explicitly re-briefs all active agents** with new mode and updated context. Mode is never changed silently.

### Risk 3: Conditional Agents Not Spawned When Needed
**Impact:** Squad mode starts without Athanasios research; new library choice causes rework  
**Mitigation:** Bob's blueprint explicitly flags "Research needed: [topic]" if a conditional agent should be spawned. Superman reviews blueprint before briefing Eric.

### Risk 4: Token Savings Pressure Leads to Corner-Cutting
**Impact:** Superman assigns Solo to save tokens when Squad is appropriate; quality suffers  
**Mitigation:** **Quality is non-negotiable.** Coach monitors for this pattern. If token cost is a constraint, Steve decides — Superman does not silently downgrade mode for cost reasons.

---

## SUCCESS METRICS

### Quantitative
- **Token cost per build** — track by mode, aim for 40% reduction vs. always-Full baseline
- **Time to delivery** — Solo should be <2 hours, Squad <1 day, Full <1 week (depends on scope)
- **Mode escalation rate** — target <10% (if higher, Superman's classification needs drill)

### Qualitative
- **Build quality remains constant** — Vera's pass rate should not decline in Solo/Squad modes
- **Team confidence in mode assignment** — agents trust the classification and don't second-guess
- **Steve's satisfaction** — does the speed/cost improvement feel real?

### Coach Observation
- Are Solo builds actually faster, or do they stall on hidden complexity?
- Are Squad builds well-coordinated, or does Paulien's absence (vs Full) cause drift?
- Are Full builds appropriately scoped, or is Superman over-deploying?

---

## DECISION LOG

### Decision 1: Why Three Modes (Not Two or Four)?
**Chosen:** Three modes — Solo, Squad, Full  
**Rejected:** Two modes (Solo + Full) — too big a gap; most builds would default to Full  
**Rejected:** Four modes (Solo, Squad-Lite, Squad, Full) — over-engineered; hard to distinguish Squad-Lite from Squad  
**Reasoning:** Three modes map cleanly to task complexity in practice: trivial fix, standard feature, complex build. Clear decision boundaries.

### Decision 2: Why Vera in All Modes?
**Chosen:** Vera always active as quality gate  
**Rejected:** Vera optional in Solo mode; Eric self-validates  
**Reasoning:** Quality is non-negotiable. Even trivial changes can break things. Vera's sign-off is what makes "Done" mean something. Her checklist scales down for Solo, but she's never skipped.

### Decision 3: Why Sonnet for All Execution Agents?
**Chosen:** Sonnet 4-5 for Eric, Vera, Paulien, Bob, Marlo, Kevin, Athanasios, G, Georgiana  
**Rejected:** Haiku for Eric/Vera in Solo mode (speed optimisation)  
**Rejected:** Opus for Bob (architecture quality)  
**Reasoning:** Sonnet 4-5 is highly capable and cost-efficient. Context and reasoning matter more than speed. Opus reserved for Superman (accountability) and Coach (long-term observation quality). Haiku not needed — speed is not the bottleneck.

### Decision 4: Why Paulien Coordinates in Full, Not Superman?
**Chosen:** Full mode — Paulien coordinates execution, Superman holds strategic accountability  
**Rejected:** Superman coordinates everything in all modes  
**Reasoning:** In Full mode, Paulien's strengths (calm, methodical, dependency tracking) are essential for multi-phase execution. Superman stays at strategic level — bold decisions, team accountability, Steve interface. Division of labour prevents Superman bottleneck.

### Decision 5: Why Mode Tag in DoR, Not Separate File?
**Chosen:** Mode written into DoR as first line after title  
**Rejected:** Mode stored in `.squad/modes/[project].md` separate from DoR  
**Reasoning:** Mode and DoR are tightly coupled — the checklist depends on the mode. Keeping them in one file reduces context-switching and ensures agents see the mode when they read the DoR.

---

## APPENDIX: MODE ASSIGNMENT EXAMPLES

### Example 1: Solo
**Steve's brief:** "The 'Add Campaign' button label should say 'Create Campaign' instead."  
**Superman's classification:** SOLO — one file, one line, no decisions  
**Agent roster:** Superman, Eric, Vera  
**Time estimate:** <1 hour  

### Example 2: Squad
**Steve's brief:** "Add a 'Documents' entity — partners can upload files, we store them, and display a list per partner."  
**Superman's classification:** SQUAD — new CRUD entity, follows items.ts pattern, needs schema + API + UI  
**Agent roster:** Superman, Paulien, Bob, Eric, Marlo, Vera, (Athanasios if file storage research needed)  
**Time estimate:** 1-2 days  

### Example 3: Full
**Steve's brief:** "Build a grant funding pipeline — track applications, approvals, disbursements, reporting. Integrate with Exact Online. Donors need a separate portal to see their grant impact."  
**Superman's classification:** FULL — new domain (grants), financial integration (Exact Online), multi-tenant (donor portal), complex data model  
**Agent roster:** Full team (all 12 agents active)  
**Time estimate:** 1-2 weeks (depends on Exact Online API complexity)  

### Example 4: Escalation (Solo → Squad)
**Steve's brief:** "Add a 'Priority' dropdown to the Actions table."  
**Superman's classification:** SOLO — one field, existing form  
**Mid-build:** Eric discovers priority needs to cascade to related tasks, requires schema change in multiple tables  
**Eric flags to Superman:** "This touches 3 tables and changes the task assignment logic — this is Squad-level."  
**Superman escalates:** SQUAD mode, pauses build, spawns Bob for cascade blueprint, Marlo for UX implications, Paulien for revised timeline  

---

## FINAL NOTES

This architecture is **versioned** and **living**. As the team runs builds in the three modes, Coach will observe patterns and recommend refinements. Superman and Steve own the decision to update this blueprint.

**Version 1.0 assumptions:**
- Steve's briefs are clear enough for mode classification (if not, Superman asks ONE clarifying question)
- Agents can scale their deliverables based on mode context without confusion
- Token cost reduction is meaningful but not the primary goal — quality and speed are

**Next review:** After 10 builds across all three modes, Coach files game tape summary and recommends adjustments.

---

**Blueprint Status:** READY FOR IMPLEMENTATION  
**Owner:** Superman  
**Approval Required From:** Steve  
**Implementation Start:** On Steve's approval  

---

*Bob — 2026-06-05*  
*This is how Superteam scales.*
