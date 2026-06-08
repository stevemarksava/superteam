# How to Add a New Agent to Superteam
> Read this before writing a new agent file. A bad agent file produces inconsistent, low-quality output.

---

## When to Add a New Agent

Add an agent when:
- There's a recurring role that doesn't map cleanly to any existing agent
- A specialist skill is needed that no current agent owns
- The squad is being adapted for a new domain with a different specialist function

Don't add an agent when:
- You just want a different name for an existing role
- The role would only be used once
- You could extend an existing agent with a skill card

---

## The Agent File Structure

Every agent file lives at `~/.claude/agents/<name>.md` and follows this format:

```markdown
---
name: <agent-id>
description: <one line — what triggers this agent, used by Claude Code for routing>
model: claude-sonnet-4-6
tools: [Read, Write, Edit, Bash, Grep, Glob]
---

# <NAME> — <Role Title>
**Disciple: <Name> · <Racecar Discipleship Framework label>**

## Who You Are
[2-3 sentences. Character, not job description. What makes this agent distinct?]

## Your Character
- **[trait]:** [what it means in practice]
- **[trait]:** [what it means in practice]
(4-6 traits)

## Your Job
[Numbered list of what this agent actually does — the workflow]

## How You Talk to Steve / the Team
[Voice, tone, communication style]

## Your Standards (Non-Negotiable)
[What this agent never compromises on]

## How You Work
[Step-by-step — how this agent approaches a task]

## Mesh Behaviour
[How this agent interacts with other agents — who they receive from, deliver to, consult]

## Memory
Update `[path]/memory/MEMORY.md` after every significant task:
- [what to log]
```

---

## Choosing a Disciple Label

The Racecar Discipleship Framework maps agent character archetypes to the 12 disciples. Existing assignments:

| Agent | Disciple |
|-------|---------|
| Superman | Peter · The Bold Leader |
| Paulien | James (Alphaeus) · The Quiet Backbone |
| Bob | Philip · The Practical Questioner |
| Eric | James (Zebedee) · The Focused Achiever |
| Marlo | Andrew · The Connector |
| Kevin | Matthew · The Systematic Analyst |
| Georgiana | John · The Relational Visionary |
| Vera | Thomas · The Careful Doubter |
| Athanasios | Thaddaeus · The Hidden Faithful |
| G | Bartholomew · The Honest Skeptic |
| Coach | Simon the Zealot · The Passionate Idealist |
| Kryptonite | Judas · The Warning |

If adding a 13th+ agent, choose the archetype that best matches the character — or leave blank if the framework doesn't extend.

---

## Wiring the Agent into the Mesh

After writing the agent file, update these files:

1. **`~/.claude/CLAUDE.md`** — Add the agent to the squad roster table
2. **`squad/identity/PLAYBOOK.md`** — Add to the squad table and mesh diagram
3. **`squad/SYSTEM.md`** — Update if the agent has system-level responsibilities
4. **`agents/superman.md`** — Update Superman's routing table if this agent handles a new class of request
5. **`squad-template/agents/<name>/memory/MEMORY.md`** — Add a blank memory template

For VS Code Copilot Chat:
6. **`vscode-extension/package.json`** — Add a `chatParticipants` entry
7. **`vscode-extension/src/extension.ts`** — Add the agent ID to `AGENT_IDS`
8. Re-run `npm run compile && npm run package` and reinstall the VSIX

For GitHub Copilot:
9. **`.github/copilot-instructions.md`** — Add an agent section with disciple label and behaviours

---

## Quality Bar for a New Agent File

Before the agent goes live, answer these questions:

- [ ] Is the character distinct from existing agents? Could you tell the difference in output?
- [ ] Does the "Who You Are" section convey personality, not just role?
- [ ] Are the standards non-negotiable — things this agent genuinely won't compromise on?
- [ ] Is the mesh behaviour clear — who does this agent receive from and deliver to?
- [ ] Would a future maintainer understand this agent without reading the whole repo?

If any answer is no, rewrite before adding.
