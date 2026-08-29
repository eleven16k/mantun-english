/**
 * POST /api/scenarios/generate — build a role-play Scenario from courseware
 * text via the gateway LLM. Body: { text, level } → { scenario }.
 * The generated Scenario is persisted per-user and flows through the same
 * chat/call/vocab/reward machinery as the static ones.
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import { aiText, AIUnavailableError } from "../../../../server/ai";
import db from "../../../../server/db";
import { SCENARIOS, type Scenario, type Bilingual } from "../../../../lib/scenarios";

export const maxDuration = 120;

function bi(en: unknown, zh: unknown, fallbackEn: string, fallbackZh: string): Bilingual {
  const e = String(en ?? "").trim() || fallbackEn;
  const z = String(zh ?? "").trim() || fallbackZh;
  return { en: e.slice(0, 120), zh: z.slice(0, 120) };
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const text = String(body.text ?? "").trim();
    const level = ["Primary", "JuniorHigh", "SeniorHigh"].includes(body.level) ? body.level : "JuniorHigh";
    if (text.length < 50) {
      return NextResponse.json({ error: "Courseware text too short (min 50 chars)" }, { status: 400 });
    }

    // Existing card images double as artwork for generated scenarios.
    const imageOptions = SCENARIOS.map((s, i) => `${i}: ${s.theme} — ${s.image}`).join("\n");

    const raw = await aiText({
      contents: [
        {
          role: "user",
          text: [
            "You design role-play scenarios for a K12 English-practice app.",
            "From the COURSEWARE TEXT below, design ONE scenario where a student lives the material as a dialogue (e.g. the text is about a science topic → the student meets a character who explains/uses it; a story → the student talks with its protagonist; daily-life content → the matching real-world scene).",
            "Return ONLY a JSON object with keys:",
            '{ "title": {"en","zh"}, "location": {"en","zh"}, "description": {"en","zh" ≤ 90 chars}, "difficulty": "Beginner"|"Intermediate"|"Advanced", "emoji": "one emoji", "npc": "character first name", "npcRole": {"en","zh"},',
            '  "prompt": "3-6 sentence ENGLISH system prompt: You are <npc>, <npcRole>, <setting>. Weave the courseware content, facts and vocabulary naturally into the conversation; gently correct nothing, just model good English; keep replies short; ask follow-up questions; speak only English.",',
            '  "targetVocab": [12-15 key words/phrases taken verbatim from the courseware], "imageIndex": <0-12> }',
            `Difficulty for a ${level} learner: Primary → Beginner, JuniorHigh → Intermediate, SeniorHigh → Advanced.`,
            "EXISTING IMAGES (pick the closest imageIndex):",
            imageOptions,
            "COURSEWARE TEXT:",
            text.slice(0, 8000),
          ].join("\n"),
        },
      ],
      json: true,
      timeoutMs: 100_000,
    });

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const idx = Math.min(SCENARIOS.length - 1, Math.max(0, Number(parsed.imageIndex) || 0));
    const scenario: Scenario & { id: string } = {
      id: `custom-${Date.now().toString(36)}`,
      title: bi((parsed.title as Bilingual)?.en, (parsed.title as Bilingual)?.zh, "Courseware scene", "课件场景"),
      location: bi((parsed.location as Bilingual)?.en, (parsed.location as Bilingual)?.zh, "NovaWorld", "新世界"),
      description: bi((parsed.description as Bilingual)?.en, (parsed.description as Bilingual)?.zh, "Role-play from your courseware.", "来自课件的角色扮演。"),
      difficulty: (["Beginner", "Intermediate", "Advanced"].includes(String(parsed.difficulty))
        ? parsed.difficulty
        : level === "Primary" ? "Beginner" : level === "SeniorHigh" ? "Advanced" : "Intermediate") as Scenario["difficulty"],
      image: String(parsed.imageIndex) !== "" ? SCENARIOS[idx].image : SCENARIOS[0].image,
      emoji: String(parsed.emoji ?? "📚").slice(0, 4),
      npc: String(parsed.npc ?? "Nova").slice(0, 30),
      npcRole: bi((parsed.npcRole as Bilingual)?.en, (parsed.npcRole as Bilingual)?.zh, "Guide", "向导"),
      prompt: String(parsed.prompt ?? "You are a friendly character from the courseware. Chat in simple English.").slice(0, 2000),
      targetVocab: Array.isArray(parsed.targetVocab)
        ? parsed.targetVocab.map(String).filter(Boolean).slice(0, 15)
        : [],
      theme: String(parsed.location ? (parsed.location as Bilingual).en : "custom").slice(0, 60),
    };

    db.prepare(
      "INSERT INTO custom_scenarios (id, user_id, scenario_json, source_excerpt, level) VALUES (?, ?, ?, ?, ?)"
    ).run(scenario.id, user.id, JSON.stringify(scenario), text.slice(0, 400), level);

    return NextResponse.json({ scenario });
  } catch (e) {
    if (e instanceof Response) return e;
    if (e instanceof AIUnavailableError) {
      return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
