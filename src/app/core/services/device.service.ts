import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  readonly isTouchDevice = signal(
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
}
