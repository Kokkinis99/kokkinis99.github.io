import {
  Component,
  inject,
  input,
  output,
  signal,
  OnInit,
  HostListener
} from "@angular/core";
import { CarCard } from "../car-cards/car-cards.component";
import { SoundService } from "../../../core/services/sound.service";

const TIMING = {
  fadeOut: 200,
};

@Component({
  selector: 'app-expanded-card',
  standalone: true,
  templateUrl: './expanded-card.component.html',
  styleUrls: ['./expanded-card.component.scss'],
})
export class ExpandedCardComponent implements OnInit {
  private readonly soundService = inject(SoundService);

  readonly card = input.required<CarCard>();

  readonly closed = output<void>();
  readonly closingStarted = output<void>();

  readonly ready = signal(false);
  readonly closing = signal(false);

  ngOnInit(): void {
    this.soundService.playOpen();
    requestAnimationFrame(() => {
      this.ready.set(true);
    });
    if (this.card().image2) {
      setTimeout(() => this.soundService.playSlide(), 750);
    }
  }

  close(): void {
    if (this.closing()) return;
    this.soundService.playClose();
    this.closing.set(true);
    this.closingStarted.emit();
    setTimeout(() => this.closed.emit(), TIMING.fadeOut);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
