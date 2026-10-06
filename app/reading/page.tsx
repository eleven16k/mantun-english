"use client";

/**
 * /reading — 悦读馆地图主页。学段（users.track）决定内容包与主题皮，
 * 三学段信息结构完全一致：Buddy 状态条 → 玩法三步卡 → 主题区（横幅 +
 * 课程行）。课程解锁 = 上一课通关（≥60）；进度 localStorage，首帧渲染
 * 固定未解锁态（水合安全，句法馆同款教训）。
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpenIcon, GamepadIcon, HeadphoneIcon, TrophyIcon, CheckIcon, LockIcon } from "@/components/icons";
import { AppShell } from "@/components/AppShell";
import { BuddyBar } from "@/components/reading/BuddyBar";
import { useI18n } from "@/lib/i18n";
import {
  getStoryProgress,
  resolveTrack,
  storyCleared,
  type StoryProgress,
} from "@/lib/reading";
import {
  loadTrackData,
  storiesOfRegion,
  storiesInOrder,
  type ReadingRegionSet,
  type ReadingStory,
  type ReadingTrack,
} from "@/content/reading";
import "../phonics/phonics.css";
import "./reading.css";

export default function ReadingPage() {
  const { t } = useI18n();
  const [track, setTrack] = useState<ReadingTrack>("xiaoshengchu");
  const [regionSet, setRegionSet] = useState<ReadingRegionSet | null>(null);
  const [stories, setStories] = useState<ReadingStory[]>([]);
  const [progress, setProgress] = useState<Record<string, StoryProgress>>({});
  const [evolved, setEvolved] = useState<{ from: number; to: number } | null>(null);
  const [ready, setReady] = useState(false);

  // 挂载后：解析学段（本地档案优先，缺失问服务端）→ 动态加载内容包 + 本地进度
  useEffect(() => {
    let alive = true;
    void resolveTrack().then((userTrack) => {
      if (!alive) return;
      setTrack(userTrack);
      void loadTrackData(userTrack).then((data) => {
        if (!alive) return;
        setRegionSet(data.REGION_SET);
        setStories(storiesInOrder(data));
        const next: Record<string, StoryProgress> = {};
        for (const s of data.STORIES) {
          const p = getStoryProgress(s.id);
          if (p) next[s.id] = p;
        }
        setProgress(next);
        setReady(true);
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  const orderedIds = stories.map((s) => s.id);

  // 解锁口径：全 track 第 1 课常开；否则上一课通关（与 sentence 馆同规则）
  const unlockedOf = (storyId: string) => {
    if (!ready) return false;
    const i = orderedIds.indexOf(storyId);
    if (i <= 0) return true;
    return storyCleared(orderedIds[i - 1]);
  };

  const clearedOf = (storyId: string) => ready && storyCleared(storyId);

  const stages = ["🥚", "🐣", "🐥", "🐉"];
  const evolvedTo = evolved ? (stages[evolved.to - 1] ?? "🐉") : "";

  return (
    <AppShell>
      <div className={`ph-page rq-page rq-theme-${regionSet?.theme ?? "magic"}`}>
        <div className="ph-wrap">
          <span className="ph-sticker">READING QUEST</span>
          <h1 className="ph-h1">{t("reading.title")}</h1>
          <p className="ph-sub">{t("reading.sub")}</p>

          {/* Buddy 状态条（登录态从服务端取，游客显示引导） */}
          <div className="mt-5">
            <BuddyBar track={track} onEvolved={(from, to) => setEvolved({ from, to })} />
          </div>

          {/* 玩法三步（降低学习成本：始终可见的一屏说明） */}
          <div className="ph-group-title"><GamepadIcon size={15} className="inline" /> {t("reading.tutorialTitle")}</div>
          <div className="sn-modes">
            <div className="sn-mode-card"><i><BookOpenIcon size={20} /></i><b>{t("reading.tutorial1").split("—")[0]}</b><span>{t("reading.tutorial1").split("—")[1] ?? ""}</span></div>
            <div className="sn-mode-card"><i><HeadphoneIcon size={20} /></i><b>{t("reading.tutorial2").split("—")[0]}</b><span>{t("reading.tutorial2").split("—")[1] ?? ""}</span></div>
            <div className="sn-mode-card"><i><TrophyIcon size={20} /></i><b>{t("reading.tutorial3").split("—")[0]}</b><span>{t("reading.tutorial3").split("—")[1] ?? ""}</span></div>
          </div>

          {/* 主题区 × 课程 */}
          {regionSet?.regions.map((region, ri) => {
            const regionStories = storiesOfRegion({ REGION_SET: regionSet, STORIES: stories }, region.id);
            const clearedCount = regionStories.filter((s) => clearedOf(s.id)).length;
            // 区解锁：第 1 区常开；否则上一区最后一课通关
            const firstIdx = orderedIds.indexOf(regionStories[0]?.id ?? "");
            const regionUnlocked = ri === 0 || (firstIdx > 0 && ready && storyCleared(orderedIds[firstIdx - 1]));
            return (
              <div key={region.id} className="mt-6">
                <div className="ph-group-title">
                  {region.icon} {region.cnName} · {region.name}
                </div>
                <div className={`rq-region ${regionUnlocked ? "" : "rq-region--locked"}`}>
                  <div className="rq-region-head">
                    <span className="rq-region-icon" aria-hidden>{region.icon}</span>
                    <span style={{ flex: 1 }}>
                      <span className="rq-region-name" style={{ display: "block" }}>
                        {region.cnName}
                      </span>
                      <span className="rq-region-meta">
                        {regionUnlocked
                          ? `${clearedCount}/${regionStories.length} ${t("reading.regionProgress")}`
                          : t("reading.lockedRegion")}
                      </span>
                    </span>
                  </div>

                  {regionUnlocked && (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {regionStories.map((story) => {
                        const unlocked = unlockedOf(story.id);
                        const cleared = clearedOf(story.id);
                        const best = progress[story.id]?.bestScore ?? 0;
                        const started = (progress[story.id]?.idx ?? 0) > 0 && !cleared;
                        return (
                          <div key={story.id} className={`ph-unit-row ${unlocked ? "" : "opacity-60"}`}>
                            <span className={`ph-unit-num ${cleared ? "ph-unit-num--done" : ""}`}>
                              {cleared ? <CheckIcon size={16} /> : unlocked ? story.coverEmoji : <LockIcon size={16} />}
                            </span>
                            <div className="ph-unit-main">
                              <p className="ph-unit-title">
                                {story.titleCn} <span style={{ color: "var(--ph-blue-deep)" }}>{story.title}</span>
                                {cleared && best > 0 && <span className="rq-node-score"> · {best}</span>}
                              </p>
                              <p className="ph-unit-meta">
                                {story.paragraphs.length} {t("reading.words")} · {story.quiz.length} {t("reading.quiz")}
                              </p>
                            </div>
                            {unlocked ? (
                              <Link href={`/reading/${story.id}`} className="ph-btn ph-btn--sm">
                                {cleared ? t("reading.again") : started ? t("reading.continue") : t("reading.start")}
                              </Link>
                            ) : (
                              <span className="ph-pill ph-pill--gold">{t("reading.locked")}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 进化仪式弹窗 */}
        {evolved && (
          <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setEvolved(null)}>
            <div className="game-modal w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs font-black" style={{ letterSpacing: "0.2em", color: "var(--ph-ink-3)" }}>
                {t("reading.evolveTitle")}
              </p>
              <p className="rq-evolve-face my-4">{evolvedTo}</p>
              <p className="font-black" style={{ fontSize: "1.1rem" }}>{t("reading.evolveDone")}</p>
              <button type="button" className="game-btn mt-5 w-full bg-action text-white" onClick={() => setEvolved(null)}>
                {t("reading.evolveBtn")}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
