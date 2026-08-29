"use client";

/**
 * ScenarioCallOverlay — full-screen live voice call with the scenario NPC.
 * Rides the OpenAI Realtime-compatible WebSocket of the local
 * speech-to-speech engine (lib/realtime). The call screen shows only status;
 * the bilingual transcript stays hidden until the user taps "view
 * transcript", which opens a modal. On hang-up the transcript is handed back
 * to the parent page.
 */

import { useEffect, useRef, useState } from "react";
import { RealtimeCall, type CallStatus } from "@/lib/realtime";
import { s2sBase } from "@/lib/config";
import { useI18n, type MessageKey } from "@/lib/i18n";

export interface CallTranscriptRow {
  role: "user" | "assistant";
  text: string;
}

interface Props {
  npcName: string;
  npcRole: string;
  image: string;
  emoji: string;
  instructions: string;
  onEnd: (transcript: CallTranscriptRow[]) => void;
}

const STATUS_KEY: Record<CallStatus, MessageKey | null> = {
  idle: null,
  connecting: "scn.connecting",
  connected: null,
  "user-speaking": "scn.listening",
  thinking: "scn.thinking",
  "ai-speaking": "scn.speaking",
  error: null,
};

export function ScenarioCallOverlay({ npcName, npcRole, image, emoji, instructions, onEnd }: Props) {
  const { t } = useI18n();
  const [status, setStatus] = useState<CallStatus>("connecting");
  const [rows, setRows] = useState<(CallTranscriptRow & { partial?: boolean })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const callRef = useRef<RealtimeCall | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const call = new RealtimeCall({
      url: s2sBase(),
      instructions,
      onStatus: setStatus,
      onUserTranscript: (text, partial) => {
        setRows((prev) => {
          const last = prev[prev.length - 1];
          if (partial) {
            if (last?.role === "user" && last.partial) {
              return [...prev.slice(0, -1), { role: "user", text, partial: true }];
            }
            return [...prev, { role: "user", text, partial: true }];
          }
          if (last?.role === "user" && last.partial) {
            return [...prev.slice(0, -1), { role: "user", text }];
          }
          return [...prev, { role: "user", text }];
        });
      },
      onAssistantTranscript: (text) => {
        setRows((prev) => [...prev, { role: "assistant", text }]);
      },
      onError: (message) => setError(message),
    });
    callRef.current = call;
    call.start().catch(() => {
      // onError already carries the friendly message
    });

    return () => {
      call.close();
      callRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the modal pinned to the latest row while it is open.
  useEffect(() => {
    if (showTranscript) transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rows, showTranscript]);

  const hangUp = () => {
    callRef.current?.close();
    onEnd(rows.filter((r) => r.text.trim()));
  };

  const statusKey = STATUS_KEY[status];
  const ringing = status === "connecting";

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[rgba(11,17,32,0.98)] backdrop-blur-2xl">
      {/* top-right close */}
      <button
        onClick={hangUp}
        aria-label={t("scn.endCall")}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6 pb-10 pt-12">
        {/* Avatar with animated rings */}
        <div className="relative mb-6 mt-4">
          <div
            className={`absolute inset-0 rounded-full border-2 border-brand/30 ${ringing ? "animate-ping" : ""}`}
            style={{ animationDuration: "2.4s" }}
          />
          <div className="absolute -inset-3 rounded-full border border-brand/15" />
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-brand/30 shadow-2xl shadow-brand/20 md:h-40 md:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={npcName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </div>
          {!ringing && status !== "error" && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
              {t("scn.live")}
            </span>
          )}
        </div>

        <h2 className="font-booster text-2xl font-extrabold text-white md:text-4xl">{npcName}</h2>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand md:text-xs">{npcRole}</p>

        {/* Status + waveform */}
        <div className="mt-5 flex h-8 items-center gap-2 text-xs font-medium text-white/50">
          {ringing || status === "thinking" ? (
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          ) : null}
          <span>{error ? "" : statusKey ? t(statusKey) : t("scn.liveTip")}</span>
        </div>
        {!ringing && status !== "error" && (
          <div className="mt-2 flex h-10 items-end gap-1.5" aria-hidden>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className={`w-1 rounded-full ${status === "ai-speaking" ? "bg-brand" : "bg-brand/60"}`}
                style={{
                  height: "12px",
                  animation: `lexi-wave 0.9s ease-in-out ${i * 0.09}s infinite alternate`,
                  boxShadow: "0 0 8px rgba(16,185,129,0.35)",
                }}
              />
            ))}
          </div>
        )}

        <div className="flex-1" />

        {error && (
          <div className="mb-5 w-full max-w-xs space-y-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <p className="text-xs leading-relaxed text-red-300">{error}</p>
            <button
              onClick={hangUp}
              className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-white/90"
            >
              {t("scn.endCall")}
            </button>
          </div>
        )}

        {/* Transcript stays hidden during the call — tap to view in a modal */}
        <button
          onClick={() => setShowTranscript(true)}
          className="relative flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {t("scn.viewTranscript")}
          {rows.length > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-black text-white">
              {rows.length}
            </span>
          )}
        </button>

        {/* Hang up */}
        <button onClick={hangUp} className="group relative mt-6 h-16 w-16" aria-label={t("scn.endCall")}>
          <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-xl transition group-hover:opacity-40" />
          <div className="relative grid h-full w-full place-items-center rounded-full bg-red-500 text-white shadow-xl shadow-red-500/30 transition active:scale-95">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
              <path d="M23 1 1 23" />
            </svg>
          </div>
        </button>
        <style jsx global>{`
          @keyframes lexi-wave {
            from {
              height: 10px;
            }
            to {
              height: 36px;
            }
          }
        `}</style>
      </div>

      {/* Transcript modal — call keeps running underneath */}
      {showTranscript && (
        <div
          className="fixed inset-0 z-[210] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
          onClick={() => setShowTranscript(false)}
        >
          <div
            className="flex max-h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[rgba(15,21,38,0.98)] shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <p className="text-sm font-bold text-white">{t("scn.transcriptTitle")}</p>
              <button
                onClick={() => setShowTranscript(false)}
                aria-label={t("scn.transcriptTitle")}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 space-y-2.5 overflow-y-auto p-5 [scrollbar-width:thin]">
              {rows.length === 0 && !error && (
                <p className="pt-4 text-center text-xs leading-relaxed text-white/35">{t("scn.liveTip")}</p>
              )}
              {rows.map((r, i) => (
                <div key={i} className={`flex ${r.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      r.role === "user"
                        ? "rounded-tr-sm bg-brand text-white"
                        : "rounded-tl-sm border border-white/10 bg-white/10 text-white/90"
                    } ${r.partial ? "opacity-60" : ""}`}
                  >
                    {r.partial && <span className="mr-1.5 text-[9px] uppercase tracking-widest opacity-60">{t("scn.you")}</span>}
                    {r.text}
                  </div>
                </div>
              ))}
              {error && (
                <p className="pt-2 text-center text-xs leading-relaxed text-red-300">{error}</p>
              )}
              <div ref={transcriptEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
