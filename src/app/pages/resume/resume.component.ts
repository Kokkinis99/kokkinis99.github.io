import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { marked } from 'marked';
import { LucideAngularModule, ArrowLeft, Moon, Sun, Printer } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, IconButtonComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;
  readonly content = signal<SafeHtml>('');
  readonly loading = signal(true);

  readonly arrowLeftIcon = ArrowLeft;
  readonly moonIcon = Moon;
  readonly sunIcon = Sun;
  readonly printerIcon = Printer;

  ngOnInit(): void {
    this.http
      .get('assets/resume.md', { responseType: 'text' })
      .subscribe((md) => {
        const html = marked.parse(md) as string;
        this.content.set(this.sanitizer.bypassSecurityTrustHtml(html));
        this.loading.set(false);
      });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  print(): void {
    window.print();
  }
}
