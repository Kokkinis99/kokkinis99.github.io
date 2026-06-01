import {
  Component,
  HostListener,
  OnInit,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { SoundService } from '../../../core/services/sound.service';

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
  private readonly soundService = inject(SoundService);

  readonly title = input.required<string>();
  readonly content = input.required<string>();

  readonly closed = output<void>();
  readonly closingStarted = output<void>();

  readonly ready = signal(false);
  readonly closing = signal(false);

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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
