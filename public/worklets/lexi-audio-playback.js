/**
 * Lexi audio playback worklet.
 *
 * Plays mono Float32 samples received from the main thread, linear-interp
 * resampling from the server's output rate (16/24 kHz PCM16 arrives as
 * Float32) up to the AudioContext rate. Queue wipes on barge-in.
 *
 * main -> worklet:
 *   { kind: "config", inputRate: 16000 }   one-shot at startup
 *   { kind: "audio", samples: Float32Array } per chunk (transferable)
 *   { kind: "clear" }                      wipe queue (user barge-in)
 * worklet -> main:
 *   { kind: "stats", queuedMs: number }    every ~250 ms
 */
const STATS_INTERVAL_FRAMES = 12000;
const FADE_FRAMES = 32;

class LexiAudioPlayback extends AudioWorkletProcessor {
  constructor() {
    super();
    this._inputRate = 16000;
    this._stepRatio = this._inputRate / sampleRate;
    this._queue = [];
    this._readIdx = 0;
    this._fracPos = 0;
    this._playing = false;
    this._framesSinceStats = 0;
    this._fadeIn = 0;
    this._fadeOut = 0;

    this.port.onmessage = (e) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      switch (data.kind) {
        case "config":
          if (typeof data.inputRate === "number" && data.inputRate > 0) {
            this._inputRate = data.inputRate;
            this._stepRatio = this._inputRate / sampleRate;
          }
          break;
        case "audio":
          if (data.samples instanceof Float32Array && data.samples.length > 0) {
            this._queue.push(data.samples);
            if (!this._playing) {
              this._playing = true;
              this._fadeIn = FADE_FRAMES;
              this._fadeOut = 0;
            }
          }
          break;
        case "clear":
          this._queue.length = 0;
          this._readIdx = 0;
          this._fracPos = 0;
          this._fadeOut = FADE_FRAMES;
          break;
      }
    };
  }

  _queuedSamples() {
    let total = -this._readIdx;
    for (const buf of this._queue) total += buf.length;
    return Math.max(0, total);
  }

  _readInterpolated() {
    let buf = this._queue[0];
    if (!buf) return 0;
    let idx = this._readIdx;
    let frac = this._fracPos;
    // Advance until we land inside a live buffer (drop drained heads).
    while (buf && idx >= buf.length) {
      this._queue.shift();
      idx -= buf.length;
      buf = this._queue[0];
    }
    if (!buf) return 0;
    this._readIdx = idx;
    const s0 = buf[idx];
    const s1 = idx + 1 < buf.length ? buf[idx + 1] : 0;
    return s0 + (s1 - s0) * frac;
  }

  process(_inputs, outputs) {
    const out = outputs[0][0];
    if (!out) return true;

    for (let i = 0; i < out.length; i++) {
      if (this._queue.length === 0 || (this._queue.length === 1 && this._readIdx >= this._queue[0].length)) {
        // Queue dry — output silence.
        if (this._playing) {
          this._playing = false;
          this._queue.length = 0;
          this._readIdx = 0;
          this._fracPos = 0;
        }
        out[i] = 0;
        continue;
      }

      let s = this._readInterpolated();
      this._fracPos += this._stepRatio;
      while (this._fracPos >= 1) {
        this._fracPos -= 1;
        this._readIdx++;
        // Consume drained head buffers so _queuedSamples stays accurate.
        while (this._queue.length && this._readIdx >= this._queue[0].length) {
          this._queue.shift();
          this._readIdx = 0;
        }
      }

      // Short fades on start/end to avoid clicks.
      if (this._fadeIn > 0) {
        s *= 1 - this._fadeIn / FADE_FRAMES;
        this._fadeIn--;
      } else if (this._fadeOut > 0) {
        s *= this._fadeOut / FADE_FRAMES;
        this._fadeOut--;
      }
      out[i] = s;
    }

    this._framesSinceStats += out.length;
    if (this._framesSinceStats >= STATS_INTERVAL_FRAMES) {
      this._framesSinceStats = 0;
      this.port.postMessage({ kind: "stats", queuedMs: (this._queuedSamples() / this._inputRate) * 1000 });
    }
    return true;
  }
}

registerProcessor("lexi-audio-playback", LexiAudioPlayback);
