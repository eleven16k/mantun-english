"use client";

/**
 * lib/sound.ts — Web Audio 合成音效（零音频资产）。
 * 听感对齐 TypeWords 的键盘手感：按键嗒声 / 错误低鸣 / 通关上扬双音。
 * 合成而非引用音频文件——避免引入 GPL 仓库资产（协议污染）。
 * 遵循设置页开关：localStorage `lexi-settings` 的 soundOn / hapticOn。
 */

let ctx: AudioContext | null = null;

function audioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC({ latencyHint: "interactive" });
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** 用户手势后预热（挂载时调用，消除首键延迟） */
export function warmupSound() {
  audioCtx();
}

function pref(key: "soundOn" | "hapticOn", fallback = true): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = JSON.parse(window.localStorage.getItem("lexi-settings") || "{}");
    return typeof saved[key] === "boolean" ? saved[key] : fallback;
  } catch {
    return fallback;
  }
}

export function vibrate(ms = 60) {
  if (!pref("hapticOn")) return;
  navigator.vibrate?.(ms);
}

/** 打对字符：短促机械嗒声（噪声 burst + 高通） */
export function keyClick() {
  if (!pref("soundOn")) return;
  const ac = audioCtx();
  if (!ac) return;
  const dur = 0.03;
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * dur), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 2500;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.14, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
  src.connect(hp).connect(gain).connect(ac.destination);
  src.start();
}

/** 打错字符：低频短鸣 */
export function keyError() {
  if (!pref("soundOn")) return;
  const ac = audioCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(165, ac.currentTime);
  gain.gain.setValueAtTime(0.16, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.13);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.14);
}

/** 单词通关：C5→G5 上扬双音 */
export function successChime() {
  if (!pref("soundOn")) return;
  const ac = audioCtx();
  if (!ac) return;
  const notes = [523.25, 783.99];
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const t0 = ac.currentTime + i * 0.1;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(0.22, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
    osc.connect(gain).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + 0.24);
  });
}
