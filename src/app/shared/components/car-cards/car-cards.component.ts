import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  output,
  signal,
  ViewChild
} from "@angular/core";
import { CAR_CARD_BLOG_POSTS } from "../expanded-card/car-card-blog-posts/car-card-blog-post";

export interface CarCard {
  title: string;
  description: string;
  content: string;
  image: string;
  image2?: string;
}

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   hover → cards fan out (existing behavior)
 *  click   user clicks a card
 *    0ms   everything happens at once:
 *          - siblings fade out (250ms ease-out)
 *          - selected card centers + scales up (750ms soft spring)
 *  600ms   handoff to expanded card (spring is ~96% settled)
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  expand: 600, // handoff while spring is settling (visually "there")
};

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
  readonly expandingIndex = signal<number | null>(null);
  readonly expanding = signal(false);
  readonly expandTransform = signal<string>('scale(1)');

  readonly cardSelected = output<CarCard>();

  private readonly cardWidth = 180;
  private readonly cardHeight = 220;
  private readonly tooltipWidth = 400;
  private readonly edgeMargin = 16;
  private readonly hideDelay = 100;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  public carCards = signal<CarCard[]>([
    {
      title: CAR_CARD_BLOG_POSTS[0].title,
      description: CAR_CARD_BLOG_POSTS[0].description,
      content: CAR_CARD_BLOG_POSTS[0].content,
      image: 'assets/images/car-cards/engine-106.png',
      image2: 'assets/images/car-cards/106-interior.JPG',
    },
    {
      title: 'The old man\'s Strada',
      description: 'I\'m not even supposed to be here today.',
      content: 'I\'m not even supposed to be here today.',
      image: 'assets/images/car-cards/strada-interior.png',
    },
    {
      title: 'Cleaning the Strada',
      description: 'I\'m not even supposed to be here today.',
      content: 'I\'m not even supposed to be here today.',
      image: 'assets/images/car-cards/strada-interior.png',
    }
  ]);

  ngOnDestroy(): void {
    this.clearHideTimeout();
  }

  onMouseEnter(): void {
    if (this.expanding()) return;
    this.clearHideTimeout();
    this.calculatePosition();
    this.visible.set(true);
  }

  onMouseLeave(): void {
    if (this.expanding()) return;
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      this.visible.set(false);
    }, this.hideDelay);
  }

  onCardClick(index: number, event: MouseEvent): void {
    if (this.expanding()) return;

    const card = this.carCards()[index];
    if (!card) return;

    const cardEl = event.currentTarget as HTMLElement;
    const rect = cardEl.getBoundingClientRect();
    
    // Current visual center of the card
    const currentCenterX = rect.left + rect.width / 2;
    const currentCenterY = rect.top + rect.height / 2;
    
    // Target: viewport center
    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    
    // The CSS will reset left/right/top to 0, which moves the card.
    // We need to account for this shift in our translate.
    // 
    // For side cards, they have left:-80px or right:-80px positioning.
    // When reset to left:0, the card shifts.
    // 
    // Actually, let's calculate from where the card's TOP-LEFT will be
    // after the position reset, then translate from there.
    //
    // The card's original position (before any transform/positioning):
    // - nth-of-type(1): left:0, top:0 (relative to tooltip)
    // - nth-of-type(2): left:0, top:0 (absolute, but left:-80px was applied)
    // - nth-of-type(3): right:0, top:0 (absolute, but right:-80px was applied)
    //
    // After reset to left:0, top:0, all cards are at tooltip's origin.
    // The tooltip itself is positioned relative to the trigger.
    
    // Get the tooltip container's position
    const tooltip = cardEl.parentElement;
    if (!tooltip) return;
    
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // After reset, card top-left will be at tooltip's top-left
    // Card center will be at tooltip origin + half card dimensions
    const resetCenterX = tooltipRect.left + this.cardWidth / 2;
    const resetCenterY = tooltipRect.top + this.cardHeight / 2;
    
    // Translate from reset position to viewport center
    const translateX = targetX - resetCenterX;
    const translateY = targetY - resetCenterY;

    const transform = `translate(${translateX}px, ${translateY}px) scale(1.8)`;
    this.expandTransform.set(transform);
    this.expandingIndex.set(index);
    this.expanding.set(true);

    setTimeout(() => {
      this.visible.set(false);
      requestAnimationFrame(() => {
        this.cardSelected.emit(card);
      });
    }, TIMING.expand);
  }

  resetExpansion(): void {
    this.expandingIndex.set(null);
    this.expanding.set(false);
    this.expandTransform.set('scale(1)');
    this.visible.set(false);
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
    if (this.expanding()) return;
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.visible.set(false);
    }
  }
}