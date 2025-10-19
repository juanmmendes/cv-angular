import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <article
      class="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_25px_50px_-25px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:shadow-card dark:border-slate-800/60 dark:bg-slate-900/60"
      [attr.aria-label]="ariaLabel"
      [attr.role]="role"
    >
      <ng-content />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() ariaLabel?: string;
  @Input() role: 'article' | 'listitem' | 'presentation' = 'article';
}
