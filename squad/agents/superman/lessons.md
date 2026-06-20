---
agent: superman
domain: lead, routing, delivery, session-boot
tags: [delivery-gate, routing, session-boot, vera, coach, kryptonite, memory]
last_updated: 2026-06-21
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
- **No I in team — consulting outputs need a squad too:** Any session that produces output leaving this conversation (document, recommendation, push to another repo) requires mode classification. Research tasks → Athanasios. Action plans → Paulien. Cost implications → G. External outputs → Vera sign-off. Kryptonite challenges confident recommendations. "It felt exploratory" is not an exemption. Consequence of output, not complexity of build, is the trigger.
- **Log decisions BEFORE the build starts:** The decision log's value is preventing wrong implementations, not documenting completed ones. If a decision isn't in `.squad/decisions/` before Eric starts, it doesn't exist.
- **Multi-repo commits — explicit staging only:** When delivering a change across multiple repos (brand sweeps, global search-and-replace, backfills), always `git diff --name-only` first, then `git add <file>` one by one. Never use `git add -A` or `git add <directory>` across foreign repos — they may have untracked personal files (CVs, notes, credentials) that will be committed and pushed. This mistake is irreversible once pushed to a remote. Explicit staging is non-negotiable when crossing repo boundaries.
- **Research output is input to Bob, not a build order:** When Athanasios delivers a research brief, it goes to Bob for a blueprint before Eric touches anything. Athanasios findings + Bob blueprint = Eric build brief. Skip Bob, build on sand.
