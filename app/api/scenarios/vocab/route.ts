/**
 * POST /api/scenarios/vocab — pick 15-20 level-appropriate words for a
 * scenario (mission briefing target list).
 * Body: { scenarioId, level } → { vocab: string[] }
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import { aiText, AIUnavailableError } from "../../../../server/ai";
import { scenarioById, levelVocabSample, type VocabLevel } from "../../../../lib/scenarios";

const LEVELS: VocabLevel[] = ["Primary", "JuniorHigh", "SeniorHigh", "Custom"];

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const scenario = scenarioById(String(body.scenarioId ?? ""));
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }
    const level: VocabLevel = LEVELS.includes(body.level) ? body.level : "JuniorHigh";

    try {
      const sample = levelVocabSample(level).join(", ");
      const text = await aiText({
        contents: [
          {
            role: "user",
            text: [
              "You are a curriculum designer.",
              `Scenario: ${scenario.title.en} (${scenario.theme})`,
              `Level: ${level}`,
              "From the following list of words, pick 15-20 words that are MOST relevant to this scenario and level.",
              "If not enough relevant words are found, pick common useful words for this level.",
              `Words: ${sample}`,
              "Return ONLY a JSON array of strings.",
            ].join("\n"),
          },
        ],
        json: true,
        timeoutMs: 30_000,
      });

      const parsed = JSON.parse(text) as unknown;
      if (Array.isArray(parsed)) {
        const vocab = parsed.map(String).filter(Boolean).slice(0, 30);
        return NextResponse.json({ vocab, generated: true, userId: user.id });
      }
      throw new Error("not an array");
    } catch (genErr) {
      // Generation failed (AI down / bad JSON) — fall back to the static list
      // so the briefing still renders.
      if (!(genErr instanceof AIUnavailableError)) {
        console.error("[scenarios/vocab] generation failed, using static list:", genErr);
      }
      return NextResponse.json({ vocab: scenario.targetVocab, generated: false });
    }
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
