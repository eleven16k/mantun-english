"use client";

/**
 * /scenarios/[id] — scenario session: mission briefing → NPC chat with
 * live voice call. Ported from NovaWorld: structured EN/translation/tip
 * replies, suggestion on your message, target-vocab highlighting, Gemini
 * TTS replay, and realtime voice calls via the speech-to-speech engine.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ScenarioCallOverlay, type CallTranscriptRow } from "@/components/scenarios/ScenarioCallOverlay";
import { scenarioById, buildCallInstructions, type VocabLevel } from "@/lib/scenarios";
import { kv } from "@/lib/kv";
import { useI18n } from "@/lib/i18n";
import { chatWithNpc, generateScenarioVocab, scenarioTTS, bankScenarioReward } from "@/lib/api";
import { useGameStore } from "@/lib/store";

const LEVEL_KEY = "lexi-scenario-level";
const CUSTOM_VOCAB_KEY = "lexi-scenario-custom-vocab";

interface Message {
  role: "user" | "model";
  text: string;
  timestamp: number;
  suggestion?: string;
}

/** Play base64 PCM16 audio through a fresh AudioContext. */
async function playPcm(base64: string, sampleRate: number): Promise<void> {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const pcm = new Int16Array(bytes.buffer);
  const ctx = new AudioContext();
  const buffer = ctx.createBuffer(1, pcm.length, sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) channel[i] = pcm[i] / 32768;
  return new Promise((resolve) => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.onended = () => {
      void ctx.close();
      resolve();
    };
    src.connect(ctx.destination);
    src.start();
  });
}

