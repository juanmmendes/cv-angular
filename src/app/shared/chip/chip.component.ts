import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { lucideIcons } from '../icons';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [NgIf, NgClass, LucideAngularModule],
  template: `
    <span
      class="inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-left text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
      [ngClass]="extraClasses"
      [attr.aria-label]="ariaLabel || label"
    >
      <lucide-icon *ngIf="icon" [name]="icon" class="size-4 text-primary-500"></lucide-icon>
      <span class="max-w-full break-words font-medium leading-snug">{{ label }}</span>
      <span *ngIf="description" class="text-xs text-slate-500 dark:text-slate-400">{{ description }}</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  @Input() label = '';
  @Input() description?: string;
  @Input() icon?: keyof typeof lucideIcons;
  @Input() ariaLabel?: string;
  @Input() extraClasses: string | string[] | Set<string> | { [klass: string]: boolean } = '';
}
