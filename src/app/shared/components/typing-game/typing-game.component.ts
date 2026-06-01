import { Component, computed, effect, ElementRef, HostListener, inject, output, signal, viewChild } from "@angular/core";
import { WORDS } from "../../words";
import { LucideAngularModule, RotateCw, X } from "lucide-angular";
import { SoundService } from "../../../core/services/sound.service";

const GHOST_WPM = {
  '25words': 152,
  '60seconds': 121,
}

const FADE_OUT_DURATION = 150;

@Component({
  selector: 'app-typing-game',
  templateUrl: './typing-game.component.html',
  styleUrls: ['./typing-game.component.scss'],
  standalone: true,
  imports: [LucideAngularModule]
})
export class TypingGameComponent {
  readonly soundService = inject(SoundService);

  @HostListener('document:keydown', ['$event'])
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.gameState() === 'idle' || this.gameState() === 'finished') return;

    if (event.key === 'Tab') {
      event.preventDefault();
      this.restartBtn()?.nativeElement.focus();
      return;
    }

    if (event.key !== 'Backspace' && event.key.length !== 1) return;

    if (this.gameState() === 'ready') return;

    if (!this.loopStarted()) {
      this.loopStarted.set(true);
      this.startLoop();
    }

    if (event.key === 'Backspace') {
      if (this.userIndex() === 0) return;
      const idx = this.userIndex();
      const results = new Map(this.typedResults());
      results.delete(this.userIndex());
      this.typedResults.set(results);
      this.userIndex.set(idx - 1);
    } else if (event.key === ' ') {
      const idx = this.userIndex();
      const wordStart = this.sentence().lastIndexOf(' ', idx - 1) + 1;
      if (idx === wordStart) return;
      const nextSpace = this.sentence().indexOf(' ', idx);
      if (nextSpace !== -1) {
        this.jumpOnNextMove = true;
        this.userIndex.set(nextSpace + 1);
        this.maybeAppendWords();
      }
    } else {
      const idx = this.userIndex();
      const results = new Map(this.typedResults());
      results.set(idx, event.key === this.sentence()[idx] ? 'correct' : 'incorrect');
      this.typedResults.set(results);
      this.userIndex.set(idx + 1);
      this.maybeAppendWords();
    }
  }
  
  readonly gameState = signal<'idle' | 'ready' | 'playing' | 'finished'>('idle');
  readonly mode = signal<'25words' | '60seconds'>('25words');
  readonly userIndex = signal(0);
  readonly typedResults = signal<Map<number, 'correct' | 'incorrect'>>(new Map());
  readonly elapsed = signal<number>(0); // in milliseconds

  readonly sentence = signal('');
  readonly idleFadingOut = signal(false);
  readonly cardsFadingOut = signal(false);
  ghostTimings: number[] = [];
  
  readonly restartGameIcon = RotateCw;
  readonly exitGameIcon = X;
  
  readonly gameActive = output<boolean>();
  readonly loopStarted = signal(false);

  private startTime: number = 0;
  private rafId: number = 0;
  private ghostIdxInternal: number = 0;
  protected readonly ghostIdx = signal(0);
  private textContainer = viewChild<ElementRef>('textContainer');
  private userCursorEl = viewChild<ElementRef>('userCursor');
  private ghostCursorEl = viewChild<ElementRef>('ghostCursor');
  private restartBtn = viewChild<ElementRef>('restartBtn');
  private jumpOnNextMove = false;

  private textOuter = viewChild<ElementRef>('textOuter');
  private lineYs: number[] = [];
  private lineHeight = signal(0);
  private appendPending = false;

  protected readonly userWpm = computed(() => {
    const wordsTyped = this.userIndex() / 5;
    const minutes = this.elapsed() / 1000 / 60;
    if (minutes === 0) return 0;
    return Math.round(wordsTyped / minutes);
  });

  protected readonly userWon = computed(
    () => this.userWpm() >= GHOST_WPM[this.mode()]
  );

  protected readonly timeRemaining = computed(() => {
    if (this.mode() !== '60seconds') return 0;
    if (!this.loopStarted()) return 60;
    return Math.max(0, 60 - Math.floor(this.elapsed() / 1000));
  });

  protected readonly chars = computed(() => this.sentence().split(''));

  constructor() {
    effect(() => this.moveCursor(this.userCursorEl(), this.userIndex()));
    effect(() => this.updateScroll());
  }

  protected selectMode(mode: '25words' | '60seconds'): void {
    this.cardsFadingOut.set(true);
    setTimeout(() => {
      this.cardsFadingOut.set(false);
      this.mode.set(mode);
      this.loopStarted.set(false);
      this.ghostIdxInternal = 0;
      this.ghostIdx.set(0);
      this.generateSentence();
      this.gameState.set('playing');
      this.gameActive.emit(true);
      setTimeout(() => this.computeLines(), 0);
    }, FADE_OUT_DURATION);
  }

  protected startGame(): void {
    this.idleFadingOut.set(true);
    setTimeout(() => {
      this.idleFadingOut.set(false);
      this.gameState.set('ready');
      this.gameActive.emit(true);
    }, FADE_OUT_DURATION);
  }

  protected generateSentence(): void {
    const count = this.mode() === '25words' ? 25 : 50;
    this.sentence.set(this.pickRandom(WORDS, count).join(' '));
    this.generateGhostTimings();
  }

  protected generateGhostTimings(): void {
    if (this.mode() === '60seconds') {
      this.ghostTimings = this.calcGhostTimings60s(
        this.sentence().split(' '), 0
      );
      return;
    }
    const T = (this.sentence().length / 5 / GHOST_WPM['25words']) * 60 * 1000;
    const words = this.sentence().split(' ');
    const weights = words.map(w => w.length * this.randomBetween(0.7, 1.3));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const wordDurations = weights.map(w => w * (T / totalWeight));

    let currentTime = 0;
    const timings: number[] = [];
    words.forEach((word, i) => {
      const isLast = i === words.length - 1;
      const chars = isLast ? word : word + ' ';
      const wordDuration = wordDurations[i];
      chars.split('').forEach((_, j) => {
        timings.push(currentTime + (wordDuration * (j + 1) / chars.length));
      });
      currentTime += wordDuration;
    });
    this.ghostTimings = timings;
  }

  private calcGhostTimings60s(words: string[], startTime: number): number[] {
    const msPerChar = 60000 / (GHOST_WPM['60seconds'] * 5);
    const timings: number[] = [];
    let currentTime = startTime;
    words.forEach((word, i) => {
      const isLast = i === words.length - 1;
      const chars = isLast ? word : word + ' ';
      const wordDuration = chars.length * msPerChar * this.randomBetween(0.7, 1.3);
      chars.split('').forEach((_, j) => {
        timings.push(currentTime + (wordDuration * (j + 1) / chars.length));
      });
      currentTime += wordDuration;
    });
    return timings;
  }

  private maybeAppendWords(): void {
    if (this.mode() !== '60seconds') return;
    if (this.appendPending) return;
    const remaining = this.sentence().length - this.userIndex();
    if (remaining > 300) return;

    this.appendPending = true;
    const toPrune = this.countPruneable();
    const newWords = this.pickRandom(WORDS, 50);
    const lastTiming = this.ghostTimings[this.ghostTimings.length - 1] ?? 0;

    if (toPrune > 0) {
      this.ghostTimings = this.ghostTimings.slice(toPrune);
      this.ghostIdxInternal = Math.max(0, this.ghostIdxInternal - toPrune);
      this.ghostIdx.set(Math.max(0, this.ghostIdx() - toPrune));
      const shifted = new Map<number, 'correct' | 'incorrect'>();
      this.typedResults().forEach((v, k) => {
        if (k >= toPrune) shifted.set(k - toPrune, v);
      });
      this.typedResults.set(shifted);
      this.userIndex.set(this.userIndex() - toPrune);
      const inner = this.textContainer()?.nativeElement;
      if (inner) inner.style.transition = 'none';
    }

    if (lastTiming < 60000) {
      const newTimings = this.calcGhostTimings60s(newWords, lastTiming);
      this.ghostTimings = [...this.ghostTimings, ...newTimings];
    }

    this.sentence.update(s => s.slice(toPrune) + ' ' + newWords.join(' '));

    setTimeout(() => {
      this.computeLines();
      if (toPrune > 0) {
        const inner = this.textContainer()?.nativeElement;
        requestAnimationFrame(() => {
          if (inner) inner.style.transition = '';
        });
      }
      this.appendPending = false;
    }, 0);
  }

  private countPruneable(): number {
    const spans = this.textContainer()
      ?.nativeElement.querySelectorAll('.character');
    if (!spans?.length || this.lineYs.length < 3) return 0;
    const userSpan = spans[this.userIndex()] as HTMLElement | undefined;
    if (!userSpan) return 0;
    const userLineIdx = this.lineYs.indexOf(userSpan.offsetTop);
    if (userLineIdx < 2) return 0;
    // Keep 1 line behind user as backspace buffer; prune everything earlier
    const bufferLineY = this.lineYs[userLineIdx - 1];
    let count = 0;
    while (
      count < spans.length &&
      (spans[count] as HTMLElement).offsetTop < bufferLineY
    ) {
      count++;
    }
    return count;
  }
  
  protected restartGame(): void {
    cancelAnimationFrame(this.rafId);
    this.appendPending = false;
    this.loopStarted.set(false);
    this.lineHeight.set(0);
    this.ghostIdxInternal = 0;
    this.ghostIdx.set(0);
    this.userIndex.set(0);
    this.typedResults.set(new Map());
    this.elapsed.set(0);
    this.restartBtn()?.nativeElement.blur();
    const container = this.textContainer()?.nativeElement;
    if (container) container.style.transform = 'translateY(0)';
    this.generateSentence();
    setTimeout(() => {
      this.computeLines();
      this.jumpOnNextMove = true;
      this.moveCursor(this.ghostCursorEl(), 0);
    }, 0);
  }

  protected exitGame(): void {
    cancelAnimationFrame(this.rafId);
    this.appendPending = false;
    this.userIndex.set(0);
    this.typedResults.set(new Map());
    this.elapsed.set(0);
    this.loopStarted.set(false);
    this.sentence.set('');

    if (this.gameState() === 'ready') {
      this.cardsFadingOut.set(true);
      setTimeout(() => {
        this.cardsFadingOut.set(false);
        this.gameState.set('idle');
        this.gameActive.emit(false);
      }, FADE_OUT_DURATION);
    } else {
      this.gameState.set('idle');
      this.gameActive.emit(false);
    }
  }

  private moveCursor(cursorEl: ElementRef | undefined, index: number): void {
    if (!cursorEl || !this.textContainer()) return;

    const spans = this.textContainer()!.nativeElement.querySelectorAll('.character');
    const target = spans[index] as HTMLElement | undefined;
    const lastSpan = spans[spans.length - 1] as HTMLElement | undefined;

    const left = target
      ? target.offsetLeft
      : (lastSpan ? lastSpan.offsetLeft + lastSpan.offsetWidth : 0);
    const top = target ? target.offsetTop : (lastSpan?.offsetTop ?? 0);

    if (this.jumpOnNextMove) {
      cursorEl.nativeElement.style.transition = 'none';
      this.jumpOnNextMove = false;
      requestAnimationFrame(() => cursorEl.nativeElement.style.transition = '');
    }

    cursorEl.nativeElement.style.left = `${left}px`;
    cursorEl.nativeElement.style.top = `${top}px`;
  }

  private startLoop(): void {
    this.startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - this.startTime;
      this.elapsed.set(elapsed);

      let gIdx: number;
      if (this.mode() === '60seconds') {
        let g = this.ghostIdxInternal;
        while (g < this.ghostTimings.length && this.ghostTimings[g] <= elapsed) {
          g++;
        }
        if (g !== this.ghostIdxInternal) {
          this.ghostIdxInternal = g;
          this.ghostIdx.set(g);
        }
        gIdx = this.ghostIdxInternal;
      } else {
        gIdx = this.ghostTimings.filter(t => t <= elapsed).length;
        this.ghostIdx.set(gIdx);
      }
      this.moveCursor(this.ghostCursorEl(), gIdx);
      this.ghostCursorEl()?.nativeElement.classList.toggle(
        'idle', gIdx >= this.ghostTimings.length
      );

      const stopCondition = this.mode() === '25words' ? this.userIndex() >= this.sentence().length : elapsed >= 60000;
      if (stopCondition) {
        this.finishGame();
      } else {
        this.rafId = requestAnimationFrame(tick);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private finishGame(): void {
    cancelAnimationFrame(this.rafId);
    this.gameState.set('finished');
  }

  private pickRandom(pool: string[], count: number): string[] {
    const filtered = pool.filter(w => w.length <= 7);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private updateScroll(): void {
    if (this.mode() !== '60seconds') return;

    const inner = this.textContainer()?.nativeElement;
    const lineHeight = this.lineHeight();
    if (!inner || !lineHeight) return;

    const spans = inner.querySelectorAll('.character');
    const target = spans[this.userIndex()] as HTMLElement | undefined;
    if (!target) return;

    const lineIdx = this.lineYs.indexOf(target.offsetTop);
    const scrollLines = Math.max(0, lineIdx - 1);
    inner.style.transform = `translateY(-${scrollLines * lineHeight}px)`;
    this.textOuter()?.nativeElement.classList.toggle('at-top', lineIdx <= 1);
  }

  private computeLines(): void {
    const spans = this.textContainer()?.nativeElement.querySelectorAll('.character');
    if (!spans?.length) return;

    const ySet = new Set<number>();
    spans.forEach((span: HTMLElement) => ySet.add(span.offsetTop));
    this.lineYs = [...ySet].sort((a, b) => a - b);
    const lh = this.lineYs[1] - this.lineYs[0];
    this.lineHeight.set(lh);
    this.textOuter()?.nativeElement.style.setProperty('--line-height', `${lh}px`);
  }
}