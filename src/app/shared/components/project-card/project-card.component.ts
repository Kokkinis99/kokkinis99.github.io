import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <a [href]="href()" target="_blank" class="project-card" [attr.aria-label]="title()">
      <span class="body title">{{ title() }}</span>
      <p class="body description">{{ description() }}</p>
    </a>
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
      transition: background-color var(--duration-standard) var(--ease-out-quart);
    }

    @media (hover: hover) and (pointer: fine) {
      .project-card:hover {
        background: var(--color-hover);
      }
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
  title = input.required<string>();
  description = input.required<string>();
  href = input.required<string>();
}
