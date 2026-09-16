# Lexi App

Gamified English practice for Chinese K12 students — Next.js 14 + Socket.IO + SQLite.

## Run

```bash
npm install
npm run dev        # node server.js (Next + Socket.IO) on :3123
```

Log in with the demo account `13800000001` (OTP code is echoed in the UI in dev).

## Scenario calls (NovaWorld integration)

`/scenarios` — immersive role-play: chat with an NPC (structured EN reply +
中文翻译 + learning tip + suggestion for your message), target-vocab
highlighting, and **live voice calls**.

### Voice calls: speech-to-speech engine

Live calls speak the **OpenAI Realtime WebSocket protocol** against the local
[Hugging Face speech-to-speech](https://github.com/huggingface/speech-to-speech)
engine (VAD → STT → LLM → TTS, all local):

```bash
pip install speech-to-speech
export OPENAI_API_KEY=...   # or point the LLM at any OpenAI-compatible server
speech-to-speech serve      # ws://localhost:8765/v1/realtime
```

The app connects automatically; for phone/LAN access set
`NEXT_PUBLIC_S2S_URL=ws://<mac-ip>:8765/v1/realtime` (see `.env.example`).
Protocol details live in `lib/realtime.ts`; audio runs through two
AudioWorklets in `public/worklets/`.

To run the engine's LLM brain on **DeepSeek's fastest voice config**
(deepseek-v4-flash + reasoning off — measured content-first-packet ≈0.86 s,
vs 1.69 s + heavy reasoning on v4-pro):

```bash
scripts/launch-s2s-deepseek.sh   # ws://localhost:8766/v1/realtime
# 等价手敲：
speech-to-speech serve \
  --llm_backend chat-completions \
  --responses_api_base_url https://api.deepseek.com \
  --responses_api_api_key <DEEPSEEK_API_KEY> \
  --model_name deepseek-v4-flash \
  --responses_api_reasoning_effort none
```

A protocol-compatible mock engine for development is included:

```bash
node tests/mock-s2s-server.mjs 8799
# then NEXT_PUBLIC_S2S_URL=ws://localhost:8799/v1/realtime npm run dev
```

### AI providers (text generation)

Provider layering in `server/ai.ts` — first configured wins:

1. **OpenAI-compatible gateway** (`LLM_API_KEY`, default
   `https://zm.oxsm.gz.cn/api/v1` + `z-ai/glm-5.3-flash`, vision + reasoning)
   — powers `/solve` 看图解题, scenario NPC chat, briefing vocab, Word Quest.
2. **Gemini** (`GEMINI_API_KEY`) — fallback.
3. Nothing set → graceful degradation (static vocab, offline Word Quest).
   Scenario TTS replay is Gemini-only (the gateway has no TTS model).

Note: `node server.js` loads `.env.local` via `@next/env` (server.js top).

The DeepTutor sidecar (生题 via /import) is configured separately in its own
settings — its active profile was switched to this same gateway + model
(profile `zm-gateway`, provider `custom`).

## Tests

```bash
npm run test:unit    # vitest
npm run build        # type-check + production build
```
