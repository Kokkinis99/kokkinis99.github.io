import { Injectable, effect, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class FaviconService {
  private readonly themeService = inject(ThemeService);
  private readonly skullIndex: number;

  constructor() {
    this.skullIndex = this.resolveSkullIndex();

    effect(() => {
      const theme = this.themeService.theme();
      this.updateFavicon(theme);
    });
  }

  private resolveSkullIndex(): number {
    const stored = sessionStorage.getItem('favicon-skull');
    if (stored) return Number(stored);

    const index = Math.floor(Math.random() * 4) + 1;
    sessionStorage.setItem('favicon-skull', String(index));
    return index;
  }

  private updateFavicon(theme: 'light' | 'dark'): void {
    const suffix = theme === 'dark' ? '_dark' : '';
    const href = `assets/images/skull/Skull_${this.skullIndex}${suffix}.svg`;

    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (link) {
      link.type = 'image/svg+xml';
      link.href = href;
    }
  }
}
