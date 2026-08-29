/**
 * Unified server-side text generation for Lexi AI features.
 * Routes prefer the configured OpenAI-compatible gateway (LLM_API_KEY),
 * then fall back to Gemini (GEMINI_API_KEY). Signature mirrors geminiText
 * so routes only swap the import.
 */
import { llmAvailable, llmChat, type LLMMessage } from "./llm";
import { geminiText } from "./gemini";

export class AIUnavailableError extends Error {
  constructor(message = "No AI provider configured (LLM_API_KEY / GEMINI_API_KEY)") {
    super(message);
  }
}

export interface AiTextOptions {
  contents: { role: "user" | "model"; text: string }[];
  systemInstruction?: string;
  /** Request JSON output (best-effort per provider). */
  json?: boolean;
  timeoutMs?: number;
}

function geminiAvailable(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

export async function aiText(opts: AiTextOptions): Promise<string> {
  if (llmAvailable()) {
    const messages: LLMMessage[] = [];
    if (opts.systemInstruction) messages.push({ role: "system", content: opts.systemInstruction });
    for (const m of opts.contents) {
      messages.push({ role: m.role === "model" ? "assistant" : "user", content: m.text });
    }
    return llmChat({
      messages,
      json: opts.json,
      timeoutMs: opts.timeoutMs,
      temperature: opts.json ? 0.4 : 0.8,
    });
  }
  if (geminiAvailable()) {
    return geminiText({
      contents: opts.contents.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
      systemInstruction: opts.systemInstruction,
      json: opts.json,
      timeoutMs: opts.timeoutMs,
    });
  }
  throw new AIUnavailableError();
}
