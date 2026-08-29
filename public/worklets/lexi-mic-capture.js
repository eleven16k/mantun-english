/**
 * Lexi mic capture worklet.
 *
 * Captures the mic at whatever rate the AudioContext runs (typically 48 kHz),
 * resamples to a fixed target rate (16 kHz — the speech-to-speech pipeline's
 * native rate), converts to PCM16 mono and posts ~40 ms chunks to the main
 * thread as transferable ArrayBuffers, plus an RMS level for UI meters.
 *
 * main -> worklet:
 *   (nothing — configure via processorOptions)
 * worklet -> main:
 *   ArrayBuffer                      PCM16 mono chunk @ targetRate
 *   { kind: "level", rms: number }   input loudness (0..1)
 */
class LexiMicCapture extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = (options && options.processorOptions) || {};
    this._targetRate = opts.targetRate || 16000;
    this._chunkMs = opts.chunkMs || 40;
    this._ratio = sampleRate / this._targetRate;
    this._frac = 0;
    this._pending = [];
    this._pendingFrames = 0;
    this._framesPerChunk = Math.floor((this._targetRate * this._chunkMs) / 1000);
    this._dropping = false;
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;
    const ch = input[0];
    if (!ch) return true;

    // RMS for the UI level meter (on the raw input).
    let sum = 0;
    for (let i = 0; i < ch.length; i++) sum += ch[i] * ch[i];
    const rms = Math.sqrt(sum / ch.length);
    this.port.postMessage({ kind: "level", rms });

    // Linear-interp downsample to the target rate.
    for (let i = 0; i < ch.length; i++) {
      this._frac += 1 / this._ratio;
      while (this._frac >= 1) {
        this._pending.push(ch[i]);
        this._pendingFrames++;
        this._frac -= 1;
      }
    }

    if (this._pendingFrames >= this._framesPerChunk) {
      const out = new Int16Array(this._pendingFrames);
      for (let i = 0; i < this._pendingFrames; i++) {
        const s = Math.max(-1, Math.min(1, this._pending[i] || 0));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      this._pending = [];
      this._pendingFrames = 0;
      // Transfer the buffer copy — zero-copy handoff to the main thread.
      this.port.postMessage(out.buffer, [out.buffer]);
    }
    return true;
  }
}

registerProcessor("lexi-mic-capture", LexiMicCapture);
