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

A protocol-compatible mock engine for development is included:

```bash
node tests/mock-s2s-server.mjs 8799
# then NEXT_PUBLIC_S2S_URL=ws://localhost:8799/v1/realtime npm run dev
```

### NPC text chat / TTS / Word Quest (Gemini)

Set `GEMINI_API_KEY` in `.env.local` (see `.env.example`). Without a key the
pages degrade gracefully: static vocab lists, a friendly chat error, and an
offline spelling quiz for Word Quest.

## Tests

```bash
npm run test:unit    # vitest
npm run build        # type-check + production build
```
