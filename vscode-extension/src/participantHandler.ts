import * as vscode from 'vscode';
import { Agent } from './agentLoader';

/**
 * Creates a ChatRequestHandler for a given Superteam agent
 */
export function createParticipantHandler(agent: Agent): vscode.ChatRequestHandler {
  return async (
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
  ): Promise<void> => {
    try {
      // Select Copilot chat model
      const models = await vscode.lm.selectChatModels({
        vendor: 'copilot'
      });

      if (models.length === 0) {
        stream.markdown('GitHub Copilot model not available. Ensure you have an active GitHub Copilot subscription and the extension is installed.');
        return;
      }

      const model = models[0];

      // Build messages: system prompt as User message, then user's prompt
      const messages: vscode.LanguageModelChatMessage[] = [
        vscode.LanguageModelChatMessage.User(agent.systemPrompt),
        vscode.LanguageModelChatMessage.User(request.prompt)
      ];

      // Send request and stream response
      const chatResponse = await model.sendRequest(messages, {}, token);

      for await (const chunk of chatResponse.text) {
        stream.markdown(chunk);
      }

    } catch (error) {
      if (error instanceof vscode.LanguageModelError) {
        stream.markdown(`Language model error: ${error.message}`);
      } else {
        stream.markdown(`Error processing request: ${String(error)}`);
      }
    }
  };
}
