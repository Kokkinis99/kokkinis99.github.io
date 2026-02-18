import { Component, ElementRef, HostListener, inject, OnDestroy, signal, ViewChild } from "@angular/core";

export interface CarCard {
  title: string;
  description: string;
  image: string;
  href: string;
}

@Component({
  selector: 'app-car-cards',
  templateUrl: './car-cards.component.html',
  styleUrls: ['./car-cards.component.scss'],
})
export class CarCardsComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);

  @ViewChild('trigger') triggerRef!: ElementRef<HTMLSpanElement>;

  readonly visible = signal(false);
  readonly alignLeft = signal(false);
  readonly alignRight = signal(false);

  private readonly tooltipWidth = 400;
  private readonly edgeMargin = 16;
  private readonly hideDelay = 100;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  public carCards = signal<CarCard[]>([
    {
      title: 'My Peugeot 106',
      description: 'How I learned to stop worrying and love the bomb.',
      image: 'assets/images/car-cards/engine-106.png',
      href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      title: 'The old man\'s Strada',
      description: 'I\'m not even supposed to be here today.',
      image: 'assets/images/car-cards/strada-interior.png',
      href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      title: 'Cleaning the Strada',
      description: 'I\'m not even supposed to be here today.',
      image: 'assets/images/car-cards/strada-interior.png',
      href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    }
  ]);

  ngOnDestroy(): void {
    this.clearHideTimeout();
  }

  onMouseEnter(): void {
    this.clearHideTimeout();
    this.calculatePosition();
    this.visible.set(true);
  }

  onMouseLeave(): void {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      this.visible.set(false);
    }, this.hideDelay);
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private calculatePosition(): void {
    if (!this.triggerRef) return;

    const triggerRect = this.triggerRef.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const tooltipHalfWidth = this.tooltipWidth / 2;

    if (triggerCenter - tooltipHalfWidth < this.edgeMargin) {
      this.alignLeft.set(true);
      this.alignRight.set(false);
      return;
    }

    if (triggerCenter + tooltipHalfWidth > viewportWidth - this.edgeMargin) {
      this.alignLeft.set(false);
      this.alignRight.set(true);
      return;
    }

    this.alignLeft.set(false);
    this.alignRight.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.visible.set(false);
    }
  }
}