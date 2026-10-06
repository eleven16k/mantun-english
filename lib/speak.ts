"use client";

/**
 * 浏览器无关的「句子/单词播报」统一出口（V8 清晰度修复）。
 *
 * 神经 TTS（服务端 qwen，音色稳定清晰）优先；失败回落 phonics.speakText
 * （精选白名单嗓音的浏览器合成）。之前裸用 speechSynthesis 导致播报质量
 * 听设备脸色——Windows 桌面嗓含糊到「不知道在播什么」。
 *
 * 注意：神经路径忽略 rate 参数（原速最清晰）；慢速重播由 playPcm 的
 * playbackRate 承担（不变调）。
 */
import { speakText, stopSpeech } from "./phonics";
import { speakNeural, stopNeural } from "./tts";

export function speakEn(text: string, rate = 1): Promise<void> {
  return (async () => {
    if (await speakNeural(text, rate)) return;
    speakText(text, rate);
  })();
}

/** 打断播报（神经 + 浏览器合成一起停）。 */
export function stopSpeakEn() {
  stopNeural();
  stopSpeech();
}
