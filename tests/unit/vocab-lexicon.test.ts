import { describe, it, expect, vi } from "vitest";

/**
 * 词库扩容（hydrateVocabFromLexicon）行为验证：
 * - zk 词注入 VOCAB（id lex:<en>），AI 例句包合并后 fill-blank 可出题
 * - 无例句词不出 fill-blank（generateQuestionsByType 分流）
 * 注：vocab 模块的 hydrate 单例跨用例共享（幂等），故一次性 hydrate、顺序断言。
 */

const LEXICON = {
  apple: { cn: "苹果", phonetic: "/ˈæpl/", pos: "n.", difficulty: 1, tags: "zk,gk" },
  banana: { cn: "香蕉", phonetic: "/bəˈnɑːnə/", pos: "n.", difficulty: 1, tags: "zk" },
  calculate: { cn: "计算", phonetic: "/ˈkælkjuleɪt/", pos: "v.", difficulty: 2, tags: "zk" },
};
const EXAMPLES = {
  apple: { example: "I eat an apple every day.", exampleCn: "我每天吃一个苹果。" },
  banana: { example: "The banana is yellow.", exampleCn: "香蕉是黄色的。" },
  // calculate 故意无例句 → 不应出 fill-blank
};

vi.stubGlobal("fetch", vi.fn(async (url: string) => {
  if (String(url).includes("lexicon")) {
    return { ok: true, json: async () => LEXICON };
  }
  if (String(url).includes("examples-zk")) {
    return { ok: true, json: async () => EXAMPLES };
  }
  return { ok: false, json: async () => ({}) };
}));

const { hydrateVocabFromLexicon, isVocabHydrated, VOCAB, getWordById, makeQuestion, generateQuestionsByType } = await import("@/lib/vocab");

describe("词库扩容（hydrateVocabFromLexicon）", () => {
  it("注入 zk 词并合并 AI 例句", async () => {
    await hydrateVocabFromLexicon();
    expect(isVocabHydrated()).toBe(true);
    const apple = getWordById("lex:apple");
    expect(apple).toBeDefined();
    expect(apple!.cn).toBe("苹果");
    expect(apple!.example).toContain("apple"); // 例句已合并
    expect(apple!.exampleCn).toContain("苹果");
  });

  it("幂等：二次调用不重复注入", async () => {
    const n = VOCAB.length;
    await hydrateVocabFromLexicon();
    expect(VOCAB.length).toBe(n);
  });

  it("有例句的词可出 fill-blank（题面含挖空）", async () => {
    const apple = getWordById("lex:apple")!;
    const q = makeQuestion(apple, 0, "fill-blank");
    expect(q.prompt).toContain("______");
    expect(q.prompt).not.toMatch(/apple/i); // 目标词已被挖掉
  });

  it("无例句的词 fill-blank 分流（生成不含它们）", async () => {
    const qs = generateQuestionsByType(10, "fill-blank");
    for (const q of qs) {
      const w = getWordById(q.wordId)!;
      expect(w.example.length).toBeGreaterThan(0);
    }
  });
});
