# Superteam Cost Model & Token Budget Guardrails

**Date:** 2026-06-05  
**Author:** G  
**Context:** Three-mode squad architecture (Solo, Squad, Full) with auto-scaling agent deployment

---

## THE NUMBER THAT MATTERS

**Full-mode budget ceiling: $12 per session** — sufficient for a typical full build cycle, aggressive enough to force Superman to justify Full-mode escalation.

---

## AGENT MODEL COST PROFILE

### Current Model Assignments

| Agent | Model | Input $/M | Output $/M | Typical Role |
|-------|-------|-----------|------------|--------------|
| Superman | claude-opus-4-5 | $15 | $75 | Lead, router, final delivery |
| Coach | claude-opus-4-5 | $15 | $75 | Team analysis, game tape |
| Kryptonite | claude-opus-4-8 | $15 | $75 | Red team, pre-build challenge |
| Paulien | claude-sonnet-4-5 | $3 | $15 | Planning, task breakdown |
| Bob | claude-sonnet-4-5 | $3 | $15 | Architecture blueprints |
| Eric | claude-sonnet-4-5 | $3 | $15 | Code generation |
| Marlo | claude-sonnet-4-5 | $3 | $15 | UX design |
| Kevin | claude-sonnet-4-5 | $3 | $15 | Documentation, reports |
| Georgiana | claude-sonnet-4-5 | $3 | $15 | Coaching delivery |
| Vera | claude-sonnet-4-5 | $3 | $15 | Testing, sign-off |
| Athanasios | claude-sonnet-4-5 | $3 | $15 | Research |
| G | claude-sonnet-4-5 | $3 | $15 | Financial architecture |

### Cost Tiers

**Opus agents:** 3 agents (Superman, Coach, Kryptonite) — 5× more expensive than Sonnet  
**Sonnet agents:** 9 agents (all specialists) — primary workforce

---

## MODE DEFINITIONS & TOKEN BUDGETS

### SOLO MODE
**Agent deployment:** Superman only (1 agent)  
**Token budget:** 50,000 tokens per session  
**Estimated cost:** $0.75 - $1.50 per session  
**Use cases:**
- Simple Q&A
- Quick file edits
- Single-file debugging
- Routing decisions
- Status checks

**Assumptions:**
- 30K input / 20K output split
- Superman uses Opus-4-5 (~$15/$75 per M tokens)
- Calculation: (30K × $15/M) + (20K × $75/M) = $0.45 + $1.50 = $1.95 worst case
- Typical session closer to 20K/10K = $0.30 + $0.75 = $1.05

---

### SQUAD MODE
**Agent deployment:** 2-4 agents (Superman + 1-3 specialists)  
**Token budget:** 150,000 tokens per session  
**Estimated cost:** $3.00 - $6.00 per session  
**Typical patterns:**
- Superman (50K) + Eric (50K) + Vera (25K) — small build
- Superman (40K) + Paulien (40K) + Bob (40K) — planning sprint
- Superman (50K) + Athanasios (60K) + G (20K) — research + financial brief

**Assumptions:**
- 60% input / 40% output average across all agents
- Superman: Opus, others: Sonnet
- Worst case (Superman 50K + 3 Sonnets @ 33K each):
  - Superman: (30K × $15/M) + (20K × $75/M) = $1.95
  - Sonnet 1: (20K × $3/M) + (13K × $15/M) = $0.26
  - Sonnet 2: (20K × $3/M) + (13K × $15/M) = $0.26
  - Sonnet 3: (20K × $3/M) + (13K × $15/M) = $0.26
  - **Total: $2.73** typical, $6.00 ceiling with heavy output generation

---

### FULL MODE
**Agent deployment:** 5-12 agents (full squad activation)  
**Token budget:** 400,000 tokens per session  
**Estimated cost:** $8.00 - $12.00 per session  
**Typical patterns:**
- Full build cycle: Superman → Paulien → Bob → Eric → Marlo → Vera → Kevin
- Red team build: Add Kryptonite pre-build challenge
- Research-heavy build: Add Athanasios + G for intelligence and cost validation

**Assumptions:**
- 12 agents deployed: 3 Opus (Superman, Kryptonite, Coach) + 9 Sonnet
- Average 33K tokens per agent (400K ÷ 12)
- 60/40 input/output split
- Opus agents (3 × 33K = 99K total):
  - (60K × $15/M) + (39K × $75/M) = $0.90 + $2.93 = $3.83
- Sonnet agents (9 × 33K = 297K total):
  - (178K × $3/M) + (119K × $15/M) = $0.53 + $1.79 = $2.32
- **Total: $6.15** typical case
- **Ceiling: $12.00** when heavy code generation + architecture docs + reports stack up

---

## GUARDRAIL MECHANISM

### 1. Pre-Escalation Check (Superman's Gate)

Before escalating from Solo → Squad or Squad → Full, Superman must:

