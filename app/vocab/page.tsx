"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { VOCAB, getDistractors } from "@/lib/vocab";
import type { Question } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

/**
 * /vocab — B3: Textbook vocabulary browser.
 * Browse by difficulty tier (中考高频/拓展/基础), start quiz from any tier.
 */

const TIERS = [
  { id: 1, labelKey: "vocab.tierBasic", descKey: "vocab.tierBasicDesc", color: "#16a34a" },
  { id: 2, labelKey: "vocab.tierExam", descKey: "vocab.tierExamDesc", color: "#2563eb" },
  { id: 3, labelKey: "vocab.tierAdvanced", descKey: "vocab.tierAdvancedDesc", color: "#7c3aed" },
] as const;

export default function VocabPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const tierWords = selectedTier ? VOCAB.filter(v => v.difficulty === selectedTier) : [];

  const startTierQuiz = () => {
    if (!selectedTier || tierWords.length === 0) return;
    const picked = [...tierWords].sort(() => Math.random() - 0.5).slice(0, 10);
    const questions: Question[] = picked.map((word, i) => {
      const distractors = getDistractors(word.cn, word.difficulty).slice(0, 3);
      const choices = [word.cn, ...distractors].sort(() => Math.random() - 0.5);
      return {
        id: `vocab-${word.id}-${i}`,
        wordId: word.id,
        type: "word-to-cn" as const,
        prompt: word.en,
        promptSub: word.phonetic,
        choices,
        correctIndex: choices.indexOf(word.cn),
        explanation: `${word.en} = ${word.cn}\n${word.example}`,
      };
    });
    const tierLabelKey = TIERS.find(x => x.id === selectedTier)?.labelKey;
    sessionStorage.setItem("lexi-import-quiz", JSON.stringify({
      deckTitle: `${tierLabelKey ? t(tierLabelKey) : ""}${t("vocab.wordsSuffix")}`,
      questions,
    }));
    router.push("/quiz?src=import");
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="📚 VOCAB" title={t("vocab.title")} />

        {/* Tier cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {TIERS.map(tier => {
            const count = VOCAB.filter(v => v.difficulty === tier.id).length;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id === selectedTier ? null : tier.id)}
                className={`g-card flex flex-col gap-2 p-5 text-left transition ${
                  selectedTier === tier.id ? "!border-[var(--ink)]" : ""
                }`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl text-white" style={{ background: tier.color }}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                </span>
                <p className="font-booster text-sm font-extrabold text-primary">{t(tier.labelKey)}</p>
                <p className="text-xs text-tertiary">{t(tier.descKey)}</p>
                <p className="text-xs font-bold text-secondary">{count} {t("vocab.words")}</p>
              </button>
            );
          })}
        </div>

        {/* Word list for selected tier */}
        {selectedTier && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-sm font-bold text-primary">
                {t(TIERS.find(x => x.id === selectedTier)?.labelKey ?? "vocab.tierBasic")} · {tierWords.length} {t("vocab.words")}
              </h2>
              <button
                onClick={startTierQuiz}
                className="rounded-pill bg-brand px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
              >
                {t("vocab.quizTier")}
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {tierWords.map(word => (
                <div key={word.id} className="g-card flex items-center gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-booster text-sm font-extrabold text-primary">{word.en}</span>
                      <span className="text-xs text-tertiary">{word.phonetic}</span>
                      <span className="text-[10px] font-bold uppercase text-tertiary">{word.type}</span>
                    </div>
                    <p className="text-sm text-secondary">{word.cn}</p>
                    <p className="truncate text-xs italic text-tertiary">{word.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
