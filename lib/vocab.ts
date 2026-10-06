// ============================================================
// Lexi Vocabulary Bank - 词库驱动的题库词集
// 30 个精选词（带手写例句，可出全部四题型）+ 运行时从统一词库
// （public/typing-dicts/lexicon.json，ECDICT 管线产物）异步注入的
// 中考标签词（id 形如 lex:<en>，无例句，只出 word-to-cn / cn-to-word /
// listening 三题型）。全站词汇检索统一走词库；本模块消费方
// （store/QuizScreen/weakness/vocab 页/battle/tutorial/onboarding）
// 无需感知扩容。
// ============================================================
import type { VocabWord, Question } from './types';
import { generateGrammarQuestions } from './grammar';
import { BASE_PATH } from './config';

let lexiconHydrated = false;
let hydrateSig = '';
/** 词库扩容词是否已注入（未注入时题库仅 30 精选词） */
export function isVocabHydrated() {
  return lexiconHydrated;
}

export interface HydrateOptions {
  /** 考试标签过滤（学段角色：junior=['zk']、college=['cet4','cet6']…；空=全部核心词） */
  tags?: string[];
  /** 难度过滤（primary 只出入门词） */
  difficulties?: (1 | 2 | 3)[];
}

/** 启动时调用：拉取统一词库，按学段角色注入对应标签词。幂等（同参数）；
 *  换角色（参数变化）时清空重注。 */
export async function hydrateVocabFromLexicon(opts?: HydrateOptions): Promise<number> {
  const sig = JSON.stringify(opts ?? {});
  if (lexiconHydrated && hydrateSig === sig) return VOCAB.length;
  if (hydrateSig !== sig) {
    // 换角色：移除上一轮注入的词（精选 30 词保留）
    for (let i = VOCAB.length - 1; i >= 0; i--) {
      if (VOCAB[i].id.startsWith('lex:')) VOCAB.splice(i, 1);
    }
  }
  try {
    const [res, exRes] = await Promise.all([
      fetch(`${BASE_PATH}/typing-dicts/lexicon.json`),
      // AI 例句包（gen-examples.mjs 产物，可能不存在——401/404 时例句留空）
      fetch(`${BASE_PATH}/typing-dicts/examples-zk.json`).catch(() => null),
    ]);
    if (!res.ok) return VOCAB.length;
    const idx = (await res.json()) as Record<string, { cn: string; phonetic: string; pos: string; difficulty: 1 | 2 | 3; tags: string }>;
    const examples = exRes && exRes.ok
      ? (await exRes.json()) as Record<string, { example: string; exampleCn: string }>
      : {};
    const tagSet = opts?.tags && opts.tags.length > 0 ? new Set(opts.tags) : null;
    const diffSet = opts?.difficulties && opts.difficulties.length > 0 ? new Set(opts.difficulties) : null;
    const existing = new Set(VOCAB.map((w) => w.en.toLowerCase()));
    for (const [en, e] of Object.entries(idx)) {
      if (existing.has(en)) continue;
      if (tagSet && !e.tags.split(',').some((t) => tagSet.has(t))) continue;
      if (diffSet && !diffSet.has(e.difficulty)) continue;
      const ex = examples[en];
      VOCAB.push({
        id: `lex:${en}`,
        en,
        cn: e.cn,
        phonetic: e.phonetic,
        type: e.pos || 'word',
        example: ex?.example ?? '',
        exampleCn: ex?.exampleCn ?? '',
        difficulty: e.difficulty,
      });
    }
    lexiconHydrated = true;
    hydrateSig = sig;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lexi:vocab-hydrated"));
    }
  } catch {
    /* 离线/词库不可用：保持精选 30 词题库 */
  }
  return VOCAB.length;
}