export default function ScenarioSessionPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const scenario = scenarioById(id);

  const [briefing, setBriefing] = useState(true);
  const [level, setLevel] = useState<VocabLevel>("JuniorHigh");
  const [dynamicVocab, setDynamicVocab] = useState<string[]>([]);
  const [isGeneratingVocab, setIsGeneratingVocab] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [inCall, setInCall] = useState(false);
  const [callToast, setCallToast] = useState<string | null>(null);

  const masteredRef = useRef<Set<string>>(new Set());
  const recognitionRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const customVocab = useMemo(
    () => (customInput ? customInput.split(/[,\n\s]+/).map((w) => w.trim()).filter(Boolean) : []),
    [customInput]
  );
  const mergedVocab = useMemo(
    () => [...(scenario?.targetVocab ?? []), ...dynamicVocab, ...customVocab],
    [scenario, dynamicVocab, customVocab]
  );
  const vocabSet = useMemo(() => new Set(mergedVocab.map((w) => w.toLowerCase())), [mergedVocab]);

  // Restore level + custom vocab from the world-map page
  useEffect(() => {
    const savedLevel = kv.getItem(LEVEL_KEY) as VocabLevel | null;
    if (savedLevel) setLevel(savedLevel);
    const savedVocab = kv.getItem(CUSTOM_VOCAB_KEY) as string | null;
    if (savedVocab) setCustomInput(savedVocab.split(",").join(", "));
  }, []);

  // Mission briefing: generate the level-appropriate target list
  useEffect(() => {
    if (!briefing || !scenario) return;
    setIsGeneratingVocab(true);
    generateScenarioVocab(scenario.id, level)
      .then((res) => setDynamicVocab(res.vocab))
      .catch(() => setDynamicVocab(scenario.targetVocab))
      .finally(() => setIsGeneratingVocab(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [briefing, scenario?.id, level]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SpeechRecognition dictation (Chrome/Safari)
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onresult: (e: { results: { [k: number]: { [j: number]: { transcript: string } } } }) => void;
          onerror: (e: { error: string }) => void;
          onend: () => void;
          start: () => void;
          stop: () => void;
        })
      | undefined;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
      setMicError(null);
    };
    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed") setMicError(t("scn.micDenied"));
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Words from the vocab list that appear in a user utterance (new ones only). */
  const collectMastered = useCallback(
    (utterance: string): string[] => {
      const lower = utterance.toLowerCase();
      const found: string[] = [];
      for (const word of mergedVocab) {
        const w = word.toLowerCase();
        if (w && lower.includes(w) && !masteredRef.current.has(w)) {
          masteredRef.current.add(w);
          found.push(w);
        }
      }
      return found;
    },
    [mergedVocab]
  );

  const bankReward = useCallback(
    async (mode: "chat" | "call", turns: number, xp: number, coins: number, mastered: string[], transcript?: unknown[]) => {
      if (!scenario) return;
      try {
        const res = await bankScenarioReward({
          scenarioId: scenario.id,
          mode,
          turns,
          xp,
          coins,
          masteredWords: mastered,
          transcript,
        });
        useGameStore.setState((s) => ({ coins: s.coins + coins, scorePoints: s.scorePoints + xp }));
        return res;
      } catch {
        // offline-friendly: rewards stay local-only
      }
    },
    [scenario]
  );

  const startBriefing = () => {
    if (!scenario) return;
    setBriefing(false);
    const greeting = `Hello! I'm ${scenario.npc}, the ${scenario.npcRole.en}. Welcome to ${scenario.location.en}. How can I help you today?`;
    const translation = `你好！我是 ${scenario.npc}，${scenario.npcRole.zh}。欢迎来到 ${scenario.location.zh}。今天我能帮你什么吗？`;
    const tip = locale === "zh" ? "[Tip: 用英语向 NPC 打个招呼，告诉他们你需要什么。]" : "[Tip: Greet the NPC and tell them what you need.]";
    setMessages([{ role: "model", text: `${greeting} \n--- \n ${translation} \n--- \n ${tip}`, timestamp: Date.now() }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !scenario || isLoading) return;
    const userMessage: Message = { role: "user", text: input, timestamp: Date.now() };
    const mastered = collectMastered(input);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const reply = await chatWithNpc({
        scenarioId: scenario.id,
        history,
        message: userMessage.text,
        level,
        customVocab: mergedVocab,
        locale,
      });
      setMessages((prev) => {
        const next = [...prev];
        const lastUser = next.map((m) => m.role).lastIndexOf("user");
        if (lastUser >= 0 && reply.userSuggestion) {
          next[lastUser] = { ...next[lastUser], suggestion: reply.userSuggestion };
        }
        return [...next, { role: "model", text: reply.npcResponse, timestamp: Date.now() }];
      });
      void bankReward("chat", 1, 10, 2, mastered);
    } catch {
      const msg = locale === "zh" ? "AI 服务暂时不可用，请稍后再试。" : "AI is unavailable right now — try again shortly.";
      setMessages((prev) => [...prev, { role: "model", text: msg, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const replay = async (msg: Message) => {
    if (speakingId !== null) return;
    setSpeakingId(msg.timestamp);
    try {
      const { audio, sampleRate } = await scenarioTTS(msg.text);
      if (audio) await playPcm(audio, sampleRate);
    } catch {
      // TTS unavailable — stay silent
    } finally {
      setSpeakingId(null);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setMicError(null);
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const endCall = async (transcript: CallTranscriptRow[]) => {
    setInCall(false);
    if (!scenario) return;
    if (transcript.length > 0) {
      setMessages((prev) => [
        ...prev,
        ...transcript.map((r) => ({
          role: r.role === "user" ? ("user" as const) : ("model" as const),
          text: r.text,
          timestamp: Date.now(),
        })),
      ]);
      const userTurns = transcript.filter((r) => r.role === "user");
      const mastered = userTurns.map((r) => collectMastered(r.text)).flat();
      const xp = userTurns.length * 10;
      const coins = Math.min(20, userTurns.length * 2);
      await bankReward("call", userTurns.length, xp, coins, mastered, transcript);
      setCallToast(t("scn.callEndedHint").replace("{coins}", String(coins)));
      setTimeout(() => setCallToast(null), 4000);
    }
  };

  if (!scenario) {
    return (
      <AppShell>
        <div className="grid h-dvh place-items-center text-sm text-tertiary">
          <div className="space-y-3 text-center">
            <p>Scenario not found.</p>
            <Link href="/scenarios" className="text-brand-text underline">
              {t("scn.backToMap")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const renderHighlighted = (text: string) =>
    text.split(/(\b[\w-]+\b)/g).map((part, i) =>
      vocabSet.has(part.toLowerCase()) ? (
        <span
          key={i}
          className="cursor-pointer rounded bg-brand-subtle px-0.5 font-bold text-brand-text underline decoration-dotted underline-offset-4"
        >
          {part}
        </span>
      ) : (
        part
      )
    );

  /** Split NPC reply into EN / translation / tip segments. */
  const renderNpcMessage = (msg: Message) => {
    const segments = msg.text.split("---").map((s) => s.trim());
    const en = segments[0] ?? msg.text;
    const translation = segments[1];
    const tip = segments[2];
    return (
      <div className="space-y-2.5">
        <p className="text-sm font-medium leading-relaxed">{renderHighlighted(en)}</p>
        {translation && (
          <div className="rounded-xl border border-subtle bg-canvas p-2.5 text-xs leading-relaxed text-tertiary">
            <p className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-brand-text/50">
              {t("scn.translation")}
            </p>
            {translation}
          </div>
        )}
        {tip && (
          <div className="flex items-start gap-2 rounded-xl border border-brandborder/30 bg-brand-subtle/60 p-2.5 text-[11px] font-medium leading-relaxed text-brand-text">
            <span aria-hidden>✨</span>
            <p>{tip}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <AppShell>
      <div className="mx-auto flex h-full max-w-5xl flex-col px-4 pb-24 pt-20 lg:px-8 lg:pt-24">
        {/* Header */}
        <header className="mb-4 flex items-center gap-3">
          <Link
            href="/scenarios"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-subtle bg-surface text-tertiary transition hover:text-primary"
            aria-label={t("scn.backToMap")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div className="min-w-0">
            <h1 className="truncate font-booster text-xl font-extrabold">
              {scenario.emoji} {scenario.title[locale]}
            </h1>
            <p className="text-xs text-tertiary">
              {scenario.location[locale]} · {scenario.npc} ({scenario.npcRole[locale]})
            </p>
          </div>
        </header>

        {briefing ? (
          /* ── Mission briefing ── */
          <div className="mx-auto w-full max-w-3xl space-y-5 rounded-herocard border border-subtle bg-surface p-5 shadow-sm md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <div className="aspect-video overflow-hidden rounded-2xl border border-subtle bg-canvas">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={scenario.image} alt={scenario.title[locale]} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="font-booster text-lg font-extrabold">{scenario.title[locale]}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-tertiary">{scenario.description[locale]}</p>
                </div>
                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.mission")}
                  </p>
                  <p className="text-xs leading-relaxed text-secondary">{scenario.description[locale]}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.targetVocab")}
                  </p>
                  {isGeneratingVocab ? (
                    <p className="flex items-center gap-2 py-1.5 text-[11px] italic text-tertiary">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      {t("scn.generatingVocab")}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {dynamicVocab.map((w) => (
                        <span key={w} className="rounded-lg border border-brandborder/30 bg-brand-subtle px-2 py-1 font-mono text-[11px] text-brand-text">
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.customizeVocab")}
                  </p>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={t("scn.vocabPh")}
                    className="min-h-[80px] w-full resize-none rounded-xl border border-subtle bg-surface px-3 py-2 text-xs outline-none focus:border-brandborder"
                  />
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-brand-text hover:underline">
                    <input
                      type="file"
                      className="hidden"
                      accept=".txt,.csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        file.text().then((content) => {
                          setCustomInput((prev) => (prev ? `${prev}, ${content}` : content).slice(0, 2000));
                        });
                      }}
                    />
                    📄 {t("scn.importVocab")}
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={startBriefing}
              disabled={isGeneratingVocab}
              className={`w-full rounded-2xl py-4 font-booster text-base font-extrabold transition ${
                isGeneratingVocab ? "cursor-not-allowed bg-canvas text-tertiary" : "bg-brand text-white shadow-lg shadow-brand/20 hover:brightness-105"
              }`}
            >
              {isGeneratingVocab ? t("scn.preparing") : t("scn.startSimulation")}
            </button>
          </div>
        ) : (
          /* ── Chat + call ── */
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-herocard border border-subtle bg-surface shadow-sm">
            {/* Chat scroll area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm md:max-w-[75%] ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-brand text-white"
                        : "rounded-tl-sm border border-subtle bg-canvas"
                    }`}
                  >
                    {msg.role === "model" ? (
                      renderNpcMessage(msg)
                    ) : (
                      <p className="font-medium">
                        {msg.text}
                        {msg.suggestion && (
                          <span className="mt-2 block rounded-lg bg-black/10 p-2 text-[11px] italic leading-relaxed text-white/85">
                            ✨ <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                              {t("scn.suggestion")}:
                            </span>{" "}
                            {msg.suggestion}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  {msg.role === "model" && (
                    <button
                      onClick={() => replay(msg)}
                      className="mt-1 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold text-tertiary transition hover:bg-canvas hover:text-primary"
                    >
                      <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${speakingId === msg.timestamp ? "animate-pulse text-brand-text" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5 6 9H2v6h4l5 4zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                      {speakingId === msg.timestamp ? t("scn.speaking") : ""}
                    </button>
                  )}
                </div>
              ))}
              {isLoading && (
                <p className="flex items-center gap-2 text-xs text-tertiary">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                  {scenario.npc} {t("scn.typing")}
                </p>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-subtle bg-canvas/60 p-3.5 md:p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInCall(true)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/25 transition hover:scale-105 active:scale-95"
                  aria-label={t("scn.startLive")}
                  title={t("scn.startLive")}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={`${t("scn.talkTo")} ${scenario.npc}…`}
                  className="min-w-0 flex-1 rounded-2xl border border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brandborder"
                />
                <button
                  onClick={toggleListening}
                  disabled={!recognitionRef.current}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-subtle transition disabled:opacity-30 ${
                    listening ? "animate-pulse bg-red-500/10 text-critical" : "bg-surface text-tertiary hover:text-primary"
                  }`}
                  aria-label="Dictate"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
                  </svg>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/20 transition hover:brightness-105 disabled:opacity-40"
                  aria-label={t("scn.send")}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />
                  </svg>
                </button>
              </div>
              <p className="mt-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-tertiary">
                {micError ?? t("scn.tip")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live call overlay */}
      {inCall && (
        <ScenarioCallOverlay
          npcName={scenario.npc}
          npcRole={scenario.npcRole[locale]}
          image={scenario.image}
          emoji={scenario.emoji}
          instructions={buildCallInstructions(scenario, level, customVocab)}
          onEnd={endCall}
        />
      )}

      {/* Call-ended toast */}
      {callToast && (
        <div className="fixed bottom-28 left-1/2 z-[150] -translate-x-1/2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-app shadow-2xl lg:bottom-10">
          📞 {t("scn.callEnded")} · {callToast}
        </div>
      )}
    </AppShell>
  );
}
