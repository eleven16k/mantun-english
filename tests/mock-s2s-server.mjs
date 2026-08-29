/**
 * Mock OpenAI Realtime-compatible server for testing the Lexi scenario call
 * client without the real speech-to-speech engine. Speaks the minimal
 * protocol the app uses:
 *
 *   → session.update                      ← session.created
 *   → input_audio_buffer.append           (counted, drives VAD simulation)
 *   ← input_audio_buffer.speech_started / speech_stopped (on ~12 chunks of audio)
 *   ← conversation.item.input_audio_transcription.delta / completed
 *   ← response.created / response.output_audio.delta (sine tone PCM16 16 kHz)
 *   ← response.output_audio_transcript.delta / done
 *   ← response.done
 *
 * Usage: node tests/mock-s2s-server.mjs [port]   (default 8799)
 */
import { WebSocketServer } from "ws";

const port = Number(process.argv[2] ?? 8799);
const CHUNKS_PER_TURN = 12; // ~480 ms of mic audio triggers a "turn"

const wss = new WebSocketServer({ port });
console.log(`[mock-s2s] listening on ws://localhost:${port}/v1/realtime`);

function sinePcm16(rate = 16000, ms = 120, freq = 440) {
  const n = Math.floor((rate * ms) / 1000);
  const pcm = new Int16Array(n);
  for (let i = 0; i < n; i++) pcm[i] = Math.round(Math.sin((2 * Math.PI * freq * i) / rate) * 8000);
  return Buffer.from(pcm.buffer);
}

let sessionSeq = 0;

wss.on("connection", (ws) => {
  const id = ++sessionSeq;
  console.log(`[mock-s2s] session ${id} connected`);
  let chunkCount = 0;
  let turn = 0;
  let busy = false;
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
      chunkCount++;
      if (!busy && chunkCount % CHUNKS_PER_TURN === 0) simulateTurn();
    }
  });

  function simulateTurn() {
    busy = true;
    turn++;
    const send = (o) => ws.readyState === 1 && ws.send(JSON.stringify(o));
    send({ type: "input_audio_buffer.speech_started", item_id: `item_${id}_${turn}` });
    // partial transcription hypothesis
    setTimeout(() => {
      send({
        type: "conversation.item.input_audio_transcription.delta",
        item_id: `item_${id}_${turn}`,
        delta: "Hello I would like to order a",
      });
      send({ type: "input_audio_buffer.speech_stopped", item_id: `item_${id}_${turn}` });
      send({
        type: "conversation.item.input_audio_transcription.completed",
        item_id: `item_${id}_${turn}`,
        transcript: `Hello I would like to order a coffee please (turn ${turn})`,
      });
      send({ type: "response.created", response: { id: `resp_${id}_${turn}` } });
      // stream a ~1 s tone as 4 audio deltas (user can hear a faint beep)
      const pcm = sinePcm16();
      let part = 0;
      streamTimer = setInterval(() => {
        if (part < 4) {
          send({ type: "response.output_audio.delta", response_id: `resp_${id}_${turn}`, delta: pcm.toString("base64") });
          part++;
        } else {
          clearInterval(streamTimer);
          const reply = `Great choice! One coffee coming right up. Anything else? (turn ${turn})`;
          send({ type: "response.output_audio_transcript.delta", response_id: `resp_${id}_${turn}`, delta: reply });
          send({ type: "response.output_audio_transcript.done", response_id: `resp_${id}_${turn}`, transcript: reply });
          send({ type: "response.done", response: { id: `resp_${id}_${turn}`, status: "completed" } });
          busy = false;
        }
      }, 260);
    }, 350);
  }

  ws.on("close", () => {
    if (streamTimer) clearInterval(streamTimer);
    console.log(`[mock-s2s] session ${id} closed`);
  });
});
