/**
 * Minimal Gemini REST client for server routes (no SDK dependency).
 * Text + JSON-schema generation and PCM TTS for scenario NPCs.
 * Requires GEMINI_API_KEY in the environment (.env.local).
 */
const API_ROOT = "https://generativelanguage.googleapis.com/v1beta/models";

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL ?? "gemini-flash-latest";
const TTS_MODEL = process.env.GEMINI_TTS_MODEL ?? "gemini-2.5-flash-preview-tts";

export interface GeminiTextOptions {
  contents: { role: "user" | "model"; parts: { text: string }[] }[];
  systemInstruction?: string;
  /** Request application/json output. */
  json?: boolean;
  timeoutMs?: number;
}

interface GeminiCandidate {
  content?: { parts?: { text?: string; inlineData?: { mimeType?: string; data?: string } }[] };
}

export class GeminiUnavailableError extends Error {
  constructor(message = "Gemini API key missing or unreachable") {
    super(message);
  }
}

function apiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiUnavailableError();
  return key;
}

/** Text (or JSON) generation. Returns the raw text of the first candidate. */
export async function geminiText(opts: GeminiTextOptions): Promise<string> {
  const body: Record<string, unknown> = {
    contents: opts.contents,
    generationConfig: opts.json ? { responseMimeType: "application/json" } : {},
  };
  if (opts.systemInstruction) {
    body.systemInstruction = { parts: [{ text: opts.systemInstruction }] };
  }

  const res = await fetch(`${API_ROOT}/${TEXT_MODEL}:generateContent?key=${apiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(opts.timeoutMs ?? 30_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { candidates?: GeminiCandidate[] };
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
}

/** TTS: returns base64 PCM (16-bit, mono, 24 kHz) for the given text. */
export async function geminiTTS(text: string, voiceName = "Kore"): Promise<string | null> {
  const res = await fetch(`${API_ROOT}/${TTS_MODEL}:generateContent?key=${apiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
      },
    }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini TTS error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { candidates?: GeminiCandidate[] };
  return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? null;
}
