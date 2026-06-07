import * as vscode from 'vscode';
import { loadAgents } from './agentLoader';
import { createParticipantHandler } from './participantHandler';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('Superteam');
  outputChannel.appendLine('[Superteam] Extension activating...');

  // Load all agent definitions
  const agents = loadAgents(outputChannel);
  outputChannel.appendLine(`[Superteam] Loaded ${agents.size} agents`);

  // Register each agent as a chat participant
  for (const [agentId, agent] of agents.entries()) {
    try {
      const participant = vscode.chat.createChatParticipant(
        `superteam.${agentId}`,
        createParticipantHandler(agent)
      );

      // Push to disposables for cleanup
      context.subscriptions.push(participant);

      outputChannel.appendLine(`[Superteam] Registered @${agentId}`);
    } catch (error) {
      outputChannel.appendLine(`[Superteam] Failed to register @${agentId}: ${error}`);
    }
  }

  outputChannel.appendLine('[Superteam] Extension activated successfully');
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}
