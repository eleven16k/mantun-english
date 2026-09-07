import type { Question } from "./types";

/**
 * 语法单选题库（对齐营销页 GRAMMAR QUEST 展示窗）。
 * 每题：考点标签 + 题干挖空 + 四个语法选项 + 解析。
 * 覆盖中考高频考点（时态 / 主谓一致 / 冠词 / 情态动词 …），
 * 后续按 FR-04-B 的语法知识树扩库。
 */

interface GrammarItem {
  point: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const BANK: GrammarItem[] = [
  {
    point: "一般过去时",
    stem: "He ______ to the store yesterday.",
    options: ["goes", "went", "go", "will go"],
    correctIndex: 1,
    explanation: "yesterday 表示过去发生的事，动词用过去式 went。",
  },
  {
    point: "现在进行时",
    stem: "Look! The children ______ on the playground.",
    options: ["play", "plays", "are playing", "played"],
    correctIndex: 2,
    explanation: "Look! 提示动作正在发生，要用 be + doing。",
  },
  {
    point: "主谓一致",
    stem: "Neither of the answers ______ correct.",
    options: ["are", "were", "is", "be"],
    correctIndex: 2,
    explanation: "neither of + 复数名词作主语时，谓语用单数 is。",
  },
  {
    point: "冠词",
    stem: "There is ______ “u” and ______ “s” in the word “use”.",
    options: ["a; a", "an; an", "a; an", "an; a"],
    correctIndex: 2,
    explanation: "u 读作 /juː/（辅音开头）用 a；s 读作 /es/（元音开头）用 an。",
  },
  {
    point: "情态动词",
    stem: "You ______ be quiet in the library.",
    options: ["can", "may", "must", "would"],
    correctIndex: 2,
    explanation: "图书馆里“必须”保持安静，表示强制性要求用 must。",
  },
  {
    point: "宾语从句",
    stem: "I want to know ______ he will come tomorrow.",
    options: ["that", "if", "what", "which"],
    correctIndex: 1,
    explanation: "宾语从句表“是否”且不缺成分时用 if/whether 引导。",
  },
  {
    point: "形容词比较级",
    stem: "This problem is ______ than that one.",
    options: ["much easy", "much easier", "more easy", "easiest"],
    correctIndex: 1,
    explanation: "比较级用 easier；much 可以修饰比较级。",
  },
  {
    point: "现在完成时",
    stem: "I have ______ (finish) my homework already.",
    options: ["finish", "finishes", "finished", "finishing"],
    correctIndex: 2,
    explanation: "have + 过去分词构成现在完成时：have finished。",
  },
];

/** 生成 count 道语法单选题（循环取题并打乱选项顺位）。 */
export function generateGrammarQuestions(count: number): Question[] {
  const qs: Question[] = [];
  for (let i = 0; i < count; i++) {
    const item = BANK[i % BANK.length];
    // 选项顺位轮转，避免重复出现时正确答案位置固定
    const offset = Math.floor(i / BANK.length);
    const options = item.options.map((_, j) => item.options[(j + offset) % item.options.length]);
    const correctIndex = (item.correctIndex + options.length - (offset % item.options.length)) % options.length;
    qs.push({
      id: `grammar-${i}`,
      wordId: `grammar-${i % BANK.length}`,
      type: "grammar",
      prompt: item.stem,
      promptSub: `考点 · ${item.point}`,
      choices: options,
      correctIndex,
      explanation: item.explanation,
    });
  }
  return qs;
}
