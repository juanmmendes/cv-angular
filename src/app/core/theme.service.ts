import { Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themeState = signal<ThemeName>('light');

  readonly theme = this.themeState.asReadonly();

  constructor() {
    this.bootstrapTheme();
  }

  toggle(): void {
    const next = this.themeState() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: ThemeName): void {
    this.themeState.set(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', theme);
    }
    this.applyTheme(theme);
  }

  private bootstrapTheme(): void {
    let theme: ThemeName = 'light';
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio-theme') as ThemeName | null;
      if (stored) {
        theme = stored;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      }
    }
    this.setTheme(theme);
  }

  private applyTheme(theme: ThemeName): void {
    if (!this.document) {
      return;
    }
    this.document.documentElement.setAttribute('data-theme', theme);
    const body = this.document.body;
    body.classList.remove('dark', 'light');
    body.classList.add(theme === 'dark' ? 'dark' : 'light');
  }
}
