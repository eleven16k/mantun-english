/**
 * OpenAI Realtime-compatible WebSocket client for the Lexi scenario call,
 * pointed at the local speech-to-speech engine (`speech-to-speech serve`
 * exposes ws://localhost:8765/v1/realtime) or any endpoint speaking the same
 * protocol.
 *
 * Protocol (kept minimal — the s2s server's pydantic validator rejects
 * session.update payloads with sub-fields it doesn't know):
 *   ← session.created                       on upgrade
 *   → session.update                        instructions + voice only
 *   → input_audio_buffer.append             PCM16 16 kHz mono, base64, ~40 ms
 *   ← input_audio_buffer.speech_started     server VAD: user turn start (barge-in — clear playback)
 *   ← conversation.item.input_audio_transcription.delta|completed   user text (delta = full replacement)
 *   ← response.output_audio.delta           PCM16 @ s2sOutputRate() mono, base64
 *   ← response.output_audio_transcript.delta|done   assistant text
 *   ← output_audio_buffer.cleared           server dropped pending audio (interrupt)
 *   ← response.done (status=cancelled?)     turn finished / barge-in cancel
 *
 * Audio runs through two AudioWorklets (public/worklets/): mic capture
 * down-samples to 16 kHz PCM16 chunks; playback resamples the server stream
 * up to the context rate with a queue that can be wiped mid-sentence.
 */
import { BASE_PATH, s2sOutputRate } from "./config";

export type CallStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "user-speaking"
  | "thinking"
  | "ai-speaking"
  | "error";

const MIC_CHUNK_MS = 40;
const MIC_TARGET_RATE = 16000;

function base64FromBytes(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToFloat32(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const pcm = new Int16Array(bytes.buffer);
  const f32 = new Float32Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) f32[i] = pcm[i] / 0x8000;
  return f32;
}

export interface RealtimeCallCallbacks {
  onStatus?: (status: CallStatus) => void;
  /** User speech transcript. `partial` rows are replaced by the next row. */
  onUserTranscript?: (text: string, partial: boolean) => void;
  /** Completed assistant reply for one response turn. */
  onAssistantTranscript?: (text: string) => void;
  /** Mic loudness (0..1 RMS), emitted per capture chunk for UI meters. */
  onLevel?: (rms: number) => void;
  onError?: (message: string) => void;
}

export interface RealtimeCallOptions extends RealtimeCallCallbacks {
  url: string;
  instructions: string;
  /** Server PCM output rate (16 kHz local pipeline default). */
  outputRate?: number;
}

export class RealtimeCall {
  private opts: RealtimeCallOptions;
  private ws: WebSocket | null = null;
  private ctx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private micSrc: MediaStreamAudioSourceNode | null = null;
  private captureNode: AudioWorkletNode | null = null;
  private playbackNode: AudioWorkletNode | null = null;
  private configured = false;
  private closed = false;
  private userPartial = "";
  private assistantBuf = "";
  private assistantHadAudio = false;
  private statusValue: CallStatus = "idle";

  constructor(opts: RealtimeCallOptions) {
    this.opts = opts;
  }

  get status(): CallStatus {
    return this.statusValue;
  }

  private setStatus(s: CallStatus) {
    if (this.statusValue === s) return;
    this.statusValue = s;
    this.opts.onStatus?.(s);
  }

