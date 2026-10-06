"use client";

/**
 * lib/phonics.ts — 拼读馆的客户端内核。
 *
 * - 语音：speechSynthesis TTS（整词正常速 / 慢速拆读）；`audioPath` 静态
 *   录音存在时优先播 mp3（预留管线，见 content/phonics/data.ts 注释）。
 * - 进度：localStorage（`lexi-phonics-v1`），结构对齐 phonicsword 已验证的
 *   断点续练（{wordIdx, results[]}）；接 lexi-api phonics_progress 表后
 *   只需替换这一个模块的读写。
 * - 经济：答题走既有 `POST /api/economy`（submitAnswer），wordId 形如
 *   `phonics:l1-u1:cat` —— 金币/提分值/红心/弱点本/周榜 SP 全部复用。
 * - 出题：拼词乱序 + 听音辨词干扰项（同单元优先 → 同音标 → 随机），
 *   供单元小测与 /battle 拼读快答共用。
 */

import { allWords, findUnit, PHONEMES, PHONICS_LEVELS, type PhonicWord } from "@/content/phonics/data";
import { autoPhonemeUnits } from "./autoPhoneme";
import { BASE_PATH } from "./config";

// ─── 语音 ───

let unlocked = false;

/** iOS/Safari 要求首次用户手势后才能出声——在「开始」按钮里调用一次 */
export function unlockAudio() {
  if (unlocked) return;
  unlocked = true;
  try {
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis?.speak(u);
  } catch {
    /* noop */
  }
  // 静态 mp3 <audio> 的手势解锁（音量 0 空放一次）
  try {
    const a = new Audio(wordAudioUrl("cat"));
    a.volume = 0;
    void a.play().then(() => a.pause()).catch(() => {});
  } catch {
    /* noop */
  }
}

export function ttsAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let currentAudio: HTMLAudioElement | null = null;

export function stopSpeech() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* noop */
  }
  try {
    currentAudio?.pause();
  } catch {
    /* noop */
  }
}

// ─── 静态音频（scripts/gen_phonics_audio.py 预生成的神经 TTS mp3）───

const missingAudio = new Set<string>();

function wordAudioUrl(text: string, slow = false): string {
  return `${BASE_PATH}/audio/phonics/words/${text.toLowerCase()}${slow ? "-slow" : ""}.mp3`;
}

/** 音标纯音（TTS 近似音预生成；真人录音落同路径自动生效） */
function phonemeAudioUrl(slug: string, slow = false): string {
  return `${BASE_PATH}/audio/phonics/phonemes/${slug}${slow ? "-slow" : ""}.mp3`;
}

/**
 * 播音标纯音：优先预生成 mp3（缺文件/播放失败 → 例词 TTS 兜底）。
 * pure=true 时失败直接静默返回（调用方通常接着播例词）。
 */
export async function playPhoneme(slug: string, exampleWord: string, pure = false): Promise<void> {
  if (await playMp3(phonemeAudioUrl(slug))) return;
  if (pure) return;
  await speakWord(exampleWord, 0.6);
}

/** 播静态 mp3（rate>1 走原生 playbackRate）；返回是否真正播出（文件缺失/播放失败 → false，走 TTS 兜底） */
export function playMp3(src: string, rate = 1): Promise<boolean> {
  return new Promise((resolve) => {
    if (missingAudio.has(src)) {
      resolve(false);
      return;
    }
    const a = new Audio(src);
    if (rate !== 1) a.playbackRate = rate;
    currentAudio = a;
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (!ok) missingAudio.add(src);
      resolve(ok);
    };
    const guard = setTimeout(() => finish(true), 10000); // 防挂起兜底
    a.onended = () => {
      clearTimeout(guard);
      finish(true);
    };
    a.onerror = () => {
      clearTimeout(guard);
      finish(false);
    };
    a.play().catch(() => {
      clearTimeout(guard);
      finish(false);
    });
  });
}

