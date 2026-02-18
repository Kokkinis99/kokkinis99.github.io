import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { GymDataService } from '../../../core/services/gym-data.service';
import {
  LucideAngularModule,
  Dumbbell,
  Moon,
  Scale,
  Footprints,
} from 'lucide-angular';

@Component({
  selector: 'app-gym-tooltip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './gym-tooltip.component.html',
  styleUrl: './gym-tooltip.component.scss',
})
export class GymTooltipComponent implements OnInit, OnDestroy {
  private readonly gymDataService = inject(GymDataService);
  private readonly elementRef = inject(ElementRef);

  @ViewChild('trigger') triggerRef!: ElementRef<HTMLSpanElement>;

  readonly data = this.gymDataService.data;
  readonly loading = this.gymDataService.loading;

  readonly visible = signal(false);
  readonly alignLeft = signal(false);
  readonly alignRight = signal(false);

  readonly dumbbellIcon = Dumbbell;
  readonly moonIcon = Moon;
  readonly scaleIcon = Scale;
  readonly footprintsIcon = Footprints;

  private readonly tooltipWidth = 400;
  private readonly edgeMargin = 16;
  private readonly hideDelay = 100;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.gymDataService.fetchData();
  }

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
