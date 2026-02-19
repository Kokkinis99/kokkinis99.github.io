import {
  Component,
  input,
  output,
  signal,
  OnInit,
  HostListener
} from "@angular/core";
import { CarCard } from "../car-cards/car-cards.component";

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
  readonly card = input.required<CarCard>();

  readonly closed = output<void>();

  readonly ready = signal(false);
  readonly closing = signal(false);

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.ready.set(true);
    });
  }

  close(): void {
    if (this.closing()) return;
    this.closing.set(true);

    setTimeout(() => {
      this.closed.emit();
    }, TIMING.fadeOut);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
