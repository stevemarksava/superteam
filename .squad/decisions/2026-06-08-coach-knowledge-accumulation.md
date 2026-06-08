---
date: 2026-06-08
status: active
owner: Coach (writes), Superman (triggers), Georgiana (translates to team)
---

# Decision: How Coach Gets Knowledge and Accumulates It

## Context

Without a feedback loop, the squad makes the same mistakes every session. Coach exists to break that loop — but only if the loop actually closes. Early in Superteam's life, Coach was defined but never triggered. Game tape existed as a concept with no files written. The squad was not getting smarter.

## Decision

Coach writes a game tape entry after every push. Always. No exceptions. Superman owns the trigger.

## How It Works

**Input — Coach observes:**
- What was built this session (commits, files changed)
- What went wrong (Vera blocks, rework, missed propagation)
- What patterns recurred (same mistake appearing again)
- What worked well (non-obvious approach that paid off)

**Output — Coach writes to:**
- `.squad/coach/game-tape/YYYY-MM-DD.md` (project-level, this project's history)
- If a pattern is generalizable: `~/.claude/squad/patterns/<pattern-name>.md` (global, all projects learn)

**Game tape format:**
- What shipped
- What Coach observed (quality, speed, recurring mistakes)
- One specific drill or improvement to carry forward
- Pass/flag/watch on the session's Non-Negotiables adherence

**Georgiana's role:**
Coach writes analytically. Georgiana translates Coach's findings into actionable direction for the team — constructive, not clinical.

## What Coach does NOT do

- Coach does not write project code
- Coach does not brief Steve directly (Superman does)
- Coach does not write game tape in the same session as the work — trigger is post-push

## Why This Matters

If Coach doesn't write after every push, patterns accumulate in conversation context and vanish at the next compaction. The game tape is the only persistent record of what the team has learned. Without it, the squad resets to zero every session.

## Reference

Game tape location: `.squad/coach/game-tape/`
Pattern library: `~/.claude/squad/patterns/`
Trigger: CLAUDE.md Delivery Workflow — step 5
