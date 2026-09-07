// ============================================================
// Lexi Vocabulary Bank - 中考高频词汇
// ============================================================
import type { VocabWord, Question } from './types';
import { generateGrammarQuestions } from './grammar';

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
    const type = types[idx % 4]; // cycle through all 4 types
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
  const selected = shuffled.slice(0, Math.min(count, VOCAB.length));
  return selected.map((word, idx) => makeQuestion(word, idx, type));
}

/** Generate a single question of a specific type from a word. */
export function makeQuestion(word: VocabWord, idx: number, type: Question['type']): Question {
  const base = {
    id: `q${idx}`,
    wordId: word.id,
    explanation: `${word.en} ${word.phonetic} — ${word.cn}\n例句: ${word.example}\n${word.exampleCn}`,
  };

  switch (type) {
    case 'word-to-cn': {
      const distractors = getDistractors(word.cn, word.difficulty);
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
      const distractors = getDistractors(word.cn, word.difficulty);
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


/** Get 3 random distractor Chinese meanings (different from the correct one). */
export function getDistractors(correctCn: string, difficulty: number): string[] {
  const pool = VOCAB.filter(v => v.cn !== correctCn).map(v => v.cn);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
