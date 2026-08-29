"use client";

/**
 * ScenarioCallOverlay — full-screen live voice call with the scenario NPC.
 * Rides the OpenAI Realtime-compatible WebSocket of the local
 * speech-to-speech engine (lib/realtime).
 *
 * Layout follows the familiar phone-call pattern: timer top-centre, close
 * top-right, avatar + reactive mic waveform in the middle, and a three-key
 * control row (mute / hang up / transcript) at the bottom. The bilingual
 * transcript stays hidden until the user opens the sheet. On hang-up the
 * transcript is handed back to the parent page.
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
  connected: "scn.liveTip",
  "user-speaking": "scn.listening",
  thinking: "scn.thinking",
  "ai-speaking": "scn.speaking",
  error: null,
};

/** Accent colour per call phase (dot, waveform, avatar ring). */
const PHASE: Record<CallStatus, { dot: string; ring: string }> = {
  idle: { dot: "bg-white/30", ring: "border-white/10" },
  connecting: { dot: "bg-brand animate-pulse", ring: "border-brand/40" },
  connected: { dot: "bg-emerald-400", ring: "border-emerald-400/40" },
  "user-speaking": { dot: "bg-emerald-400 animate-pulse", ring: "border-emerald-400/60" },
  thinking: { dot: "bg-amber-400 animate-pulse", ring: "border-amber-400/50" },
  "ai-speaking": { dot: "bg-brand", ring: "border-brand/60" },
  error: { dot: "bg-red-400", ring: "border-red-400/40" },
};

const BAR_COUNT = 13;
const BASE_LEVEL = 0.06;

