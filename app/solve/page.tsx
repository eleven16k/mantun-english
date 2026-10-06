"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { solvePhoto, pingDeepTutor } from "@/lib/deeptutor";
import { Md } from "@/components/Markdown";
import { useI18n } from "@/lib/i18n";

/**
 * /solve — Photo solve: snap or upload an exercise photo, the AI tutor
 * reads it and streams a step-by-step walkthrough (DeepTutor /solve WS).
 */
export default function SolvePage() {
  const { t, locale } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [solving, setSolving] = useState(false);
  const [solution, setSolution] = useState("");
  const [error, setError] = useState("");

  const onPick = (file: File | undefined) => {
    if (!file) return;
    setError("");
    setSolution("");
    const reader = new FileReader();
    reader.onload = () => {
      // data:image/...;base64,xxx — keep full URI, the server accepts both
      setImageBase64(String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  };

  const solve = async () => {
    if (!imageBase64 || solving) return;
    setSolving(true);
    setError("");
    setSolution("");

    const append = (chunk: string) => setSolution((prev) => prev + chunk);

    // Primary: vision+reasoning gateway via /api/solve (streams plain text).
    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("lexi-token") ?? ""}` },
        body: JSON.stringify({ imageBase64, note: note.trim(), locale: locale === "zh" ? "zh" : "en" }),
      });
      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          append(decoder.decode(value, { stream: true }));
        }
        setSolving(false);
        return;
      }
      if (res.status !== 503) {
        setSolving(false);
        setError(t("solve.failed"));
        return;
      }
      // 503 = no gateway key configured — fall through to DeepTutor sidecar.
    } catch {
      // network error — fall through to DeepTutor sidecar
    }

    // Fallback: DeepTutor /solve WebSocket.
    const up = await pingDeepTutor();
    if (!up) {
      setSolving(false);
      setError(t("solve.offline"));
      return;
    }

    const result = await solvePhoto({
      imageBase64,
      question: note.trim(),
      language: locale === "zh" ? "zh" : "en",
      onChunk: append,
    }).catch(() => null);

    setSolving(false);
    if (!result) {
      setError(t("solve.failed"));
    }
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="PHOTO SOLVE" title={t("solve.title")} sub={t("solve.intro")} />

        {/* Photo picker / preview */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />

        {!imageBase64 ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-subtle p-12 text-tertiary transition hover:border-brandborder hover:text-brand-text"
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="text-sm font-bold">{t("solve.pickPhoto")}</span>
            <span className="text-xs">{t("solve.photoHint")}</span>
          </button>
        ) : (
          <>
            <div className="overflow-hidden rounded-3xl border-2 border-b-4 border-[var(--ink)] shadow-[0_3px_0_0_rgba(0,0,0,0.1)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageBase64} alt="" className="max-h-72 w-full object-contain bg-app" />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { setImageBase64(null); setSolution(""); }}
                className="rounded-pill border border-subtle bg-surface px-4 py-2 text-xs font-bold text-secondary transition hover:bg-canvas"
              >
                {t("solve.retake")}
              </button>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("solve.notePh")}
                className="flex-1 rounded-pill border border-subtle bg-app px-4 py-2 text-sm outline-none placeholder:text-tertiary focus:border-brandborder"
              />
              <button
                onClick={solve}
                disabled={solving}
                className="rounded-pill bg-brand px-5 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {solving ? t("solve.solving") : t("solve.solveBtn")}
              </button>
            </div>
          </>
        )}

        {/* Streamed walkthrough */}
        {(solution || solving) && (
          <div className="mt-5 g-card p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-tertiary">{t("solve.steps")}</p>
            {solving && !solution && (
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text">
                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                {t("quiz.aiThinking")}
              </div>
            )}
            {solution && (
              <Md className="max-h-[50vh] overflow-y-auto text-sm leading-relaxed text-secondary">{solution}</Md>
            )}
          </div>
        )}

        {error && <p className="mt-4 text-center text-xs font-bold text-critical">{error}</p>}
      </div>
    </AppShell>
  );
}
