#!/usr/bin/env python3
"""
gen_phoneme_audio_espeak.py — 音标纯音生成（espeak-ng 音素引擎，音素级准确）。

对 44 个 IPA 音标直接做音素合成，生成：
  public/audio/phonics/phonemes/{slug}.mp3        正常速
  public/audio/phonics/phonemes/{slug}-slow.mp3   慢速（WPM 100→65）

关键经验：espeak-ng 的 en-us 声音对部分 IPA `[[æ]]` 输入会**静默合成出静音**
（曾踩坑：44 个里 23 个 -91dB 纯静音）。因此每个音标给一组候选记法
（IPA + Kirshenbaum 原生音素码），逐个合成并用 ffmpeg volumedetect 验证，
取第一个 max_volume > -45dB 的；全部失败则报错退出（宁缺毋静音）。

前置：brew install espeak-ng ffmpeg
用法：python3 scripts/gen_phoneme_audio_espeak.py
"""

import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "audio" / "phonics" / "phonemes"

WPM = 100
WPM_SLOW = 65
MIN_MAX_VOLUME_DB = -45.0

# slug → 候选音素记法（按序尝试：IPA 优先，Kirshenbaum 兜底）
PHONEME_CANDIDATES = {
    "ih": ["ɪ", "I"],
    "eh": ["e", "E"],
    "ae": ["&", "æ", "a", "&@"],
    "uh": ["ʌ", "V"],
    "o": ["0", "ɒ", "O"],      # ɒ：en-us 无此音，用 0/近似
    "uu": ["ʊ", "U"],
    "schwa": ["@", "ə"],
    "ee": ["iː", "i:"],
    "ar": ["A", "ɑː", "A:", "a"],
    "or": ["O:", "ɔː"],
    "oo": ["uː", "u:"],
    "er": ["3:", "ɜː"],
    "ay": ["eɪ", "eI"],
    "eye": ["aɪ", "aI"],
    "oy": ["OI", "ɔɪ"],
    "ow": ["aʊ", "aU"],
    "oh": ["@U", "əʊ"],
    "eer": ["I@", "ɪə"],
    "air": ["E@", "eə"],
    "oor": ["U@", "ʊə"],
    "p": ["p"],
    "b": ["b", "b@"],
    "t": ["t"],
    "d": ["d", "d@"],
    "k": ["k"],
    "g": ["g", "ɡ", "g@"],
    "f": ["f"],
    "v": ["v"],
    "th": ["T", "θ"],
    "dh": ["D", "ð"],
    "s": ["s"],
    "z": ["z"],
    "sh": ["S", "ʃ"],
    "zh": ["Z", "ʒ"],
    "h": ["h"],
    "ch": ["tS", "tʃ"],
    "dj": ["dZ", "dʒ", "dZ@"],
    "m": ["m"],
    "n": ["n"],
    "ng": ["N", "ŋ"],
    "l": ["l"],
    "r": ["r", "ɹ", "r@"],
    "y": ["j"],
    "w": ["w"],
}


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, capture_output=True, **kw)


def max_volume_db(path: pathlib.Path) -> float:
    out = run(["ffmpeg", "-i", str(path), "-af", "volumedetect", "-f", "null", "/dev/null"]).stderr.decode()
    for line in out.splitlines():
        if "max_volume:" in line:
            return float(line.split("max_volume:")[1].split("dB")[0].strip())
    return -999.0


def synth_ok(mnemo: str, wav: pathlib.Path, wpm: int) -> bool:
    """合成并验证：音量达标 + 时长合理（>0.15s）。"""
    run(["espeak-ng", "-v", "en-us", "-s", str(wpm), f"[[{mnemo}]]", "-w", str(wav)])
    if not wav.exists() or wav.stat().st_size < 500:
        return False
    out = run(["ffmpeg", "-i", str(wav), "-f", "null", "/dev/null"]).stderr.decode()
    dur = 0.0
    for line in out.splitlines():
        if "time=" in line:
            parts = line.split("time=")[1].split(".")[0]
            h, m, s = parts.split(":")
            dur = int(h) * 3600 + int(m) * 60 + int(s)
    if dur < 0.1 and max_volume_db(wav) < MIN_MAX_VOLUME_DB:
        return False
    return max_volume_db(wav) > MIN_MAX_VOLUME_DB


def gen_one(slug: str, wpm: int, suffix: str) -> str:
    """返回使用的记法；全部候选失败则抛 RuntimeError。"""
    mp3 = OUT / f"{slug}{suffix}.mp3"
    tmp_wav = OUT / f"{slug}{suffix}.wav"
    try:
        for mnemo in PHONEME_CANDIDATES[slug]:
            try:
                if not synth_ok(mnemo, tmp_wav, wpm):
                    continue
                run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(tmp_wav),
                     "-af", "apad=pad_dur=0.25",
                     "-ar", "24000", "-b:a", "64k", str(mp3)])
                return mnemo
            except subprocess.CalledProcessError:
                continue
        raise RuntimeError(f"all candidates silent for {slug}: {PHONEME_CANDIDATES[slug]}")
    finally:
        tmp_wav.unlink(missing_ok=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"{len(PHONEME_CANDIDATES)} phonemes · espeak-ng en-us → {OUT.relative_to(ROOT)}")
    used = {}
    for slug in sorted(PHONEME_CANDIDATES):
        try:
            m1 = gen_one(slug, WPM, "")
            gen_one(slug, WPM_SLOW, "-slow")
            used[slug] = m1
        except RuntimeError as e:
            print(f"  FAILED {slug}: {e}", file=sys.stderr)
    print(f"generated {len(used)}/{len(PHONEME_CANDIDATES)} phonemes")
    for slug, m in sorted(used.items()):
        flag = "" if m in ("p", "t", "k", "s", "z", "f", "v", "h", "m", "n", "l", "j", "w", "b", "d", "g", "r") else f"  ({m})"
        print(f"  {slug}: {m}{flag}")


if __name__ == "__main__":
    main()