  private send(obj: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  /** Full handshake — call from a user gesture (mic permission + AudioContext). */
  async start() {
    this.setStatus("connecting");
    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      this.fail("mic");
      throw err;
    }
    // StrictMode remount / fast unmount: cleanup ran while we awaited — bail.
    if (this.closed) {
      this.micStream.getTracks().forEach((t) => t.stop());
      return;
    }

    const ctx = new AudioContext({ latencyHint: "interactive" });
    this.ctx = ctx;
    if (this.closed) {
      this.micStream.getTracks().forEach((t) => t.stop());
      void ctx.close();
      this.ctx = null;
      return;
    }
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        // best-effort; iOS resume already happened in the gesture
      }
    }
    if (this.closed) {
      this.micStream.getTracks().forEach((t) => t.stop());
      void ctx.close();
      this.ctx = null;
      return;
    }

    const outRate = this.opts.outputRate ?? s2sOutputRate();
    await ctx.audioWorklet.addModule(`${BASE_PATH}/worklets/lexi-mic-capture.js`);
    await ctx.audioWorklet.addModule(`${BASE_PATH}/worklets/lexi-audio-playback.js`);
    if (this.closed) {
      this.micStream.getTracks().forEach((t) => t.stop());
      void ctx.close();
      this.ctx = null;
      return;
    }

    this.captureNode = new AudioWorkletNode(ctx, "lexi-mic-capture", {
      numberOfInputs: 1,
      numberOfOutputs: 0,
      processorOptions: { targetRate: MIC_TARGET_RATE, chunkMs: MIC_CHUNK_MS },
    });
    this.captureNode.port.onmessage = (e: MessageEvent) => {
      if (e.data instanceof ArrayBuffer) this.sendMicChunk(e.data);
      else if (e.data?.kind === "level") this.opts.onLevel?.(e.data.rms as number);
    };

    this.micSrc = ctx.createMediaStreamSource(this.micStream);
    this.micSrc.connect(this.captureNode);

    this.playbackNode = new AudioWorkletNode(ctx, "lexi-audio-playback", {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
    });
    this.playbackNode.port.postMessage({ kind: "config", inputRate: outRate });
    this.playbackNode.connect(ctx.destination);

    await this.openWebSocket();
  }

  private openWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.closed) {
        resolve();
        return;
      }
      const ws = new WebSocket(this.opts.url);
      this.ws = ws;
      ws.onopen = () => {
        if (this.closed) {
          ws.close();
          resolve();
          return;
        }
        resolve();
      };
      ws.onerror = () => {
        if (!this.closed) {
          this.fail("connect");
          reject(new Error("Realtime WebSocket failed"));
        }
      };
      ws.onclose = () => {
        if (!this.closed) {
          this.setStatus("idle");
        }
      };
      ws.onmessage = (e) => this.onServerEvent(e.data);
    });
  }

  private sendMicChunk(pcm16: ArrayBuffer) {
    if (!this.configured || this.muted) return; // server rejects audio before session.update; muted = hold audio
    const b64 = base64FromBytes(new Uint8Array(pcm16));
    this.send({ type: "input_audio_buffer.append", audio: b64 });
  }

  /** Mute = hold mic audio client-side; the server simply hears silence. */
  setMuted(muted: boolean) {
    this.muted = muted;
  }

  private muted = false;

  private onServerEvent(raw: unknown) {
    if (typeof raw !== "string") return;
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(raw);
    } catch {
      return;
    }
    const type = event.type as string | undefined;
    if (!type) return;

    switch (type) {
      case "session.created":
        // Minimal session.update — extra sub-fields get the whole event
        // rejected by the server's validator.
        this.send({
          type: "session.update",
          session: {
            type: "realtime",
            instructions: this.opts.instructions,
            audio: { output: {} },
          },
        });
        this.configured = true;
        this.setStatus("connected");
        break;

      case "input_audio_buffer.speech_started":
        // Barge-in: stop playback immediately.
        this.playbackNode?.port.postMessage({ kind: "clear" });
        this.assistantHadAudio = false;
        this.setStatus("user-speaking");
        break;

      case "input_audio_buffer.speech_stopped":
        if (this.statusValue === "user-speaking") this.setStatus("thinking");
        break;

      case "conversation.item.input_audio_transcription.delta": {
        // Server emits the latest full hypothesis, not a suffix.
        const delta = String(event.delta ?? "").trim();
        if (delta && delta !== this.userPartial) {
          this.userPartial = delta;
          this.opts.onUserTranscript?.(delta, true);
        }
        break;
      }

      case "conversation.item.input_audio_transcription.completed": {
        const transcript = String(event.transcript ?? "").trim();
        this.userPartial = "";
        if (transcript) this.opts.onUserTranscript?.(transcript, false);
        break;
      }

      case "response.created":
        this.assistantBuf = "";
        this.assistantHadAudio = false;
        if (this.statusValue === "connected" || this.statusValue === "user-speaking") {
          this.setStatus("thinking");
        }
        break;

      case "response.output_audio.delta": {
        const delta = event.delta as string | undefined;
        if (delta) {
          this.assistantHadAudio = true;
          const samples = base64ToFloat32(delta);
          this.playbackNode?.port.postMessage({ kind: "audio", samples }, [samples.buffer]);
          this.setStatus("ai-speaking");
        }
        break;
      }

      case "response.output_audio_transcript.delta": {
        const delta = event.delta as string | undefined;
        if (delta) this.assistantBuf += delta;
        break;
      }

      case "response.output_audio_transcript.done": {
        const transcript = String(event.transcript ?? "").trim();
        if (transcript) {
          this.assistantBuf = "";
          this.opts.onAssistantTranscript?.(transcript);
        }
        break;
      }

      case "output_audio_buffer.cleared":
        this.playbackNode?.port.postMessage({ kind: "clear" });
        break;

      case "response.done": {
        const response = event.response as { status?: string } | undefined;
        const cancelled = response?.status === "cancelled";
        // A barge-in cut (user heard part of it) keeps its partial transcript;
        // a speculative response that never played is dropped.
        const tail = this.assistantBuf.trim();
        if (tail && (!cancelled || this.assistantHadAudio)) {
          this.opts.onAssistantTranscript?.(tail);
        }
        this.assistantBuf = "";
        if (this.statusValue === "ai-speaking" || this.statusValue === "thinking") {
          this.setStatus("connected");
        }
        break;
      }

      case "error": {
        const err = event.error as { message?: string } | undefined;
        this.opts.onError?.(err?.message ?? "Realtime error");
        break;
      }
    }
  }

  private fail(kind: "mic" | "connect") {
    this.setStatus("error");
    this.opts.onError?.(
      kind === "mic"
        ? "Microphone access denied. Check browser settings and try again."
        : "Could not reach the realtime voice server. Is `speech-to-speech serve` running?"
    );
  }

  /** Hang up and release every resource. */
  close() {
    if (this.closed) return;
    this.closed = true;
    this.configured = false;
    try {
      this.ws?.close();
    } catch {
      // already closed
    }
    this.micStream?.getTracks().forEach((t) => t.stop());
    try {
      this.micSrc?.disconnect();
      this.captureNode?.disconnect();
      this.playbackNode?.disconnect();
    } catch {
      // nodes may already be detached
    }
    void this.ctx?.close();
    this.ws = null;
    this.micStream = null;
    this.ctx = null;
    this.setStatus("idle");
  }
}