// ─── TTS 兜底（声音白名单：设备默认音色不可控，按优先级挑优质英文嗓）───

let cachedVoice: SpeechSynthesisVoice | null = null;
const VOICE_PREF = [
  "Google US English",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Jenny Online (Natural) - English (United States)",
  "Samantha",
  "Aria",
  "Alex",
  "Karen",
];

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  const vs = window.speechSynthesis?.getVoices?.() ?? [];
  if (!vs.length) return null;
  for (const name of VOICE_PREF) {
    const hit = vs.find((v) => v.name === name);
    if (hit) {
      cachedVoice = hit;
      return hit;
    }
  }
  const en = vs.filter((v) => v.lang.toLowerCase().startsWith("en"));
  cachedVoice = en[0] ?? vs[0];
  return cachedVoice;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  // 嗓音列表在部分浏览器异步加载，就绪后重挑一次
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}

/** TTS 播报（无预生成音频的内容用：整句/短语），嗓音白名单 + 超时兜底 */
export function speakText(text: string, rate = 1): Promise<void> {
  return (async () => {
    if (!ttsAvailable()) {
      await new Promise((r) => setTimeout(r, 350));
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    const v = pickVoice();
    if (v) u.voice = v;
    await new Promise<void>((resolve) => {
      const guard = setTimeout(resolve, Math.max(1800, text.length * 320));
      u.onend = () => {
        clearTimeout(guard);
        resolve();
      };
      u.onerror = () => {
        clearTimeout(guard);
        resolve();
      };
      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch {
        clearTimeout(guard);
        resolve();
      }
    });
  })();
}

/** 播词：优先预生成 mp3（slow 语速用 -slow 文件，不失真），缺失时 TTS 兜底 */
export function speakWord(text: string, rate = 1): Promise<void> {
  const slow = rate < 1;
  return (async () => {
    if (await playMp3(wordAudioUrl(text, slow))) return;
    await speakText(text, rate);
  })();
}

/** 慢速拆读：播放慢速词并按音标数均分高亮节奏，onChip(i) 逐个点亮 */
export async function speakWordSegmented(
  word: PhonicWord,
  onChip: (index: number) => void,
): Promise<void> {
  const playing = speakWord(word.text, 0.55);
  const n = word.phonemes.length;
  for (let i = 0; i < n; i++) {
    onChip(i);
    await new Promise((r) => setTimeout(r, 420));
  }
  await playing;
}

// ─── 音素符号 → 真人录音 slug（assets 落在 public/audio/phonics/phonemes/）───

const PHONEME_SLUG: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const p of PHONEMES) m[p.symbol.replace(/\//g, "").replace(/ɡ/g, "g")] = p.slug;
  // eng_to_ipa / espeak 别名形态
  Object.assign(m, { "ɑ": "ar", "ɔ": "or", "u": "oo", "ər": "er", "oʊ": "oh", "iə": "eer" });
  return m;
})();

