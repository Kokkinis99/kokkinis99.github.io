import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  readonly muted = signal(false);

  private ctx: AudioContext | null = null;
  private buffers: Record<string, AudioBuffer> = {};
  private raw: Record<string, ArrayBuffer> = {};
  private decoding = new Set<string>();

  constructor() {
    fetch('assets/sounds/button-press.mp3')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['press'] = b));
    fetch('assets/sounds/button-release.mp3')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['release'] = b));
    fetch('assets/sounds/hover-1.ogg')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['hover-1'] = b));
    fetch('assets/sounds/hover-2.ogg')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['hover-2'] = b));
    fetch('assets/sounds/open.mp3')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['open'] = b));
    fetch('assets/sounds/close.mp3')
      .then((r) => r.arrayBuffer())
      .then((b) => (this.raw['close'] = b));

    // pointermove fires as the user moves their mouse toward any button,
    // before mouseenter — giving us a chance to warm up the context so
    // hover sounds play on first entry without needing a click first.
    // pointerdown/keydown are kept as fallback for keyboard users.
    const cleanup = () => {
      document.removeEventListener('pointermove', unlock);
      document.removeEventListener('pointerdown', unlock, { capture: true });
      document.removeEventListener('keydown', unlock, { capture: true });
    };
    const unlock = () => {
      if (!this.ctx) this.ctx = new AudioContext();
      this.ctx.resume().then(() => {
        if (this.ctx?.state === 'running') cleanup();
      });
    };
    document.addEventListener('pointermove', unlock, { passive: true });
    document.addEventListener('pointerdown', unlock, { passive: true, capture: true });
    document.addEventListener('keydown', unlock, { capture: true });
  }

  toggleMute(): void {
    const wasMuted = this.muted();
    this.muted.set(!wasMuted);
    if (wasMuted) this.playPress();
  }

  play(id: string, semitones = 0, volume = 1): void {
    if (this.muted()) return;
    // Skip silently if the context hasn't been unlocked by a trusted gesture
    // yet — avoids the autoplay-policy warning on mouseenter events.
    if (!this.ctx || this.ctx.state !== 'running') return;

    const ctx = this.ctx;
    const buffer = this.buffers[id];
    if (buffer) {
      this.trigger(ctx, buffer, semitones, volume);
      return;
    }

    if (this.decoding.has(id)) return;
    const raw = this.raw[id];
    if (!raw) return;

    this.decoding.add(id);
    ctx.decodeAudioData(raw).then((decoded) => {
      this.buffers[id] = decoded;
      this.decoding.delete(id);
      if (this.ctx?.state === 'running') this.trigger(this.ctx, decoded, semitones, volume);
    });
  }

  playPress(volume = 1): void {
    this.play('press', (Math.random() * 2 - 1) * 2, volume);
  }

  playRelease(volume = 1): void {
    this.play('release', (Math.random() * 2 - 1) * 2, volume);
  }

  playHover(volume = 1): void {
    const id = Math.random() < 0.5 ? 'hover-1' : 'hover-2';
    this.play(id, (Math.random() * 2 - 1) * 2 + 5, volume);
  }

  playOpen(): void {
    this.play('open', (Math.random() * 2 - 1) * 2);
  }

  /** Second-image slide-in — same file as open but pitched down ~8 semitones so it sounds distinct. */
  playSlide(): void {
    this.play('open', (Math.random() * 2 - 1) * 1.5 - 8);
  }

  playClose(): void {
    this.play('close', (Math.random() * 2 - 1) * 2);
  }

  /** Fan-out card sound — higher pitch than open, each card index steps up. */
  playFan(index: number): void {
    this.play('open', (Math.random() * 2 - 1) * 1 + 5 + index * 2);
  }

  playHoverHigh(): void {
    const id = Math.random() < 0.5 ? 'hover-1' : 'hover-2';
    this.play(id, (Math.random() * 2 - 1) * 2 + 10, 0.3);
  }

  private trigger(
    ctx: AudioContext,
    buffer: AudioBuffer,
    semitones: number,
    volume: number,
  ): void {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = Math.pow(2, semitones / 12);
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(gain).connect(ctx.destination);
    source.start();
  }
}
