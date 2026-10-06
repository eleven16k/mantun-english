"use client";

/**
 * /typing — 抽卡打字馆（机制启发 TypeWords，零代码复用）。
 * 视图流转：home（词书/进度/十连抽+复习抽卡）→ gacha（翻卡揭晓）→
 * practice（四步法 step-major：跟打→辨义→听写→默写）→ repair（错词修复轮，
 * 默写至对）→ done（结算）→ book（图鉴，受损卡标记）。
 * 经济：登录走 /api/economy（金币/SP/弱点本服务端结算），游客本地记账。
 * 卡牌同步：登录拉取 /api/typing/cards 合并（stage 取 max），通关 fire-and-forget 上报。
 * 进度持久化 localStorage `lexi-typing-v1`（lib/typing.ts）。
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { useGameStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { fetchTypingCards, isLoggedIn, pushTypingCard, submitAnswer } from "@/lib/api";
import {
  RARITY_META,
  RARITIES,
  TYPING_STEPS,
  cardRarity,
  cardKey,
  drawWords,
  dueCount,
  mergeServerCards,
  passStep,
  readProgress,
  stepsForWord,
  writeProgress,
  bookStats,
  type TypingProgress,
  type TypingStepId,
  type WordBook,
  type WordEntry,
} from "@/lib/typing";
import { BOOK_METAS, ZK_STARTER_BOOK, defaultBook, loadWordBook, bookMeta } from "@/content/typing/wordbooks";
import { savedStage, stageDef } from "@/lib/stage";
import { WordTypingCard } from "@/components/typing/WordTypingCard";
import { WordIdentifyCard } from "@/components/typing/WordIdentifyCard";
import { BrokenHeartIcon, CardsIcon, BookIcon, RefreshIcon, CoinIcon, StarIcon, KeyboardIcon } from "@/components/icons";
import "./typing.css";

type View = "home" | "gacha" | "practice" | "done" | "book";

interface DrawItem {
  word: WordEntry;
  prevStage: number; // 抽到时已通关步骤（-1 = 新卡）
}

interface QueueItem {
  word: WordEntry;
  step: TypingStepId;
}

/** 每次通关的本地金币展示值（登录态以服务端结算为准，此值仅兜底动画） */
const PASS_COINS = 2;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function TypingPage() {
  const { t } = useI18n();
  const earnCoins = useGameStore((s) => s.earnCoins);

  const [view, setView] = useState<View>("home");
  const [progress, setProgress] = useState<TypingProgress>({ v: 1, cards: {}, draws: 0, lastDraw: null });
  const [draw, setDraw] = useState<DrawItem[]>([]);
  const [flipped, setFlipped] = useState<number>(0);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [repairing, setRepairing] = useState(false); // 当前处于修复轮
  const [sessionCoins, setSessionCoins] = useState(0);
  const [sessionUpgrades, setSessionUpgrades] = useState(0);
  const [dropKey, setDropKey] = useState(0);
  const [due, setDue] = useState(0);
  const wrongKeysRef = useRef<Set<string>>(new Set()); // 本组错词（会话内修复轮）
  const repairRoundRef = useRef(0);

  const [bookId, setBookId] = useState<string>(ZK_STARTER_BOOK.id);
  const [book, setBook] = useState<WordBook>(defaultBook());
  const [bookLoading, setBookLoading] = useState(false);

  // 水合安全：首帧默认空进度，挂载后读 localStorage；登录态再拉服务端合并
  useEffect(() => {
    const local = readProgress();
    setProgress(local);
    setDue(dueCount(book, local.cards));
    if (isLoggedIn()) {
      fetchTypingCards(book.id)
        .then((serverCards) => {
          if (serverCards.length === 0) return;
          const merged = mergeServerCards(readProgress(), serverCards);
          writeProgress(merged);
          setProgress(merged);
          setDue(dueCount(book, merged.cards));
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.id]);

  // 切书：恢复上次选择 → 按需加载（builtin 同步）
  useEffect(() => {
    // 恢复上次词书，否则按学段角色默认（挂载后读，避免 hydration mismatch）
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lexi-typing-book") : null;
    const initial = saved && bookMeta(saved) ? saved : stageDef(savedStage()).bookId;
    if (initial !== ZK_STARTER_BOOK.id) setBookId(initial);
  }, []);

  useEffect(() => {
    if (bookId === book.id) return;
    setBookLoading(true);
    loadWordBook(bookId)
      .then((b) => {
        setBook(b);
        window.localStorage.setItem("lexi-typing-book", b.id);
      })
      .catch(() => setBookId(book.id)) // 加载失败回退当前书
      .finally(() => setBookLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const stats = useMemo(() => bookStats(book, progress), [book, progress]);

  const syncDue = useCallback(
    (p: TypingProgress) => setDue(dueCount(book, p.cards)),
    [book],
  );

  // ─── 抽卡 ───

  const doDraw = (dueFirst = false) => {
    const p = readProgress();
    const words = drawWords(book, p.cards, 10, { dueFirst });
    if (words.length === 0) return;
    const items: DrawItem[] = words.map((w) => {
      const c = p.cards[cardKey(book.id, w.en)];
      return { word: w, prevStage: c ? c.stage : -1 };
    });
    p.draws += 1;
    p.lastDraw = { bookId: book.id, keys: items.map((i) => cardKey(book.id, i.word.en)), at: Date.now() };
    writeProgress(p);
    setProgress(p);
    syncDue(p);
    wrongKeysRef.current = new Set();
    repairRoundRef.current = 0;
    setDraw(items);
    setFlipped(0);
    setView("gacha");
  };

  // ─── 练习队列：四步法 step-major（跟打→辨义→听写→默写）───

  const startPractice = () => {
    const p = readProgress();
    const needs = (item: DrawItem, step: TypingStepId) =>
      stepsForWord(p.cards[cardKey(book.id, item.word.en)]).includes(step);
    const q: QueueItem[] = [];
    for (const step of TYPING_STEPS) {
      const seg = draw.filter((i) => needs(i, step));
      if (step === "listen" || step === "dictation") q.push(...shuffle(seg).map(({ word }) => ({ word, step })));
      else q.push(...seg.map(({ word }) => ({ word, step })));
    }
    if (q.length === 0) q.push({ word: draw[0].word, step: "follow" });
    setQueue(q);
    setQIdx(0);
    setRepairing(false);
    setSessionCoins(0);
    setSessionUpgrades(0);
    setView("practice");
  };

  const reportPass = useCallback(
    async (word: WordEntry, step: TypingStepId) => {
      // 本地升星
      setProgress((prev) => {
        const p = { ...prev, cards: { ...prev.cards } };
        const key = cardKey(book.id, word.en);
        const before = p.cards[key]?.stage ?? -1;
        const card = passStep(p, book.id, word.en, step);
        writeProgress(p);
        if (card.stage > before) setSessionUpgrades((n) => n + 1);
        return p;
      });
      syncDue(readProgress());
      // 修复语义：仅修复轮内的通关销账——主队列的后续步骤不洗白先前的失误
      if (repairing) wrongKeysRef.current.delete(word.en.toLowerCase());
      // 经济：登录走服务端结算；游客本地记账（对齐主玩法游客体验）
      setSessionCoins((c) => c + PASS_COINS);
      setDropKey((k) => k + 1);
      const logged = isLoggedIn();
      if (logged) {
        try {
          const r = await submitAnswer(`typing:${book.id}:${word.en.toLowerCase()}`, true, `${step}:${word.en}`, {
            questionType: `typing_${step}`,
            correct: word.en,
          });
          if (typeof r?.coinsEarned === "number" && r.coinsEarned !== PASS_COINS) {
            setSessionCoins((c) => c - PASS_COINS + r.coinsEarned);
          }
        } catch {
          /* 静默：网络失败不阻塞练习 */
        }
      } else {
        earnCoins(PASS_COINS);
      }
      // 卡牌跨设备同步（fire-and-forget）
      if (logged) pushTypingCard(book.id, word.en, step, 0).catch(() => {});
    },
    [book.id, earnCoins, syncDue, repairing],
  );

  const reportWrong = useCallback(
    (word: WordEntry) => {
      wrongKeysRef.current.add(word.en.toLowerCase());
      // 只对已收集的卡累计错误（新词答错不落卡——stage:-1 会让 cardRarity 越界白屏）
      setProgress((prev) => {
        const key = cardKey(book.id, word.en);
        const c = prev.cards[key];
        if (!c) return prev;
        const p = { ...prev, cards: { ...prev.cards, [key]: { ...c, wrongCount: c.wrongCount + 1 } } };
        writeProgress(p);
        return p;
      });
      if (isLoggedIn()) {
        // 错误全口径上报：红心惩罚/弱点本/Jev 错因诊断闭环（economy 内部按免费额度决定扣心）
        submitAnswer(`typing:${book.id}:${word.en.toLowerCase()}`, false, `wrong:${word.en}`, {
          questionType: "typing_wrong",
          correct: word.en,
        }).catch(() => {});
        pushTypingCard(book.id, word.en, "wrong", 1).catch(() => {});
      }
    },
    [book.id],
  );

  const nextItem = () => {
    if (qIdx + 1 < queue.length) {
      setQIdx(qIdx + 1);
      return;
    }
    // 主队列/修复轮完 → 仍有错词且未超轮数上限 → 再进修复轮（默写至对，≤3 轮）
    if (wrongKeysRef.current.size > 0 && repairRoundRef.current < 3) {
      repairRoundRef.current += 1;
      const byEn = new Map(draw.map((d) => [d.word.en.toLowerCase(), d.word]));
      const repairs = [...wrongKeysRef.current]
        .map((en) => byEn.get(en))
        .filter((w): w is WordEntry => !!w)
        .map((word) => ({ word, step: "dictation" as TypingStepId }));
      if (repairs.length > 0) {
        setQueue(repairs);
        setQIdx(0);
        setRepairing(true);
        return;
      }
    }
    setView("done");
  };

  // ─── 渲染 ───

  const cur = queue[qIdx];

  return (
    <AppShell>
      <div className="page-shell">
        <div className="tp-inner">
        {view === "home" && (
          <>
            <PageHeader badge="CARD TYPING" title={t("typing.title")} sub={t("typing.sub")} className="mb-4" />

            <div className="tp-books-row" role="tablist">
              {BOOK_METAS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={m.id === book.id}
                  className={`tp-book-chip ${m.id === book.id ? "on" : ""}`}
                  onClick={() => setBookId(m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div className="tp-book">
              <div className="tp-book-name">
                <BookIcon size={18} /> {book.name}
              </div>
              <div className="tp-book-meta">
                {book.nameEn} · {book.words.length} {t("typing.book")}
              </div>
              <div className="tp-bar">
                <i style={{ width: `${Math.round(stats.rate * 100)}%` }} />
              </div>
              <div className="tp-bar-legend">
                <span style={{ color: "var(--text-secondary)" }}>
                  {t("typing.collected")} {stats.collected}/{stats.total}
                </span>
                {RARITIES.map((r) => (
                  <span key={r} style={{ color: RARITY_META[r].color }}>
                    {r} ×{stats.byRarity[r]}
                  </span>
                ))}
              </div>
            </div>

            <button type="button" className="tp-draw-btn mt-5" disabled={bookLoading} onClick={() => doDraw(false)}>
              <CardsIcon size={20} /> {bookLoading ? t("typing.bookLoading") : `${t("typing.draw")} · ${t("typing.drawFree")}`}
            </button>

            {due > 0 ? (
              <button type="button" className="tp-draw-btn tp-draw-btn--due" style={{ marginTop: 10 }} onClick={() => doDraw(true)}>
                <RefreshIcon size={18} /> {t("typing.dueDraw")}
                <span className="tp-due-badge">{due}</span>
              </button>
            ) : (
              <p className="tp-due-empty">{t("typing.dueDrawEmpty")}</p>
            )}

            <button
              type="button"
              className="g-card mt-3 flex w-full items-center gap-3 p-4 text-left transition hover:border-brandborder"
              onClick={() => setView("book")}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--bg-brand-emphasis-default)" }}>
                <BookIcon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-primary">{t("typing.openBook")}</span>
                <span className="block text-xs text-tertiary truncate">
                  {t("typing.progressAll")} {stats.collected}/{stats.total}
                </span>
              </span>
              <span className="text-tertiary">›</span>
            </button>
          </>
        )}

        {view === "gacha" && (
          <>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", fontWeight: 800, margin: "8px 0 14px" }}>
              {t("typing.tapToFlip")}
            </p>
            <div className="tp-gacha-grid">
              {draw.map((item, i) => {
                const key = cardKey(book.id, item.word.en);
                const card = progress.cards[key];
                const rarity = card ? cardRarity(card) : "N";
                const isNew = item.prevStage === -1;
                const leveled = !isNew && card && card.stage > item.prevStage;
                const open = i < flipped;
                return (
                  <div
                    key={key}
                    className={`tp-card ${open ? "tp-card--open" : ""} ${rarity === "SSR" ? "tp-card--ssr" : ""}`}
                    onClick={() => setFlipped((f) => Math.max(f, i + 1))}
                  >
                    <div className="tp-card-inner">
                      <div className="tp-card-face tp-card-face--back">
                        <StarIcon size={22} />
                      </div>
                      <div className="tp-card-face tp-card-face--front" style={{ background: RARITY_META[rarity].bg }}>
                        <div className="tp-card-word">{item.word.en}</div>
                        <span className="tp-card-rarity" style={{ color: RARITY_META[rarity].color, background: "#fff" }}>
                          {rarity}
                        </span>
                        {isNew && <span className="tp-badge">{t("typing.newCards")}</span>}
                        {!isNew && leveled && <span className="tp-badge inline-flex items-center" style={{ background: "#7c3aed" }}><StarIcon size={10} filled /></span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button type="button" className="tp-draw-btn" style={{ marginTop: 16 }} onClick={startPractice}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <KeyboardIcon size={18} /> {t("typing.startPractice")}
              </span>
            </button>
            <button
              type="button"
              className="ph-btn ph-btn--ghost ph-btn--sm"
              style={{ marginTop: 10, width: "100%" }}
              onClick={() => setView("home")}
            >
              {t("typing.back")}
            </button>
          </>
        )}

        {view === "practice" && cur && (
          <>
            <div className="tp-progress" aria-hidden>
              {queue.map((_, i) => (
                <i key={i} className={i < qIdx ? "done" : i === qIdx ? "now" : ""} />
              ))}
            </div>
            {repairing && (
              <div className="tp-repair-banner">
                <BrokenHeartIcon size={16} /> {t("typing.repairDesc")}（{wrongKeysRef.current.size}）
              </div>
            )}
            {cur.step === "identify" ? (
              <WordIdentifyCard
                key={`${cur.step}-${cur.word.en}`}
                book={book}
                word={cur.word}
                onPass={() => {
                  reportPass(cur.word, cur.step);
                  nextItem();
                }}
                onWrong={() => reportWrong(cur.word)}
              />
            ) : (
              <WordTypingCard
                key={`${cur.step}-${cur.word.en}`}
                step={cur.step}
                word={cur.word}
                onPass={() => {
                  reportPass(cur.word, cur.step);
                  nextItem();
                }}
                onWrong={() => reportWrong(cur.word)}
              />
            )}
            {dropKey > 0 && (
              <div key={dropKey} className="coin-shower" aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} style={{ left: `${15 + i * 14}%`, animationDelay: `${i * 0.12}s` }}>
                    <CoinIcon size={18} />
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {view === "done" && (
          <div className="tp-done">
            <div className="tp-done-title">{repairing ? t("typing.repaired") : t("typing.sessionDone")}</div>
            <div className="tp-done-stat">
              <span>
                <CoinIcon size={16} /> {sessionCoins} {t("typing.coinsEarned")}
              </span>
              <span>
                <StarIcon size={16} filled /> {sessionUpgrades} {t("typing.levelUp")}
              </span>
            </div>
            <button type="button" className="tp-draw-btn" style={{ maxWidth: 320, margin: "20px auto 0", display: "flex" }} onClick={() => setView("home")}>
              {t("typing.back")}
            </button>
          </div>
        )}

        {view === "book" && (
          <>
            <PageHeader badge="CARD BOOK" title={t("typing.bookTitle")} sub={`${t("typing.progressAll")} ${stats.collected}/${stats.total}`} className="mb-4" />
            {stats.collected === 0 ? (
              <p style={{ textAlign: "center", color: "var(--text-tertiary)", marginTop: 24, fontWeight: 700 }}>
                {t("typing.bookEmpty")}
              </p>
            ) : (
              <div className="tp-book-grid" style={{ marginTop: 16 }}>
                {book.words.map((w) => {
                  const card = progress.cards[cardKey(book.id, w.en)];
                  const rarity = card ? cardRarity(card) : null;
                  const damaged = (card?.wrongCount ?? 0) > 0;
                  return (
                    <div key={w.en} className={`tp-book-card ${rarity ? "" : "tp-book-card--undrawn"}`}>
                      <div className="tp-book-card-word">
                        {rarity ? w.en : "?"}
                        {rarity && damaged && <BrokenHeartIcon size={11} className="tp-damaged-mark" />}
                      </div>
                      <div className="tp-book-card-cn">{rarity ? w.cn : "···"}</div>
                      {rarity && (
                        <span className="tp-book-card-rarity" style={{ color: RARITY_META[rarity].color, background: RARITY_META[rarity].bg }}>
                          {rarity}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <button
              type="button"
              className="ph-btn ph-btn--ghost ph-btn--sm"
              style={{ marginTop: 16, width: "100%" }}
              onClick={() => setView("home")}
            >
              {t("typing.back")}
            </button>
          </>
        )}
        </div>
      </div>
    </AppShell>
  );
}

