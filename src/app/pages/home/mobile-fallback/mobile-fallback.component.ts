import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Moon,
  Sun,
  Mail,
  FileUser,
} from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme.service';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { BlogPostDialogComponent } from '../../../shared/components/blog-post-dialog/blog-post-dialog.component';
import { HOME_POSTS, HOME_PROJECTS, Project } from '../home.data';

@Component({
  selector: 'app-mobile-fallback',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconButtonComponent,
    ProjectCardComponent,
    BlogPostDialogComponent,
  ],
  templateUrl: './mobile-fallback.component.html',
  styleUrl: './mobile-fallback.component.scss',
})
export class MobileFallbackComponent {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly theme = this.themeService.theme;
  readonly themeIconAnimating = signal(false);

  readonly moonIcon = Moon;
  readonly sunIcon = Sun;
  readonly mailIcon = Mail;
  readonly resumeIcon = FileUser;

  readonly projects = HOME_PROJECTS;
  readonly posts = HOME_POSTS;

  readonly blogPostDialogPost = signal<Project | null>(null);

  openBlogPostDialog(post: Project): void {
    this.blogPostDialogPost.set(post);
  }

  closeBlogPostDialog(): void {
    this.blogPostDialogPost.set(null);
  }

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
}
