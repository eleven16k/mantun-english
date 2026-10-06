/**
 * Phonics content pack — 拼读馆内容（自产，不对齐任何商业教材）。
 *
 * 数据格式沿用 phonicsword.com 已验证的结构（symbol/subGroup/phonemes[]），
 * 内容全部自产：44 音标取自公共 IPA 体系，词表选自基础 CVC 词，
 * 配图用 emoji（零资产成本；后续可换 AI 插画，见 docs 方案 §2.2）。
 *
 * 音频策略（MVP）：speechSynthesis TTS 播词（正常速 + 慢速），无静态音频；
 * `audioPath` 字段已预留——真人录音 / TTS 预生成 mp3 落到
 * /audio/phonics/... 后无需改代码即可生效（lib/phonics.ts 优先读它）。
 */

export type PhonemeGroup =
  | "short" // 短元音
  | "long" // 长元音
  | "diphthong" // 双元音
  | "plosive" // 爆破音
  | "fricative" // 摩擦音
  | "affricate" // 塞擦音
  | "nasal" // 鼻音
  | "liquid"; // 流音

export interface Phoneme {
  symbol: string; // /æ/
  slug: string; // ae — URL 与未来音频文件名
  type: "vowel" | "consonant";
  group: PhonemeGroup;
  exampleWord: string; // cat
  grapheme: string; // a — 常见字母组合
  audioPath?: string; // 预留：静态真人录音（暂走 TTS）
}

export interface PhonicWord {
  text: string;
  ipa: string;
  phonemes: string[]; // 与 phonemes.symbol 对应
  emoji: string;
  /** 字母块拼词用：与 phonemes 一一对应的拼法（digraph 词必填，如 ["sh","i","p"]） */
  graphemes?: string[];
}

export interface PhonicUnit {
  id: string; // l1-u1
  number: number;
  title: string; // 短元音 a
  focus: string; // /æ/
  words: PhonicWord[];
}

export interface PhonicLevel {
  id: string; // l1
  name: string;
  desc: string;
  status: "live" | "soon";
  units: PhonicUnit[];
}

export const PHONEME_GROUP_META: Record<PhonemeGroup, { label: string; en: string; hue: string }> = {
  short: { label: "短元音", en: "Short Vowels", hue: "#4D96FF" },
  long: { label: "长元音", en: "Long Vowels", hue: "#A29BFE" },
  diphthong: { label: "双元音", en: "Diphthongs", hue: "#F97316" },
  plosive: { label: "爆破音", en: "Plosives", hue: "#10B981" },
  fricative: { label: "摩擦音", en: "Fricatives", hue: "#0EA5E9" },
  affricate: { label: "塞擦音", en: "Affricates", hue: "#F59E0B" },
  nasal: { label: "鼻音", en: "Nasals", hue: "#EF4444" },
  liquid: { label: "流音", en: "Liquids & Glides", hue: "#8B5CF6" },
};

