import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, Moon, Sun, Mail } from 'lucide-angular';
import { ThemeService } from './core/services/theme.service';
import { IconButtonComponent } from './shared/components/icon-button/icon-button.component';
import { ProjectCardComponent } from './shared/components/project-card/project-card.component';
import { GymTooltipComponent } from './shared/components/gym-tooltip/gym-tooltip.component';
import { CarCardsComponent } from './shared/components/car-cards/car-cards.component';
import { MovieCardsComponent } from './shared/components/movie-cards/movie-cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconButtonComponent,
    ProjectCardComponent,
    GymTooltipComponent,
    CarCardsComponent,
    MovieCardsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;
  readonly themeIconAnimating = signal(false);

  // Icons
  readonly moonIcon = Moon;
  readonly sunIcon = Sun;
  readonly mailIcon = Mail;

  // Projects data - easy to extend later
  readonly projects = signal([
    {
      title: 'Kodon',
      description:
        'A Sonner-inspired toast component for Angular, ' +
        'built on top of ng-primitives.',
      href: 'https://kodon.kokkin.is',
    },
  ]);

  toggleTheme(): void {
    this.themeIconAnimating.set(true);
    this.themeService.toggle();

    // Reset animation flag after animation completes
    setTimeout(() => this.themeIconAnimating.set(false), 150);
  }

  sendEmail(): void {
    window.location.href = 'mailto:george@kokkin.is';
  }
}
