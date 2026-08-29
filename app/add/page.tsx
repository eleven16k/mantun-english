"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { getDistractors } from "@/lib/vocab";
import { useI18n } from "@/lib/i18n";
import type { Question } from "@/lib/types";

/**
 * /add — card editor: front (English) / back (Chinese).
 * Saving appends a choice question to the "My cards" user deck
 * (created on first save), then returns to My decks.
 */

export default function AddPage() {
  const router = useRouter();
  const { t } = useI18n();
  const addCardToDeck = useGameStore((s) => s.addCardToDeck);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const en = front.trim();
    const cn = back.trim();
    if (!en || !cn) return;

    // Build a word-to-cn question: correct answer + 3 distractors, shuffled
    const choices = [cn, ...getDistractors(cn, 2)].sort(() => Math.random() - 0.5);
    const card: Question = {
      id: `card-${Date.now()}`,
      wordId: `card-${Date.now()}`,
      type: "word-to-cn",
      prompt: en,
      choices,
      correctIndex: choices.indexOf(cn),
      explanation: `${en} — ${cn}`,
    };
    addCardToDeck(t("add.myDeck"), card);
    setSaved(true);
    setTimeout(() => router.push("/decks"), 600);
  };

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[768px] flex-col px-6 pt-6">
      {/* header */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm font-medium text-tertiary transition hover:text-secondary"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("add.back")}
        </button>
        <button
          onClick={save}
          disabled={!front.trim() || !back.trim() || saved}
          className="flex items-center gap-1.5 rounded-pill bg-action px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover disabled:opacity-40"
        >
          {saved ? `✓ ${t("add.saved")}` : t("add.save")}
        </button>
      </div>

      {/* editor — front (English) / back (Chinese) */}
      <div className="flex flex-1 flex-col gap-4">
        <input
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder={t("add.frontPlaceholder")}
          className="w-full rounded-2xl border border-subtle bg-surface px-5 py-4 text-[20px] text-primary outline-none transition placeholder:text-tertiary focus:border-brandborder"
        />
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder={t("add.backPlaceholder")}
          rows={8}
          className="w-full flex-1 resize-none rounded-2xl border border-subtle bg-surface px-5 py-4 text-[16px] leading-relaxed text-primary outline-none transition placeholder:text-tertiary focus:border-brandborder"
        />
        <p className="pb-6 text-xs text-tertiary">{t("add.saveHint")}</p>
      </div>
    </div>
  );
}
