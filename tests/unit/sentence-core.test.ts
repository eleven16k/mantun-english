import { describe, it, expect } from "vitest";
import {
  tokenizeSentence,
  normalizeToken,
  normalizeTranscript,
  makeWordChips,
  typingStates,
  typingDone,
  diffWords,
  scoreTranscript,
  SPEAK_PASS_THRESHOLD,
  getModeProgress,
  saveModeProgress,
  lessonUnlocked,
} from "@/lib/sentence";
import { SENTENCE_PACKS, findLesson, nextLessonOf } from "@/content/sentence/data";

/**
 * 句法馆内核单测：分词保标点、归一化、词卡乱序、打字校验态、
 * LCS 口语对齐打分、进度存取、内容包不变量。
 */

describe("内容包不变量", () => {
  it("3 个 live 包，每课 8 句且 en/cn 非空、lessonId 唯一", () => {
    const live = SENTENCE_PACKS.filter((p) => p.status === "live");
    expect(live).toHaveLength(3);
    const ids = new Set<string>();
    for (const p of live) {
      expect(p.lessons.length).toBeGreaterThanOrEqual(2);
      for (const l of p.lessons) {
        expect(ids.has(l.id)).toBe(false);
        ids.add(l.id);
        expect(l.sentences).toHaveLength(8);
        for (const s of l.sentences) {
          expect(s.en.trim().length).toBeGreaterThan(0);
          expect(s.cn.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("findLesson / nextLessonOf 导航正确", () => {
    expect(findLesson("starter-l1")?.pack.id).toBe("starter");
    expect(findLesson("nope-x")).toBeNull();
    expect(nextLessonOf("starter-l1")?.id).toBe("starter-l2");
    expect(nextLessonOf("starter-l2")).toBeNull();
    expect(nextLessonOf("school-l2")).toBeNull();
  });
});

describe("tokenizeSentence", () => {
  it("按空白切词，标点附着 token", () => {
    expect(tokenizeSentence("Have a good day.")).toEqual(["Have", "a", "good", "day."]);
    expect(tokenizeSentence("Let's  discuss  it.")).toEqual(["Let's", "discuss", "it."]);
    expect(tokenizeSentence("How are you today?")).toEqual(["How", "are", "you", "today?"]);
    expect(tokenizeSentence("  ")).toEqual([]);
  });
});

describe("归一化", () => {
  it("normalizeToken 去标点小写、保留撇号", () => {
    expect(normalizeToken("Day.")).toBe("day");
    expect(normalizeToken("Let's")).toBe("let's");
    expect(normalizeToken("YOU?")).toBe("you");
  });

  it("normalizeTranscript 剥标点压空白", () => {
    expect(normalizeTranscript("Hello, world!")).toEqual(["hello", "world"]);
    expect(normalizeTranscript("It's  OK.")).toEqual(["it's", "ok"]);
    expect(normalizeTranscript("...")).toEqual([]);
  });
});

describe("makeWordChips", () => {
  it("保持词多重集、id 唯一、used 初始 false", () => {
    const en = "I am a student and I am happy.";
    const chips = makeWordChips(en);
    const tokens = tokenizeSentence(en);
    expect(chips.map((c) => c.word).sort()).toEqual([...tokens].sort());
    expect(new Set(chips.map((c) => c.id)).size).toBe(tokens.length);
    expect(chips.every((c) => !c.used)).toBe(true);
  });

  it("多词句不会保持原序（重洗一次兜底）", () => {
    const en = "one two three four five six seven";
    for (let k = 0; k < 20; k++) {
      const chips = makeWordChips(en);
      const sameAsOriginal = chips.every((c, i) => c.word === tokenizeSentence(en)[i]);
      expect(sameAsOriginal).toBe(false);
    }
  });
});

describe("typingStates", () => {
  const target = "I am a student.";

  it("空输入全 pending", () => {
    const st = typingStates(target, "");
    expect(st.map((w) => w.status)).toEqual(["pending", "pending", "pending", "pending"]);
  });

  it("已提交词整词 ok/bad，当前词逐字符", () => {
    const st = typingStates(target, "I am a st");
    expect(st[0]).toMatchObject({ status: "ok" });
    expect(st[1]).toMatchObject({ status: "ok" });
    expect(st[2]).toMatchObject({ status: "ok" });
    expect(st[3].status).toBe("current");
    expect(st[3].chars).toEqual([
      { ch: "s", ok: true },
      { ch: "t", ok: true },
      { ch: "u", ok: undefined },
      { ch: "d", ok: undefined },
      { ch: "e", ok: undefined },
      { ch: "n", ok: undefined },
      { ch: "t", ok: undefined },
      { ch: ".", ok: undefined },
    ]);
  });

  it("提交错词标 bad；尾随空格后无 current 词", () => {
    expect(typingStates(target, "I the ")[2].status).toBe("pending");
    const st = typingStates(target, "I the ");
    expect(st[0].status).toBe("ok");
    expect(st[1].status).toBe("bad");
    expect(st[2].status).toBe("pending");
  });

  it("typingDone 严格一致（忽略首尾空白）", () => {
    expect(typingDone(target, " I am a student. ")).toBe(true);
    expect(typingDone(target, "I am a student")).toBe(false);
    expect(typingDone(target, "I am a student. ")).toBe(true);
  });
});

describe("diffWords / scoreTranscript", () => {
  it("全中", () => {
    const r = scoreTranscript("I am a student.", "i am a student");
    expect(r.score).toBe(1);
    expect(r.perWord).toEqual([true, true, true, true]);
    expect(r.extras).toEqual([]);
  });

  it("漏词/错词", () => {
    const r = scoreTranscript("I am a student.", "i am student");
    expect(r.score).toBeCloseTo(3 / 4);
    expect(r.perWord).toEqual([true, true, false, true]);
  });

  it("说多了记 extras", () => {
    const r = scoreTranscript("See you tomorrow.", "see you tomorrow very much");
    expect(r.perWord).toEqual([true, true, true]);
    expect(r.extras).toEqual(["very", "much"]);
    expect(r.score).toBe(1);
  });

  it("空转写 0 分", () => {
    expect(scoreTranscript("Nice to meet you.", "").score).toBe(0);
  });

  it("阈值 0.6：说对六成放行", () => {
    // 5 词句说对 3 词 = 0.6
    const r = scoreTranscript("one two three four five", "one two three x y");
    expect(r.score).toBeCloseTo(0.6);
    expect(r.score >= SPEAK_PASS_THRESHOLD).toBe(true);
  });
});

describe("进度存取", () => {
    // lib/sentence.ts 的 localStorage 内核在 node 测试环境无 window——
  // 这些函数做了 typeof window 守卫，node 下读写应安全返回空
  it("node 环境安全降级", () => {
    expect(getModeProgress("starter-l1", "puzzle")).toBeNull();
    expect(() => saveModeProgress("starter-l1", "puzzle", { results: [], idx: 0, clearedAt: null })).not.toThrow();
    expect(lessonUnlocked("starter-l1")).toBe(true);
    // findLesson 之外的课按未收录处理 → false
    expect(lessonUnlocked("nope")).toBe(false);
  });
});
