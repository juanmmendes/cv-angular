import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div
      class="flex flex-col gap-2"
      [attr.aria-label]="ariaLabel || label + ' ' + (level | translate)"
    >
      <div class="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
        <span>{{ label }}</span>
        <span class="text-xs uppercase text-primary-500 dark:text-primary-300">
          {{ level | translate }}
        </span>
      </div>
      <div
        class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
        role="progressbar"
        [attr.aria-valuenow]="value"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
          [style.width.%]="value"
        ></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  @Input() label = '';
  @Input() level: string = 'skills.level.intermediate';
  @Input() value = 60;
  @Input() ariaLabel?: string;
}
