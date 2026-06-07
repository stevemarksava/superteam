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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAgents = loadAgents;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const gray_matter_1 = __importDefault(require("gray-matter"));
/**
 * Loads all Superteam agent markdown files from ~/.claude/agents/
 * Returns a Map of agent ID to Agent object
 */
function loadAgents(outputChannel) {
    const agents = new Map();
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
            const parsed = (0, gray_matter_1.default)(fileContent);
            // Extract description from frontmatter or use agent id as fallback
            const description = parsed.data.description || name;
            // Use the markdown body as the system prompt
            const systemPrompt = parsed.content.trim();
            agents.set(name, {
                id: name,
                description,
                systemPrompt
            });
        }
        catch (error) {
            outputChannel.appendLine(`[Superteam] Failed to load agent ${name}: ${error}`);
        }
    }
    return agents;
}
