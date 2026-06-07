# Superteam Copilot Participants

VS Code extension that registers Superteam agents as GitHub Copilot Chat participants.

## What It Does

Adds all 12 Superteam agents as `@` participants in GitHub Copilot Chat:
- `@superman` — Lead agent, Steve's single point of contact
- `@eric` — Superstar coder
- `@vera` — Quality assurance
- `@bob` — Solution architect
- `@paulien` — Scrum master and planner
- `@marlo` — UX designer
- `@athanasios` — Researcher and intelligence
- `@kryptonite` — Red team
- `@kevin` — Report builder
- `@coach` — Squad coach
- `@g` — The money man
- `@georgiana` — Motivator and Coach bridge

Each agent responds with their full personality, expertise, and role context loaded from `~/.claude/agents/<name>.md`.

## Prerequisites

- GitHub Copilot subscription (active)
- GitHub Copilot extension installed in VS Code
- Superteam agent files at `~/.claude/agents/` (superman.md, eric.md, vera.md, etc.)

## Install

1. Build the extension:
   ```bash
   cd C:\Users\s.marks\.claude\vscode-extension
   npm install
   npm run compile
   npm run package
   ```

2. Install the `.vsix`:
   - In VS Code: Extensions → `...` menu → "Install from VSIX..."
   - Select `superteam-copilot-participants-0.1.0.vsix`

3. Reload VS Code window

## Usage

Open GitHub Copilot Chat and address any agent by name:

```
@eric fix this bug
@vera review this code
@bob design a solution for X
@superman what's the plan?
```

Each agent responds according to their loaded system prompt from `~/.claude/agents/<name>.md`.

## Update Agents

1. Edit the agent file: `~/.claude/agents/<name>.md`
2. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"

Changes to agent prompts take effect immediately on reload.

## Troubleshooting

- **Agents not appearing:** Check that `~/.claude/agents/` contains the agent `.md` files
- **No response:** Ensure GitHub Copilot subscription is active and extension is enabled
- **See logs:** View → Output → "Superteam" channel

## Development

- `npm run compile` — Build TypeScript
- `npm run watch` — Watch mode during development
- `npm run package` — Create `.vsix` package
