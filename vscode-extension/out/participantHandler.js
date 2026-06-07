"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipantHandler = createParticipantHandler;
const vscode = __importStar(require("vscode"));
/**
 * Creates a ChatRequestHandler for a given Superteam agent
 */
function createParticipantHandler(agent) {
    return async (request, context, stream, token) => {
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
            const messages = [
                vscode.LanguageModelChatMessage.User(agent.systemPrompt),
                vscode.LanguageModelChatMessage.User(request.prompt)
            ];
            // Send request and stream response
            const chatResponse = await model.sendRequest(messages, {}, token);
            for await (const chunk of chatResponse.text) {
                stream.markdown(chunk);
            }
        }
        catch (error) {
            if (error instanceof vscode.LanguageModelError) {
                stream.markdown(`Language model error: ${error.message}`);
            }
            else {
                stream.markdown(`Error processing request: ${String(error)}`);
            }
        }
    };
}