export const PHONEMES: Phoneme[] = [
  // ── 短元音 (7) ──
  { symbol: "/ɪ/", slug: "ih", type: "vowel", group: "short", exampleWord: "fish", grapheme: "i" },
  { symbol: "/e/", slug: "eh", type: "vowel", group: "short", exampleWord: "bed", grapheme: "e" },
  { symbol: "/æ/", slug: "ae", type: "vowel", group: "short", exampleWord: "cat", grapheme: "a" },
  { symbol: "/ʌ/", slug: "uh", type: "vowel", group: "short", exampleWord: "sun", grapheme: "u" },
  { symbol: "/ɒ/", slug: "o", type: "vowel", group: "short", exampleWord: "dog", grapheme: "o" },
  { symbol: "/ʊ/", slug: "uu", type: "vowel", group: "short", exampleWord: "book", grapheme: "oo" },
  { symbol: "/ə/", slug: "schwa", type: "vowel", group: "short", exampleWord: "about", grapheme: "a" },
  // ── 长元音 (5) ──
  { symbol: "/iː/", slug: "ee", type: "vowel", group: "long", exampleWord: "see", grapheme: "ee" },
  { symbol: "/ɑː/", slug: "ar", type: "vowel", group: "long", exampleWord: "car", grapheme: "ar" },
  { symbol: "/ɔː/", slug: "or", type: "vowel", group: "long", exampleWord: "fork", grapheme: "or" },
  { symbol: "/uː/", slug: "oo", type: "vowel", group: "long", exampleWord: "blue", grapheme: "oo" },
  { symbol: "/ɜː/", slug: "er", type: "vowel", group: "long", exampleWord: "bird", grapheme: "ir" },
  // ── 双元音 (8) ──
  { symbol: "/eɪ/", slug: "ay", type: "vowel", group: "diphthong", exampleWord: "cake", grapheme: "a_e" },
  { symbol: "/aɪ/", slug: "eye", type: "vowel", group: "diphthong", exampleWord: "kite", grapheme: "i_e" },
  { symbol: "/ɔɪ/", slug: "oy", type: "vowel", group: "diphthong", exampleWord: "boy", grapheme: "oy" },
  { symbol: "/aʊ/", slug: "ow", type: "vowel", group: "diphthong", exampleWord: "cow", grapheme: "ow" },
  { symbol: "/əʊ/", slug: "oh", type: "vowel", group: "diphthong", exampleWord: "nose", grapheme: "o_e" },
  { symbol: "/ɪə/", slug: "eer", type: "vowel", group: "diphthong", exampleWord: "ear", grapheme: "ear" },
  { symbol: "/eə/", slug: "air", type: "vowel", group: "diphthong", exampleWord: "air", grapheme: "air" },
  { symbol: "/ʊə/", slug: "oor", type: "vowel", group: "diphthong", exampleWord: "tour", grapheme: "our" },
  // ── 爆破音 (6) ──
  { symbol: "/p/", slug: "p", type: "consonant", group: "plosive", exampleWord: "pen", grapheme: "p" },
  { symbol: "/b/", slug: "b", type: "consonant", group: "plosive", exampleWord: "bag", grapheme: "b" },
  { symbol: "/t/", slug: "t", type: "consonant", group: "plosive", exampleWord: "ten", grapheme: "t" },
  { symbol: "/d/", slug: "d", type: "consonant", group: "plosive", exampleWord: "dog", grapheme: "d" },
  { symbol: "/k/", slug: "k", type: "consonant", group: "plosive", exampleWord: "cat", grapheme: "c" },
  { symbol: "/ɡ/", slug: "g", type: "consonant", group: "plosive", exampleWord: "go", grapheme: "g" },
  // ── 摩擦音 (9) ──
  { symbol: "/f/", slug: "f", type: "consonant", group: "fricative", exampleWord: "fish", grapheme: "f" },
  { symbol: "/v/", slug: "v", type: "consonant", group: "fricative", exampleWord: "van", grapheme: "v" },
  { symbol: "/θ/", slug: "th", type: "consonant", group: "fricative", exampleWord: "three", grapheme: "th" },
  { symbol: "/ð/", slug: "dh", type: "consonant", group: "fricative", exampleWord: "this", grapheme: "th" },
  { symbol: "/s/", slug: "s", type: "consonant", group: "fricative", exampleWord: "sun", grapheme: "s" },
  { symbol: "/z/", slug: "z", type: "consonant", group: "fricative", exampleWord: "zoo", grapheme: "z" },
  { symbol: "/ʃ/", slug: "sh", type: "consonant", group: "fricative", exampleWord: "ship", grapheme: "sh" },
  { symbol: "/ʒ/", slug: "zh", type: "consonant", group: "fricative", exampleWord: "vision", grapheme: "si" },
  { symbol: "/h/", slug: "h", type: "consonant", group: "fricative", exampleWord: "hat", grapheme: "h" },
  // ── 塞擦音 (2) ──
  { symbol: "/tʃ/", slug: "ch", type: "consonant", group: "affricate", exampleWord: "chair", grapheme: "ch" },
  { symbol: "/dʒ/", slug: "dj", type: "consonant", group: "affricate", exampleWord: "jump", grapheme: "j" },
  // ── 鼻音 (3) ──
  { symbol: "/m/", slug: "m", type: "consonant", group: "nasal", exampleWord: "map", grapheme: "m" },
  { symbol: "/n/", slug: "n", type: "consonant", group: "nasal", exampleWord: "net", grapheme: "n" },
  { symbol: "/ŋ/", slug: "ng", type: "consonant", group: "nasal", exampleWord: "sing", grapheme: "ng" },
  // ── 流音 (4) ──
  { symbol: "/l/", slug: "l", type: "consonant", group: "liquid", exampleWord: "leg", grapheme: "l" },
  { symbol: "/r/", slug: "r", type: "consonant", group: "liquid", exampleWord: "red", grapheme: "r" },
  { symbol: "/j/", slug: "y", type: "consonant", group: "liquid", exampleWord: "yes", grapheme: "y" },
  { symbol: "/w/", slug: "w", type: "consonant", group: "liquid", exampleWord: "wet", grapheme: "w" },
];

