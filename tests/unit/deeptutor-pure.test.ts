import { describe, it, expect } from "vitest";
import {
  parseQuizMarkdown,
  adaptQuizPairs,
  clampQuestionText,
  createThinkFilter,
} from "@/lib/deeptutor";
import { QUIZ_MARKDOWN, TYPED_MARKDOWN, EMPTY_MARKDOWN, THINK_CHUNKS } from "./helpers/fixtures";

describe("parseQuizMarkdown", () => {
  it("parses choice questions with options and answer", () => {
    const pairs = parseQuizMarkdown(QUIZ_MARKDOWN);
    expect(pairs.length).toBe(2);
    expect(pairs[0].question).toContain("past tense");
    expect(pairs[0].question_type).toBe("choice");
    expect(pairs[0].options?.B).toBeTruthy();
    expect(pairs[0].correct_answer).toBe("B");
    expect(pairs[0].explanation).toContain("irregular");
  });

  it("parses typed questions without options", () => {
    const pairs = parseQuizMarkdown(TYPED_MARKDOWN);
    expect(pairs.length).toBe(1);
    expect(pairs[0].question_type).toBe("typed");
    expect(pairs[0].correct_answer.toLowerCase()).toBe("apple");
  });

  it("returns [] for prose without question blocks", () => {
    expect(parseQuizMarkdown(EMPTY_MARKDOWN)).toEqual([]);
  });
});

describe("adaptQuizPairs", () => {
  it("maps choice pairs to DTQuizQuestion with answerIndex", () => {
    const pairs = parseQuizMarkdown(QUIZ_MARKDOWN);
    const qs = adaptQuizPairs(pairs);
    expect(qs.length).toBe(2);
    expect(qs[0].type).toBe("choice");
    expect(qs[0].options?.length).toBe(4);
    const correct = qs[0].options?.[qs[0].answerIndex ?? -1];
    expect(correct).toBeTruthy();
  });

  it("maps typed pairs to answer strings", () => {
    const qs = adaptQuizPairs(parseQuizMarkdown(TYPED_MARKDOWN));
    expect(qs[0].type).toBe("typed");
    expect(qs[0].answer?.toLowerCase()).toBe("apple");
  });

  it("clamps long prompts via clampQuestionText inside the adapter", () => {
    const longStem = "word ".repeat(80).trim();
    const pairs = parseQuizMarkdown(
      `### Question 1\n${longStem}\n- A. 1\n- B. 2\n**Answer:** A`,
    );
    const qs = adaptQuizPairs(pairs);
    expect((qs[0].prompt ?? "").length).toBeLessThan(longStem.length);
  });
});

describe("clampQuestionText", () => {
  it("short text within max passes through normalized", () => {
    expect(clampQuestionText("  short   text ", 100)).toBe("short text");
  });

  it("long text is truncated at max", () => {
    const out = clampQuestionText("word ".repeat(60), 100);
    expect(out.length).toBeLessThanOrEqual(101);
    expect(out.length).toBeGreaterThan(0);
  });
});

describe("createThinkFilter", () => {
  it("strips complete <think> blocks arriving across chunks", () => {
    const filter = createThinkFilter();
    let out = "";
    for (const chunk of THINK_CHUNKS) out += filter(chunk);
    expect(out).toContain("capital of France");
    expect(out).not.toContain("<think>");
  });

  it("passes through text without think tags", () => {
    const filter = createThinkFilter();
    expect(filter("plain answer")).toBe("plain answer");
  });

  it("holds back partial open markers until sure", () => {
    const filter = createThinkFilter();
    const a = filter("hello <thi");
    // partial marker held back or passed; but after next chunk resolves correctly
    const b = filter("nk>secret</think> world");
    expect(a + b).not.toContain("<thi");
    expect(a + b).not.toContain("secret");
    expect(a + b).toContain("hello");
    expect(a + b).toContain("world");
  });
});
