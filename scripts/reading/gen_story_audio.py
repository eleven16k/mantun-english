#!/usr/bin/env python3
"""
gen_story_audio.py — 悦读馆段落/题目音频预生成（Edge-TTS，免费无 key）。
克隆 scripts/gen_phonics_audio.py 的模式：从 content/reading/stories/{track}/*.json
提取段落 text 与题目 audioText，生成两种语速 mp3（缺失或过小才重生成，可断点续跑）：

  public/audio/reading/{track}/{storyId}/{paraId}.mp3        段落正常速
  public/audio/reading/{track}/{storyId}/{paraId}-slow.mp3   段落慢速（-25%）
  public/audio/reading/{track}/{storyId}/quiz{i}.mp3         题目音频（image_choice 问题 /
  public/audio/reading/{track}/{storyId}/quiz{i}-slow.mp3    sentence_order 句子 /
                                                             fill_blank 完整句 / word_builder 词）

播放层优先读这些 mp3，缺失时回退浏览器 speechSynthesis。

用法：python3 scripts/reading/gen_story_audio.py [--track=xiaoshengchu] [--concurrency=8]
嗓音：小升初 en-US-AnaNeural（童声）/ 中考、高考 en-US-AriaNeural（女声）。
依赖：pip3 install edge-tts
"""

import asyncio
import json
import pathlib
import sys

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
STORIES = ROOT / "content" / "reading" / "stories"
OUT = ROOT / "public" / "audio" / "reading"

VOICE_BY_TRACK = {
    "xiaoshengchu": "en-US-AnaNeural",
    "zhongkao": "en-US-AriaNeural",
    "gaokao": "en-US-AriaNeural",
}
SLOW_RATE = "-25%"

args = sys.argv[1:]
TRACK_FILTER = next((a.split("=", 1)[1] for a in args if a.startswith("--track=")), None)
CONCURRENCY = int(next((a.split("=", 1)[1] for a in args if a.startswith("--concurrency=")), "8"))


def collect_jobs():
    """返回 [(text, path, rate)]；已存在且 >1KB 的跳过。"""
    jobs = []
    total = 0
    for track_dir in sorted(STORIES.iterdir()):
        track = track_dir.name
        if TRACK_FILTER and track != TRACK_FILTER:
            continue
        voice = VOICE_BY_TRACK.get(track, "en-US-AriaNeural")
        out_dir = OUT / track
        for f in sorted(track_dir.glob("*.json")):
            story = json.loads(f.read_text(encoding="utf-8"))
            story_dir = out_dir / story["id"]
            items = [("para", f"{story['id']}-p{i:02d}", p["text"]) for i, p in enumerate(story["paragraphs"])]
            items += [("quiz", f"quiz{i}", q.get("audioText") or "") for i, q in enumerate(story["quiz"])]
            for kind, slug, text in items:
                text = text.strip()
                if not text:
                    continue
                total += 1
                for rate, suffix in (("+0%", ""), (SLOW_RATE, "-slow")):
                    final = story_dir / f"{slug}{suffix}.mp3"
                    if final.exists() and final.stat().st_size > 1000:
                        continue
                    jobs.append((text, final, rate, voice))
    return jobs, total


async def gen(text, path, rate, voice, sem):
    async with sem:
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            tmp = path.with_suffix(".part")
            await edge_tts.Communicate(text, voice, rate=rate).save(str(tmp))
            tmp.rename(path)
            return 1
        except Exception as e:  # noqa: BLE001 — 单条失败不阻断整批
            print(f"  ! {path.name}: {e}", file=sys.stderr)
            tmp.unlink(missing_ok=True)
            return 0


async def main():
    jobs, total = collect_jobs()
    print(f"{total} 个音频片段，待生成 {len(jobs)} 个文件 → {OUT.relative_to(ROOT)}")
    if not jobs:
        return
    sem = asyncio.Semaphore(CONCURRENCY)
    done = 0
    # 分批 gather，避免一次性建上千协程句柄
    CHUNK = 64
    for i in range(0, len(jobs), CHUNK):
        results = await asyncio.gather(*(gen(*j, sem) for j in jobs[i : i + CHUNK]))
        done += sum(results)
        print(f"  进度 {min(i + CHUNK, len(jobs))}/{len(jobs)}")
    print(f"完成：生成 {done}，失败 {len(jobs) - done}")


if __name__ == "__main__":
    asyncio.run(main())
