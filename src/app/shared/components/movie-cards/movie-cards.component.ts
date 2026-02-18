import { Component, ElementRef, inject, signal, ViewChild } from "@angular/core";

interface MovieCard {
  title: string;
  posterUrl: string;
  letterboxdUrl: string;
}

const movieCards: MovieCard[] = [
  {
    title: 'Truants',
    posterUrl: 'assets/images/movie-posters/truants.webp',
    letterboxdUrl: 'https://letterboxd.com/film/truants-1996/',
  },
  {
    title: 'The Skywalk Is Gone',
    posterUrl: 'assets/images/movie-posters/the-skywalk-is-gone.webp',
    letterboxdUrl: 'https://letterboxd.com/film/the-skywalk-is-gone/',
  },
  {
    title: 'Nostalgia',
    posterUrl: 'assets/images/movie-posters/nostalgia.webp',
    letterboxdUrl: 'https://letterboxd.com/film/nostalgia-1983/',
  },
  {
    title: 'Hana-bi',
    posterUrl: 'assets/images/movie-posters/hana-bi.webp',
    letterboxdUrl: 'https://letterboxd.com/film/fireworks-1997/',
  }
];

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.scss'],
})
export class MovieCardsComponent {
  private readonly elementRef = inject(ElementRef);

  @ViewChild('trigger') triggerRef!: ElementRef<HTMLSpanElement>;

  readonly visible = signal(false);
  readonly hoverEnabled = signal(false);
  readonly pressedIndex = signal<number | null>(null);

  private readonly hideDelay = 100;
  private readonly hoverEnableDelay = 300;
  private readonly pressDuration = 100;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  public movieCards = signal<MovieCard[]>(movieCards);

  ngOnDestroy(): void {
    this.clearHideTimeout();
    this.clearHoverTimeout();
  }

  onMouseEnter(): void {
    const wasAlreadyVisible = this.visible();
    this.clearHideTimeout();
    this.visible.set(true);

    // Only start hover timeout if tooltip wasn't already visible
    if (!wasAlreadyVisible) {
      this.hoverTimeout = setTimeout(() => {
        this.hoverEnabled.set(true);
      }, this.hoverEnableDelay);
    }
  }

  onMouseLeave(): void {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      this.visible.set(false);
      this.hoverEnabled.set(false);
      this.clearHoverTimeout();
    }, this.hideDelay);
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private clearHoverTimeout(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  onCardClick(index: number, letterboxdUrl: string): void {
    this.pressedIndex.set(index);
    setTimeout(() => {
      this.pressedIndex.set(null);
    }, this.pressDuration);
    setTimeout(() => {
      window.open(letterboxdUrl, '_blank');
    }, this.pressDuration * 1.07);
  }
}