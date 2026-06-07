# Superteam Ceremonies
> Agile ceremonies adapted for an AI squad. Steve is the Product Owner.
> Paulien runs all ceremonies. Coach observes. Georgiana delivers feedback.

---

## The Five Ceremonies

### 1. Sprint Planning
**When:** Start of every new build cycle (when Steve brings a new ask)
**Who:** Steve (Product Owner), Superman, Paulien, Bob, Marlo
**Purpose:** Define the sprint goal, select backlog items, break into tasks, confirm Definition of Ready is met before Eric touches anything

**Format:**
1. Steve states the goal — what does done look like for him?
2. Superman confirms understanding back to Steve
3. Paulien pulls candidate items from the backlog
4. Bob confirms technical feasibility and flags unknowns
5. Marlo confirms UX scope
6. Paulien produces the ordered task list with done criteria
7. Superman confirms Definition of Ready is met — if not, missing items are assigned before planning closes
8. Sprint goal is written to `.squad/ceremonies/sprint-planning/YYYY-MM-DD.md`

**Rule:** Nothing enters the sprint without a Definition of Ready tick. No exceptions.

---

### 2. Daily Standup
**When:** Start of each session (each time Steve opens a conversation)
**Who:** Superman
**Purpose:** Orient Steve on where the squad is — what's done, what's in progress, what's blocked

**Format (Superman delivers, under 60 seconds):**
- What was completed last session
- What is in progress now
- What is blocked and needs Steve's input

**Rule:** Superman reads `.squad/ceremonies/backlog/BACKLOG.md` before each session to deliver an accurate status. No guessing.

---

### 3. Sprint Review
**When:** End of every build cycle — when a feature ships to Steve
**Who:** Superman presents, Kevin documents, Steve approves or gives feedback
**Purpose:** Demo what was built, confirm it matches what was asked, get Steve's verdict

**Format:**
1. Superman walks Steve through what was built (live in the browser ideally)
2. Kevin's written summary is available
3. Steve gives verdict: ship it / needs changes / pivot
4. Any "needs changes" items go straight back to the backlog with priority
5. Review written to `.squad/ceremonies/sprint-reviews/YYYY-MM-DD.md`

**Rule:** The review is a demo, not a report. Steve should be clicking, not reading.

---

### 4. Sprint Retrospective
**When:** After every sprint review — before the next sprint starts
**Who:** Coach observes, Georgiana facilitates, all agents participate
**Purpose:** Honest account of what went well, what went wrong, and one concrete improvement for next sprint

**Format (Coach's structure):**
- **Went well** — be specific, name what worked and why
- **Went wrong** — be honest, name the agent and the pattern, no softening
- **One improvement** — one action item only, written into `.squad/DEFINITION_OF_DONE.md` or `.squad/DEFINITION_OF_READY.md` if structural
- **Documented learnings** — added to `.squad/ceremonies/retros/YYYY-MM-DD.md`

**Rule:** Every retrospective produces exactly one concrete change to team process. Not a list of intentions — one change, implemented before the next sprint starts.

---

### 5. Backlog Grooming
**When:** Whenever Steve mentions a new idea, gap, or future request — and at the end of every retro
**Who:** Paulien maintains, Steve prioritises, Bob estimates complexity
**Purpose:** Keep the backlog accurate, prioritised, and ready — so sprint planning is fast

**Format:**
- New items added with: description, acceptance criteria, size estimate (S/M/L/XL), priority (1-5)
- Items refined when they move to the top of the backlog (Bob reviews, Marlo reviews)
- Items marked Done when shipped and verified by Vera
- Backlog lives at `.squad/ceremonies/backlog/BACKLOG.md`

**Rule:** If it's not in the backlog, it doesn't exist. Steve's requests go into the backlog immediately — even if we're mid-sprint on something else.

---

## Ceremony Calendar

| Ceremony | Trigger | Owner |
|----------|---------|-------|
| Sprint Planning | Steve brings a new ask | Paulien |
| Daily Standup | Every session start | Superman |
| Sprint Review | Feature ships | Superman + Kevin |
| Retrospective | After every sprint review | Coach + Georgiana |
| Backlog Grooming | Continuous + end of retro | Paulien |

---

## What Agile Means for Superteam

The Agile Manifesto values:
- **Individuals and interactions** over processes and tools — Steve talks to Superman, not to a ticket system
- **Working software** over comprehensive documentation — ship it, then document it
- **Customer collaboration** over contract negotiation — Steve can change his mind mid-sprint, we adapt
- **Responding to change** over following a plan — Paulien's plan is a guide, not a contract

The ceremonies exist to make change visible and manageable — not to create bureaucracy.
