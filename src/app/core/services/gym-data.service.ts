import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export interface GymDayData {
  date: string;
  rating: string;
  weight: string;
  weighTime: string;
  training: string;
  sleepTime: string;
  sleepDuration: string;
  sleepStart: string;
  sleepEnd: string;
  steps: string;
}

export interface GymData {
  today: GymDayData | null;
  yesterday: GymDayData | null;
}

@Injectable({
  providedIn: 'root',
})
export class GymDataService {
  private readonly http = inject(HttpClient);

  private readonly spreadsheetId =
    '10sMyBfvkyB55vX1n7hmAI1e9mAduyVUJ6eBnuoAmABc';
  private readonly gid = '2100928';

  private readonly _data = signal<GymData | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly hasData = computed(() => this._data() !== null);

  fetchData(): void {
    if (this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

    const url =
      `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}` +
      `/gviz/tq?tqx=out:csv&gid=${this.gid}`;

    this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map((csv) => this.parseCsvAndFindDays(csv)),
        catchError((err) => {
          console.error('Failed to fetch gym data:', err);
          return of(null);
        })
      )
      .subscribe((result) => {
        this._data.set(result);
        this._loading.set(false);
        if (!result) {
          this._error.set('No data found');
        }
      });
  }

  private parseCsvAndFindDays(csv: string): GymData | null {
    const lines = csv.split('\n');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = this.formatDateForComparison(today);
    const yesterdayStr = this.formatDateForComparison(yesterday);

    let todayData: GymDayData | null = null;
    let yesterdayData: GymDayData | null = null;

    for (const line of lines) {
      const columns = this.parseCsvLine(line);
      const dateCell = columns[1]?.replace(/"/g, '').trim();

      if (!dateCell) continue;

      if (this.datesMatch(dateCell, todayStr)) {
        todayData = this.extractDataFromRow(columns);
      } else if (this.datesMatch(dateCell, yesterdayStr)) {
        yesterdayData = this.extractDataFromRow(columns);
      }

      if (todayData && yesterdayData) break;
    }

    // Fallback to most recent entries if not found
    if (!todayData || !yesterdayData) {
      const recent = this.getMostRecentEntries(lines, 2);
      if (!todayData && recent.length > 0) {
        todayData = recent[0];
      }
      if (!yesterdayData && recent.length > 1) {
        yesterdayData = recent[1];
      }
    }

    if (!todayData && !yesterdayData) return null;

    return { today: todayData, yesterday: yesterdayData };
  }

  private extractDataFromRow(columns: string[]): GymDayData {
    return {
      date: columns[1]?.replace(/"/g, '').trim() || '-',
      rating: columns[11]?.replace(/"/g, '').trim() || '-',
      weight: columns[2]?.replace(/"/g, '').trim() || '-',
      weighTime: columns[3]?.replace(/"/g, '').trim() || '-',
      training: columns[10]?.replace(/"/g, '').trim() || '-',
      sleepTime: columns[9]?.replace(/"/g, '').trim() || '-',
      sleepDuration: columns[13]?.replace(/"/g, '').trim() || '-',
      sleepStart: columns[14]?.replace(/"/g, '').trim() || '-',
      sleepEnd: columns[15]?.replace(/"/g, '').trim() || '-',
      steps: columns[17]?.replace(/"/g, '').trim() || '-',
    };
  }

  private getMostRecentEntries(lines: string[], count: number): GymDayData[] {
    const entries: GymDayData[] = [];

    for (let i = lines.length - 1; i >= 0 && entries.length < count; i--) {
      const columns = this.parseCsvLine(lines[i]);
      const dateCell = columns[1]?.replace(/"/g, '').trim();
      const weight = columns[2]?.replace(/"/g, '').trim();

      if (!dateCell || !weight || isNaN(parseFloat(weight))) continue;
      if (dateCell.includes('ΗΜΕΡΟΜΗΝΙΑ') || dateCell.includes('M.O')) continue;

      entries.push(this.extractDataFromRow(columns));
    }

    return entries;
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
        current += char;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);

    return result;
  }

  private formatDateForComparison(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private datesMatch(sheetDate: string, targetDate: string): boolean {
    // Normalize both dates for comparison
    const normalize = (d: string): string => {
      const parts = d.split('/');
      if (parts.length !== 3) return d;
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      return `${day}/${month}/${year}`;
    };

    return normalize(sheetDate) === normalize(targetDate);
  }
}
