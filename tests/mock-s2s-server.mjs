/**
 * Mock OpenAI Realtime-compatible server for testing the Lexi scenario call
 * client without the real speech-to-speech engine. Speaks the minimal
 * protocol the app uses:
 *
 *   → session.update                      ← session.created
 *   → input_audio_buffer.append           (RMS-gated VAD simulation)
 *   ← input_audio_buffer.speech_started / speech_stopped
 *   ← conversation.item.input_audio_transcription.delta / completed
 *   ← response.created / response.output_audio.delta (soft tone PCM16 16 kHz)
 *   ← response.output_audio_transcript.delta / done
 *   ← response.done
 *
 * VAD simulation: chunks only count when their RMS exceeds a speech
 * threshold (~ speech energy), so ambient room noise and speaker echo do
 * NOT trigger turns. After a turn completes there is a cooldown before the
 * next one can start — the caller gets the mic back.
 *
 * Usage: node tests/mock-s2s-server.mjs [port]   (default 8799)
 */
import { WebSocketServer } from "ws";

const port = Number(process.argv[2] ?? 8799);

// VAD simulation knobs
const RMS_THRESHOLD = 900; // PCM16 amplitude (~0.027 full-scale) ≈ speech, not hum
const SPEECH_CHUNKS_TO_TRIGGER = 8; // 8 × 40 ms ≈ 320 ms of actual speech
const COOLDOWN_MS = 2500; // after a reply, hands the mic back to the user

const REPLIES = [
  "Great choice! One coffee coming right up. Anything else?",
  "Sure thing! I'll get that started for you now.",
  "No problem at all. Anything to eat with that?",
];

const wss = new WebSocketServer({ port });
console.log(`[mock-s2s] listening on ws://localhost:${port}/v1/realtime (RMS-gated VAD)`);

function tonePcm16(rate = 16000, ms = 180, freq = 392, amp = 2600) {
  const n = Math.floor((rate * ms) / 1000);
  const pcm = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const fade = i < n * 0.1 || i > n * 0.9 ? 0.5 : 1; // soft edges, no clicks
    pcm[i] = Math.round(Math.sin((2 * Math.PI * freq * i) / rate) * amp * fade);
  }
  return Buffer.from(pcm.buffer);
}

let sessionSeq = 0;

wss.on("connection", (ws) => {
  const id = ++sessionSeq;
  console.log(`[mock-s2s] session ${id} connected`);
  let speechChunks = 0;
  let turn = 0;
  let busy = false;
  let cooldownUntil = 0;
  let streamTimer = null;

  ws.send(JSON.stringify({ type: "session.created", session: { id: `sess_mock_${id}` } }));

  ws.on("message", (raw) => {
    let evt;
    try {
      evt = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (evt.type === "session.update") {
      console.log(`[mock-s2s] session.update: instructions=${(evt.session?.instructions ?? "").slice(0, 60)}…`);
    } else if (evt.type === "input_audio_buffer.append") {
      if (busy || Date.now() < cooldownUntil) return;
      if (rmsOf(evt.audio) >= RMS_THRESHOLD) {
        speechChunks++;
        if (speechChunks >= SPEECH_CHUNKS_TO_TRIGGER) {
          speechChunks = 0;
          simulateTurn();
        }
      } else {
        // decay: brief noises shouldn't accumulate
        speechChunks = Math.max(0, speechChunks - 1);
      }
    }
  });

  function rmsOf(b64) {
    try {
      const buf = Buffer.from(b64, "base64");
      const n = buf.length >> 1;
      let sum = 0;
      for (let i = 0; i < n; i++) {
        const s = buf.readInt16LE(i * 2);
        sum += s * s;
      }
      return Math.sqrt(sum / Math.max(1, n));
    } catch {
      return 0;
    }
  }

  function simulateTurn() {
    busy = true;
    turn++;
    const send = (o) => ws.readyState === 1 && ws.send(JSON.stringify(o));
    const itemId = `item_${id}_${turn}`;
    const userText = `Hello I would like to order a coffee please (turn ${turn})`;
    const reply = REPLIES[(turn - 1) % REPLIES.length];

    send({ type: "input_audio_buffer.speech_started", item_id: itemId });
    setTimeout(() => {
      send({
        type: "conversation.item.input_audio_transcription.delta",
        item_id: itemId,
        delta: userText.slice(0, Math.ceil(userText.length / 2)),
      });
      send({ type: "input_audio_buffer.speech_stopped", item_id: itemId });
      send({
        type: "conversation.item.input_audio_transcription.completed",
        item_id: itemId,
        transcript: userText,
      });
      send({ type: "response.created", response: { id: `resp_${id}_${turn}` } });
      // ~0.7 s soft tone as the "voice", split into 4 deltas
      const pcm = tonePcm16();
      let part = 0;
      streamTimer = setInterval(() => {
        if (part < 4) {
          send({ type: "response.output_audio.delta", response_id: `resp_${id}_${turn}`, delta: pcm.toString("base64") });
          part++;
        } else {
          clearInterval(streamTimer);
          streamTimer = null;
          send({ type: "response.output_audio_transcript.delta", response_id: `resp_${id}_${turn}`, delta: reply });
          send({ type: "response.output_audio_transcript.done", response_id: `resp_${id}_${turn}`, transcript: reply });
          send({ type: "response.done", response: { id: `resp_${id}_${turn}`, status: "completed" } });
          busy = false;
          cooldownUntil = Date.now() + COOLDOWN_MS;
          console.log(`[mock-s2s] turn ${turn} done — mic back to user for ${COOLDOWN_MS}ms`);
        }
      }, 180);
    }, 250);
  }

  ws.on("close", () => {
    if (streamTimer) clearInterval(streamTimer);
    console.log(`[mock-s2s] session ${id} closed`);
  });
});