export function phonemeSlug(sym: string): string | null {
  return PHONEME_SLUG[sym.replace(/\//g, "").replace(/ɡ/g, "g")] ?? null;
}

/**
 * 拆音领读（真人音素版，机制对齐 word-website-builder skill）：
 * 自动拆解出字母组合→音素 units，逐个播放真人音素录音并 onUnit(i) 点亮
 * 对应字母块，最后慢速整词。无拆解/全部缺录音时回退均分节奏版。
 */
export async function speakWordUnits(
  word: PhonicWord,
  onUnit: (index: number) => void,
): Promise<void> {
  const units = autoPhonemeUnits(word.text, word.ipa);
  const voiced = units
    .map((u, i) => ({ u, i }))
    .filter(({ u }) => !u.silent && phonemeSlug(u.p));
  if (!voiced.length) return speakWordSegmented(word, onUnit);
  for (const { i } of voiced) {
    onUnit(i);
    const slug = phonemeSlug(units[i].p)!;
    if (!(await playMp3(phonemeAudioUrl(slug)))) {
      // 单个录音缺失：该音素用例词 TTS 兜底
      const meta = PHONEMES.find((p) => p.slug === slug);
      await speakWord(meta?.exampleWord ?? word.text, 0.6);
    }
    await new Promise((r) => setTimeout(r, 140));
  }
  await speakWord(word.text, 0.55);
}

// ─── 例词发音位标注（图鉴瓦片/详情页：grapheme 下划线）───

export interface WordPart {
  text: string;
  ul: boolean; // 该片段是否为发音部位（下划线）
}

/**
 * 把例词拆成「普通 / 发音位」片段。支持分离式拼法（a_e → 同时标 a 与 e）；
 * grapheme 找不到时优雅降级为整词无标注。
 */
export function underlineParts(word: string, grapheme: string): WordPart[] {
  const w = word.toLowerCase();
  const g = grapheme.toLowerCase();
  const parts: WordPart[] = [];

  if (g.includes("_")) {
    // 分离式（magic-e）：第一段 = "_", 第二段 = "_"
    const [first, second] = g.split("_").filter(Boolean);
    const i1 = first ? w.indexOf(first) : -1;
    if (i1 < 0) return [{ text: word, ul: false }];
    const rest = w.slice(i1 + first.length);
    const i2rel = second ? rest.indexOf(second) : -1;
    if (i2rel < 0) return [{ text: word, ul: false }];
    const i2 = i1 + first.length + i2rel;
    pushRange(parts, w, [[i1, first.length], [i2, second.length]]);
    return parts;
  }

  const i = w.indexOf(g);
  if (i < 0 || !g) return [{ text: word, ul: false }];
  pushRange(parts, w, [[i, g.length]]);
  return parts;
}

function pushRange(parts: WordPart[], w: string, ranges: [number, number][]) {
  ranges.sort((a, b) => a[0] - b[0]);
  let cursor = 0;
  for (const [start, len] of ranges) {
    if (start > cursor) parts.push({ text: w.slice(cursor, start), ul: false });
    parts.push({ text: w.slice(start, start + len), ul: true });
    cursor = start + len;
  }
  if (cursor < w.length) parts.push({ text: w.slice(cursor), ul: false });
}

// ─── 进度（localStorage，结构即未来 lexi-api phonics_progress 的 JSON 列）──—

export type WordResult = "PASSED" | "FAILED";

export interface UnitProgress {
  results: { text: string; status: WordResult }[];
  wordIdx: number;
  clearedAt: number | null; // 首通时间
}

interface PhonicsStore {
  v: 1;
  units: Record<string, UnitProgress>;
}

const KEY = "lexi-phonics-v1";

function readStore(): PhonicsStore {
  if (typeof window === "undefined") return { v: 1, units: {} };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PhonicsStore;
      if (parsed && parsed.v === 1 && parsed.units) return parsed;
    }
  } catch {
    /* corrupted — reset */
  }
  return { v: 1, units: {} };
}

function writeStore(s: PhonicsStore) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* quota — ignore */
  }
}

export function getUnitProgress(unitId: string): UnitProgress | null {
  return readStore().units[unitId] ?? null;
}

export function saveUnitProgress(unitId: string, p: UnitProgress) {
  const s = readStore();
  s.units[unitId] = p;
  writeStore(s);
}

export function clearUnitProgress(unitId: string) {
  const s = readStore();
  delete s.units[unitId];
  writeStore(s);
}

/** 已首通单元覆盖的音标（图鉴点亮口径） */
export function masteredPhonemeSymbols(): Set<string> {
  const s = readStore();
  const out = new Set<string>();
  for (const [unitId, p] of Object.entries(s.units)) {
    if (!p.clearedAt) continue;
    const unit = findUnit(unitId)?.unit;
    if (!unit) continue;
    for (const w of unit.words) {
      if (p.results.find((r) => r.text === w.text)?.status !== "PASSED") continue;
      for (const sym of w.phonemes) out.add(sym);
    }
  }
  return out;
}

