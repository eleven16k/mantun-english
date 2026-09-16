#!/usr/bin/env python3
"""
gen_phoneme_audio_kokoro.py — 音标纯音生成（Kokoro 神经 TTS，裸 IPA 音素直输）。

Kokoro 的 KPipeline 支持绕过 G2P 直接喂音素串（misaki 输出格式）— 注意
**不带斜杠**（'/æ/' 会 tokenize 失败返回空，裸 'æ' 正常）：
  public/audio/phonics/phonemes/{slug}.mp3        正常速
  public/audio/phonics/phonemes/{slug}-slow.mp3   慢速（speed=0.7）

自然嗓音 + 音素级准确；沿用 espeak 版的 volumedetect 验证（> -45dB）。
前置：speech-to-speech/.venv（kokoro+misaki）、ffmpeg
用法：.venv/bin/python scripts/gen_phoneme_audio_kokoro.py
"""

import pathlib
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf

S2S_VENV = pathlib.Path("/Users/mac/ai-plan/speech-to-speech/.venv")
sys.path.insert(0, str(S2S_VENV / "lib/python3.12/site-packages"))

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "phonics" / "phonemes"
MIN_MAX_VOLUME_DB = -45.0

# slug → 裸 IPA 音素串（与 content/phonics/data.ts 对应；不带斜杠！）
PHONEME_IPA = {
    "ih": "ɪ", "eh": "e", "ae": "æ", "uh": "ʌ", "o": "ɒ", "uu": "ʊ", "schwa": "ə",
    "ee": "iː", "ar": "ɑː", "or": "ɔː", "oo": "uː", "er": "ɜː",
    "ay": "eɪ", "eye": "aɪ", "oy": "ɔɪ", "ow": "aʊ", "oh": "əʊ",
    "eer": "ɪə", "air": "eə", "oor": "ʊə",
    "p": "p", "b": "b", "t": "t", "d": "d", "k": "k", "g": "ɡ",
    "f": "f", "v": "v", "th": "θ", "dh": "ð", "s": "s", "z": "z",
    "sh": "ʃ", "zh": "ʒ", "h": "h",
    "ch": "tʃ", "dj": "dʒ",
    "m": "m", "n": "n", "ng": "ŋ", "l": "l", "r": "ɹ", "y": "j", "w": "w",
}


def max_volume_db(path: pathlib.Path) -> float:
    out = subprocess.run(
        ["ffmpeg", "-i", str(path), "-af", "volumedetect", "-f", "null", "/dev/null"],
        capture_output=True,
    ).stderr.decode()
    for line in out.splitlines():
        if "max_volume:" in line:
            return float(line.split("max_volume:")[1].split("dB")[0].strip())
    return -999.0


def synth(pipe, ipa: str, wav: pathlib.Path, speed: float) -> None:
    audio = next(iter(pipe(ipa, voice="af_heart", speed=speed)))[2]
    if audio is None or len(audio) == 0:
        raise RuntimeError(f"empty audio for {ipa!r}")
    sf.write(str(wav), np.asarray(audio, dtype=np.float32), 24000)


def gen_one(pipe, slug: str, ipa: str, suffix: str, speed: float) -> bool:
    mp3 = OUT / f"{slug}{suffix}.mp3"
    with tempfile.TemporaryDirectory() as td:
        wav = pathlib.Path(td) / "x.wav"
        try:
            synth(pipe, ipa, wav, speed)
        except Exception as e:
            print(f"  FAIL {slug}{suffix}: {e}", file=sys.stderr)
            return False
        if max_volume_db(wav) < MIN_MAX_VOLUME_DB:
            print(f"  SILENT {slug}{suffix}", file=sys.stderr)
            return False
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav),
             "-af", "apad=pad_dur=0.25", "-ar", "24000", "-b:a", "64k", str(mp3)],
            check=True,
        )
    return True


def main() -> None:
    from kokoro import KPipeline
    OUT.mkdir(parents=True, exist_ok=True)
    pipe = KPipeline(lang_code="a")
    print(f"{len(PHONEME_IPA)} phonemes · Kokoro af_heart → {OUT.relative_to(ROOT)}")
    done = 0
    for slug, ipa in sorted(PHONEME_IPA.items()):
        a = gen_one(pipe, slug, ipa, "", 1.0)
        b = gen_one(pipe, slug, ipa, "-slow", 0.7)
        done += (a is True) + (b is True)
    print(f"generated {done}/{len(PHONEME_IPA) * 2} files")


if __name__ == "__main__":
    main()
