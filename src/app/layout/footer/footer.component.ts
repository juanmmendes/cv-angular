import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, TranslateModule, LucideAngularModule, RouterLink],
  template: `
    <footer class="border-t border-slate-200 bg-white/80 py-12 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
        <div class="max-w-xl space-y-4">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Juan Mendes</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            {{ 'footer.description' | translate }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ 'footer.contact_title' | translate }}
            </h3>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <a class="flex items-center gap-2 hover:text-primary-600" [href]="'mailto:' + contacts.email">
                  <lucide-icon name="Mail" class="size-4"></lucide-icon>
                  {{ contacts.email }}
                </a>
              </li>
              <li>
                <a class="flex items-center gap-2 hover:text-primary-600" [href]="contacts.linkedin" target="_blank" rel="noreferrer noopener">
                  <lucide-icon name="Linkedin" class="size-4"></lucide-icon>
                  LinkedIn
                </a>
              </li>
              <li>
                <a class="flex items-center gap-2 hover:text-primary-600" [href]="contacts.github" target="_blank" rel="noreferrer noopener">
                  <lucide-icon name="Github" class="size-4"></lucide-icon>
                  GitHub
                </a>
              </li>
              <li>
                <a class="flex items-center gap-2 hover:text-primary-600" [href]="formatWhatsAppLink(contacts.phone)" target="_blank" rel="noreferrer noopener">
                  <lucide-icon name="Zap" class="size-4"></lucide-icon>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ 'footer.quick_links' | translate }}
            </h3>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li *ngFor="let link of quickLinks">
                <a class="hover:text-primary-600" [routerLink]="link.path">
                  {{ ('nav.' + link.label) | translate }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-slate-200/60 pt-6 text-center text-xs text-slate-500 dark:border-slate-800/60 dark:text-slate-500">
        &copy; {{ currentYear }} {{ 'footer.rights' | translate }}
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly quickLinks = [
    { path: '/', label: 'home' },
    { path: '/projects', label: 'projects' },
    { path: '/experience', label: 'experience' },
    { path: '/contact', label: 'contact' }
  ];

  constructor(public readonly content: ContentService) {}

  get contacts() {
    return this.content.profile()?.contacts ?? { email: '', github: '#', linkedin: '#', phone: '' };
  }

  formatWhatsAppLink(phone: string | undefined): string {
    const sanitized = (phone ?? '').replace(/\D/g, '');
    if (!sanitized) {
      return '#';
    }
    return `https://wa.me/55${sanitized}`;
  }
}