export function phonicsStats(): { cleared: number; total: number; words: number; failed: string[] } {
  const s = readStore();
  const units = Object.entries(s.units);
  const cleared = units.filter(([, p]) => p.clearedAt).length;
  const failed = new Set<string>();
  let words = 0;
  for (const p of units.map(([, v]) => v)) {
    words += p.results.length;
    for (const r of p.results) if (r.status === "FAILED") failed.add(r.text);
  }
  const liveTotal = PHONICS_LEVELS.filter((l) => l.status === "live").reduce((n, l) => n + l.units.length, 0);
  return { cleared, total: liveTotal, words, failed: [...failed] };
}

/** 错词聚合（跨单元）——复习本数据源 */
export function failedWords(): (PhonicWord & { unitId: string })[] {
  const s = readStore();
  const out: (PhonicWord & { unitId: string })[] = [];
  const seen = new Set<string>();
  for (const [unitId, p] of Object.entries(s.units)) {
    const unit = findUnit(unitId)?.unit;
    if (!unit) continue;
    for (const r of p.results) {
      if (r.status !== "FAILED" || seen.has(r.text)) continue;
      const w = unit.words.find((x) => x.text === r.text);
      if (w) {
        out.push({ ...w, unitId });
        seen.add(r.text);
      }
    }
  }
  return out;
}

// ─── 经济上报（best-effort：未登录/离线时静默本地记账）───

export interface PhonicsReward {
  coins: number;
  sp: number;
  hearts?: number;
  enteredWeakness?: boolean;
  conqueredWeakness?: boolean;
}

type SubmitFn = (
  wordId: string,
  isCorrect: boolean,
  prompt: string,
  evidence?: { questionType?: string; chosen?: string; correct?: string; timeMs?: number },
) => Promise<PhonicsReward | null>;

/** 由页面注入 lib/api 的 submitAnswer，避免循环依赖 */
let submitter: SubmitFn | null = null;
export function registerEconomySubmitter(fn: SubmitFn) {
  submitter = fn;
}

export interface PhonicsEvidence {
  questionType?: string;
  chosen?: string;
  correct?: string;
  timeMs?: number;
}

export async function reportAnswer(
  unitId: string,
  word: string,
  isCorrect: boolean,
  kind: "spell" | "listen" = "spell",
  evidence?: PhonicsEvidence,
): Promise<PhonicsReward | null> {
  if (!submitter) return null;
  try {
    return await submitter(
      `phonics:${unitId}:${word}`,
      isCorrect,
      `${kind === "spell" ? "拼词" : "听音选词"}:${word}`,
      evidence ? { questionType: `phonics_${kind}`, ...evidence } : { questionType: `phonics_${kind}`, correct: word },
    );
  } catch {
    return null;
  }
}

// ─── 题型生成 ───

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface LetterTile {
  id: number;
  ch: string;
  used: boolean;
}

/** 字母块乱序（重复字母各自独立成卡，Fisher-Yates） */
export function makeLetterTiles(text: string, graphemes?: string[]): LetterTile[] {
  // digraph 词按拼法切块（sh+i+p），无 graphemes 的 CVC 按字母拆
  const chunks = graphemes?.length ? graphemes : text.toLowerCase().split("");
  return shuffle(chunks.map((ch, id) => ({ id, ch, used: false })));
}

export interface ListenQuestion {
  word: PhonicWord;
  choices: PhonicWord[];
  correctIndex: number;
}

/** 听音辨词 4 选 1：干扰项 = 同单元词 → 全库同长度词 → 随机 */
export function makeListenQuestion(word: PhonicWord, unitWords: PhonicWord[]): ListenQuestion {
  const pool = allWords().filter((w) => w.text !== word.text);
  const distractors: PhonicWord[] = [];
  const push = (w: PhonicWord) => {
    if (distractors.length < 3 && !distractors.find((d) => d.text === w.text)) distractors.push(w);
  };
  shuffle(unitWords.filter((w) => w.text !== word.text)).forEach(push);
  shuffle(pool.filter((w) => w.text.length === word.text.length)).forEach(push);
  shuffle(pool).forEach(push);
  const choices = shuffle([word, ...distractors]);
  return { word, choices, correctIndex: choices.indexOf(word) };
}

