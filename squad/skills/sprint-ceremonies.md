# Skill Card: Sprint Ceremonies
> Owned by: Paulien (runs all ceremonies) · Coach (observes) · Georgiana (delivers feedback)
> Full ceremony definitions: `squad/ceremonies/CEREMONIES.md`
> This card covers HOW to run them well — not just what they are.

---

## The Golden Rule
Ceremonies serve the team. If a ceremony produces no decision, no learning, and no change — it was theatre. Cut it short or cut it entirely.

---

## Sprint Planning — How to Run It Well

**Paulien's job:** Come in prepared. Pull the top backlog items before the session starts. Don't discover the backlog in front of Steve.

**The 3 questions that must be answered before planning closes:**
1. What is the sprint goal in one sentence?
2. Is the Definition of Ready met for every item entering the sprint?
3. Does Bob think the technical approach is sound?

**Common failure modes:**
- Planning without a backlog → chaotic scope
- Skipping DoR → Eric hits unknown unknowns mid-sprint
- Steve adds scope mid-planning → Paulien captures it as a backlog item, not a sprint commitment

**Output:** Ordered task list with done criteria, written to `.squad/ceremonies/sprint-planning/YYYY-MM-DD.md`

---

## Daily Standup — How to Run It Well

**Superman's job:** Read the backlog before delivering. The standup is a briefing, not an improvisation.

**Format (strict — under 60 seconds):**
1. Done since last session: [specific items completed]
2. In progress now: [what's being worked on]
3. Blocked: [what needs Steve's input or decision]

**Common failure modes:**
- Reporting what you remember instead of reading the backlog → inaccurate status
- Skipping the standup because "Steve knows what we're doing" → Steve doesn't always
- Making the standup a discussion → it's a briefing; discussion goes to planning

**Output:** Verbal or written summary. No file needed unless there's a blocker that requires a decision.

---

## Sprint Review — How to Run It Well

**Superman's job:** Demo, don't report. Steve should be interacting with the thing, not hearing about it.

**The sequence:**
1. Superman walks Steve through what was built — live
2. Kevin's written summary is available if Steve wants it
3. Steve gives verdict: ship / needs changes / pivot
4. "Needs changes" items are written into the backlog immediately — not kept in memory

**Common failure modes:**
- Showing a written summary instead of a live demo → Steve feels told, not shown
- Waiting for Steve to ask questions → Superman surfaces the interesting bits
- Not writing "needs changes" items into the backlog → they disappear

**Output:** Sprint review file at `.squad/ceremonies/sprint-reviews/YYYY-MM-DD.md`

---

## Retrospective — How to Run It Well

**The non-negotiable:** Every retro produces exactly **one** concrete process change. Not a list. One change, implemented before the next sprint starts.

**Georgiana's role:** Facilitate, not mediate. She draws out honest feedback, not diplomatic feedback. The team needs to hear what went wrong — Georgiana makes sure it lands as learning, not blame.

**Coach's role:** Observe and bring receipts. Coach has the game tape. Georgiana has the team's ear.

**The three questions:**
1. What specifically went well? (Name it — don't say "communication was good")
2. What specifically went wrong? (Name the agent and the pattern — no softening)
3. What one thing changes before next sprint?

**Common failure modes:**
- Too many improvement actions → nothing changes
- Softening feedback until it's meaningless → patterns repeat
- Skipping the retro because "we're on a roll" → discipline drops exactly when things are going well

**Output:** Retro file at `.squad/ceremonies/retros/YYYY-MM-DD.md` · One concrete change written into DoR or DoD

---

## Backlog Grooming — How to Run It Well

**Paulien's job:** The backlog is always accurate. Every item has a description, acceptance criteria, size estimate, and priority. No vague items. No zombie items that nobody will ever build.

**When to groom:**
- When Steve mentions a new idea → capture it immediately, even mid-sprint
- End of every retro → review top 5 items for refinement
- Before sprint planning → ensure top 3 items are DoR-ready

**Bob's role in grooming:** Size estimates and feasibility checks on items approaching the top of the backlog. Don't refine items that are 6 sprints away.

**Common failure modes:**
- Backlog grows without pruning → paralysis in planning
- Items without acceptance criteria → Eric doesn't know when he's done
- Priority not updated after Steve's priorities shift → wrong things get built

**Output:** Updated `BACKLOG.md`. No ceremony file needed — the backlog is the output.

---

## Ceremony Anti-Patterns to Avoid

| Anti-pattern | What it looks like | What to do instead |
|-------------|-------------------|-------------------|
| Ghost ceremonies | Ceremony exists in the doc but never runs | If it's not running, either fix it or delete it |
| Cargo cult standup | Status reported without reading the backlog | Read the backlog. Then speak. |
| Retro without change | Good conversation, no action | Write one change. Implement it. Then close the retro. |
| Planning without DoR | Items enter sprint underprepared | Paulien blocks entry until DoR is met |
| Review without demo | Steve reads a summary | Steve clicks the thing |
