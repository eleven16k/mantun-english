"use client";

/**
 * ParagraphAudio — 悦读馆音频播放件：预生成 mp3 优先（playMp3，404 记忆
 * 防重复请求），缺失/播放失败回退浏览器 speechSynthesis（speakText，按
 * 当前语速朗读）。语速三档：mp3 走慢速文件/原速文件 + playbackRate，
 * TTS 直接调 rate。
 */

import { useEffect, useRef, useState } from "react";
import { playMp3, speakText, stopSpeech } from "@/lib/phonics";

export type QuestSpeed = 0.8 | 1.0 | 1.2;

const SPEED_TABS: QuestSpeed[] = [0.8, 1.0, 1.2];

interface Props {
  /** 正常速 mp3 URL */
  src: string;
  /** 慢速 mp3 URL（-slow 后缀） */
  slowSrc: string;
  /** mp3 缺失时 TTS 兜底的文本 */
  fallbackText: string;
  speed: QuestSpeed;
  /** 播放状态回调（列表高亮当前段用） */
  onPlayingChange?: (playing: boolean) => void;
  /** 用户手动点击时通知（区别于 auto 触发；连续读模式下用于打断序列） */
  onManualStart?: () => void;
  /** 自动播放（答题进题时播一次） */
  auto?: boolean;
  children?: React.ReactNode;
}

export function useQuestAudio() {
  const [speed, setSpeed] = useState<QuestSpeed>(1.0);
  return { speed, setSpeed };
}

export function QuestPlayButton({
  src,
  slowSrc,
  fallbackText,
  speed,
  onPlayingChange,
  onManualStart,
  auto = false,
}: Omit<Props, "children">) {
  const [playing, setPlaying] = useState(false);
  const seqRef = useRef(0);

  const play = async () => {
    const seq = ++seqRef.current;
    stopSpeech();
    setPlaying(true);
    onPlayingChange?.(true);
    try {
      // 0.8x 用预生成慢速文件（发音更清晰）；1.2x 原文件 + playbackRate；
      // mp3 缺失 → TTS 兜底（按档位调 rate）
      const useSlow = speed === 0.8;
      const ok = await playMp3(useSlow ? slowSrc : src, speed === 1.2 ? 1.15 : 1);
      if (!ok) {
        await speakText(fallbackText, speed === 0.8 ? 0.7 : speed === 1.2 ? 1.15 : 0.9);
      }
    } finally {
      if (seq === seqRef.current) {
        setPlaying(false);
        onPlayingChange?.(false);
      }
    }
  };

  useEffect(() => {
    if (!auto) return;
    void play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, auto]);

  useEffect(() => () => stopSpeech(), []);

  return (
    <button
      type="button"
      className="ph-btn ph-btn--sm"
      onClick={() => {
        onManualStart?.();
        void play();
      }}
      aria-label="play audio"
      style={playing ? { transform: "translateY(2px)", boxShadow: "none" } : undefined}
    >
      {playing ? "🔈 …" : "🔊 Play"}
    </button>
  );
}

export function SpeedTabs({ speed, setSpeed }: { speed: QuestSpeed; setSpeed: (s: QuestSpeed) => void }) {
  return (
    <span className="rq-speed-tabs" role="group" aria-label="speed">
      {SPEED_TABS.map((s) => (
        <button
          key={s}
          type="button"
          className={`rq-speed-tab ${speed === s ? "rq-speed-tab--on" : ""}`}
          onClick={() => setSpeed(s)}
        >
          {s}×
        </button>
      ))}
    </span>
  );
}
