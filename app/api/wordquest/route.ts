/**
 * POST /api/wordquest — generate a 10-question vocabulary quiz for Word Quest.
 * Body: { level: 'Primary'|'JuniorHigh'|'SeniorHigh' }
 * → { questions: { word, correct, distractors[], example, exampleTranslation }[] }
 *
 * Falls back to a locally assembled quiz (word list only, no example
 * sentences) when the AI service is down, so the game stays playable.
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../server/auth";
import { geminiText, GeminiUnavailableError } from "../../../server/gemini";
import { VOCAB_LISTS } from "../../../lib/vocab-lists";

type Q = { word: string; correct: string; distractors: string[]; example: string; exampleTranslation: string };

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

/** Offline fallback: "pick the correct spelling" — distractors are mutated
 * copies of the word (swap / double / drop a letter), so the quiz stays a
 * real exercise without any AI call. */
function mutate(word: string, kind: number): string {
  if (word.length < 4) return word + word[word.length - 1];
  const mid = Math.max(1, Math.floor(word.length / 2));
  switch (kind % 3) {
    case 0: {
      // swap two adjacent letters
      const i = mid - 1;
      return word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2);
    }
    case 1: {
      // double a letter
      return word.slice(0, mid) + word[mid] + word.slice(mid);
    }
    default: {
      // drop a letter
      return word.slice(0, mid) + word.slice(mid + 1);
    }
  }
}

function fallbackQuestions(level: keyof typeof VOCAB_LISTS): Q[] {
  return pickRandom(VOCAB_LISTS[level], 10).map((word) => {
    const distractors: string[] = [];
    for (let k = 0; distractors.length < 3 && k < 9; k++) {
      const m = mutate(word, k);
      if (m !== word && !distractors.includes(m)) distractors.push(m);
    }
    return { word, correct: word, distractors, example: "", exampleTranslation: "" };
  });
}

const LEVELS = ["Primary", "JuniorHigh", "SeniorHigh"] as const;
type Level = (typeof LEVELS)[number];

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const body = await req.json();
    const level: Level = LEVELS.includes(body.level) ? body.level : "Primary";
    const vocab = VOCAB_LISTS[level];
    const selectedWords = pickRandom(vocab, 10);

    try {
      const text = await geminiText({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: [
                  `Generate 10 multiple choice vocabulary questions for ${level} level.`,
                  `The words are: ${selectedWords.join(", ")}.`,
                  "For each word, provide:",
                  "1. The English word",
                  "2. The correct Chinese meaning",
                  "3. 3 incorrect Chinese meanings",
                  "4. A simple example sentence in English using the word",
                  "5. The Chinese translation of that example sentence",
                  'Return ONLY a JSON array of objects: { "word": string, "correct": string, "distractors": [string, string, string], "example": string, "exampleTranslation": string }',
                ].join("\n"),
              },
            ],
          },
        ],
        json: true,
        timeoutMs: 30_000,
      });

      const parsed = JSON.parse(text) as Q[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return NextResponse.json({
          questions: parsed.slice(0, 10),
          generated: true,
        });
      }
      throw new Error("empty quiz");
    } catch (genErr) {
      if (!(genErr instanceof GeminiUnavailableError)) {
        console.error("[wordquest] generation failed, using fallback:", genErr);
      }
      return NextResponse.json({ questions: fallbackQuestions(level), generated: false });
    }
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
