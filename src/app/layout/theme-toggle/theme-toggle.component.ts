import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgIf, LucideAngularModule],
  template: `
    <button
      type="button"
      class="flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-2 text-slate-700 shadow-sm transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      [attr.aria-label]="theme() === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
      (click)="toggleTheme()"
    >
      <lucide-icon *ngIf="theme() === 'dark'; else sunIcon" name="Moon" class="size-5"></lucide-icon>
      <ng-template #sunIcon>
        <lucide-icon name="Sun" class="size-5"></lucide-icon>
      </ng-template>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  readonly theme = this.themeService.theme;

  constructor(private readonly themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
