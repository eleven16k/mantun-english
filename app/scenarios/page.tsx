"use client";

/**
 * /scenarios — NovaWorld world map: immersive role-play scenarios.
 * Pick a vocabulary level (progressive difficulty filter) and optional
 * custom vocab, then enter a simulation to chat or make a live call.
 * Scenarios can also be generated from courseware text (LLM) — they are
 * persisted per-user and appear under "My scenarios".
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { getScenarios, type Scenario, type VocabLevel } from "@/lib/scenarios";
import { VOCAB_LISTS } from "@/lib/vocab-lists";
import { generateScenario, fetchCustomScenarios, deleteCustomScenario, extractCoursewareText } from "@/lib/api";
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
  const [myScenarios, setMyScenarios] = useState<Scenario[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [createText, setCreateText] = useState("");
  const [createLevel, setCreateLevel] = useState<VocabLevel>("JuniorHigh");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [extractedName, setExtractedName] = useState("");

  useEffect(() => {
    const savedLevel = kv.getItem(LEVEL_KEY) as VocabLevel | null;
    if (savedLevel) setLevel(savedLevel);
    const savedVocab = kv.getItem(CUSTOM_VOCAB_KEY) as string | null;
    if (savedVocab) {
      setCustomVocab(savedVocab);
      setVocabInput(savedVocab);
    }
    fetchCustomScenarios().then(setMyScenarios).catch(() => {});
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

  const importCourseware = async (file: File | undefined) => {
    if (!file || extracting) return;
    setCreateError(false);
    setExtracting(true);
    setExtractedName("");
    try {
      const { text, name } = await extractCoursewareText(file);
      setCreateText(text.slice(0, 20000));
      setExtractedName(`${name} · ${text.length.toLocaleString()} chars`);
    } catch (err) {
      setCreateError(true);
      console.error("[scenarios] extract failed:", err);
    } finally {
      setExtracting(false);
    }
  };

  const runCreate = async () => {
    if (creating || createText.trim().length < 50) return;
    setCreating(true);
    setCreateError(false);
    try {
      const { scenario } = await generateScenario(createText.trim(), createLevel);
      setMyScenarios((prev) => [scenario, ...prev]);
      setShowCreate(false);
      setCreateText("");
    } catch {
      setCreateError(true);
    } finally {
      setCreating(false);
    }
  };

  const removeMine = async (id: string) => {
    setMyScenarios((prev) => prev.filter((s) => s.id !== id));
    await deleteCustomScenario(id).catch(() => {});
  };

  const customWords = customVocab ? customVocab.split(",").filter(Boolean) : [];

  const scenarioCard = (s: Scenario, mine = false) => (
    <Link
      key={s.id}
      href={`/scenarios/${s.id}`}
      className="group relative overflow-hidden rounded-card border border-subtle bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-brandborder hover:shadow-md"
    >
      {mine && (
        <button
          onClick={(e) => {
            e.preventDefault();
            void removeMine(s.id);
          }}
          aria-label="delete"
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/50 text-white/70 backdrop-blur transition hover:bg-red-500 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
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
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 lg:px-8 lg:pt-24">
        {/* Header + courseware entry */}
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-booster text-3xl font-extrabold tracking-tight lg:text-4xl">
              {t("scn.title")}
            </h1>
            <p className="mt-1 text-sm text-tertiary">{t("scn.subtitle")}</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-pill bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t("scn.createFrom")}
          </button>
        </header>

        {/* Vocabulary level selector */}
        <section className="mb-8 rounded-card border border-subtle bg-surface p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-text">
            {t("scn.vocabLevel")}
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {LEVELS.map((lvl) => {
              const count = lvl.id === "Custom" ? customWords.length : (VOCAB_LISTS[lvl.id]?.length ?? 0);
              return (
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
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-semibold tabular-nums ${
                        level === lvl.id ? "text-white/75" : "text-tertiary"
                      }`}
                    >
                      {count.toLocaleString()}
                    </span>
                  )}
                </button>
              );
            })}
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

        {/* My generated scenarios */}
        {myScenarios.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-secondary">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
                <path d="M20 17v5H6.5a2.5 2.5 0 0 1 0-5H20z" />
              </svg>
              {t("scn.myScenarios")}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {myScenarios.map((s) => scenarioCard(s, true))}
            </div>
          </section>
        )}

        {/* Scenario cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => scenarioCard(s))}
        </div>
      </div>

      {/* Courseware → scenario dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-[220] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center" onClick={() => !creating && setShowCreate(false)}>
          <div
            className="w-full max-w-lg rounded-t-3xl border border-subtle bg-surface p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-booster text-xl font-extrabold">{t("scn.createTitle")}</h3>
            <p className="mt-1 text-xs leading-relaxed text-tertiary">{t("scn.createHint")}</p>

            <textarea
              value={createText}
              onChange={(e) => setCreateText(e.target.value)}
              placeholder={t("scn.createTextPh")}
              className="mt-4 min-h-[140px] w-full resize-none rounded-xl border border-subtle bg-canvas px-3.5 py-2.5 text-sm outline-none focus:border-brandborder"
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer rounded-pill border border-subtle bg-canvas px-4 py-2 text-xs font-bold text-secondary transition hover:text-primary">
                  {extracting ? t("scn.extracting") : t("scn.importFile")}
                  <input
                    type="file"
                    accept=".pdf,.docx,.pptx,.txt,.md"
                    className="hidden"
                    disabled={extracting}
                    onChange={(e) => void importCourseware(e.target.files?.[0])}
                  />
                </label>
                {extractedName && <span className="max-w-40 truncate text-[11px] text-positive">{extractedName}</span>}
              </div>
              <div className="flex gap-1.5">
                {LEVELS.filter((l) => l.id !== "Custom").map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setCreateLevel(l.id)}
                    className={`rounded-pill px-3 py-2 text-xs font-bold transition ${
                      createLevel === l.id ? "bg-brand text-white" : "bg-canvas text-tertiary hover:text-secondary"
                    }`}
                  >
                    {t(l.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {createError && <p className="mt-3 text-xs font-bold text-critical">{t("scn.createFailed")}</p>}

            <button
              onClick={runCreate}
              disabled={creating || createText.trim().length < 50}
              className="mt-4 w-full rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              {creating ? t("scn.generatingScenario") : t("scn.createGenerate")}
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
