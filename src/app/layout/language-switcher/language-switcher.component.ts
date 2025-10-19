import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div class="flex items-center gap-2">
      <button
        *ngFor="let option of languageOptions"
        class="rounded-full px-3 py-2 text-sm font-semibold uppercase transition"
        [ngClass]="currentLang() === option.code ? 'bg-primary-600 text-white' : 'bg-white/70 text-slate-600'"
        type="button"
        (click)="changeLanguage(option.code)"
        [attr.aria-pressed]="currentLang() === option.code"
      >
        {{ option.label }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  readonly languageOptions = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' }
  ] as const;

  private readonly langState = signal<string>(this.translate.currentLang || this.translate.getDefaultLang() || 'pt');
  readonly currentLang = computed(() => this.langState());

  constructor(private readonly translate: TranslateService) {}

  changeLanguage(code: string): void {
    if (code === this.langState()) {
      return;
    }
    this.translate.use(code).subscribe(() => {
      this.langState.set(code);
    });
  }
}
