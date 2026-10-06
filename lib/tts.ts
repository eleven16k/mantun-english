"use client";

/**
 * 神经 TTS 播放（V8 句子播报清晰度修复）。
 *
 * 背景：浏览器 speechSynthesis 的音色完全取决于设备（Windows 桌面嗓含糊、
 * 长句可能被截断）——句法馆跟读/V8 跟读段「不清晰」的根源。此模块统一走
 * 服务端神经 TTS（/api/scenarios/tts，ZenMux qwen，生产 key 已有），失败
 * 时由调用方回落 phonics.speakText（精选白名单嗓音）。
 *
 * - 进程内缓存（同文本重播 0 等待）；prefetchTts 供跟读段挂载时预热
 * - playPcm 从场景页提取为公共实现（AudioBufferSourceNode.playbackRate
 *   支持慢速重播，不变调压缩）
 */

/** base64 PCM16 → 播放。resolve 于播完或 cancel；rate<1 慢速不变调。 */
export function playPcm(
  base64: string,
  sampleRate: number,
  registerCancel?: (cancel: () => void) => void,
  rate = 1
): Promise<void> {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const pcm = new Int16Array(bytes.buffer);
  const ctx = new AudioContext();
  const buffer = ctx.createBuffer(1, pcm.length, sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) channel[i] = pcm[i] / 32768;
  let closed = false;
  const closeCtx = () => {
    if (closed) return;
    closed = true;
    void ctx.close().catch(() => {});
  };
  return new Promise((resolve) => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = Math.max(0.4, Math.min(2, rate));
    src.onended = () => {
      closeCtx();
      resolve();
    };
    src.connect(ctx.destination);
    src.start();
    registerCancel?.(() => {
      try {
        src.stop();
      } catch {
        // already stopped
      }
      closeCtx();
      resolve();
    });
  });
}

import { scenarioTTS } from "./api";

interface TtsClip {
  audio: string;
  sampleRate: number;
}

const CACHE_MAX = 60;
const ttsCache = new Map<string, TtsClip>();

let currentCancel: (() => void) | null = null;

/** 拉取神经 TTS（带缓存）；失败返回 null（调用方回落浏览器 TTS）。 */
export async function fetchNeuralTts(text: string): Promise<TtsClip | null> {
  const hit = ttsCache.get(text);
  if (hit) return hit;
  try {
    const clip = await scenarioTTS(text);
    if (!clip?.audio) return null;
    ttsCache.set(text, clip);
    if (ttsCache.size > CACHE_MAX) {
      const oldest = ttsCache.keys().next().value;
      if (oldest !== undefined) ttsCache.delete(oldest);
    }
    return clip;
  } catch {
    return null;
  }
}

/** 预热（跟读段/词汇段挂载时批量调用，点播时 0 等待）。 */
export function prefetchTts(text: string) {
  void fetchNeuralTts(text).catch(() => {});
}

/** 神经播报；成功返回 true（resolve 于播完/被打断）。 */
export async function speakNeural(text: string, rate = 1): Promise<boolean> {
  const clip = await fetchNeuralTts(text);
  if (!clip) return false;
  return playPcm(clip.audio, clip.sampleRate, (cancel) => {
    currentCancel = cancel;
  }, rate).then(() => {
    if (currentCancel) currentCancel = null;
    return true;
  }, () => false);
}

/** 打断当前神经播报（切页/换句时用）。 */
export function stopNeural() {
  currentCancel?.();
  currentCancel = null;
}
