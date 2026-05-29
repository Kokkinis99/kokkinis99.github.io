import {
  Component,
  HostListener,
  OnInit,
  input,
  output,
  signal,
} from '@angular/core';

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
  readonly title = input.required<string>();
  readonly content = input.required<string>();

  readonly closed = output<void>();
  readonly closingStarted = output<void>();

  readonly ready = signal(false);
  readonly closing = signal(false);

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.ready.set(true);
    });
  }

  close(): void {
    if (this.closing()) return;
    this.closing.set(true);
    this.closingStarted.emit();
    setTimeout(() => this.closed.emit(), TIMING.fadeOut);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
