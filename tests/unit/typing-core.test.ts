import { describe, it, expect } from "vitest";
import {
  cardKey,
  cardRarity,
  drawWords,
  passStep,
  stepsForWord,
  typingMatch,
  bookStats,
  dueCount,
  makeIdentifyChoices,
  mergeServerCards,
  scheduleReview,
  STEP_RARITY,
  type TypingProgress,
  type WordBook,
} from "@/lib/typing";

const BOOK: WordBook = {
  id: "test",
  name: "t",
  nameEn: "t",
  desc: "",
  words: [
    { en: "apple", cn: "苹果", difficulty: 1 },
    { en: "banana", cn: "香蕉", difficulty: 1 },
    { en: "cat", cn: "猫", difficulty: 1 },
    { en: "dog", cn: "狗", difficulty: 1 },
    { en: "egg", cn: "蛋", difficulty: 1 },
  ],
};

const empty = (): TypingProgress => ({ v: 1, cards: {}, draws: 0, lastDraw: null });

describe("typingMatch", () => {
  it("忽略首尾空白与大小写", () => {
    expect(typingMatch("Cat", " cat ")).toBe(true);
    expect(typingMatch("APPLE", "apple")).toBe(true);
  });
  it("内容不符为 false", () => {
    expect(typingMatch("cat", "cap")).toBe(false);
    expect(typingMatch("cat", "")).toBe(false);
  });
});

describe("drawWords", () => {
  it("未收集词优先且不超过词书规模", () => {
    const drawn = drawWords(BOOK, empty().cards, 3);
    expect(drawn).toHaveLength(3);
    expect(new Set(drawn.map((w) => w.en)).size).toBe(3);
  });
  it("n 大于词书时全量返回且不重复", () => {
    const drawn = drawWords(BOOK, empty().cards, 10);
    expect(drawn).toHaveLength(5);
  });
  it("补位只取未满 SSR 的词", () => {
    const p = empty();
    // apple/dog 已 SSR
    passStep(p, "test", "apple", "dictation");
    passStep(p, "test", "dog", "dictation");
    const drawn = drawWords(BOOK, p.cards, 10);
    const ens = drawn.map((w) => w.en);
    expect(ens).not.toContain("apple");
    expect(ens).not.toContain("dog");
    expect(ens).toContain("banana"); // 未收集
    expect(ens).toContain("cat"); // 已抽过但未满星（补位）
  });
});

describe("passStep / cardRarity", () => {
  it("升星只升不降", () => {
    const p = empty();
    const c1 = passStep(p, "test", "cat", "dictation");
    expect(c1.stage).toBe(STEP_RARITY.dictation);
    const c2 = passStep(p, "test", "cat", "follow");
    expect(c2.stage).toBe(STEP_RARITY.dictation);
    expect(cardRarity(c2)).toBe("SSR");
  });
  it("新卡跟打后为 N", () => {
    const p = empty();
    const c = passStep(p, "test", "cat", "follow");
    expect(cardRarity(c)).toBe("N");
  });
});

describe("stepsForWord", () => {
  it("未抽过从跟打开始；SSR 无步可练", () => {
    expect(stepsForWord(undefined)[0]).toBe("follow");
    const p = empty();
    const c = passStep(p, "test", "cat", "dictation");
    expect(stepsForWord(c)).toHaveLength(0);
  });
});

describe("bookStats", () => {
  it("统计收集数与稀有度分布", () => {
    const p = empty();
    passStep(p, "test", "cat", "follow");
    passStep(p, "test", "dog", "dictation");
    const s = bookStats(BOOK, p);
    expect(s.collected).toBe(2);
    expect(s.byRarity.N).toBe(1);
    expect(s.byRarity.SSR).toBe(1);
    expect(s.rate).toBeCloseTo(2 / 5);
  });
});

describe("cardKey", () => {
  it("大小写归一", () => {
    expect(cardKey("zk", "Cat")).toBe(cardKey("zk", "cat"));
  });
});

describe("scheduleReview / dueCount", () => {
  it("按 stage 定间隔", () => {
    const now = 1_000_000_000;
    expect(scheduleReview(0, now)).toBe(now + 1 * 86400000);
    expect(scheduleReview(3, now)).toBe(now + 30 * 86400000);
  });
  it("到期卡计数：含缺省 nextReviewAt，排除满星与未到期", () => {
    const p = empty();
    passStep(p, "test", "cat", "follow"); // nextReviewAt = 未来
    p.cards[cardKey("test", "cat")].nextReviewAt = Date.now() - 1000; // 到期
    passStep(p, "test", "dog", "dictation"); // SSR，不算
    const c = passStep(p, "test", "egg", "follow"); // 未到期
    c.nextReviewAt = Date.now() + 86400000;
    // banana 无卡（未收集）不算
    expect(dueCount(BOOK, p.cards)).toBe(1);
  });
});

describe("drawWords dueFirst", () => {
  it("到期词排在最前", () => {
    const p = empty();
    passStep(p, "test", "dog", "follow");
    p.cards[cardKey("test", "dog")].nextReviewAt = Date.now() - 500; // dog 到期
    passStep(p, "test", "cat", "follow");
    p.cards[cardKey("test", "cat")].nextReviewAt = Date.now() + 86400000; // cat 未到期
    const drawn = drawWords(BOOK, p.cards, 3, { dueFirst: true });
    expect(drawn[0].en).toBe("dog");
  });
});

describe("makeIdentifyChoices", () => {
  it("4 项且包含正确答案、无重复", () => {
    const word = BOOK.words[0];
    const choices = makeIdentifyChoices(BOOK, word);
    expect(choices).toHaveLength(4);
    expect(new Set(choices).size).toBe(4);
    expect(choices).toContain(word.cn);
  });
});

describe("mergeServerCards", () => {
  it("stage 取 max，wrongCount 累计取大", () => {
    const p = empty();
    passStep(p, "test", "cat", "identify"); // local stage 1
    const merged = mergeServerCards(p, [
      { bookId: "test", en: "cat", stage: 0, wrongCount: 5 }, // server 落后
      { bookId: "test", en: "dog", stage: 3, wrongCount: 0 }, // server 领先
    ]);
    expect(merged.cards[cardKey("test", "cat")].stage).toBe(1);
    expect(merged.cards[cardKey("test", "cat")].wrongCount).toBe(5);
    expect(merged.cards[cardKey("test", "dog")].stage).toBe(3);
  });
});
