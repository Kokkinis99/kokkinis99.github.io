import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export interface LastFmTrack {
  title: string;
  artist: string;
  imageUrl: string;
  lastPlayed: string;
  trackUrl: string;
}

interface LastFmApiTrack {
  name: string;
  artist: { '#text': string };
  image: { '#text': string; size: string }[];
  date?: { uts: string };
  url: string;
  '@attr'?: { nowplaying: string };
}

interface LastFmApiResponse {
  recenttracks: {
    track: LastFmApiTrack[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class LastFmService {
  private readonly http = inject(HttpClient);

  private readonly apiKey = 'acc809022762e2ed75a2eb61aa112a34';
  private readonly username = 'GKokkinis';
  private readonly baseUrl = 'https://ws.audioscrobbler.com/2.0/';

  private readonly _track = signal<LastFmTrack | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly track = this._track.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly hasTrack = computed(() => this._track() !== null);

  fetchRecentTrack(): void {
    if (this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    const url =
      `${this.baseUrl}?method=user.getrecenttracks` +
      `&user=${this.username}&api_key=${this.apiKey}&format=json&limit=1`;

    this.http
      .get<LastFmApiResponse>(url)
      .pipe(
        map((res) => this.parseTrack(res)),
        catchError((err) => {
          console.error('Failed to fetch Last.fm data:', err);
          return of(null);
        })
      )
      .subscribe((result) => {
        this._track.set(result);
        this._loading.set(false);
        if (!result) {
          this._error.set('Failed to load track');
        }
      });
  }

  private parseTrack(res: LastFmApiResponse): LastFmTrack | null {
    const track = res?.recenttracks?.track?.[0];
    if (!track) return null;

    const image =
      track.image.find((i) => i.size === 'large')?.['#text'] ||
      track.image.find((i) => i.size === 'medium')?.['#text'] ||
      '';

    const isNowPlaying = !!track['@attr']?.nowplaying;
    const lastPlayed = isNowPlaying
      ? 'Now playing'
      : track.date
        ? this.timeAgo(parseInt(track.date.uts, 10))
        : 'Unknown';

    return {
      title: track.name,
      artist: track.artist['#text'],
      imageUrl: image,
      lastPlayed,
      trackUrl: 'https://open.spotify.com/user/0utk68jnus2coxaia89fz6e8w?si=c8159e9e42004087',
    };
  }

  private timeAgo(uts: number): string {
    const seconds = Math.floor(Date.now() / 1000) - uts;

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}
