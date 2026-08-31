/**
 * POST /api/quiz/wordlist — generate vocabulary questions directly from a
 * word list (e.g. OCR'd from a worksheet photo). Bypasses the DeepTutor
 * RAG agent, which plans poorly from bare word lists; this produces
 * meaning-choice questions in the same QuizPair shape the import flow
 * consumes.
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import { aiText, AIUnavailableError } from "../../../../server/ai";

export const maxDuration = 120;

interface WordPair {
  word: string;
  correct: string;
  distractors: string[];
  example?: string;
  exampleCn?: string;
}

const LETTERS = ["A", "B", "C", "D"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const body = await req.json();
    // Keep word-like tokens only; strip OCR noise (numbers, punctuation, CJK).
    const rawWords: string[] = (Array.isArray(body.words) ? body.words : [])
      .map((w: unknown) => String(w ?? "").trim())
      .filter((w: string) => /^[A-Za-z][A-Za-z'\- ]{0,30}$/.test(w));
    const words: string[] = [...new Set(rawWords)].slice(0, 60);
    if (words.length < 4) {
      return NextResponse.json({ error: "Need at least 4 valid words" }, { status: 400 });
    }
    const count = Math.min(words.length, Math.max(1, Number(body.count) || words.length));

    // Batch the LLM calls: 20 words per request keeps JSON output reliable.
    const chunks: string[][] = [];
    for (let i = 0; i < count; i += 20) chunks.push(words.slice(i, i + 20));

    const pairs: {
      question_id: string;
      question: string;
      question_type: string;
      correct_answer: string;
      explanation: string;
      options: Record<string, string>;
    }[] = [];
    let n = 0;

    for (const chunk of chunks) {
      const raw = await aiText({
        contents: [
          {
            role: "user",
            text: [
              "You are a K12 English vocabulary quiz writer for Chinese students.",
              "For EVERY word in the list, write one Chinese-meaning multiple-choice question.",
              "Rules: correct = the most common Chinese meaning (2-6 chars); distractors = 3 plausible but clearly wrong Chinese meanings of similar length; example = a short simple English sentence using the word; exampleCn = its Chinese translation.",
              "Return ONLY a JSON array, one object per word, same order:",
              '[{"word":"obey","correct":"服从","distractors":["犹豫","想象","环境"],"example":"You must obey the rules.","exampleCn":"你必须遵守规则。"}]',
              "",
              `WORDS: ${chunk.join(", ")}`,
            ].join("\n"),
          },
        ],
        json: true,
        timeoutMs: 90_000,
      });

      const parsed = JSON.parse(raw.replace(/^```json\s*|```$/g, "")) as WordPair[];
      for (const p of parsed) {
        if (!p?.word || !p?.correct || !Array.isArray(p.distractors)) continue;
        const opts = shuffle([p.correct, ...p.distractors.filter(Boolean).slice(0, 3)]);
        while (opts.length < 4) opts.push("—");
        const answerIdx = opts.indexOf(p.correct);
        pairs.push({
          question_id: `wl-${++n}`,
          question: p.word,
          question_type: "choice",
          correct_answer: LETTERS[answerIdx],
          explanation: [
            `${p.word} ${p.correct}`,
            p.example ? `e.g. ${p.example}${p.exampleCn ? ` (${p.exampleCn})` : ""}` : "",
          ]
            .filter(Boolean)
            .join(" — "),
          options: Object.fromEntries(LETTERS.map((L, i) => [L, opts[i]])),
        });
        if (pairs.length >= count) break;
      }
      if (pairs.length >= count) break;
    }

    return NextResponse.json({ pairs });
  } catch (e) {
    if (e instanceof Response) return e;
    if (e instanceof AIUnavailableError) {
      return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
