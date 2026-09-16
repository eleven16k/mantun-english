/**
 * lib/autoPhoneme.ts — 字母组合→音素自动拆解（DP 对齐）。
 * 算法移植自 word-website-builder skill 的 scripts/auto_phoneme.py：
 * IPA 音标 token 化（归一 ɡ→g、ʧ→tʃ，贪婪匹配双元音/长元音）后，
 * 用代价模型把字母序列对齐到音素序列：
 *   单字母：同形 0.0 / 同类异形 0.8 / 异类 2.0
 *   常见组合（COMBO_OK 白名单）0.35，否则 4.0
 *   静音字母 2.5（高惩罚防吞真辅音）
 *   一字母多音素复合 x→ks、u→juː、q→kw：0.5
 * 段长 1–3 字母，音素串长 1–2。
 */

// ---------- IPA 音素表（兼容 espeak-ng 与 eng_to_ipa 两套符号）----------
const VOWELS = new Set([
  "i", "ɪ", "e", "ɛ", "æ", "ʌ", "ə", "ʊ", "ɒ", "iː", "uː", "ɑː", "ɔː", "ɜː",
  "a", "o", "ɐ", "ɚ", "u", "ɑ", "ɔ", "ər",
]);
const DIPH = new Set(["eɪ", "aɪ", "aʊ", "ɔɪ", "əʊ", "ɪə", "eə", "ʊə", "oʊ", "iə"]);
const CONS = new Set([
  "p", "b", "t", "d", "k", "g", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "h",
  "tʃ", "dʒ", "m", "n", "ŋ", "r", "l", "j", "w", "x",
]);

// ---------- 常见字母组合 ----------
const COMMON = new Set([
  "th", "sh", "ch", "ph", "gh", "ng", "qu", "ck", "tch", "dge", "wh", "wr",
  "kn", "gn", "mb", "igh", "eigh", "ought", "aught",
  "oo", "ee", "ea", "ou", "ow", "oa", "oi", "oy", "ai", "ay", "ei", "ey",
  "ie", "ue", "io", "ia", "au", "aw", "ew", "eu", "ui", "oe",
  "ar", "er", "ir", "or", "ur", "ear", "air", "are", "ire", "ore", "ure",
  "ough",
  "bb", "cc", "dd", "ff", "gg", "kk", "ll", "mm", "nn", "pp", "rr", "ss", "tt", "zz", "vv",
]);

// 常见组合 -> 合理音素集（校验组合发音）
const COMBO_OK: Record<string, Set<string>> = Object.entries({
  th: ["θ", "ð"], sh: ["ʃ"], ch: ["tʃ", "k", "ʃ"], ph: ["f"], gh: ["f", ""],
  ng: ["ŋ"], wh: ["w", "h"], wr: ["r"], kn: ["n"], gn: ["n", "g"], mb: ["m"],
  qu: ["kw"], ck: ["k"], tch: ["tʃ"], dge: ["dʒ"],
  bb: ["b"], cc: ["k", "s"], dd: ["d"], ff: ["f"], gg: ["g", "dʒ"],
  ll: ["l"], mm: ["m"], nn: ["n"], pp: ["p"], rr: ["r"],
  ss: ["s"], tt: ["t"], zz: ["z"], vv: ["v"], kk: ["k"],
  oo: ["uː", "ʊ", "ʌ"], ee: ["iː"], ea: ["iː", "e", "ɪə", "eɪ"], ie: ["iː", "aɪ", "ɪ", "e"],
  ou: ["aʊ", "ʌ", "uː", "ə", "ɔː", "oʊ", "əʊ"], ow: ["aʊ", "əʊ", "oʊ"], oa: ["əʊ", "ɔː", "oʊ"],
  oi: ["ɔɪ"], oy: ["ɔɪ"], ai: ["eɪ", "e", "ɪ"], ay: ["eɪ"], ey: ["eɪ", "iː"],
  ei: ["eɪ", "iː", "aɪ"], eu: ["juː"], ew: ["juː", "uː"], ue: ["uː", "juː"],
  ui: ["uː", "ɪ", "uɪ"], io: ["aɪə", "əʊ", "ɪə", "iə"], ia: ["aɪə", "ɪə", "ə"], oe: ["əʊ", "uː", "oʊ"],
  au: ["ɔː", "ɒ", "ɑː"], aw: ["ɔː"], igh: ["aɪ"], eigh: ["eɪ"],
  ar: ["ɑː", "ə", "ɔː"], er: ["ɜː", "ə", "ɑː", "ɛə", "ɪə", "ər"], ir: ["ɜː", "ɪə"],
  ur: ["ɜː", "ʊə"], or: ["ɔː", "ə", "ɜː", "ər"], ear: ["ɪə", "eə", "ɜː"],
  air: ["eə"], are: ["eə", "ɑː"], ire: ["aɪə"], ore: ["ɔː"], ure: ["ʊə", "jʊə"],
  ought: ["ɔː"], aught: ["ɔː"], ous: ["əs", "ə"],
}).reduce((m, [k, v]) => ((m[k] = new Set(v)), m), {} as Record<string, Set<string>>);

const SILENT_COST = 2.5;

// 一字母多音素复合：段 -> 合法音素串
const COMP: Record<string, Set<string>> = {
  x: new Set(["ks", "gz", "kʃ"]),
  u: new Set(["juː", "ju", "jʊ"]),
  q: new Set(["kw"]),
};

