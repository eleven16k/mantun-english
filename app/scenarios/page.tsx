"use client";

/**
 * /scenarios — NovaWorld world map: immersive role-play scenarios.
 * Pick a vocabulary level (progressive difficulty filter) and optional
 * custom vocab, then enter a simulation to chat or make a live call.
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { getScenarios, type VocabLevel } from "@/lib/scenarios";
import { kv } from "@/lib/kv";
import { useI18n, type MessageKey } from "@/lib/i18n";

const LEVEL_KEY = "lexi-scenario-level";
const CUSTOM_VOCAB_KEY = "lexi-scenario-custom-vocab";

const LEVELS: { id: VocabLevel; labelKey: MessageKey }[] = [
  { id: "Primary", labelKey: "scn.levelPrimary" },
  { id: "JuniorHigh", labelKey: "scn.levelJuniorHigh" },
  { id: "SeniorHigh", labelKey: "scn.levelSeniorHigh" },
  { id: "Custom", labelKey: "scn.levelCustom" },
];

const DIFF_KEY: Record<string, MessageKey> = {
  Beginner: "scn.diffBeginner",
  Intermediate: "scn.diffIntermediate",
  Advanced: "scn.diffAdvanced",
};

export default function ScenariosPage() {
  const { t, locale } = useI18n();
  const [level, setLevel] = useState<VocabLevel>("JuniorHigh");
  const [customVocab, setCustomVocab] = useState("");
  const [vocabInput, setVocabInput] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedLevel = kv.getItem(LEVEL_KEY) as VocabLevel | null;
    if (savedLevel) setLevel(savedLevel);
    const savedVocab = kv.getItem(CUSTOM_VOCAB_KEY) as string | null;
    if (savedVocab) {
      setCustomVocab(savedVocab);
      setVocabInput(savedVocab);
    }
  }, []);

  const scenarios = useMemo(() => getScenarios(level), [level]);

  const pickLevel = (lvl: VocabLevel) => {
    setLevel(lvl);
    kv.setItem(LEVEL_KEY, lvl);
  };

  const saveCustomVocab = () => {
    const words = vocabInput
      .split(/[,\n\s]+/)
      .map((w) => w.trim())
      .filter(Boolean)
      .slice(0, 200);
    const joined = words.join(",");
    setCustomVocab(joined);
    kv.setItem(CUSTOM_VOCAB_KEY, joined);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const customWords = customVocab ? customVocab.split(",").filter(Boolean) : [];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 lg:px-8 lg:pt-24">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-booster text-3xl font-extrabold tracking-tight lg:text-4xl">
            {t("scn.title")}
          </h1>
          <p className="mt-1 text-sm text-tertiary">{t("scn.subtitle")}</p>
        </header>

        {/* Vocabulary level selector */}
        <section className="mb-8 rounded-card border border-subtle bg-surface p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-text">
            {t("scn.vocabLevel")}
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => pickLevel(lvl.id)}
                className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                  level === lvl.id
                    ? "border-brand bg-brand text-white"
                    : "border-subtle bg-canvas text-secondary hover:text-primary"
                }`}
              >
                <span>{t(lvl.labelKey)}</span>
                <span className={level === lvl.id ? "text-white/70" : "text-tertiary"}>
                  {lvl.id === "Custom" ? customWords.length : ""}{" "}
                </span>
              </button>
            ))}
          </div>

          {level === "Custom" && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-tertiary">{t("scn.customVocabHint")}</p>
              <textarea
                value={vocabInput}
                onChange={(e) => setVocabInput(e.target.value)}
                placeholder={t("scn.customVocabPh")}
                className="min-h-[72px] w-full resize-none rounded-xl border border-subtle bg-canvas px-3.5 py-2.5 text-sm outline-none focus:border-brandborder"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={saveCustomVocab}
                  className="rounded-lg bg-brand-subtle px-4 py-2 text-xs font-bold text-brand-text transition hover:brightness-95"
                >
                  {t("scn.confirm")}
                </button>
                {showSaved && <span className="text-xs font-medium text-positive">{t("scn.vocabSaved")}</span>}
              </div>
            </div>
          )}
        </section>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => (
            <Link
              key={s.id}
              href={`/scenarios/${s.id}`}
              className="group overflow-hidden rounded-card border border-subtle bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-brandborder hover:shadow-md"
            >
              <div className="relative h-36 overflow-hidden bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title[locale]}
                  className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                  {t(DIFF_KEY[s.difficulty])}
                </span>
                <span className="absolute -bottom-1 right-3 text-5xl drop-shadow">{s.emoji}</span>
              </div>
              <div className="space-y-1 p-4">
                <p className="flex items-center gap-1 text-xs font-medium text-brand-text">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {s.location[locale]}
                </p>
                <h3 className="font-booster text-lg font-extrabold">{s.title[locale]}</h3>
                <p className="line-clamp-2 min-h-[2.4em] text-xs text-tertiary">{s.description[locale]}</p>
                <p className="pt-1 text-xs font-semibold text-secondary">
                  {t("scn.interactingWith")}: {s.npc} · {s.npcRole[locale]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
