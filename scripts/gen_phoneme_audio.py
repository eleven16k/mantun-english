#!/usr/bin/env python3
"""
gen_phoneme_audio.py — 拼读馆音标纯音预生成（Edge-TTS，免费无 key）。

为 44 个 IPA 音标生成近似音 mp3（拼读教学的 CV 近似读法）：
  public/audio/phonics/phonemes/{slug}.mp3        正常速
  public/audio/phonics/phonemes/{slug}-slow.mp3   慢速

- 元音：拉长读法（ay/eye/or…），TTS 可自然读出
- 辅音：CV 近似（buh/puh/fff/sssh）——真人录音前的过渡方案；
  audioPath 预留字段不受影响，真人 mp3 落同路径即覆盖生效。

用法：python3 scripts/gen_phoneme_audio.py [voice]
"""

import asyncio
import pathlib
import sys

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "phonics" / "phonemes"

VOICE = sys.argv[1] if len(sys.argv) > 1 else "en-US-AnaNeural"
SLOW_RATE = "-25%"

# slug → TTS 可读的近似音文本（元音拉长、辅音 CV 近似）
PHONEME_SAY = {
    # 短元音
    "ih": "ih",
    "eh": "eh",
    "ae": "aah",
    "uh": "uh",
    "o": "aw",
    "uu": "oo",
    "schwa": "uh",
    # 长元音
    "ee": "ee",
    "ar": "arr",
    "or": "or",
    "oo": "oo",
    "er": "err",
    # 双元音
    "ay": "ay",
    "eye": "eye",
    "oy": "oy",
    "ow": "ow",
    "oh": "oh",
    "eer": "ear",
    "air": "air",
    "oor": "oor",
    # 爆破音（CV 近似）
    "p": "puh",
    "b": "buh",
    "t": "tuh",
    "d": "duh",
    "k": "kuh",
    "g": "guh",
    # 摩擦音（可延长音直接延长）
    "f": "fff",
    "v": "vvv",
    "th": "thuh",
    "dh": "the",
    "s": "sss",
    "z": "zzz",
    "sh": "shh",
    "zh": "zhuh",
    "h": "huh",
    # 塞擦音
    "ch": "chuh",
    "dj": "juh",
    # 鼻音/流音/滑音（可延长）
    "m": "mmm",
    "n": "nnn",
    "ng": "ng",
    "l": "lll",
    "r": "rrr",
    "y": "yuh",
    "w": "wuh",
}


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
    print(f"{len(PHONEME_SAY)} phonemes · voice={VOICE} → {OUT.relative_to(ROOT)}")
    done = 0
    for slug, say in sorted(PHONEME_SAY.items()):
        a = await gen(say, OUT / slug)
        b = await gen(say, OUT / f"{slug}-slow", SLOW_RATE)
        done += (a == "gen") + (b == "gen")
    print(f"generated {done} files ({len(PHONEME_SAY) * 2 - done} skipped, already exist)")


if __name__ == "__main__":
    asyncio.run(main())
