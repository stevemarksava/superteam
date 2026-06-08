# Using Superteam with Claude Desktop (No VS Code Required)

If you use **Claude Desktop** (the app) or **claude.ai** (the browser), you can run the full Superteam squad without installing anything. The tool is Claude Projects.

---

## What You Get

- All 12 agents + Nexus available by name in every conversation
- Superman answers by default — just start talking
- Switch agents by saying their name: *"Eric — write this function"*
- Your team context persists across conversations in the project

**What you don't get** (vs Claude Code CLI): automatic file writes, git commits, and code execution. The squad gives you expert advice, designs, plans, code, and documents — you apply them.

---

## Setup — Claude Desktop App

**Takes about 3 minutes.**

### Step 1 — Open Claude Desktop and create a Project

1. Open Claude Desktop
2. In the left sidebar, click **+ New Project**
3. Give it a name: `Superteam` (or your project name)

### Step 2 — Add the squad instructions

1. Inside the project, click **Set project instructions** (or the settings/edit icon)
2. Open this file: `squad/onboarding/claude-desktop-project-instructions.md`
3. Copy everything **below the horizontal rule** (from "You are operating as part of Superteam..." to the end)
4. Paste it into the Project Instructions field
5. **Update the "Your Team Context" section** at the bottom — replace the placeholder text with your name, domain, stack, and values

### Step 3 — Start a conversation

Click **New chat** inside the project. Type anything. Superman answers.

---

## Setup — claude.ai in a Browser

Same steps, different location:

1. Go to [claude.ai](https://claude.ai) — **requires a Pro or Team subscription** (Projects are not available on the free tier)
2. Click **Projects** in the left sidebar → **New Project**
3. Name it and open it
4. Click **Project instructions** → paste the instructions (same as above)
5. Start a conversation inside the project

---

## How to Use It

### Default — just talk to Superman

```
What's the best approach for a multi-tenant data platform on Azure?
```

Superman routes the answer and may pull in other agents when needed.

### Switch to a specific agent

Prefix your message with the agent's name:

```
Bob — blueprint a data ingestion pipeline from Salesforce to Fabric

Eric — write a Python function that deduplicates this list by email

Vera — what test cases are we missing for this login flow?

Nexus — what's the right Azure service for real-time event processing,
        and is it GA?

Kryptonite — here's our architecture plan. What's wrong with it?

Athanasios — research the current state of hypergraph neural networks
             and what tools are production-ready

G — what does this Azure stack cost at 10,000 daily active users?
```

### Add project context mid-session

Paste a document, code file, or requirements list directly into the chat. The squad will work from it. If you have a `.squad/decisions/` log from a project, paste the relevant entries so agents don't contradict prior decisions.

---

## Tips for FDEs

**One project per engagement.** Create a new Claude Project for each client or major initiative. That way Superman and the squad accumulate context specific to that work.

**Tell the squad your constraints upfront.** In your first message, say:
> "We're building on Azure for a financial services client. Security and GDPR compliance are non-negotiable. The client team only has Power Platform skills — no custom code deployment."

**Ask Kevin for deliverables.** After a planning session, say *"Kevin — write this up as a decision summary I can share with the client."* Kevin will format it for a non-technical reader.

**Use Kryptonite before presenting.** Before any client presentation of a design: *"Kryptonite — attack this plan. What are the weakest points?"*

**Use Nexus for anything Microsoft.** Any Azure or M365 question: *"Nexus — is Fabric Real-Time Intelligence GA, and does it replace Azure Stream Analytics?"* Nexus checks the docs before answering.

---

## Limitations vs Claude Code

| Feature | Claude Desktop Projects | Claude Code CLI |
|---------|------------------------|-----------------|
| All 12 agents by name | Yes | Yes |
| Coach game tape | In-chat — copy it yourself | Auto-written to `.squad/` |
| Athanasios knowledge bank | In-chat — copy it yourself | Auto-filed |
| Automatic file writes | No | Yes |
| Git commit + push | No | Yes |
| Code execution | No | Yes |
| Persistent memory to disk | Manual (you copy outputs) | Automatic |
| MCP tool integrations | Yes (if configured) | Yes |
| Setup required | None — paste and go | git clone + reload |

For advice, research, code generation, architecture, plans, and documents — Desktop Projects is the right tool.

**Coach in Desktop mode:** At the end of a working session, say *"Coach — write the game tape for today."* Coach will produce a structured review in the chat. Copy it into your notes or a doc if you want to keep it.

---

## Sharing with Your Team

Once you have the project set up and working, the cleanest way to share with other FDEs:

1. Share the `squad/onboarding/claude-desktop-project-instructions.md` file from this repo
2. Tell them to follow this guide
3. They each create their own Claude Project and paste the instructions
4. Everyone gets the same squad — each in their own Claude workspace

*Or*, if your team uses a shared Claude Team/Enterprise account, create one shared Superteam project that everyone on the account can access.

---

*Maintained in `squad/onboarding/CLAUDE_DESKTOP.md`*