export function ScenarioCallOverlay({ npcName, npcRole, image, emoji, instructions, onEnd }: Props) {
  const { t } = useI18n();
  const [status, setStatus] = useState<CallStatus>("connecting");
  const [rows, setRows] = useState<(CallTranscriptRow & { partial?: boolean })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [muted, setMuted] = useState(false);
  const [secs, setSecs] = useState(0);
  const [bars, setBars] = useState<number[]>(() => Array(BAR_COUNT).fill(BASE_LEVEL));
  const callRef = useRef<RealtimeCall | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<number>(BASE_LEVEL);

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
      // Mic meter: amplify quiet speech a little, clamp for the bar render.
      onLevel: (rms) => {
        levelRef.current = Math.min(1, Math.max(BASE_LEVEL, rms * 6));
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

  // Call timer — starts once the socket session is live.
  useEffect(() => {
    if (status === "connecting" || status === "error" || status === "idle") return;
    const iv = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [status]);

  // Reactive waveform: decay toward baseline, spikes on real mic input.
  useEffect(() => {
    const iv = setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        next.push(muted ? BASE_LEVEL * 0.4 : levelRef.current);
        levelRef.current = Math.max(BASE_LEVEL, levelRef.current * 0.72);
        return next;
      });
    }, 90);
    return () => clearInterval(iv);
  }, [muted]);

  // Keep the modal pinned to the latest row while it is open.
  useEffect(() => {
    if (showTranscript) transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rows, showTranscript]);

  const hangUp = () => {
    callRef.current?.close();
    onEnd(rows.filter((r) => r.text.trim()));
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    callRef.current?.setMuted(next);
  };

  const statusKey = STATUS_KEY[status];
  const ringing = status === "connecting";
  const phase = PHASE[status];
  const live = !ringing && status !== "error";
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-[rgba(11,17,32,0.98)] backdrop-blur-2xl">
      {/* Top bar: timer centred, close top-right */}
      <div className="relative flex items-center justify-center px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <span className="rounded-pill border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tabular-nums text-white/70">
          {mm}:{ss}
        </span>
        <button
          onClick={hangUp}
          aria-label={t("scn.endCall")}
          className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6">
        {/* Avatar with phase-tinted ring; pings while connecting */}
        <div className="relative mb-5 mt-8">
          {ringing && (
            <div
              className="absolute inset-0 rounded-full border-2 border-brand/30 animate-ping"
              style={{ animationDuration: "2.4s" }}
            />
          )}
          {!ringing && status === "ai-speaking" && (
            <div className="absolute -inset-1.5 rounded-full border border-brand/40 animate-ping" style={{ animationDuration: "1.6s" }} />
          )}
          <div className={`absolute -inset-2 rounded-full border-2 ${phase.ring} transition-colors duration-500`} />
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl shadow-black/50 md:h-44 md:w-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={npcName}
              className={`h-full w-full object-cover transition-transform duration-300 ${status === "ai-speaking" ? "scale-[1.04]" : "scale-100"}`}
              referrerPolicy="no-referrer"
            />
          </div>
          {live && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
              {t("scn.live")}
            </span>
          )}
        </div>

        <h2 className="font-booster text-2xl font-extrabold text-white md:text-3xl">{npcName}</h2>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand md:text-xs">{npcRole}</p>

        {/* Status line */}
        <div className="mt-4 flex h-6 items-center gap-2 text-sm font-semibold text-white/70">
          {!error && (
            <span className={`h-2 w-2 rounded-full ${muted && live ? "bg-white/30" : phase.dot}`} />
          )}
          <span>{error ? "" : muted && live ? t("scn.muted") : statusKey ? t(statusKey) : ""}</span>
        </div>

        {/* Reactive mic waveform */}
        {live && (
          <div className="mt-4 flex h-12 items-center gap-1.5" aria-hidden>
            {bars.map((lv, i) => {
              const edge = Math.abs(i - (BAR_COUNT - 1) / 2) / ((BAR_COUNT - 1) / 2); // 0 centre → 1 edge
              const h = 6 + lv * (muted ? 8 : 34) * (1 - edge * 0.45);
              return (
                <span
                  key={i}
                  className={`w-1.5 rounded-full transition-[height] duration-100 ${
                    muted ? "bg-white/15" : status === "ai-speaking" ? "bg-brand" : "bg-emerald-400/80"
                  }`}
                  style={{ height: `${h}px`, boxShadow: muted ? "none" : "0 0 10px rgba(16,185,129,0.3)" }}
                />
              );
            })}
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

        {/* Control row: mute / hang up / transcript */}
        {!error && (
          <div className="flex w-full items-end justify-center gap-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
            {/* Mute */}
            <div className="flex w-16 flex-col items-center gap-1.5">
              <button
                onClick={toggleMute}
                disabled={!live}
                aria-label={muted ? t("scn.unmute") : t("scn.mute")}
                className={`grid h-14 w-14 place-items-center rounded-full border transition active:scale-95 disabled:opacity-40 ${
                  muted
                    ? "border-white/20 bg-white text-black"
                    : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {muted ? (
                    <>
                      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                      <path d="M23 1 1 23" />
                    </>
                  ) : (
                    <>
                      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                      <path d="M12 18v4" />
                    </>
                  )}
                </svg>
              </button>
              <span className="text-[10px] font-bold text-white/50">{muted ? t("scn.unmute") : t("scn.mute")}</span>
            </div>

            {/* Hang up */}
            <div className="flex w-16 flex-col items-center gap-1.5">
              <button onClick={hangUp} className="group relative h-16 w-16" aria-label={t("scn.endCall")}>
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-25 blur-xl transition group-hover:opacity-50" />
                <div className="relative grid h-full w-full place-items-center rounded-full bg-red-500 text-white shadow-xl shadow-red-500/30 transition active:scale-95">
                  {/* standard call-end receiver */}
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.7l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
                  </svg>
                </div>
              </button>
              <span className="text-[10px] font-bold text-white/50">{t("scn.endCall")}</span>
            </div>

            {/* Transcript */}
            <div className="flex w-16 flex-col items-center gap-1.5">
              <button
                onClick={() => setShowTranscript(true)}
                aria-label={t("scn.viewTranscript")}
                className="relative grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {rows.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-black text-white">
                    {rows.length}
                  </span>
                )}
              </button>
              <span className="text-[10px] font-bold text-white/50">{t("scn.viewTranscript")}</span>
            </div>
          </div>
        )}

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

      {/* Transcript sheet — call keeps running underneath */}
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