```
ESCALATION GATE CHECK
Current mode: [Solo/Squad]
Proposed mode: [Squad/Full]
Token spend so far: [X tokens]
Budget remaining: [Y tokens]

Justification:
- Why Solo/Squad is insufficient: [specific reason]
- Which agents are needed and why: [specific list]
- Expected token cost of escalation: [estimate]
- Risk if we don't escalate: [specific impact to Steve]

Proceed? [Yes/No — Superman's call, logged]
```

This check is **not a blocker** — Superman can override — but it forces conscious escalation. Log every override to `.squad/decisions/escalations/`.

### 2. Real-Time Token Tracking

Superman maintains a running token count per session and mode:

- Solo: warn at 40K (80%), hard stop at 50K
- Squad: warn at 120K (80%), hard stop at 150K
- Full: warn at 320K (80%), hard stop at 400K

**Warning trigger:** "Token budget at 80% — [X] tokens remaining. Recommend wrapping up or summarising."

**Hard stop trigger:** "Token budget exhausted. Session summary required before new work."

### 3. Cost Transparency to Steve

Every session ends with a cost summary in Superman's delivery:

```
SESSION COST SUMMARY
Mode used: [Solo/Squad/Full]
Agents deployed: [list]
Estimated cost: $[X.XX]
Token usage: [X]K / [budget]K ([%])
```

Steve sees what he's spending. Transparency drives discipline.

---

## WARNING TRIGGERS

Superman flags to Steve when:

1. **Single session exceeds $10** — "This session hit $[X]. Mode was [Full]. Consider if this complexity warrants the cost."
2. **Three consecutive Full-mode sessions** — "Three Full builds in a row. Is the scope creeping or are we solving the wrong problem?"
3. **Monthly spend on track to exceed $150** — "Current burn rate: $[X]/month. On track for $[Y] this month. Recommend cost review."
4. **Token budget hit 3× in one week** — "Hit the budget ceiling three times this week. Either raise ceilings or tighten scope."

Warnings are not errors. They are intelligence. Steve decides what to do with it.

---

## MONTHLY COST MODEL

Steve's estimated usage pattern:
- **2 Full builds/month** @ $10 avg = $20
- **5 Squad builds/month** @ $5 avg = $25
- **10 Solo tasks/month** @ $1 avg = $10

**Total monthly spend: ~$55/month** — well within a sustainable personal budget for a cost-conscious non-profit context.

### Sensitivity Analysis

| Scenario | Full | Squad | Solo | Monthly Total |
|----------|------|-------|------|---------------|
| Light month | 1 × $10 | 3 × $5 | 5 × $1 | $30 |
| Typical month | 2 × $10 | 5 × $5 | 10 × $1 | $55 |
| Heavy sprint | 4 × $10 | 8 × $5 | 15 × $1 | $95 |
| Extreme month | 8 × $10 | 10 × $5 | 20 × $1 | $150 |

**Cost ceiling recommendation:** Alert Steve if monthly spend exceeds $100 (halfway to extreme). $150 = hard re-evaluation.

---

## OPPORTUNITIES IDENTIFIED

### 1. Haiku Delegation (Not Yet Implemented)

If budget pressure increases, delegate low-stakes agents to `claude-haiku-4-5`:

- **Candidates:** Kevin (reports), Georgiana (motivational messages), light Marlo (copy review)
- **Cost reduction:** ~70% vs Sonnet ($0.80/$4.00 vs $3/$15)
- **Risk:** Slight quality drop on non-critical output
- **Savings at current usage:** ~$5-8/month if 3 agents moved to Haiku

**Recommendation:** Keep current model assignments until monthly spend consistently exceeds $80. Quality > savings at this scale.

### 2. Session Reuse & Context Caching

Claude API supports prompt caching (up to 75% cost reduction on repeated context). Opportunities:

- **Eric's build context:** Codebase structure, schema definitions, shadcn gotchas — cache for 5 min
- **Bob's blueprint:** Cache architecture decisions for follow-on tasks in the same sprint
- **Athanasios's research:** Cache domain knowledge summaries across related sessions

**Estimated savings:** 20-30% on Squad/Full mode if caching implemented aggressively  
**Current status:** Not implemented — requires API-level integration (not available in Claude Code CLI yet)

### 3. Budget-Aware Routing

Train Superman to route more intelligently:

- "Build a simple CRUD page" → **Solo** (Superman briefs Eric in one pass, Eric self-executes with known patterns)
- "Design a new data model" → **Squad** (Superman + Bob + Eric, no full squad needed)
- "Launch a new module with reports and UX" → **Full** (justify every agent)

**Current risk:** Superman defaults to Full too quickly because it's safe. Cost discipline requires confidence in Solo/Squad modes.

---

## RISKS

### 1. Runaway Full-Mode Sessions

**Risk:** A complex build spirals — Eric hits a blocker, calls Athanasios for research, Bob redesigns mid-build, Kryptonite challenges the revised design, token budget explodes.

**Likelihood:** Medium (complex builds are inherently unpredictable)  
**Impact:** Single session could hit $20-25 if unchecked  
**Mitigation:** Hard stop at 400K tokens. Superman summarises and opens a new session if needed. Breaking into two sessions is cheaper than one runaway.

