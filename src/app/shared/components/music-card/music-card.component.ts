import { Component, inject, signal, computed, OnInit } from "@angular/core";
import { LastFmService } from "../../../core/services/lastfm.service";

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit {
  private readonly lastFm = inject(LastFmService);

  readonly song = computed(() => {
    const track = this.lastFm.track();
    return {
      title: track?.title ?? '—',
      artist: track?.artist ?? '—',
      lastPlayed: track?.lastPlayed ?? '—',
      imageUrl: track?.imageUrl ?? '',
      trackUrl: track?.trackUrl ?? '',
    };
  });

  readonly visible = signal(false);
  readonly hoverEnabled = signal(false);

  private readonly hideDelay = 100;
  private readonly hoverEnableDelay = 300;
  private readonly pressDuration = 100;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    this.clearHideTimeout();
    this.clearHoverTimeout();
  }

  onMouseEnter(): void {
    const wasAlreadyVisible = this.visible();
    this.clearHideTimeout();
    this.visible.set(true);

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

  ngOnInit(): void {
    this.lastFm.fetchRecentTrack();
  }

  onCardClick(): void {
    setTimeout(() => {
      window.open(this.song().trackUrl, '_blank');
    }, this.pressDuration);
  }
}