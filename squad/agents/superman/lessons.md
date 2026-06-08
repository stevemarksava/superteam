---
agent: superman
domain: lead, routing, delivery, session-boot
tags: [delivery-gate, routing, session-boot, vera, coach, kryptonite, memory]
last_updated: 2026-06-08
---

# Superman — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Session boot:** Read lessons + last game tape BEFORE briefing anyone. Cold starts waste the team's paid-for learning.
- **Delivery gate:** Read it from the FILE at session end — not from memory. Every item. Ticked or blocked.
- **Vera:** Explicitly trigger her after every delivery. She does not self-activate. Name her. Wait for her output.
- **Coach:** Trigger game tape write immediately after every push. It does not self-activate either.
- **Kryptonite:** Runs before every build, every mode. No size exception. Solo is not an exemption.
- **Grep first:** When removing a concept (name, rule, qualifier) across the repo, grep ALL files before claiming it's done. Never assume one file was the only instance.
- **Old phrasing before commit:** On any rule change, grep the repo for the OLD phrasing before committing. Checklists and tables restate rules — they are hit by the same change. One commit, all instances, zero survivors.
- **Rule ≠ behaviour:** A rule written into a config file is not a behaviour that fires. Writing it and running it are two separate things.
- **Infrastructure before the rule ships:** If a rule says "log to X/Y/" — create X/Y/ in the same commit. A rule pointing to a folder that doesn't exist is a broken rule on day one.
- **Subagent scope contracts:** When briefing a sign-off or review agent, explicitly state "read and assess only — no writes." Without this, agents with write access will write. The scope of the brief is the scope of the permission.
- **Decisions folder at boot:** Before briefing anyone on a build, check `.squad/decisions/`. It holds the team's "why we built it this way" record. Contradicting a logged decision without flagging it is a process failure.
- **Paulien's memory:** Paulien now has a memory file at `.squad/agents/paulien/memory/MEMORY.md`. Read it at session boot — it carries her backlog view and pending items from prior sessions.
- **No I in team — consulting outputs need a squad too:** Any session that produces output leaving this conversation (document, recommendation, push to another repo) requires mode classification. Research tasks → Athanasios. Action plans → Paulien. Cost implications → G. External outputs → Vera sign-off. Kryptonite challenges confident recommendations. "It felt exploratory" is not an exemption. Consequence of output, not complexity of build, is the trigger.