export const PHONICS_LEVELS: PhonicLevel[] = [
  {
    id: "l1",
    name: "L1 · CVC 短元音",
    desc: "短元音 a e i o u 打底，拼读三字母词",
    status: "live",
    units: [
      {
        id: "l1-u1",
        number: 1,
        title: "短元音 a",
        focus: "/æ/",
        words: [
          { text: "cat", ipa: "/kæt/", phonemes: ["/k/", "/æ/", "/t/"], emoji: "🐱" },
          { text: "hat", ipa: "/hæt/", phonemes: ["/h/", "/æ/", "/t/"], emoji: "🎩" },
          { text: "map", ipa: "/mæp/", phonemes: ["/m/", "/æ/", "/p/"], emoji: "🗺️" },
          { text: "bag", ipa: "/bæɡ/", phonemes: ["/b/", "/æ/", "/ɡ/"], emoji: "👜" },
          { text: "van", ipa: "/væn/", phonemes: ["/v/", "/æ/", "/n/"], emoji: "🚐" },
          { text: "can", ipa: "/kæn/", phonemes: ["/k/", "/æ/", "/n/"], emoji: "🥫" },
          { text: "ant", ipa: "/ænt/", phonemes: ["/æ/", "/n/", "/t/"], emoji: "🐜" },
          { text: "jam", ipa: "/dʒæm/", phonemes: ["/dʒ/", "/æ/", "/m/"], emoji: "🍯" },
        ],
      },
      {
        id: "l1-u2",
        number: 2,
        title: "短元音 e · i",
        focus: "/e/ /ɪ/",
        words: [
          { text: "bed", ipa: "/bed/", phonemes: ["/b/", "/e/", "/d/"], emoji: "🛏️" },
          { text: "pen", ipa: "/pen/", phonemes: ["/p/", "/e/", "/n/"], emoji: "🖊️" },
          { text: "hen", ipa: "/hen/", phonemes: ["/h/", "/e/", "/n/"], emoji: "🐔" },
          { text: "net", ipa: "/net/", phonemes: ["/n/", "/e/", "/t/"], emoji: "🥅" },
          { text: "pig", ipa: "/pɪɡ/", phonemes: ["/p/", "/ɪ/", "/ɡ/"], emoji: "🐷" },
          { text: "six", ipa: "/sɪks/", phonemes: ["/s/", "/ɪ/", "/k/", "/s/"], emoji: "6️⃣" },
          { text: "fish", ipa: "/fɪʃ/", phonemes: ["/f/", "/ɪ/", "/ʃ/"], emoji: "🐟" },
          { text: "ship", ipa: "/ʃɪp/", phonemes: ["/ʃ/", "/ɪ/", "/p/"], emoji: "🚢" },
        ],
      },
      {
        id: "l1-u3",
        number: 3,
        title: "短元音 o · u",
        focus: "/ɒ/ /ʌ/",
        words: [
          { text: "dog", ipa: "/dɒɡ/", phonemes: ["/d/", "/ɒ/", "/ɡ/"], emoji: "🐶" },
          { text: "box", ipa: "/bɒks/", phonemes: ["/b/", "/ɒ/", "/k/", "/s/"], emoji: "📦" },
          { text: "fox", ipa: "/fɒks/", phonemes: ["/f/", "/ɒ/", "/k/", "/s/"], emoji: "🦊" },
          { text: "sun", ipa: "/sʌn/", phonemes: ["/s/", "/ʌ/", "/n/"], emoji: "☀️" },
          { text: "bus", ipa: "/bʌs/", phonemes: ["/b/", "/ʌ/", "/s/"], emoji: "🚌" },
          { text: "cup", ipa: "/kʌp/", phonemes: ["/k/", "/ʌ/", "/p/"], emoji: "☕" },
          { text: "duck", ipa: "/dʌk/", phonemes: ["/d/", "/ʌ/", "/k/"], emoji: "🦆" },
          { text: "bug", ipa: "/bʌɡ/", phonemes: ["/b/", "/ʌ/", "/ɡ/"], emoji: "🐛" },
        ],
      },
    ],
  },
  {
    id: "l2",
    name: "L2 · 长元音",
    desc: "magic-e 与元音组合，学会读双音节前的长元音词",
    status: "live",
    units: [
      {
        id: "l2-u1",
        number: 1,
        title: "魔术 e（a_e i_e o_e）",
        focus: "/eɪ/ /aɪ/ /əʊ/",
        words: [
          { text: "cake", ipa: "/keɪk/", phonemes: ["/k/", "/eɪ/", "/k/"], emoji: "🎂" },
          { text: "game", ipa: "/ɡeɪm/", phonemes: ["/ɡ/", "/eɪ/", "/m/"], emoji: "🎮" },
          { text: "bike", ipa: "/baɪk/", phonemes: ["/b/", "/aɪ/", "/k/"], emoji: "🚲" },
          { text: "kite", ipa: "/kaɪt/", phonemes: ["/k/", "/aɪ/", "/t/"], emoji: "🪁" },
          { text: "five", ipa: "/faɪv/", phonemes: ["/f/", "/aɪ/", "/v/"], emoji: "5️⃣" },
          { text: "nose", ipa: "/nəʊz/", phonemes: ["/n/", "/əʊ/", "/z/"], emoji: "👃" },
          { text: "home", ipa: "/həʊm/", phonemes: ["/h/", "/əʊ/", "/m/"], emoji: "🏠" },
          { text: "rose", ipa: "/rəʊz/", phonemes: ["/r/", "/əʊ/", "/z/"], emoji: "🌹" },
        ],
      },
      {
        id: "l2-u2",
        number: 2,
        title: "元音组合（ee ai oa oo）",
        focus: "/iː/ /eɪ/ /əʊ/ /uː/ /ʊ/",
        words: [
          { text: "tree", ipa: "/triː/", phonemes: ["/t/", "/r/", "/iː/"], emoji: "🌳" },
          { text: "bee", ipa: "/biː/", phonemes: ["/b/", "/iː/"], emoji: "🐝" },
          { text: "train", ipa: "/treɪn/", phonemes: ["/t/", "/r/", "/eɪ/", "/n/"], emoji: "🚂" },
          { text: "rain", ipa: "/reɪn/", phonemes: ["/r/", "/eɪ/", "/n/"], emoji: "🌧️" },
          { text: "boat", ipa: "/bəʊt/", phonemes: ["/b/", "/əʊ/", "/t/"], emoji: "⛵" },
          { text: "goat", ipa: "/ɡəʊt/", phonemes: ["/ɡ/", "/əʊ/", "/t/"], emoji: "🐐" },
          { text: "book", ipa: "/bʊk/", phonemes: ["/b/", "/ʊ/", "/k/"], emoji: "📖" },
          { text: "moon", ipa: "/muːn/", phonemes: ["/m/", "/uː/", "/n/"], emoji: "🌙" },
        ],
      },
    ],
  },
  {
    id: "l3",
    name: "L3 · 辅音组合",
    desc: "digraph：sh / ch / th / ng（ship / chair / three…）",
    status: "live",
    units: [
      {
        id: "l3-u1",
        number: 1,
        title: "摩擦组合 sh",
        focus: "/ʃ/",
        words: [
          { text: "ship", ipa: "/ʃɪp/", phonemes: ["/ʃ/", "/ɪ/", "/p/"], emoji: "🚢", graphemes: ["sh", "i", "p"] },
          { text: "fish", ipa: "/fɪʃ/", phonemes: ["/f/", "/ɪ/", "/ʃ/"], emoji: "🐟", graphemes: ["f", "i", "sh"] },
          { text: "shop", ipa: "/ʃɒp/", phonemes: ["/ʃ/", "/ɒ/", "/p/"], emoji: "🏪", graphemes: ["sh", "o", "p"] },
          { text: "dish", ipa: "/dɪʃ/", phonemes: ["/d/", "/ɪ/", "/ʃ/"], emoji: "🍽️", graphemes: ["d", "i", "sh"] },
          { text: "shell", ipa: "/ʃel/", phonemes: ["/ʃ/", "/e/", "/l/"], emoji: "🐚", graphemes: ["sh", "e", "ll"] },
          { text: "cash", ipa: "/kæʃ/", phonemes: ["/k/", "/æ/", "/ʃ/"], emoji: "💵", graphemes: ["c", "a", "sh"] },
          { text: "sheep", ipa: "/ʃiːp/", phonemes: ["/ʃ/", "/iː/", "/p/"], emoji: "🐑", graphemes: ["sh", "ee", "p"] },
          { text: "shark", ipa: "/ʃɑːk/", phonemes: ["/ʃ/", "/ɑː/", "/k/"], emoji: "🦈", graphemes: ["sh", "ar", "k"] },
        ],
      },
      {
        id: "l3-u2",
        number: 2,
        title: "塞擦组合 ch",
        focus: "/tʃ/",
        words: [
          { text: "chair", ipa: "/tʃeə/", phonemes: ["/tʃ/", "/eə/"], emoji: "🪑", graphemes: ["ch", "air"] },
          { text: "cheese", ipa: "/tʃiːz/", phonemes: ["/tʃ/", "/iː/", "/z/"], emoji: "🧀", graphemes: ["ch", "ee", "se"] },
          { text: "chips", ipa: "/tʃɪps/", phonemes: ["/tʃ/", "/ɪ/", "/p/", "/s/"], emoji: "🍟", graphemes: ["ch", "i", "p", "s"] },
          { text: "chat", ipa: "/tʃæt/", phonemes: ["/tʃ/", "/æ/", "/t/"], emoji: "💬", graphemes: ["ch", "a", "t"] },
          { text: "chain", ipa: "/tʃeɪn/", phonemes: ["/tʃ/", "/eɪ/", "/n/"], emoji: "⛓️", graphemes: ["ch", "ai", "n"] },
          { text: "lunch", ipa: "/lʌntʃ/", phonemes: ["/l/", "/ʌ/", "/n/", "/tʃ/"], emoji: "🍱", graphemes: ["l", "u", "n", "ch"] },
          { text: "bench", ipa: "/bentʃ/", phonemes: ["/b/", "/e/", "/n/", "/tʃ/"], emoji: "🛋️", graphemes: ["b", "e", "n", "ch"] },
          { text: "cherry", ipa: "/tʃeri/", phonemes: ["/tʃ/", "/e/", "/r/", "/iː/"], emoji: "🍒", graphemes: ["ch", "err", "y"] },
        ],
      },
      {
        id: "l3-u3",
        number: 3,
        title: "咬舌 th 与鼻音 ng",
        focus: "/θ/ /ŋ/",
        words: [
          { text: "bath", ipa: "/bɑːθ/", phonemes: ["/b/", "/ɑː/", "/θ/"], emoji: "🛁", graphemes: ["b", "a", "th"] },
          { text: "moth", ipa: "/mɒθ/", phonemes: ["/m/", "/ɒ/", "/θ/"], emoji: "🦋", graphemes: ["m", "o", "th"] },
          { text: "thumb", ipa: "/θʌm/", phonemes: ["/θ/", "/ʌ/", "/m/"], emoji: "👍", graphemes: ["th", "um", "b"] },
          { text: "three", ipa: "/θriː/", phonemes: ["/θ/", "/r/", "/iː/"], emoji: "3️⃣", graphemes: ["th", "r", "ee"] },
          { text: "thin", ipa: "/θɪn/", phonemes: ["/θ/", "/ɪ/", "/n/"], emoji: "📏", graphemes: ["th", "i", "n"] },
          { text: "ring", ipa: "/rɪŋ/", phonemes: ["/r/", "/ɪ/", "/ŋ/"], emoji: "💍", graphemes: ["r", "i", "ng"] },
          { text: "king", ipa: "/kɪŋ/", phonemes: ["/k/", "/ɪ/", "/ŋ/"], emoji: "🤴", graphemes: ["k", "i", "ng"] },
          { text: "sing", ipa: "/sɪŋ/", phonemes: ["/s/", "/ɪ/", "/ŋ/"], emoji: "🎤", graphemes: ["s", "i", "ng"] },
        ],
      },
    ],
  },
];

export function findUnit(unitId: string): { level: PhonicLevel; unit: PhonicUnit } | null {
  for (const level of PHONICS_LEVELS) {
    const unit = level.units.find((u) => u.id === unitId);
    if (unit) return { level, unit };
  }
  return null;
}

/** 全部已上线单词（跨单元检索用） */
export function allWords(): (PhonicWord & { unitId: string })[] {
  return PHONICS_LEVELS.flatMap((l) =>
    l.units.flatMap((u) => u.words.map((w) => ({ ...w, unitId: u.id }))),
  );
}

/** 含某音标的已上线单词 */
export function wordsWithPhoneme(symbol: string): (PhonicWord & { unitId: string })[] {
  return allWords().filter((w) => w.phonemes.includes(symbol));
}
