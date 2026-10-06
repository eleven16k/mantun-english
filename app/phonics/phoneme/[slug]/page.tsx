"use client";

/**
 * /phonics/phoneme/[slug] — 音标详情（juyou 皮肤黑描边大卡）。
 * 大音标 + 例词（TTS 双速）+ 常见拼法 + 课程内含该音标的单词。
 */

import Link from "next/link";
import { VolumeIcon, BookOpenIcon } from "@/components/icons";

import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { PHONEMES, PHONEME_GROUP_META, wordsWithPhoneme } from "@/content/phonics/data";
import { playPhoneme, speakWord, unlockAudio, underlineParts } from "@/lib/phonics";
import "../../phonics.css";

export default function PhonemeDetailPage() {
  const { t } = useI18n();
  const params = useParams<{ slug: string }>();
  const phoneme = PHONEMES.find((p) => p.slug === params.slug);

  if (!phoneme) {
    return (
      <AppShell>
        <div className="ph-page">
          <div className="ph-wrap text-center">
            <p className="ph-h1">404</p>
            <Link href="/phonics" className="ph-btn mt-6 inline-flex">
              {t("phonics.backToLand")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const meta = PHONEME_GROUP_META[phoneme.group];
  const related = wordsWithPhoneme(phoneme.symbol);

  return (
    <AppShell>
      <div className="ph-page">
        <div className="ph-wrap">
          <Link href="/phonics" className="ph-back">
            ← {t("phonics.backToLand")}
          </Link>

          <div className="ph-card--ink ph-stage" style={{ padding: "2rem 1.5rem" }}>
            <span className="ph-pill ph-pill--info" style={{ background: `${meta.hue}22`, color: meta.hue }}>
              ● {meta.label} {meta.en}
            </span>
            <p className="ph-phoneme-hero mt-4">{phoneme.symbol}</p>
            <p className="ph-word-ipa">
              {t("phonics.example")} ·{" "}
              <b>
                {underlineParts(phoneme.exampleWord, phoneme.grapheme).map((seg, i) =>
                  seg.ul ? (
                    <i key={i} className="ph-ul" style={{ textDecorationColor: meta.hue }}>{seg.text}</i>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )}
              </b>
            </p>

            <button
              type="button"
              className="ph-sound ph-sound--blue mt-5"
              aria-label={`play ${phoneme.symbol}`}
              onClick={() => {
                unlockAudio();
                // 只播音标纯音 ×2（间隔 350ms），例词由下方词块按钮负责
                const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
                void playPhoneme(phoneme.slug, phoneme.exampleWord, true)
                  .then(() => wait(350))
                  .then(() => playPhoneme(phoneme.slug, phoneme.exampleWord, true));
              }}
            >
              <VolumeIcon size={20} />
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className="ph-pill ph-pill--gold"
                aria-label={`play word ${phoneme.exampleWord}`}
                title={phoneme.exampleWord}
                onClick={() => {
                  unlockAudio();
                  void speakWord(phoneme.exampleWord, 0.6).then(() => speakWord(phoneme.exampleWord, 1));
                }}
              >
                {underlineParts(phoneme.exampleWord, phoneme.grapheme).map((seg, i) =>
                  seg.ul ? (
                    <i key={i} className="ph-ul" style={{ textDecorationColor: meta.hue }}>{seg.text}</i>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  ),
                )} <VolumeIcon size={18} className="inline" />
              </button>
              <span className="ph-pill ph-pill--gold">
                {t("phonics.grapheme")}: {phoneme.grapheme}
              </span>
              <span className="ph-pill ph-pill--info">{phoneme.type === "vowel" ? "Vowel 元音" : "Consonant 辅音"}</span>
            </div>
          </div>

          <p className="ph-group-title"><BookOpenIcon size={15} className="inline" /> {t("phonics.inWords")}</p>
          {related.length === 0 ? (
            <div className="ph-card text-center text-sm font-semibold" style={{ color: "var(--ph-ink-3)" }}>
              {t("phonics.noWords")}
            </div>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))" }}>
              {related.map((w) => (
                <Link
                  key={`${w.unitId}-${w.text}`}
                  href={`/phonics/unit/${w.unitId}`}
                  className="ph-card ph-card--lift text-center"
                  style={{ padding: "1rem 0.75rem" }}
                >
                  <span className="ph-emoji-sm text-3xl">{w.emoji}</span>
                  <p className="mt-1 font-black">{w.text}</p>
                  <p className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
                    {w.ipa}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
