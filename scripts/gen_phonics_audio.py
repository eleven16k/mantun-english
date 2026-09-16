#!/usr/bin/env python3
"""
gen_phonics_audio.py — 拼读馆单词音频预生成（Edge-TTS，免费无 key）。

从 content/phonics/data.ts 提取全部单词（words[].text + 音标例词），
生成两种语速的神经嗓音 mp3：
  public/audio/phonics/words/{word}.mp3        正常速
  public/audio/phonics/words/{word}-slow.mp3   慢速（-25%，拆读用）

播放层（lib/phonics.ts speakWord）自动优先读这些 mp3，缺失时回退
浏览器 speechSynthesis——新增单词后重跑本脚本即可补音频。

用法：python3 scripts/gen_phonics_audio.py [voice]
默认嗓音 en-US-AnaNeural（美音童声，适配低龄）；可选
en-US-AriaNeural（女声）/ en-US-EmmaNeural / en-GB-SoniaNeural（英音）。
"""

import asyncio
import pathlib
import re
import sys

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "content" / "phonics" / "data.ts"
OUT = ROOT / "public" / "audio" / "phonics" / "words"

VOICE = sys.argv[1] if len(sys.argv) > 1 else "en-US-AnaNeural"
SLOW_RATE = "-25%"


def extract_words() -> set[str]:
    src = DATA.read_text(encoding="utf-8")
    words = set(re.findall(r'text: "([A-Za-z]+)"', src))
    examples = set(re.findall(r'exampleWord: "([A-Za-z]+)"', src))
    return {w for w in (words | examples) if w}


async def gen(text: str, path: pathlib.Path, rate: str = "+0%") -> str:
    final = path.with_suffix(".mp3")
    if final.exists() and final.stat().st_size > 1000:
        return "skip"
    tmp = final.with_suffix(".part")
    await edge_tts.Communicate(text, VOICE, rate=rate).save(str(tmp))
    tmp.rename(final)
    return "gen"


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    words = sorted(extract_words())
    print(f"{len(words)} unique words · voice={VOICE} → {OUT.relative_to(ROOT)}")
    done = 0
    for w in words:
        a = await gen(w, OUT / w.lower())
        b = await gen(w, OUT / f"{w.lower()}-slow", SLOW_RATE)
        done += (a == "gen") + (b == "gen")
    print(f"generated {done} files ({len(words) * 2 - done} skipped, already exist)")


if __name__ == "__main__":
    asyncio.run(main())
