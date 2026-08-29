/**
 * POST /api/scenarios/tts — replay an NPC message as speech.
 * Body: { text } → { audio: "<base64 PCM16 24 kHz mono>" }
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import { geminiTTS, GeminiUnavailableError } from "../../../../server/gemini";

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const { text } = await req.json();
    const clean = String(text ?? "")
      .split("---")[0] // English part only — skip translation/tip segments
      .trim()
      .slice(0, 800);
    if (!clean) {
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    }
    const audio = await geminiTTS(clean);
    return NextResponse.json({ audio, sampleRate: 24000 });
  } catch (e) {
    if (e instanceof Response) return e;
    if (e instanceof GeminiUnavailableError) {
      return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
