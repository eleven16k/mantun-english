/**
 * OpenAI-compatible chat client for the configured LLM gateway
 * (default: zm.oxsm.gz.cn, model z-ai/glm-5.3-flash — vision + reasoning).
 *
 * Used by the scenario routes (via server/ai.ts) and the /solve photo route.
 * Configure with LLM_BASE_URL / LLM_API_KEY / LLM_MODEL (see .env.example).
 */
const DEFAULT_BASE_URL = "https://zm.oxsm.gz.cn/api/v1";
const DEFAULT_MODEL = "z-ai/glm-5.3-flash";

export type LLMContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string | LLMContentPart[];
}

export function llmBaseUrl(): string {
  return (process.env.LLM_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
}

export function llmModel(): string {
  return process.env.LLM_MODEL ?? DEFAULT_MODEL;
}

export function llmApiKey(): string | null {
  const key = process.env.LLM_API_KEY;
  return key && key.trim() ? key.trim() : null;
}

export function llmAvailable(): boolean {
  return llmApiKey() !== null;
}

/** Reasoning models sometimes inline a <think> block — strip it for UX. */
export function stripThinking(text: string): string {
  return text.replace(/^\s*<think>[\s\S]*?<\/think>\s*/i, "").trim();
}

function extractContentChoice(payload: unknown): string {
  const data = payload as {
    choices?: { message?: { content?: string | null; reasoning_content?: string | null } }[];
  };
  const msg = data.choices?.[0]?.message;
  return (msg?.content ?? msg?.reasoning_content ?? "").toString();
}

function extractDeltaChoice(payload: unknown): string {
  const data = payload as { choices?: { delta?: { content?: string | null } }[] };
  return (data.choices?.[0]?.delta?.content ?? "").toString();
}

interface ChatOptions {
  messages: LLMMessage[];
  json?: boolean;
  temperature?: number;
  timeoutMs?: number;
}

/** Non-streaming chat completion. Returns the assistant text. */
export async function llmChat(opts: ChatOptions): Promise<string> {
  const key = llmApiKey();
  if (!key) throw new Error("LLM_API_KEY not configured");

  const body: Record<string, unknown> = {
    model: llmModel(),
    messages: opts.messages,
    stream: false,
  };
  if (opts.json) body.response_format = { type: "json_object" };
  if (typeof opts.temperature === "number") body.temperature = opts.temperature;

  const res = await fetch(`${llmBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`LLM gateway error ${res.status}: ${detail.slice(0, 200)}`);
  }
  return stripThinking(extractContentChoice(await res.json()));
}

/** Streaming chat completion (SSE). Calls onChunk per text delta; returns full text. */
export async function llmChatStream(
  opts: ChatOptions & { onChunk: (text: string) => void; signal?: AbortSignal }
): Promise<string> {
  const key = llmApiKey();
  if (!key) throw new Error("LLM_API_KEY not configured");

  const body: Record<string, unknown> = {
    model: llmModel(),
    messages: opts.messages,
    stream: true,
  };
  if (typeof opts.temperature === "number") body.temperature = opts.temperature;

  const res = await fetch(`${llmBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: opts.signal ?? AbortSignal.timeout(opts.timeoutMs ?? 120_000),
  });
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`LLM gateway error ${res.status}: ${detail.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are newline-separated "data: {...}" lines.
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") continue;
      try {
        const delta = extractDeltaChoice(JSON.parse(payload));
        if (delta) {
          full += delta;
          opts.onChunk(delta);
        }
      } catch {
        // partial/malformed frame — skip
      }
    }
  }
  return full;
}

const DEFAULT_TTS_MODEL = "google/gemini-3.1-flash-tts-preview";

/**
 * TTS via the gateway's /audio/speech (e.g. gemini-3.1-flash-tts-preview).
 * Returns base64 PCM16 mono @ 24 kHz — the same shape geminiTTS produces, so
 * the client's playPcm audio path needs no changes. Throws when the model or
 * endpoint is unavailable so callers can fall back.
 */
export async function llmTTS(text: string, voice = "Kore"): Promise<string> {
  const key = llmApiKey();
  if (!key) throw new Error("LLM_API_KEY not configured");

  const res = await fetch(`${llmBaseUrl()}/audio/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.LLM_TTS_MODEL ?? DEFAULT_TTS_MODEL,
      input: text.slice(0, 800),
      voice,
    }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`LLM gateway TTS error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { audio?: string; mime_type?: string };
  if (!data.audio) throw new Error("LLM gateway TTS returned no audio");
  return data.audio;
}