/** 单元小测题组（默认 4 题，从单元词中抽） */
export function makeUnitQuiz(unitWords: PhonicWord[], count = 4): ListenQuestion[] {
  return shuffle(unitWords)
    .slice(0, count)
    .map((w) => makeListenQuestion(w, unitWords));
}

// ─── 单元小测（混合题型：T4 听音选词 / T5 看词选音标 / T6 辨音判断）───

const VOWEL_SYMBOLS = new Set(PHONEMES.filter((p) => p.type === "vowel").map((p) => p.symbol));

export type UnitQuizQuestion =
  | ({ kind: "listen" } & ListenQuestion)
  | {
      kind: "phoneme"; // T5 看词选音标：这个词里含有哪个音标？
      word: PhonicWord;
      choices: string[];
      correctIndex: number;
    }
  | {
      kind: "pair"; // T6 辨音判断：两个词的元音发音一样吗？
      a: PhonicWord;
      b: PhonicWord;
      same: boolean;
      word: PhonicWord; // 经济上报锚点
    };

/** T5：正确项 = 词中随机音标（优先元音），干扰项 = 同组其他音标 → 任意未含音标 */
export function makePhonemeQuestion(word: PhonicWord): { kind: "phoneme"; word: PhonicWord; choices: string[]; correctIndex: number } {
  const vowels = word.phonemes.filter((s) => VOWEL_SYMBOLS.has(s));
  const correct = (vowels.length ? vowels : word.phonemes)[Math.floor(Math.random() * (vowels.length ? vowels.length : word.phonemes.length))];
  const meta = PHONEMES.find((p) => p.symbol === correct);
  const pool = PHONEMES.filter((p) => p.symbol !== correct && !word.phonemes.includes(p.symbol));
  const sameGroup = shuffle(pool.filter((p) => meta && p.group === meta.group));
  const distractors = [...sameGroup, ...shuffle(pool)].slice(0, 3).map((p) => p.symbol);
  const choices = shuffle([correct, ...distractors]);
  return { kind: "phoneme", word, choices, correctIndex: choices.indexOf(correct) };
}

/** T6：50% 挑同元音词（答"一样"），50% 挑元音完全不同的词（答"不一样"） */
export function makePairQuestion(word: PhonicWord, unitWords: PhonicWord[]): {
  kind: "pair"; a: PhonicWord; b: PhonicWord; same: boolean; word: PhonicWord;
} {
  const vowelsOf = (w: PhonicWord) => w.phonemes.filter((s) => VOWEL_SYMBOLS.has(s));
  const others = shuffle(unitWords.filter((w) => w.text !== word.text));
  const same = Math.random() < 0.5;
  const b =
    others.find((w) => same === vowelsOf(w).some((v) => vowelsOf(word).includes(v))) ?? others[0] ?? word;
  return { kind: "pair", a: word, b, same: vowelsOf(b).some((v) => vowelsOf(word).includes(v)), word };
}

/** 混合出 4 题：2 × 听音选词 + 1 × 看词选音标 + 1 × 辨音判断 */
export function buildUnitQuiz(unitWords: PhonicWord[], count = 4): UnitQuizQuestion[] {
  const words = shuffle(unitWords);
  const listenWords = words.slice(0, Math.min(2, words.length));
  const rest = words.slice(listenWords.length);
  const out: UnitQuizQuestion[] = listenWords.map((w) => ({ kind: "listen", ...makeListenQuestion(w, unitWords) }));
  if (rest[0]) out.push(makePhonemeQuestion(rest[0]));
  if (rest[1]) out.push(makePairQuestion(rest[1], unitWords));
  return shuffle(out).slice(0, count);
}
