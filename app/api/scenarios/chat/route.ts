/**
 * POST /api/scenarios/chat — NPC text reply for a scenario.
 * Body: { scenarioId, history: {role, text}[], message, level, customVocab, locale }
 * → { npcResponse, userSuggestion } (Gemini, JSON-schema'd server-side)
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import { geminiText, GeminiUnavailableError } from "../../../../server/gemini";
import { scenarioById, buildChatSystemInstruction, type VocabLevel } from "../../../../lib/scenarios";

const LEVELS: VocabLevel[] = ["Primary", "JuniorHigh", "SeniorHigh", "Custom"];

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const body = await req.json();
    const scenario = scenarioById(String(body.scenarioId ?? ""));
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }
    const level: VocabLevel = LEVELS.includes(body.level) ? body.level : "JuniorHigh";
    const customVocab: string[] = Array.isArray(body.customVocab)
      ? body.customVocab.map(String).slice(0, 200)
      : [];
    const locale = body.locale === "zh" ? "zh" : "en";
    const message = String(body.message ?? "").slice(0, 2000);
    const history = Array.isArray(body.history)
      ? body.history
          .filter((m: unknown) => !!m && typeof m === "object")
          .map((m: { role?: unknown; text?: unknown }) => ({
            role: m.role === "model" ? "model" : "user",
            parts: [{ text: String(m.text ?? "").slice(0, 4000) }],
          }))
          .slice(-20)
      : [];
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const text = await geminiText({
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      systemInstruction: buildChatSystemInstruction(scenario, level, customVocab, locale, message),
      json: true,
    });

    try {
      const parsed = JSON.parse(text) as { npcResponse?: string; userSuggestion?: string };
      return NextResponse.json({
        npcResponse: parsed.npcResponse ?? text,
        userSuggestion: parsed.userSuggestion ?? "",
      });
    } catch {
      // Model ignored the JSON hint — still usable as a plain reply.
      return NextResponse.json({ npcResponse: text, userSuggestion: "" });
    }
  } catch (e) {
    if (e instanceof Response) return e;
    if (e instanceof GeminiUnavailableError) {
      return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
