import { describe, it, expect } from "vitest";
import {
  SCENARIOS,
  getScenarios,
  scenarioById,
  levelVocabSample,
  buildCallInstructions,
  buildChatSystemInstruction,
} from "@/lib/scenarios";
import { VOCAB_LISTS } from "@/lib/vocab-lists";

describe("scenario data", () => {
  it("has unique ids with required fields on every scenario", () => {
    const ids = SCENARIOS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of SCENARIOS) {
      expect(s.title.en).toBeTruthy();
      expect(s.title.zh).toBeTruthy();
      expect(s.npc).toBeTruthy();
      expect(s.prompt.length).toBeGreaterThan(20);
      expect(s.targetVocab.length).toBeGreaterThanOrEqual(5);
      expect(["Beginner", "Intermediate", "Advanced"]).toContain(s.difficulty);
    }
  });

  it("filters scenarios progressively by vocab level", () => {
    const primary = getScenarios("Primary");
    const junior = getScenarios("JuniorHigh");
    const senior = getScenarios("SeniorHigh");
    expect(primary.every((s) => s.difficulty === "Beginner")).toBe(true);
    expect(junior.every((s) => s.difficulty !== "Advanced")).toBe(true);
    expect(primary.length).toBeLessThan(junior.length);
    expect(junior.length).toBeLessThan(senior.length);
  });

  it("scenarioById finds known ids and rejects unknown ones", () => {
    expect(scenarioById("cafe")?.npc).toBe("Oliver");
    expect(scenarioById("nope")).toBeUndefined();
  });
});

describe("vocab lists", () => {
  it("exposes the three leveled word lists with enough words", () => {
    expect(VOCAB_LISTS.Primary.length).toBeGreaterThanOrEqual(50);
    expect(VOCAB_LISTS.JuniorHigh.length).toBeGreaterThanOrEqual(500);
    expect(VOCAB_LISTS.SeniorHigh.length).toBeGreaterThanOrEqual(1000);
  });

  it("levelVocabSample caps the sample size", () => {
    const sample = levelVocabSample("JuniorHigh", 20);
    expect(sample.length).toBeLessThanOrEqual(20);
    for (const w of sample) expect(VOCAB_LISTS.JuniorHigh).toContain(w);
  });
});

describe("prompt builders", () => {
  const cafe = scenarioById("cafe")!;

  it("call instructions carry the persona and vocab, and stay voice-friendly", () => {
    const instructions = buildCallInstructions(cafe, "JuniorHigh", ["latte"]);
    expect(instructions).toContain("Oliver");
    expect(instructions).toContain("latte");
    expect(instructions).toContain("1-2 very short sentences");
  });

  it("call instructions scale difficulty by level", () => {
    expect(buildCallInstructions(cafe, "Primary", [])).toContain("primary-school");
    expect(buildCallInstructions(cafe, "SeniorHigh", [])).toContain("senior-high");
  });

  it("chat system instruction demands the EN---translation---tip format", () => {
    const sys = buildChatSystemInstruction(cafe, "Primary", ["muffin"], "en", "i want coffee");
    expect(sys).toContain("---");
    expect(sys).toContain("npcResponse");
    expect(sys).toContain("userSuggestion");
    expect(sys).toContain("muffin");
  });
});
