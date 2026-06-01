import { Component, inject, input, output } from '@angular/core';
import { SoundService } from '../../../core/services/sound.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    @if (useDialog()) {
      <button
        type="button"
        class="project-card"
        [attr.aria-label]="title()"
        (mouseenter)="soundService.playHover(0.3)"
        (mousedown)="soundService.playPress()"
        (click)="soundService.playRelease(); dialogType() === 'blog' ? blogOpen.emit() : dialogOpen.emit()"
      >
        <span class="body title">{{ title() }}</span>
        <p class="body description">{{ description() }}</p>
      </button>
    } @else {
      <a
        [href]="href()"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card"
        [attr.aria-label]="title()"
        (mouseenter)="soundService.playHover(0.3)"
        (mousedown)="soundService.playPress()"
        (click)="soundService.playRelease()"
      >
        <span class="body title">{{ title() }}</span>
        <p class="body description">{{ description() }}</p>
      </a>
    }
  `,
  styles: `
    .project-card {
      max-width: 600px;
      width: 100%;
      background: none;
      border: none;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 0.625rem;
      text-decoration: none;
      cursor: pointer;
      padding: 10px;
      border-radius: 8px;
      transition: background-color var(--duration-standard) var(--ease-out-quart), transform var(--duration-standard) var(--ease-out-quart);
    }

    button.project-card {
      font: inherit;
      text-align: inherit;
    }

    @media (hover: hover) and (pointer: fine) {
      .project-card:hover {
        background: var(--color-hover);
      }
    }

    a.project-card:active {
      transform: scale(0.97);
    }

    @media (prefers-reduced-motion: reduce) {
      .project-card {
        transition: none;
      }
    }

    .title {
      color: var(--color-text);
    }

    .description {
      color: var(--color-text-secondary);
      text-align: start;
      text-wrap: pretty;
    }
  `,
})
export class ProjectCardComponent {
  readonly soundService = inject(SoundService);

  title = input.required<string>();
  description = input.required<string>();
  href = input.required<string>();
  useDialog = input(false);
  dialogType = input<'moodtune' | 'blog'>('moodtune');
  readonly dialogOpen = output<void>();
  readonly blogOpen = output<void>();
}
