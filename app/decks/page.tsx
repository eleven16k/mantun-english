"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DeckIcon, DECK_ICONS, DECK_COLORS } from "@/components/DeckIcon";
import { useGameStore } from "@/lib/store";
import { VOCAB } from "@/lib/vocab";
import { useI18n } from "@/lib/i18n";
import type { Question } from "@/lib/types";

/**
 * /decks — My decks: built-in starter decks + user-created decks.
 * Built-ins draw from the real VOCAB bank (count/progress are computed,
 * not mocked); "New deck" opens a name dialog; AI-imported quizzes are
 * also saved here automatically (see /import → addUserDeck).
 */
const DECKS: {
  titleKey: "deck.deckVocab" | "deck.deckCloze" | "deck.deckGrammar";
  color: string;
  questionType: Question["type"];
}[] = [
  { titleKey: "deck.deckVocab", color: "#7c3aed", questionType: "word-to-cn" },
  { titleKey: "deck.deckCloze", color: "#16a34a", questionType: "fill-blank" },
  { titleKey: "deck.deckGrammar", color: "#4d96ff", questionType: "grammar" },
];

export default function DecksPage() {
  const router = useRouter();
  const startQuiz = useGameStore((s) => s.startQuiz);
  const userDecks = useGameStore((s) => s.userDecks);
  const hiddenBuiltinDecks = useGameStore((s) => s.hiddenBuiltinDecks);
  const addUserDeck = useGameStore((s) => s.addUserDeck);
  const removeUserDeck = useGameStore((s) => s.removeUserDeck);
  const removeBuiltinDeck = useGameStore((s) => s.removeBuiltinDeck);
  const loadImportedQuiz = useGameStore((s) => s.loadImportedQuiz);
  const cardStates = useGameStore((s) => s.cardStates);
  const { t } = useI18n();

  // Real progress: share of the word bank mastered (SM-2 level ≥ 14-day interval)
  const mastered = Object.values(cardStates).filter((c) => c.mastered).length;
  const progress = VOCAB.length > 0 ? mastered / VOCAB.length : 0;

  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [iconId, setIconId] = useState(DECK_ICONS[0].id);
  const [color, setColor] = useState(DECK_COLORS[0]);
  // Which deck the confirm dialog targets: `builtin:<key>` or `user:<id>`
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null);

  const visibleBuiltin = DECKS.filter((d) => !hiddenBuiltinDecks.includes(d.titleKey));

  const deckTitleFor = (ref: string) =>
    ref.startsWith("builtin:")
      ? t(DECKS.find((d) => d.titleKey === ref.slice(8))?.titleKey ?? "deck.title")
      : userDecks.find((d) => d.id === ref.slice(5))?.title ?? "";

  const confirmDelete = () => {
    if (!deckToDelete) return;
    if (deckToDelete.startsWith("builtin:")) removeBuiltinDeck(deckToDelete.slice(8));
    else removeUserDeck(deckToDelete.slice(5));
    setDeckToDelete(null);
  };

  const createDeck = () => {
    if (!name.trim()) return;
    addUserDeck(name, [], iconId, color);
    setShowDialog(false);
    setName("");
    // An empty deck has nothing to play — take the user to import content
    router.push("/import");
  };

  const playUserDeck = (deckIdx: number) => {
    const deck = userDecks[deckIdx];
    if (!deck) return;
    if (deck.questions.length === 0) {
      router.push("/import");
      return;
    }
    loadImportedQuiz(deck.questions);
    router.push("/quiz?from=decks");
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="🃏 MY DECKS" title={t("deck.title")} />

        <div className="grid grid-cols-3 gap-3">
          {visibleBuiltin.map((deck) => (
            <button
              key={deck.titleKey}
              onClick={() => {
                startQuiz(10, deck.questionType);
                router.push("/quiz?from=decks");
              }}
              className="g-card relative flex flex-col gap-2 p-4 text-left transition hover:border-brandborder"
              style={{ minHeight: 130 }}
            >
              <DeleteBadge onClick={() => setDeckToDelete(`builtin:${deck.titleKey}`)} label={t("deck.delete")} />
              <span className="grid h-8 w-8 place-items-center rounded-xl text-white" style={{ background: deck.color }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </span>
              <p className="pr-6 text-sm font-bold text-primary truncate">{t(deck.titleKey)}</p>
              <p className="text-xs text-tertiary">{VOCAB.length} {t("deck.cards")}</p>
              {progress > 0 && (
                <div className="h-1.5 overflow-hidden rounded-pill bg-canvas">
                  <div className="h-full rounded-pill bg-brand" style={{ width: `${progress * 100}%` }} />
                </div>
              )}
            </button>
          ))}

          {/* User decks */}
          {userDecks.map((deck, i) => (
            <button
              key={deck.id}
              onClick={() => playUserDeck(i)}
              className="g-card relative flex flex-col gap-2 p-4 text-left transition hover:border-brandborder"
              style={{ minHeight: 130 }}
            >
              <DeleteBadge onClick={() => setDeckToDelete(`user:${deck.id}`)} label={t("deck.delete")} />
              <DeckIcon icon={deck.icon} color={deck.color} />
              <p className="pr-6 text-sm font-bold text-primary truncate">{deck.title}</p>
              <p className="text-xs text-tertiary">
                {deck.questions.length > 0
                  ? <>{deck.questions.length} {t("deck.cards")}</>
                  : t("deck.empty")}
              </p>
            </button>
          ))}

          {/* New deck tile */}
          <button
            onClick={() => setShowDialog(true)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-subtle p-4 text-tertiary transition hover:border-brandborder hover:text-brand-text"
            style={{ minHeight: 130 }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-canvas">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span className="text-sm font-bold">{t("deck.newDeck")}</span>
          </button>
        </div>
      </div>

      {/* New deck dialog */}
      {showDialog && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setShowDialog(false)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-booster text-lg font-extrabold text-primary">{t("deck.createTitle")}</h2>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createDeck()}
              placeholder={t("deck.namePlaceholder")}
              className="mt-3 w-full rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brandborder"
            />

            {/* Icon picker */}
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-tertiary">{t("deck.iconLabel")}</p>
            <div className="mt-1.5 grid grid-cols-6 gap-1.5">
              {DECK_ICONS.map((ic) => (
                <button
                  key={ic.id}
                  type="button"
                  onClick={() => setIconId(ic.id)}
                  aria-label={ic.id}
                  aria-pressed={iconId === ic.id}
                  className={`grid aspect-square place-items-center rounded-xl transition ${
                    iconId === ic.id
                      ? "border-2 border-brandborder bg-brand-subtle text-primary"
                      : "border border-subtle bg-app text-tertiary hover:bg-canvas"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {ic.paths.map((d, j) => (
                      <path key={j} d={d} />
                    ))}
                  </svg>
                </button>
              ))}
            </div>

            {/* Color picker */}
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-tertiary">{t("deck.colorLabel")}</p>
            <div className="mt-1.5 flex gap-2">
              {DECK_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c}
                  aria-pressed={color === c}
                  className={`h-8 w-8 rounded-full transition ${
                    color === c ? "ring-2 ring-brand-text ring-offset-2 ring-offset-surface" : "hover:scale-110"
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>

            {/* Live preview */}
            <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-app px-3 py-2.5">
              <DeckIcon icon={iconId} color={color} size={28} />
              <span className="text-sm font-bold text-primary">{name.trim() || t("deck.namePlaceholder")}</span>
            </div>

            <p className="mt-2 text-xs text-tertiary">{t("deck.createHint")}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
              >
                {t("deck.cancel")}
              </button>
              <button
                onClick={createDeck}
                disabled={!name.trim()}
                className="flex-1 rounded-pill bg-brand py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {t("deck.createBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete deck confirmation */}
      {deckToDelete && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setDeckToDelete(null)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-booster text-lg font-extrabold text-primary">{t("deck.deleteTitle")}</h2>
            <p className="mt-2 text-sm text-secondary">
              {t("deck.deletePrefix")}{deckTitleFor(deckToDelete)}{t("deck.deleteSuffix")}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setDeckToDelete(null)}
                className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
              >
                {t("deck.cancel")}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-pill bg-critical py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              >
                {t("deck.deleteBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

/* Small × badge on a deck tile — opens the delete confirmation */
function DeleteBadge({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onClick();
        }
      }}
      className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-canvas text-tertiary transition hover:bg-critical hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </span>
  );
}
