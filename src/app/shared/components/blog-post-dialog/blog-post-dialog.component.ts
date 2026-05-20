import {
  Component,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';

const CLOSE_MS = 300;

@Component({
  selector: 'app-blog-post-dialog',
  standalone: true,
  templateUrl: './blog-post-dialog.component.html',
  styleUrl: './blog-post-dialog.component.scss',
})
export class BlogPostDialogComponent {
  readonly title = input.required<string>();
  readonly content = input.required<string>();

  readonly closed = output<void>();

  readonly closing = signal(false);

  close(): void {
    if (this.closing()) return;
    this.closing.set(true);
    setTimeout(() => this.closed.emit(), CLOSE_MS);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
