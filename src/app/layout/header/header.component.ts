import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

type NavLink = {
  labelKey: string;
  path: string;
  ariaKey: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgIf,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    TranslateModule,
    ThemeToggleComponent,
    LanguageSwitcherComponent
  ],
  template: `
    <header
      class="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/70"
      [class.shadow-lg]="scrolled()"
      role="banner"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a routerLink="/" class="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100" aria-label="Juan Mendes homepage">
          <span class="text-primary-600">Juan</span> Mendes
        </a>

        <nav aria-label="Navegação principal" class="hidden items-center gap-6 md:flex">
          <a
            *ngFor="let link of navLinks"
            [routerLink]="link.path"
            routerLinkActive="text-primary-600 dark:text-primary-300"
            class="text-sm font-semibold text-slate-600 transition hover:text-primary-600 dark:text-slate-300"
            [attr.aria-label]="('nav.' + link.ariaKey) | translate"
          >
            {{ ('nav.' + link.labelKey) | translate }}
          </a>
        </nav>

        <div class="hidden items-center gap-4 md:flex">
          <app-language-switcher></app-language-switcher>
          <app-theme-toggle></app-theme-toggle>
        </div>

        <button
          type="button"
          class="flex items-center justify-center rounded-full border border-slate-200 bg-white/80 p-2 text-slate-600 transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 md:hidden"
          (click)="toggleMobile()"
          [attr.aria-expanded]="mobileOpen()"
          aria-haspopup="true"
          aria-controls="mobile-menu"
        >
          <lucide-icon *ngIf="!mobileOpen(); else closeIcon" name="Menu" class="size-6"></lucide-icon>
          <ng-template #closeIcon>
            <lucide-icon name="X" class="size-6"></lucide-icon>
          </ng-template>
        </button>
      </div>

      <div
        *ngIf="mobileOpen()"
        id="mobile-menu"
        class="md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu móvel de navegação"
      >
        <div class="space-y-6 bg-white/95 px-6 pb-8 pt-4 shadow-md dark:bg-slate-950/95">
          <nav class="flex flex-col gap-4" aria-label="Navegação móvel">
            <a
              *ngFor="let link of navLinks"
              [routerLink]="link.path"
              routerLinkActive="text-primary-600 dark:text-primary-300"
              class="text-base font-semibold text-slate-700 transition hover:text-primary-600 dark:text-slate-200"
              (click)="closeMobile()"
            >
              {{ ('nav.' + link.labelKey) | translate }}
            </a>
          </nav>
          <div class="flex items-center justify-between gap-4">
            <app-language-switcher></app-language-switcher>
            <app-theme-toggle></app-theme-toggle>
          </div>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly navLinks: NavLink[] = [
    { labelKey: 'home', path: '/', ariaKey: 'home' },
    { labelKey: 'about', path: '/about', ariaKey: 'about' },
    { labelKey: 'skills', path: '/skills', ariaKey: 'skills' },
    { labelKey: 'experience', path: '/experience', ariaKey: 'experience' },
    { labelKey: 'projects', path: '/projects', ariaKey: 'projects' },
    { labelKey: 'contact', path: '/contact', ariaKey: 'contact' }
  ];

  private readonly scrolledState = signal<boolean>(false);
  private readonly mobileMenuState = signal<boolean>(false);

  readonly scrolled = computed(() => this.scrolledState());
  readonly mobileOpen = computed(() => this.mobileMenuState());

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.scrolledState.set(window.scrollY > 10);
  }

  toggleMobile(): void {
    this.mobileMenuState.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileMenuState.set(false);
  }
}
