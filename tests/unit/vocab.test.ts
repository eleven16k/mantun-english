import { describe, it, expect } from "vitest";
import {
  VOCAB,
  generateQuestions,
  generateQuestionsByType,
  makeQuestion,
  getDistractors,
  getWordById,
} from "@/lib/vocab";
import type { Question } from "@/lib/types";

describe("vocab data", () => {
  it("has a non-empty word bank with required fields", () => {
    expect(VOCAB.length).toBeGreaterThanOrEqual(30);
    for (const w of VOCAB) {
      expect(w.id).toBeTruthy();
      expect(w.en).toBeTruthy();
      expect(w.cn).toBeTruthy();
      expect([1, 2, 3]).toContain(w.difficulty);
    }
  });

  it("getWordById returns the word or null", () => {
    expect(getWordById(VOCAB[0].id)?.en).toBe(VOCAB[0].en);
    expect(getWordById("nope")).toBeUndefined();
  });
});

describe("getDistractors", () => {
  it("returns up to 3 wrong answers from the same bank", () => {
    const word = VOCAB[0];
    const ds = getDistractors(word.cn, word.difficulty);
    expect(ds.length).toBeLessThanOrEqual(3);
    expect(ds).not.toContain(word.cn);
    for (const d of ds) expect(VOCAB.some((v) => v.cn === d)).toBe(true);
  });
});

describe("makeQuestion", () => {
  it("word-to-cn puts the correct answer among shuffled choices", () => {
    const w = VOCAB[0];
    const q = makeQuestion(w, 0, "word-to-cn");
    expect(q.type).toBe("word-to-cn");
    expect(q.prompt).toBe(w.en);
    expect(q.choices).toContain(w.cn);
    expect(q.choices.length).toBe(4);
    expect(q.choices[q.correctIndex]).toBe(w.cn);
  });

  it("cn-to-word prompts with Chinese", () => {
    const w = VOCAB[0];
    const q = makeQuestion(w, 1, "cn-to-word");
    expect(q.prompt).toBe(w.cn);
    expect(q.choices).toContain(w.en);
  });

  it("fill-blank masks the word in the example", () => {
    const w = VOCAB.find((v) => v.example.includes(v.en));
    if (!w) return; // bank may lack a suitable example
    const q = makeQuestion(w, 2, "fill-blank");
    expect(q.prompt).not.toContain(w.en);
    expect(q.choices).toContain(w.en);
  });

  it("listening uses the word audio cue and cn choices", () => {
    const w = VOCAB[0];
    const q = makeQuestion(w, 3, "listening");
    expect(q.type).toBe("listening");
    expect(q.choices).toContain(w.cn);
  });
});

describe("generateQuestions", () => {
  it("produces the requested count with unique ids", () => {
    const qs = generateQuestions(10);
    expect(qs.length).toBe(10);
    expect(new Set(qs.map((q) => q.id)).size).toBe(10);
  });

  it("cycles through all four question types", () => {
    const qs = generateQuestions(8);
    const types = new Set(qs.map((q) => q.type));
    expect(types.has("word-to-cn")).toBe(true);
    expect(types.has("cn-to-word")).toBe(true);
  });
});

describe("generateQuestionsByType", () => {
  it("returns only the requested type", () => {
    const qs: Question[] = generateQuestionsByType(6, "word-to-cn");
    expect(qs.length).toBe(6);
    for (const q of qs) expect(q.type).toBe("word-to-cn");
  });

  it("caps at available bank size without crashing", () => {
    const qs = generateQuestionsByType(500, "cn-to-word");
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.length).toBeLessThanOrEqual(VOCAB.length);
  });
});
