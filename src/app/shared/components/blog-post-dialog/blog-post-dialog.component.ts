import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { SoundService } from '../../../core/services/sound.service';
import { BlogPostImage } from './blog-posts';

const TIMING = {
  fadeOut: 200,
};

@Component({
  selector: 'app-blog-post-dialog',
  standalone: true,
  templateUrl: './blog-post-dialog.component.html',
  styleUrl: './blog-post-dialog.component.scss',
})
export class BlogPostDialogComponent implements OnInit {
  readonly soundService = inject(SoundService);

  readonly title = input.required<string>();
  readonly content = input.required<string>();
  readonly images = input<BlogPostImage[]>([]);

  readonly closed = output<void>();
  readonly closingStarted = output<void>();

  readonly ready = signal(false);
  readonly closing = signal(false);

  readonly activeIndex = signal<number | null>(null);
  readonly activeImage = computed(() => {
    const i = this.activeIndex();
    return i === null ? null : this.images()[i];
  });

  private readonly lightboxClose =
    viewChild<ElementRef<HTMLButtonElement>>('lightboxClose');
  private lightboxTrigger: HTMLElement | null = null;

  ngOnInit(): void {
    this.soundService.playOpen();
    requestAnimationFrame(() => {
      this.ready.set(true);
    });
  }

  close(): void {
    if (this.closing()) return;
    this.soundService.playClose();
    this.closing.set(true);
    this.closingStarted.emit();
    setTimeout(() => this.closed.emit(), TIMING.fadeOut);
  }

  openImage(index: number, event: Event): void {
    this.lightboxTrigger = event.currentTarget as HTMLElement;
    this.soundService.playOpen();
    this.activeIndex.set(index);
    requestAnimationFrame(() => this.lightboxClose()?.nativeElement.focus());
  }

  closeImage(): void {
    this.soundService.playClose();
    this.activeIndex.set(null);
    this.lightboxTrigger?.focus();
    this.lightboxTrigger = null;
  }

  step(delta: number, event?: Event): void {
    event?.stopPropagation();
    const i = this.activeIndex();
    if (i === null) return;
    const count = this.images().length;
    this.soundService.playRelease();
    this.activeIndex.set((i + delta + count) % count);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeIndex() !== null) {
      this.closeImage();
      return;
    }
    this.close();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.step(-1);
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.step(1);
  }
}
