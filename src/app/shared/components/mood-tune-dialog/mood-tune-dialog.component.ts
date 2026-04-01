import {
  Component,
  HostListener,
  OnInit,
  output,
  signal,
} from '@angular/core';

const HREF = 'https://moodtune.kokkin.is';

const TIMING = {
  /** Match panel/backdrop `transition` (`--ease-duration`). */
  motionMs: 500,
  /** Match `.mood-tune-circle` animation duration. */
  circleMs: 1100,
};

export type MoodTrigger = {
  backgroundUrl: string;
  title: string;
  color: string;
};

export type MoodTriggerSelection = {
  trigger: MoodTrigger;
  index: number;
};

type ExpandingCircle = { x: number; y: number; color: string };

@Component({
  selector: 'app-mood-tune-dialog',
  standalone: true,
  templateUrl: './mood-tune-dialog.component.html',
  styleUrl: './mood-tune-dialog.component.scss',
})
export class MoodTuneDialogComponent implements OnInit {
  readonly closed = output<void>();
  readonly triggerSelected = output<MoodTriggerSelection>();

  readonly panelReady = signal(false);
  readonly closing = signal(false);
  readonly expandingCircle = signal<ExpandingCircle | null>(null);

  readonly triggers: MoodTrigger[] = [
    {
      backgroundUrl: 'assets/images/moodtune/happy.png',
      title: 'Happy',
      color: '#78b853',
    },
    {
      backgroundUrl: 'assets/images/moodtune/sad.png',
      title: 'Sad',
      color: '#a18fff',
    },
    {
      backgroundUrl: 'assets/images/moodtune/calm.png',
      title: 'Calm',
      color: '#5c9ead',
    },
    {
      backgroundUrl: 'assets/images/moodtune/angry.png',
      title: 'Angry',
      color: '#ff3f52',
    },
  ];

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.panelReady.set(true);
    });
  }

  close(): void {
    if (this.closing() || this.expandingCircle()) {
      return;
    }
    this.closing.set(true);
    setTimeout(() => {
      this.closed.emit();
    }, TIMING.motionMs);
  }

  onTriggerSelect(
    event: MouseEvent,
    trigger: MoodTrigger,
    index: number,
  ): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.expandingCircle.set({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color: trigger.color,
    });
    this.triggerSelected.emit({ trigger, index });
    const mood = trigger.title.toLowerCase();
    setTimeout(() => {
      window.location.href = `${HREF}?mood=${mood}`;
    }, TIMING.circleMs);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