export const VOCAB: VocabWord[] = [
  { id: 'w01', en: 'achieve', cn: '实现，达到', phonetic: '/əˈtʃiːv/', type: 'v.', example: 'You can achieve your dream.', exampleCn: '你可以实现你的梦想。', difficulty: 2 },
  { id: 'w02', en: 'benefit', cn: '利益，好处', phonetic: '/ˈbenɪfɪt/', type: 'n./v.', example: 'Reading benefits our mind.', exampleCn: '阅读有益于我们的心智。', difficulty: 2 },
  { id: 'w03', en: 'communicate', cn: '交流，沟通', phonetic: '/kəˈmjuːnɪkeɪt/', type: 'v.', example: 'We communicate by phone.', exampleCn: '我们通过电话交流。', difficulty: 2 },
  { id: 'w04', en: 'determine', cn: '决定，决心', phonetic: '/dɪˈtɜːmɪn/', type: 'v.', example: 'She determined to win.', exampleCn: '她下定决心要赢。', difficulty: 2 },
  { id: 'w05', en: 'environment', cn: '环境', phonetic: '/ɪnˈvaɪrənmənt/', type: 'n.', example: 'Protect our environment.', exampleCn: '保护我们的环境。', difficulty: 2 },
  { id: 'w06', en: 'familiar', cn: '熟悉的', phonetic: '/fəˈmɪliə(r)/', type: 'adj.', example: 'This song is familiar to me.', exampleCn: '这首歌我很熟悉。', difficulty: 2 },
  { id: 'w07', en: 'gradually', cn: '逐渐地', phonetic: '/ˈɡrædʒuəli/', type: 'adv.', example: 'The snow gradually melted.', exampleCn: '雪逐渐融化了。', difficulty: 2 },
  { id: 'w08', en: 'hesitate', cn: '犹豫', phonetic: '/ˈhezɪteɪt/', type: 'v.', example: "Don't hesitate to ask.", exampleCn: '不要犹豫，尽管问。', difficulty: 3 },
  { id: 'w09', en: 'imagine', cn: '想象', phonetic: '/ɪˈmædʒɪn/', type: 'v.', example: 'Imagine a better future.', exampleCn: '想象一个更美好的未来。', difficulty: 1 },
  { id: 'w10', en: 'journey', cn: '旅程', phonetic: '/ˈdʒɜːni/', type: 'n.', example: 'Life is a long journey.', exampleCn: '人生是一段漫长的旅程。', difficulty: 2 },
  { id: 'w11', en: 'knowledge', cn: '知识', phonetic: '/ˈnɒlɪdʒ/', type: 'n.', example: 'Knowledge is power.', exampleCn: '知识就是力量。', difficulty: 1 },
  { id: 'w12', en: 'literature', cn: '文学', phonetic: '/ˈlɪtrətʃə(r)/', type: 'n.', example: 'I love Chinese literature.', exampleCn: '我热爱中国文学。', difficulty: 3 },
  { id: 'w13', en: 'memorize', cn: '记忆，背诵', phonetic: '/ˈmeməraɪz/', type: 'v.', example: 'Memorize these words.', exampleCn: '记住这些单词。', difficulty: 2 },
  { id: 'w14', en: 'necessary', cn: '必要的', phonetic: '/ˈnesəsəri/', type: 'adj.', example: 'Water is necessary for life.', exampleCn: '水是生命必需的。', difficulty: 2 },
  { id: 'w15', en: 'opportunity', cn: '机会', phonetic: '/ˌɒpəˈtjuːnəti/', type: 'n.', example: 'Seize every opportunity.', exampleCn: '抓住每一个机会。', difficulty: 2 },
  { id: 'w16', en: 'practice', cn: '练习，实践', phonetic: '/ˈpræktɪs/', type: 'n./v.', example: 'Practice makes perfect.', exampleCn: '熟能生巧。', difficulty: 1 },
  { id: 'w17', en: 'quality', cn: '质量，品质', phonetic: '/ˈkwɒləti/', type: 'n.', example: 'High quality products.', exampleCn: '高品质的产品。', difficulty: 2 },
  { id: 'w18', en: 'recognize', cn: '认出，识别', phonetic: '/ˈrekəɡnaɪz/', type: 'v.', example: "I didn't recognize you.", exampleCn: '我没认出你。', difficulty: 2 },
  { id: 'w19', en: 'succeed', cn: '成功', phonetic: '/səkˈsiːd/', type: 'v.', example: 'Work hard to succeed.', exampleCn: '努力工作以获得成功。', difficulty: 2 },
  { id: 'w20', en: 'tradition', cn: '传统', phonetic: '/trəˈdɪʃn/', type: 'n.', example: 'A family tradition.', exampleCn: '一个家庭传统。', difficulty: 2 },
  { id: 'w21', en: 'unique', cn: '独特的', phonetic: '/juˈniːk/', type: 'adj.', example: 'Everyone is unique.', exampleCn: '每个人都是独特的。', difficulty: 2 },
  { id: 'w22', en: 'valuable', cn: '有价值的', phonetic: '/ˈvæljuəbl/', type: 'adj.', example: 'A valuable lesson.', exampleCn: '宝贵的一课。', difficulty: 2 },
  { id: 'w23', en: 'wisdom', cn: '智慧', phonetic: '/ˈwɪzdəm/', type: 'n.', example: 'Learn from wisdom.', exampleCn: '从智慧中学习。', difficulty: 3 },
  { id: 'w24', en: 'ancient', cn: '古代的', phonetic: '/ˈeɪnʃənt/', type: 'adj.', example: 'Ancient buildings.', exampleCn: '古老的建筑。', difficulty: 2 },
  { id: 'w25', en: 'balance', cn: '平衡', phonetic: '/ˈbæləns/', type: 'n./v.', example: 'Keep a good balance.', exampleCn: '保持良好的平衡。', difficulty: 2 },
  { id: 'w26', en: 'challenge', cn: '挑战', phonetic: '/ˈtʃælɪndʒ/', type: 'n./v.', example: 'Accept the challenge.', exampleCn: '接受挑战。', difficulty: 2 },
  { id: 'w27', en: 'develop', cn: '发展，开发', phonetic: '/dɪˈveləp/', type: 'v.', example: 'Develop good habits.', exampleCn: '养成好习惯。', difficulty: 2 },
  { id: 'w28', en: 'encourage', cn: '鼓励', phonetic: '/ɪnˈkʌrɪdʒ/', type: 'v.', example: 'Teachers encourage students.', exampleCn: '老师们鼓励学生。', difficulty: 2 },
  { id: 'w29', en: 'festival', cn: '节日', phonetic: '/ˈfestɪvl/', type: 'n.', example: 'Spring Festival.', exampleCn: '春节。', difficulty: 1 },
  { id: 'w30', en: 'generate', cn: '产生，生成', phonetic: '/ˈdʒenəreɪt/', type: 'v.', example: 'Generate new ideas.', exampleCn: '产生新的想法。', difficulty: 3 },
];

