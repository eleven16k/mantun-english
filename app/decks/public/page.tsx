"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

/**
 * /decks/public — public deck browser by subject.
 * Tapping a subject jumps to import with the topic prefilled, so AI
 * generates a deck for that subject from your own material.
 */

const SUBJECTS: { categoryKey: "deck.catSciences" | "deck.catHumanities" | "deck.catLanguages"; items: string[] }[] = [
  {
    categoryKey: "deck.catSciences",
    items: ["Biology", "Chemistry", "Physics", "Maths", "Computer Science"],
  },
  {
    categoryKey: "deck.catHumanities",
    items: ["History", "Business", "Economics", "Sociology", "Religious Studies", "Psychology", "English Language", "English Lit", "Philosophy", "Accounting", "Politics"],
  },
  {
    categoryKey: "deck.catLanguages",
    items: ["French", "German", "Spanish", "Japanese", "Arabic", "Italian", "English"],
  },
];

export default function PublicDecksPage() {
  const router = useRouter();
  const { t } = useI18n();
  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="PUBLIC DECKS" title={t("deck.publicTitle")} sub={t("deck.publicHint")} />

        {SUBJECTS.map((group) => (
          <section key={group.categoryKey} className="mb-6">
            <h2 className="mb-3 text-[14px] font-bold text-secondary">{t(group.categoryKey)}</h2>
            <div className="grid grid-cols-3 gap-2">
              {group.items.map((subject) => (
                <button
                  key={subject}
                  onClick={() => router.push(`/import?topic=${encodeURIComponent(subject)}`)}
                  className="g-card flex items-center justify-center transition hover:border-brandborder"
                  style={{ minHeight: 74, padding: "24px 32px" }}
                >
                  <span className="text-[16px] font-bold text-primary">{subject}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
