import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as vscode from 'vscode';
import matter from 'gray-matter';

export interface Agent {
  id: string;
  description: string;
  systemPrompt: string;
}

/**
 * Loads all Superteam agent markdown files from ~/.claude/agents/
 * Returns a Map of agent ID to Agent object
 */
export function loadAgents(outputChannel: vscode.OutputChannel): Map<string, Agent> {
  const agents = new Map<string, Agent>();
  const agentNames = [
    'superman',
    'eric',
    'vera',
    'bob',
    'paulien',
    'marlo',
    'athanasios',
    'kryptonite',
    'kevin',
    'coach',
    'g',
    'georgiana'
  ];

  const baseDir = path.join(os.homedir(), '.claude', 'agents');

  for (const name of agentNames) {
    try {
      const filePath = path.join(baseDir, `${name}.md`);

      if (!fs.existsSync(filePath)) {
        outputChannel.appendLine(`[Superteam] Agent file not found: ${filePath}`);
        continue;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = matter(fileContent);

      // Extract description from frontmatter or use agent id as fallback
      const description = parsed.data.description || name;

      // Use the markdown body as the system prompt
      const systemPrompt = parsed.content.trim();

      agents.set(name, {
        id: name,
        description,
        systemPrompt
      });

    } catch (error) {
      outputChannel.appendLine(`[Superteam] Failed to load agent ${name}: ${error}`);
    }
  }

  return agents;
}
