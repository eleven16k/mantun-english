"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getWeaknesses, deleteWeakness, getDistractorPools, type WeaknessItem } from "@/lib/api";
import type { Weakness } from "@/lib/types";
import { AlertIcon } from "@/components/SvgIcons";
import { getWordById, getDistractors, makeQuestion } from "@/lib/vocab";
import { allWords } from "@/content/phonics/data";
import { useGameStore } from "@/lib/store";
import { CheckIcon, BookOpenIcon, SwordsIcon} from "@/components/icons";
import { askTutor } from "@/lib/deeptutor";
import { Md } from "@/components/Markdown";
import { useI18n } from "@/lib/i18n";

/**
 * /weakness — the weakness book (C4).
 * Shows knowledge points with wrongCount ≥ 2, sorted by most wrong.
 * "Drill 10" starts a targeted practice session (+20 SP per conquered item).
 */
export default function WeaknessPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [list, setList] = useState<WeaknessItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // AI mastery report (DeepTutor chat): diagnose the weakness book
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const { locale } = useI18n();

  const runReport = async () => {
    if (reportLoading) return;
    setReportOpen(true);
    setReportLoading(true);
    setReportText("");
    const zh = locale === "zh";
    const lines = list.slice(0, 20).map((w) => `- ${w.last_prompt}（错 ${w.wrong_count} 次，连对 ${w.correct_streak}/2）`).join("\n");
    const message = zh
      ? `以下是我的英语学习弱点清单（错 2 次以上未攻克）：\n${lines}\n\n请生成一份掌握度诊断报告：1) 按薄弱程度分组（高危/需巩固/接近攻克）；2) 指出错误集中在哪类知识点（词性/题型）；3) 给出未来 7 天的针对性攻克顺序建议。语言简洁，适合中学生。`
      : `Here is my English-learning weakness list (2+ wrong, unconquered):\n${lines}\n\nProduce a mastery diagnostic report: 1) group items by severity (critical / consolidate / nearly conquered); 2) identify which knowledge areas the errors cluster in; 3) suggest a 7-day conquest order. Keep it concise for a middle-schooler.`;
    const result = await askTutor(message, {
      language: zh ? "zh" : "en",
      onChunk: (chunk) => setReportText((prev) => prev + chunk),
    }).catch(() => null);
    setReportLoading(false);
    if (!result && !reportText) setReportText(t("quiz.aiOffline"));
  };

  useEffect(() => {
    getWeaknesses()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => { setMounted(true); setLoading(false); });
  }, []);

  const total = list.length;

  // 阶段3（方案 P0-2）：钻取/Boss 战的干扰项优先用该生的历史错选——
  // 复习题直接探测真实混淆方向。池子拉取失败 → 静默回退普通干扰项。
  // 全量接入：拼读弱词（phonics:）钻「看音标选拼写」（音素混淆的正解训练）；
  // 阅读/句法题（story:/sent:）是题级锚点、客户端无法重建题目 → 不进钻取（展示保留）。
  const startDrill = async () => {
    const drillable = list.filter((w) => /^w\d+$/.test(w.word_id) || w.word_id.startsWith("phonics:"));
    const top = drillable.slice(0, 10);
    const pools = await getDistractorPools(top.map((w) => w.word_id)).catch(() => ({}) as Record<string, string[]>);
    const phonicPool = allWords();
    const qs = top.map((w, i) => {
      const word = getWordById(w.word_id);
      if (word) {
        return {
          id: `weak-${i}`,
          wordId: w.word_id,
          type: "word-to-cn" as const,
          prompt: word.en,
          choices: [word.cn, ...getDistractors(word.cn, word.difficulty, pools[w.word_id] ?? [])],
          correctIndex: 0,
          explanation: `${word.en} = ${word.cn}`,
        };
      }
      // 拼读弱词：看音标选拼写（同长度/同单元词做干扰，无需中文释义）
      const target = phonicPool.find((p) => w.word_id.endsWith(`:${p.text}`));
      if (target) {
        const distractors = phonicPool
          .filter((p) => p.text !== target.text && p.text.length === target.text.length)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        const fallback = distractors.length < 3
          ? phonicPool.filter((p) => p.text !== target.text && !distractors.includes(p)).slice(0, 3 - distractors.length)
          : [];
        const choices = [target.text, ...distractors.map((d) => d.text), ...fallback.map((f) => f.text)]
          .sort(() => Math.random() - 0.5);
        return {
          id: `weak-${i}`,
          wordId: w.word_id,
          type: "cn-to-word" as const,
          prompt: target.ipa,
          promptSub: "拼读复习 · 选出对应拼写",
          choices,
          correctIndex: choices.indexOf(target.text),
          explanation: `${target.text} ${target.ipa}`,
        };
      }
      return null;
    }).filter((q): q is NonNullable<typeof q> => q !== null);
    if (!qs.length) return;
    sessionStorage.setItem("lexi-import-quiz", JSON.stringify({ deckTitle: t("weak.drillTitle"), questions: qs }));
    router.push("/quiz?src=import");
  };

  const startBoss = async () => {
    // ⚔️ Boss 战：取错得最多的 w## 弱点词（Boss 需多题型，仅词汇库词支持），
    // 连对 7 题击败它（9 题容错 2 次）
    const top = [...list].filter((w) => /^w\d+$/.test(w.word_id)).sort((a, b) => b.wrong_count - a.wrong_count)[0];
    const word = top ? getWordById(top.word_id) : undefined;
    if (!word || !top) return;
    const pools = await getDistractorPools([top.word_id]).catch(() => ({}) as Record<string, string[]>);
    const hints = pools[top.word_id] ?? [];
    const types = ["word-to-cn", "cn-to-word", "fill-blank", "listening"] as const;
    const qs = Array.from({ length: 9 }, (_, i) => makeQuestion(word, i, types[i % 4], hints));
    useGameStore.setState({
      bossBattle: { wordId: top.word_id, word: word.en, hp: 7, maxHp: 7, total: 7, defeated: false },
    });
    sessionStorage.setItem("lexi-import-quiz", JSON.stringify({
      deckTitle: `BOSS · ${word.en}`,
      questions: qs,
      boss: { wordId: top.word_id, word: word.en, hp: 7, maxHp: 7 },
    }));
    router.push("/quiz?src=import");
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="WEAKNESS BOOK" title={t("weak.title")} />

        {total === 0 ? (
          /* Empty state */
          <div className="g-card-hero p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-positive/10">
              <CheckIcon size={32} className="text-positive" />
            </span>
            <p className="mt-4 font-booster text-lg font-extrabold text-primary">{t("weak.allClear")}</p>
            <p className="mt-1 text-sm text-tertiary">
              {t("weak.emptyHint")}
            </p>
            <button
              onClick={() => router.push("/quiz")}
              className="mt-4 rounded-pill bg-action px-5 py-2.5 text-sm font-bold text-white transition hover:bg-actionhover"
            >
              {t("weak.startPractice")}
            </button>
          </div>
        ) : (
          <>
            {/* Summary card */}
            <div className="g-card mb-4 flex items-center justify-between p-5">
              <div>
                <p className="font-booster text-2xl font-extrabold text-primary">{total}</p>
                <p className="text-xs text-tertiary">{t("weak.toConquer")}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-tertiary">{t("weak.conquerRule")}</span>
                <div className="flex gap-2">
                  <button
                    onClick={runReport}
                    className="rounded-pill border border-subtle px-4 py-2.5 text-sm font-bold text-brand-text transition hover:border-brandborder"
                  >
                    {t("weak.aiReport")}
                  </button>
                  <button
                    onClick={() => void startDrill()}
                  className="rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  {t("weak.drillPrefix")}{Math.min(10, total)}{t("weak.drillSuffix")}
                </button>
                  <button
                    onClick={() => void startBoss()}
                    className="game-btn bg-critical px-5 py-2.5 text-sm text-white"
                  >
                  <SwordsIcon size={14} className="inline" /> {t("weak.boss")}
                </button>
                </div>
              </div>
            </div>

            {/* AI mastery report (streamed) */}
            {reportOpen && (
              <div className="g-card mt-4 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("weak.reportTitle")}</p>
                  <button onClick={() => setReportOpen(false)} className="text-xs font-bold text-tertiary transition hover:text-secondary">
                    {t("deck.cancel")}
                  </button>
                </div>
                {reportLoading && !reportText && (
                  <p className="text-xs font-bold text-brand-text">{t("quiz.aiThinking")}</p>
                )}
                {reportText && (
                  <Md className="max-h-[50vh] overflow-y-auto text-sm leading-relaxed text-secondary">{reportText}</Md>
                )}
              </div>
            )}

            {/* 错因分组（阶段2：判断层诊断回写；未诊断的词留在最后一组攒证据） */}
            <div className="flex flex-col gap-4">
              {(() => {
                const zh = locale === "zh";
                const groupKey = (w: WeaknessItem) =>
                  (zh ? w.misconception_label_zh : w.misconception_label_en) ?? (zh ? "待诊断" : "Undiagnosed");
                const groups = new Map<string, WeaknessItem[]>();
                for (const w of list) {
                  const k = groupKey(w);
                  groups.set(k, [...(groups.get(k) ?? []), w]);
                }
                const ordered = [...groups.entries()].sort(([ka, a], [kb, b]) => {
                  if (ka === (zh ? "待诊断" : "Undiagnosed")) return 1;
                  if (kb === (zh ? "待诊断" : "Undiagnosed")) return -1;
                  return b.reduce((s, w) => s + w.wrong_count, 0) - a.reduce((s, w) => s + w.wrong_count, 0);
                });
                return ordered.map(([label, items]) => (
                  <div key={label}>
                    <p className="mb-2 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wide text-tertiary">
                      <span className={label === (zh ? "待诊断" : "Undiagnosed") ? "" : "text-brand-text"}>{label}</span>
                      <span className="rounded-pill bg-canvas px-2 py-0.5 text-[10px]">{items.length}</span>
                    </p>
                    <div className="flex flex-col gap-2">
                      {items.map((w) => (
                        <div key={w.word_id} className="g-card flex items-center gap-3 p-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-critical/10">
                            <AlertIcon size={20} className="text-critical" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-primary">{w.last_prompt}</p>
                            <p className="text-xs text-tertiary">
                              {t("weak.wrongPrefix")}{w.wrong_count}{t("weak.wrongStreakMid")}{w.correct_streak}/2
                            </p>
                          </div>
                          {/* Progress to removal */}
                          <div className="flex gap-1">
                            {[0, 1].map((i) => (
                              <span
                                key={i}
                                className={`h-2 w-6 rounded-pill ${w.correct_streak > i ? "bg-positive" : "bg-canvas"}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