// ---- Question generator (4 question types, randomly mixed) ----
export function generateQuestions(count: number = 10): Question[] {
  const shuffled = [...VOCAB].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, VOCAB.length));
  const types: Question['type'][] = ['word-to-cn', 'cn-to-word', 'fill-blank', 'listening'];

  return selected.map((word, idx) => {
    // 词库扩容词无手写例句，fill-blank（例句挖空）只在精选词上出
    const type: Question['type'] = word.example ? types[idx % 4] : (['word-to-cn', 'cn-to-word', 'listening'] as const)[idx % 3];
    return makeQuestion(word, idx, type);
  });
}

/** Generate questions all of one type (deck-specific quizzes, e.g. cloze). */
export function generateQuestionsByType(count: number, type: Question['type']): Question[] {
  if (type === 'grammar') {
    // 语法题走独立题库（不依赖词卡）
    return generateGrammarQuestions(count);
  }
  const shuffled = [...VOCAB].sort(() => Math.random() - 0.5);
  const pool = type === 'fill-blank' ? shuffled.filter((w) => w.example) : shuffled;
  const selected = pool.slice(0, Math.min(count, pool.length));
  return selected.map((word, idx) => makeQuestion(word, idx, type));
}

/** Generate a single question of a specific type from a word.
 *  hints（阶段3）：该生历史错选，word-to-cn/listening 的干扰项优先探测。 */
