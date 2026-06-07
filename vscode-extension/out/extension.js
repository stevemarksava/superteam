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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const agentLoader_1 = require("./agentLoader");
const participantHandler_1 = require("./participantHandler");
let outputChannel;
function activate(context) {
    outputChannel = vscode.window.createOutputChannel('Superteam');
    outputChannel.appendLine('[Superteam] Extension activating...');
    // Load all agent definitions
    const agents = (0, agentLoader_1.loadAgents)(outputChannel);
    outputChannel.appendLine(`[Superteam] Loaded ${agents.size} agents`);
    // Register each agent as a chat participant
    for (const [agentId, agent] of agents.entries()) {
        try {
            const participant = vscode.chat.createChatParticipant(`superteam.${agentId}`, (0, participantHandler_1.createParticipantHandler)(agent));
            // Push to disposables for cleanup
            context.subscriptions.push(participant);
            outputChannel.appendLine(`[Superteam] Registered @${agentId}`);
        }
        catch (error) {
            outputChannel.appendLine(`[Superteam] Failed to register @${agentId}: ${error}`);
        }
    }
    outputChannel.appendLine('[Superteam] Extension activated successfully');
}
function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}
