import { describe, it, expect } from "vitest";
import {
  buildUnitQuiz,
  makeLetterTiles,
  makeListenQuestion,
  makePairQuestion,
  makePhonemeQuestion,
} from "@/lib/phonics";
import { PHONEMES, PHONICS_LEVELS, allWords, findUnit } from "@/content/phonics/data";

/**
 * 拼读馆出题器单测：字母块乱序保序性、听音辨词干扰项、看词选音标正确项、
 * 辨音判断真值一致性、混合小测的题型与判定结构。
 */

describe("拼读出题器", () => {
  it("内容包：44 音标齐全，live 单元词表非空", () => {
    expect(PHONEMES).toHaveLength(44);
    const live = PHONICS_LEVELS.filter((l) => l.status === "live");
    expect(live.length).toBeGreaterThanOrEqual(2);
    for (const l of live) for (const u of l.units) expect(u.words.length).toBeGreaterThanOrEqual(8);
  });

  it("字母块乱序：保持字母多重集，id 唯一", () => {
    const word = "banana";
    const tiles = makeLetterTiles(word);
    expect(tiles.map((t) => t.ch).sort().join("")).toBe(word.split("").sort().join(""));
    expect(new Set(tiles.map((t) => t.id)).size).toBe(word.length);
    expect(tiles.every((t) => !t.used)).toBe(true);
  });

  it("听音辨词：正确项在选项中，干扰项不与答案重复", () => {
    const unit = findUnit("l1-u1")!.unit;
    const word = unit.words[0]; // cat
    const q = makeListenQuestion(word, unit.words);
    expect(q.choices).toHaveLength(4);
    expect(q.correctIndex).toBe(q.choices.indexOf(word));
    const texts = q.choices.map((c) => c.text);
    expect(new Set(texts).size).toBe(4);
    expect(texts).toContain(word.text);
  });

  it("看词选音标：正确项是该词的音标，四个选项唯一", () => {
    const word = { text: "cat", ipa: "/kæt/", phonemes: ["/k/", "/æ/", "/t/"], emoji: "🐱" };
    for (let i = 0; i < 10; i++) {
      const q = makePhonemeQuestion(word);
      expect(q.choices).toHaveLength(4);
      expect(new Set(q.choices).size).toBe(4);
      expect(word.phonemes).toContain(q.choices[q.correctIndex]);
    }
  });

  it("辨音判断：same 标志与两词元音交集一致", () => {
    const unit = findUnit("l1-u1")!.unit;
    for (let i = 0; i < 10; i++) {
      const q = makePairQuestion(unit.words[i % unit.words.length], unit.words);
      expect(q.a.text).not.toBe(q.b.text);
      const vowels = (w: { phonemes: string[] }) => w.phonemes.filter((s) => PHONEMES.find((p) => p.symbol === s && p.type === "vowel"));
      const overlap = vowels(q.a).some((v) => vowels(q.b).includes(v));
      expect(q.same).toBe(overlap);
    }
  });

  it("混合小测：4 题、题型合法、判定结构完整", () => {
    const unit = findUnit("l1-u2")!.unit;
    for (let round = 0; round < 5; round++) {
      const quiz = buildUnitQuiz(unit.words);
      expect(quiz.length).toBe(4);
      const kinds = new Set(quiz.map((q) => q.kind));
      expect([...kinds].every((k) => ["listen", "phoneme", "pair"].includes(k as string))).toBe(true);
      expect(kinds.has("listen")).toBe(true); // 听音选词是主力题型
      for (const q of quiz) {
        if (q.kind === "listen") {
          expect(q.choices).toHaveLength(4);
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        }
        if (q.kind === "phoneme") {
          expect(q.choices).toHaveLength(4);
          expect(wordPhonemes(unit, q.word.text)).toContain(q.choices[q.correctIndex]);
        }
        if (q.kind === "pair") {
          expect(typeof q.same).toBe("boolean");
        }
      }
    }
  });

  it("全库单词都有合法拆音与 emoji", () => {
    for (const w of allWords()) {
      expect(w.phonemes.length).toBeGreaterThanOrEqual(2);
      expect(w.emoji).toBeTruthy();
      for (const p of w.phonemes) {
        // 拆音引用的音标必须存在于 44 音标体系
        expect(PHONEMES.some((x) => x.symbol === p)).toBe(true);
      }
    }
  });
});

function wordPhonemes(unit: { words: { text: string; phonemes: string[] }[] }, text: string): string[] {
  return unit.words.find((w) => w.text === text)!.phonemes;
}