export interface PhonemeUnit {
  /** 字母段（保留原大小写） */
  t: string;
  /** 对应音素（silent 为 ""） */
  p: string;
  type: "vowel" | "consonant";
  /** 重音标记 ˈ/ˌ */
  s: string;
  silent?: boolean;
}

function isVowelPh(ph: string): boolean {
  // ju/jʊ/juː（u 的 y 化复合）音节核心是元音
  return VOWELS.has(ph) || DIPH.has(ph) || ph === "juː" || ph === "ju" || ph === "jʊ";
}

/** IPA 串 → 音素 token（含重音标记；跳过分隔符） */
export function ipaTokenize(ipa: string): { ph: string; st: string }[] {
  const s = ipa
    .replace(/ɡ/g, "g")
    .replace(/ɛ/g, "e")
    .replace(/ɹ/g, "r")
    .replace(/ɐ/g, "ə")
    .replace(/ʳ/g, "r")
    .replace(/ʧ/g, "tʃ")
    .replace(/ʤ/g, "dʒ")
    .trim()
    .replace(/^\/+|\/+$/g, "");
  const toks: { ph: string; st: string }[] = [];
  let i = 0;
  let stress = "";
  while (i < s.length) {
    const ch = s[i];
    if (ch === "ˈ" || ch === "ˌ") {
      stress = ch;
      i += 1;
      continue;
    }
    if (/[ .()]/.test(ch)) {
      i += 1;
      continue;
    }
    // 贪婪匹配：双字符（双元音/长元音/塞擦音）优先
    let matched: string | null = null;
    for (const ln of [2, 1]) {
      const cand = s.slice(i, i + ln);
      if (DIPH.has(cand) || VOWELS.has(cand) || CONS.has(cand)) {
        matched = cand;
        break;
      }
    }
    if (!matched) {
      i += 1;
      continue;
    }
    toks.push({ ph: matched, st: stress });
    stress = "";
    i += matched.length;
  }
  return toks;
}

function segCost(seg: string, ph: string): number {
  if (seg.length === 1) {
    const ch = seg;
    const vCh = "aeiouy".includes(ch);
    const phV = isVowelPh(ph);
    if (ch === ph) return 0.0; // 同形
    if (vCh === phV) return 0.8; // 同类型异形
    return 2.0; // 类型不一致
  }
  if (COMBO_OK[seg]) return COMBO_OK[seg].has(ph) ? 0.35 : 4.0;
  return 3.0; // 不常见组合
}

function segCost2(seg: string, ph2: string, l: number): number {
  if (l === 1) return segCost(seg, ph2);
  if (seg.length === 1 && COMP[seg]?.has(ph2)) return 0.5;
  return 5.0;
}

/** 字母序列 ↔ 音素序列 DP 对齐 */
export function alignWord(word: string, ipa: string): PhonemeUnit[] {
  const letters = [...word].filter((c) => /[a-zA-Z]/.test(c));
  const toks = ipaTokenize(ipa);
  const phs = toks.map((t) => t.ph);
  const sts = toks.map((t) => t.st);
  const m = letters.length;
  const n = phs.length;
  const INF = 1e9;
  type Back = { kind: "sil"; i: number } | { kind: "seg"; i: number; k: number; j: number; l: number };
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(INF));
  const back: (Back | null)[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  dp[0][0] = 0;
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (dp[i][j] >= INF) continue;
      // 1) silent：跳过 1 字母（不对应音素）
      if (i < m && dp[i + 1][j] > dp[i][j] + SILENT_COST) {
        dp[i + 1][j] = dp[i][j] + SILENT_COST;
        back[i + 1][j] = { kind: "sil", i };
      }
      // 2) 段 letters[i:i+k] -> phs[j:j+l]（l=1 或 2，支持 x→ks 复合）
      if (j < n) {
        for (let k = 1; k <= 3; k++) {
          for (let l = 1; l <= 2; l++) {
            if (i + k <= m && j + l <= n) {
              const seg = letters.slice(i, i + k).join("").toLowerCase();
              const ph2 = phs.slice(j, j + l).join("");
              const c = segCost2(seg, ph2, l);
              if (dp[i + k][j + l] > dp[i][j] + c) {
                dp[i + k][j + l] = dp[i][j] + c;
                back[i + k][j + l] = { kind: "seg", i, k, j, l };
              }
            }
          }
        }
      }
    }
  }
  // 回溯
  const units: PhonemeUnit[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    const b = back[i][j];
    if (!b) break;
    if (b.kind === "sil") {
      units.push({ t: letters[i - 1], p: "", type: "consonant", s: "", silent: true });
      i -= 1;
    } else {
      const seg = letters.slice(b.i, b.i + b.k).join("");
      const ph = phs.slice(b.j, b.j + b.l).join("");
      units.push({ t: seg, p: ph, type: isVowelPh(ph) ? "vowel" : "consonant", s: sts[b.j] });
      i -= b.k;
      j -= b.l;
    }
  }
  units.reverse();
  return units;
}

/** 自动拆解一个词：word + IPA（可带斜杠/重音符）→ 字母组合→音素 units */
export function autoPhonemeUnits(word: string, ipa: string): PhonemeUnit[] {
  try {
    const units = alignWord(word.trim(), ipa);
    // 音素串为空或字母没对齐完 → 视为失败
    const covered = units.reduce((n, u) => n + u.t.replace(/[^a-zA-Z]/g, "").length, 0);
    const alpha = word.replace(/[^a-zA-Z]/g, "").length;
    if (!units.length || units.some((u) => !u.silent && !u.p) || covered !== alpha) return [];
    return units;
  } catch {
    return [];
  }
}
