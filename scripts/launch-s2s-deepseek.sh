#!/bin/bash
# launch-s2s-deepseek.sh — 实时语音对话（情景通话）引擎启动：大脑接 DeepSeek 最快档。
#
# 实测（2026-09-10，api.deepseek.com 流式，本机）：
#   deepseek-v4-pro        首包 1.69s，reasoning 段大量烧预算（语音场景不可用）
#   deepseek-v4-flash      首包 0.86s；reasoning_effort=none 后 content 即时流出
#   ★ deepseek-chat（最终采用） 首包 0.15-0.21s，天生非推理，最快模式
# 复测（2026-09-11，stream 首个 content delta，同机）：
#   deepseek-chat          首包 367-440ms，仍最快 → 维持采用
#   deepseek-flash         默认先烧 600-850 字 reasoning，首包 1.4-1.7s（不可用）；
#                          +reasoning_effort=none → 602-740ms，仍不及 chat。
#                          （该参数 chat 后端经 extra_body 透传，已在本脚本里传 none）
#   → 结论：换 deepseek-flash 无收益，勿改。
#   TTS：默认 Qwen3-TTS(MLX 1.7B) 合成 RTF≈10（3.55s 音频要 36s）且独占 MLX 锁卡死
#        → 已换 kokoro-82M MPS（af_heart 美音）+ HF_HUB_OFFLINE=1
#          （CPU 跑 82M 首句合成 ~5s 太慢；MPS 快但会和 STT 抢锁，
#           锁竞争的真正开销是每句 3-5 个 hf-mirror 在线 HEAD 校验，离线模式已根除）
#
# 引擎管线 = VAD → STT(Parakeet) → LLM(DeepSeek chat) → TTS(Kokoro)，
# handler 只取 delta.content。API key 取环境变量 DEEPSEEK_API_KEY，
# 未导出时自动读 ../mt-teach-api/.env.local（本脚本不硬编码密钥）。
# 端口 ws://localhost:8766/v1/realtime

set -euo pipefail

ENGINE_DIR="/Users/mac/ai-plan/speech-to-speech"
SERVE="${ENGINE_DIR}/.venv/bin/speech-to-speech"
PORT="${S2S_PORT:-8766}"

KEY="${DEEPSEEK_API_KEY:-}"
if [[ -z "$KEY" ]]; then
  KEY="$(sed -n 's/^DEEPSEEK_API_KEY=//p' "$(dirname "$0")/../../mt-teach-api/.env.local" | head -1 | tr -d '"' | tr -d "'")"
fi
if [[ -z "$KEY" ]]; then
  echo "缺少 DEEPSEEK_API_KEY：请 export 或写入 mt-teach-api/.env.local" >&2
  exit 1
fi

# HF 国内镜像（直连 huggingface.co 超时时，模型下载/校验走镜像）
export HF_ENDPOINT="${HF_ENDPOINT:-https://hf-mirror.com}"
# 模型/嗓音已缓存 → 离线模式。省掉每次合成的在线 HEAD 校验（每句 3-5 个请求×1-5s）
export HF_HUB_OFFLINE="${HF_HUB_OFFLINE:-1}"
exec env \
  OPENAI_API_KEY="$KEY" \
  DEEPSEEK_API_KEY="$KEY" \
  "$SERVE" serve \
  --host 0.0.0.0 \
  --port "$PORT" \
  --llm_backend chat-completions \
  --responses_api_base_url https://api.deepseek.com \
  --responses_api_api_key "$KEY" \
  --model_name deepseek-chat \
  --responses_api_reasoning_effort none \
  --tts kokoro \
  --kokoro_voice af_heart \
  --kokoro_lang_code a \
  --kokoro_speed 1.0
