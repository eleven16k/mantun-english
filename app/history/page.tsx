"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getImports, deleteImport, timeLabel, type ImportItem } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /history — B2: AI import history with replay & delete.
 * Replay fetches full questions from server and starts quiz.
 */
export default function HistoryPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [records, setRecords] = useState<ImportItem[]>([]);
  const [replaying, setReplaying] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    getImports()
      .then(setRecords)
      .catch(() => setRecords([]))
      .finally(() => setMounted(true));
  }, []);

  const replay = async (r: ImportItem) => {
    if (replaying) return;
    setReplaying(r.id);
    try {
      const res = await fetch(`/api/imports?id=${r.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("lexi-token")}` },
      });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      if (data.questions?.length) {
        sessionStorage.setItem("lexi-import-quiz", JSON.stringify({
          deckTitle: data.topic ?? r.topic,
          questions: data.questions,
        }));
        router.push("/quiz?src=import");
      } else {
        router.push(`/import?replay=${r.id}`);
      }
    } catch {
      router.push(`/import?replay=${r.id}`);
    } finally {
      setReplaying(null);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary">{t("hist.title")}</h1>
          {mounted && records.length > 0 && (
            <button
              onClick={() => { deleteImport().then(() => setRecords([])); }}
              className="text-xs font-semibold text-critical transition hover:opacity-70"
            >
              {t("hist.clearAll")}
            </button>
          )}
        </div>

        {mounted && records.length === 0 ? (
          <div className="g-card-hero p-8 text-center shadow-sm">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-canvas text-3xl">📋</span>
            <p className="mt-4 font-booster text-lg font-extrabold text-primary">{t("hist.emptyTitle")}</p>
            <p className="mt-1 text-sm text-tertiary">{t("hist.emptyHint")}</p>
            <button
              onClick={() => router.push("/import")}
              className="mt-4 rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            >
              {t("hist.uploadNow")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {records.map(r => (
              <div key={r.id} className="g-card flex items-center gap-3 p-4 shadow-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-subtle text-brand-text">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                </span>
                <button onClick={() => replay(r)} className="min-w-0 flex-1 text-left transition hover:opacity-80">
                  <p className="truncate text-sm font-bold text-primary">{r.topic}</p>
                  <p className="truncate text-xs text-tertiary">
                    {r.file_name} · {r.question_count} {t("hist.questions")} · {r.question_type} · {timeLabel(r.created_at)}
                  </p>
                </button>
                <button
                  onClick={() => replay(r)}
                  className="shrink-0 rounded-pill bg-brand px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
                >
                  {t("hist.replay")}
                </button>
                <button
                  onClick={() => { deleteImport(r.id).then(() => setRecords(prev => prev.filter(x => x.id !== r.id))); }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-tertiary transition hover:bg-canvas hover:text-critical"
                  aria-label={t("hist.delete")}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
