"use client";

/**
 * D1 错题讲解员（V8 用户故事集 D1，平台化）：答错后的「让豚豚讲讲」。
 * ≤3 句讲解（更地道的说法 / 中文错因 / 下次怎么办），服务端幂等缓存。
 * 放在 QuizScreen 的答错反馈框里；任何题型只要 wordId 有作答记录就能讲。
 */
import { useState } from "react";
import { PigIcon, SparklesIcon } from "@/components/icons";

import { fetchWeaknessExplain, type WeaknessExplain } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export function ExplainSheet({ wordId }: { wordId: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [explain, setExplain] = useState<WeaknessExplain | null>(null);

  const load = async () => {
    if (loading) return;
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      setExplain(await fetchWeaknessExplain(wordId));
    } catch {
      setError(t("explain.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {!open ? (
        <button onClick={load} className="flex items-center gap-1 text-xs font-bold text-brand-text transition hover:opacity-80">
          <PigIcon size={15} className="inline" /> {t("explain.button")}
        </button>
      ) : (
        <div className="rounded-xl bg-surface p-3">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-tertiary inline-flex items-center gap-1"><PigIcon size={13} /> {t("explain.title")}</p>
          {loading && <p className="text-xs font-bold text-brand-text">{t("explain.loading")}</p>}
          {error && <p className="text-xs text-critical">{error}</p>}
          {explain && (
            <div className="space-y-1.5 text-xs leading-relaxed text-secondary">
              {explain.better && (
                <p>
                  <span className="font-bold text-positive">{t("explain.better")}：</span>
                  <span className="font-medium">{explain.better}</span>
                </p>
              )}
              {explain.why && (
                <p>
                  <span className="font-bold text-brand-text">{t("explain.why")}：</span>
                  {explain.why}
                </p>
              )}
              {explain.tip && (
                <p className="rounded-lg bg-brand-subtle/60 px-2 py-1 text-brand-text">
                  <SparklesIcon size={13} className="inline" /> {explain.tip}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