### 2. Superman's Escalation Bias

**Risk:** Superman escalates to Full because "it's safer" — risk-averse routing inflates costs unnecessarily.

**Likelihood:** High (current behavior pattern — see Coach's game tape)  
**Impact:** 30-50% cost inflation vs optimal routing  
**Mitigation:** Coach tracks escalation decisions. Georgiana delivers feedback: "You went Full on a task that could have been Squad. What was the reasoning?" Drill Superman on cost-aware routing.

### 3. Steve's Invisible Spend

**Risk:** Steve doesn't see cost summaries (if not surfaced) → no feedback loop → spend creeps up silently.

**Likelihood:** Low if cost summary is mandatory in every Superman delivery  
**Impact:** High (unsustainable spend pattern forms before Steve notices)  
**Mitigation:** SESSION COST SUMMARY is non-negotiable in every Superman final response. Steve always knows what he spent.

### 4. Token Budget Too Tight

**Risk:** Budgets are set too aggressively → sessions hit the ceiling before real work completes → team frustration, incomplete deliverables.

**Likelihood:** Low initially, medium after 3 months if scope grows  
**Impact:** Medium (team effectiveness drops, Steve gets partial outputs)  
**Mitigation:** Review budgets quarterly. If hitting the ceiling >2×/week, raise Solo to 75K, Squad to 200K, Full to 500K. Cost discipline ≠ cost starvation.

---

## RECOMMENDATIONS

### Immediate (Implement Now)

1. **Set the budgets:**
   - Solo: 50K tokens (~$1.50 ceiling)
   - Squad: 150K tokens (~$6 ceiling)
   - Full: 400K tokens (~$12 ceiling)

2. **Superman's mandatory cost summary** in every delivery:
   ```
   Mode: [Solo/Squad/Full]
   Agents: [list]
   Cost: ~$[X.XX]
   Tokens: [used]/[budget]
   ```

3. **Escalation gate logging** to `.squad/decisions/escalations/YYYY-MM-DD-[task].md`:
   - Why Solo/Squad was insufficient
   - Which agents were added and why
   - Superman's override justification if applicable

### Short-Term (Next Sprint)

4. **Coach tracks escalation patterns** — add to game tape:
   - How often does Superman go Full vs Squad vs Solo?
   - Were Full escalations justified by complexity or driven by caution?
   - Drill: "Cost-aware routing" if Superman over-escalates

5. **Monthly cost report** (Kevin produces, G reviews):
   - Total spend
   - Mode breakdown (% Solo/Squad/Full)
   - Cost per session type
   - Trend vs previous month
   - Flag if on track to exceed $100

### Long-Term (3-6 Months)

6. **Haiku delegation** if monthly spend consistently exceeds $80
   - Kevin → Haiku (reports are low-risk)
   - Georgiana → Haiku (motivational messages are low-risk)
   - Evaluate quality impact after 1 month

7. **Context caching** if/when available in Claude Code CLI
   - Eric's codebase context
   - Bob's blueprint reuse
   - Athanasios's domain knowledge

---

## ACTION REQUIRED FROM SUPERMAN / STEVE

**Superman:**
- Implement escalation gate check before every mode shift (log to `.squad/decisions/escalations/`)
- Add SESSION COST SUMMARY to every final delivery (mandatory, non-negotiable)
- Call G if a session is on track to exceed $15 before proceeding

**Steve:**
- Review cost summary in every Superman delivery — acknowledge you see it
- Set your mental monthly ceiling (recommend $100/month sustainable, $150/month max)
- Tell Superman if a month feels expensive — feedback loop required for discipline

**G (self):**
- Produce monthly cost report starting 2026-07-01 (first full month with cost tracking)
- Review budgets quarterly — adjust if ceiling hit >2×/week
- Monitor Haiku delegation opportunity if spend trends above $80/month

---

## ASSUMPTIONS

1. **Token usage estimates** are based on typical sessions observed in current sprint. Actual usage will vary by task complexity.
2. **Input/output split** assumed 60/40 average. Code-heavy tasks skew toward output (more expensive).
3. **Agent model assignments** are current as of 2026-06-05. If models change (e.g., Opus-4-8 becomes default), costs increase ~20%.
4. **Session definition:** One task brief from Steve → complete delivery from Superman. Complex builds may span multiple sessions by design (preferred over runaway single sessions).
5. **Pricing** uses public Claude API estimates. Actual costs depend on Anthropic's current rate card.
6. **Steve's usage pattern** (2 Full, 5 Squad, 10 Solo/month) is an estimate based on current project velocity. Adjust as actual usage data accumulates.

---

**END OF FINANCIAL BRIEF**

*G's verdict: These budgets are tight enough to enforce discipline, generous enough to allow real work. Superman's escalation gate is the critical control — if he logs every Full-mode decision and Steve reviews the cost summaries, this model will self-correct. First month will reveal if ceilings are right-sized. Adjust quarterly based on ceiling-hit frequency and Steve's feedback.*
