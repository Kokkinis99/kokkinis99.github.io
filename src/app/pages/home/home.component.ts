import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Moon,
  Sun,
  Mail,
  FileUser,
  Volume2,
  VolumeX,
} from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { SoundService } from '../../core/services/sound.service';
import { DeviceService } from '../../core/services/device.service';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { GymTooltipComponent } from '../../shared/components/gym-tooltip/gym-tooltip.component';
import {
  CarCard,
  CarCardsComponent,
} from '../../shared/components/car-cards/car-cards.component';
import { MovieCardsComponent } from '../../shared/components/movie-cards/movie-cards.component';
import { ExpandedCardComponent } from '../../shared/components/expanded-card/expanded-card.component';
import { MoodTuneDialogComponent } from '../../shared/components/mood-tune-dialog/mood-tune-dialog.component';
import { MusicCardComponent } from '../../shared/components/music-card/music-card.component';
import { TypingGameComponent } from '../../shared/components/typing-game/typing-game.component';
import { BlogPostDialogComponent } from '../../shared/components/blog-post-dialog/blog-post-dialog.component';
import { MobileFallbackComponent } from './mobile-fallback/mobile-fallback.component';
import { HOME_POSTS, HOME_PROJECTS, Project } from './home.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconButtonComponent,
    ProjectCardComponent,
    GymTooltipComponent,
    CarCardsComponent,
    MovieCardsComponent,
    ExpandedCardComponent,
    MoodTuneDialogComponent,
    MusicCardComponent,
    TypingGameComponent,
    BlogPostDialogComponent,
    MobileFallbackComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  readonly deviceService = inject(DeviceService);
  readonly soundService = inject(SoundService);

  @ViewChild(CarCardsComponent) carCardsRef!: CarCardsComponent;

  readonly theme = this.themeService.theme;
  readonly themeIconAnimating = signal(false);

  readonly expandedCard = signal<CarCard | null>(null);
  readonly moodTuneDialogOpen = signal(false);
  readonly blogPostDialogPost = signal<Project | null>(null);
  readonly typingGameActive = signal(false);

  private readonly expandedCardBackdrop = signal(false);
  private readonly moodTuneBackdrop = signal(false);
  private readonly blogPostBackdrop = signal(false);

  readonly anyModalOpen = computed(
    () =>
      this.expandedCardBackdrop() ||
      this.moodTuneBackdrop() ||
      this.blogPostBackdrop()
  );

  readonly moonIcon = Moon;
  readonly sunIcon = Sun;
  readonly mailIcon = Mail;
  readonly resumeIcon = FileUser;
  readonly volumeIcon = Volume2;
  readonly muteIcon = VolumeX;

  readonly projects = signal<Project[]>(HOME_PROJECTS);
  readonly posts = signal<Project[]>(HOME_POSTS);

  toggleTheme(): void {
    this.themeIconAnimating.set(true);
    this.themeService.toggle();
    setTimeout(() => this.themeIconAnimating.set(false), 150);
  }

  sendEmail(): void {
    window.location.href = 'mailto:hello@kokkin.is';
  }

  viewResume(): void {
    this.router.navigate(['/resume']);
  }

  onCarCardSelected(card: CarCard): void {
    this.expandedCard.set(card);
    this.expandedCardBackdrop.set(true);
  }

  onExpandedCardClosingStarted(): void {
    this.expandedCardBackdrop.set(false);
  }

  onExpandedCardClosed(): void {
    this.expandedCard.set(null);
    this.carCardsRef?.resetExpansion();
  }

  openMoodTuneDialog(): void {
    this.moodTuneDialogOpen.set(true);
    this.moodTuneBackdrop.set(true);
  }

  onMoodTuneClosingStarted(): void {
    this.moodTuneBackdrop.set(false);
  }

  closeMoodTuneDialog(): void {
    this.moodTuneDialogOpen.set(false);
  }

  openBlogPostDialog(post: Project): void {
    this.blogPostDialogPost.set(post);
    this.blogPostBackdrop.set(true);
  }

  onBlogPostClosingStarted(): void {
    this.blogPostBackdrop.set(false);
  }

  closeBlogPostDialog(): void {
    this.blogPostDialogPost.set(null);
  }

  onGameActive(active: boolean): void {
    this.typingGameActive.set(active);
  }
}