export function makeQuestion(word: VocabWord, idx: number, type: Question['type'], hints: string[] = []): Question {
  const base = {
    id: `q${idx}`,
    wordId: word.id,
    explanation: word.example
      ? `${word.en} ${word.phonetic} — ${word.cn}\n例句: ${word.example}\n${word.exampleCn}`
      : `${word.en} ${word.phonetic} — ${word.cn}`,
  };

  switch (type) {
    case 'word-to-cn': {
      const distractors = getDistractors(word.cn, word.difficulty, hints);
      const choices = [...distractors, word.cn].sort(() => Math.random() - 0.5);
      return { ...base, type, prompt: word.en, promptSub: word.phonetic, choices, correctIndex: choices.indexOf(word.cn) };
    }
    case 'cn-to-word': {
      const pool = VOCAB.filter(w => w.en !== word.en).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.en);
      const choices = [...pool, word.en].sort(() => Math.random() - 0.5);
      return { ...base, type, prompt: word.cn, promptSub: `${word.type} · 反义词`, choices, correctIndex: choices.indexOf(word.en) };
    }
    case 'fill-blank': {
      const sentence = word.example.replace(new RegExp(word.en, 'gi'), '______');
      const pool = VOCAB.filter(w => w.en !== word.en).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.en);
      const choices = [...pool, word.en].sort(() => Math.random() - 0.5);
      return { ...base, type, prompt: sentence, promptSub: word.exampleCn, choices, correctIndex: choices.indexOf(word.en) };
    }
    case 'listening': {
      const distractors = getDistractors(word.cn, word.difficulty, hints);
      const choices = [...distractors, word.cn].sort(() => Math.random() - 0.5);
      return { ...base, type, prompt: `🔊 ${word.phonetic}`, promptSub: '听音辨义 (sound → meaning)', choices, correctIndex: choices.indexOf(word.cn) };
    }
    default:
      // grammar 题来自独立题库（generateGrammarQuestions），不基于词卡生成
      throw new Error(`makeQuestion does not support type: ${type}`);
  }
}

export function getWordById(id: string): VocabWord | undefined {
  return VOCAB.find(w => w.id === id);
}


/**
 * 3 个干扰项中文释义。阶段3（方案 P0-2）：
 * - hints（该生历史错选，/api/quiz/distractors）优先——学生自己的错误
 *   选择是最锋利的干扰项；
 * - difficulty 参与同层偏好（此前该参数被完全忽略——自适应缺口 1 的前半）。
 */
export function getDistractors(correctCn: string, difficulty: number, hints: string[] = []): string[] {
  const out: string[] = [];
  const push = (cn: string) => {
    if (cn && cn !== correctCn && !out.includes(cn) && out.length < 3) out.push(cn);
  };
  hints.forEach(push);

  const tier = Math.min(3, Math.max(1, Math.round(difficulty) || 2));
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
  const others = VOCAB.filter((v) => v.cn !== correctCn);
  const sameTier = others.filter((v) => v.difficulty === tier);
  const nearTier = others.filter((v) => Math.abs(v.difficulty - tier) === 1);
  // 同层 → 邻层 → 全库，层内乱序
  [...shuffle(sameTier), ...shuffle(nearTier), ...shuffle(others)].forEach((v) => push(v.cn));
  return out;
}
