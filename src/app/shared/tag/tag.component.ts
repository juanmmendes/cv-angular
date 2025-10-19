import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:border-primary-500/40 dark:bg-primary-500/10 dark:text-primary-200"
      [attr.aria-label]="ariaLabel || text"
    >
      {{ text }}<ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() text = '';
  @Input() ariaLabel?: string;
}
