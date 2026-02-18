import { Component, input, output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <button
      class="icon-button"
      [attr.aria-label]="ariaLabel()"
      (click)="clicked.emit()"
    >
      <i-lucide [img]="icon()" [size]="16" class="icon" [class.icon-enter]="animate()" />
    </button>
  `,
  styles: `
    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      padding: 4px;
      border-radius: 4px;
      transition:
        transform var(--duration-fast) var(--ease-out-quart),
        background-color var(--duration-standard) ease;
    }

    @media (hover: hover) and (pointer: fine) {
      .icon-button:hover {
        background: var(--color-hover);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .icon-button {
        transition: none;
      }
    }

    .icon {
      width: 1rem;
      height: 1rem;
      color: var(--color-text);
    }
  `,
})
export class IconButtonComponent {
  icon = input.required<LucideIconData>();
  ariaLabel = input.required<string>();
  animate = input(false);

  clicked = output<void>();
}
