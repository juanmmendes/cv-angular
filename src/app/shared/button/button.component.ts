import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <ng-container *ngIf="!href; else link">
      <button
        [ngClass]="classes"
        [attr.aria-label]="ariaLabel"
        [attr.type]="type"
      >
        <ng-content />
      </button>
    </ng-container>
    <ng-template #link>
      <a
        [ngClass]="classes"
        [href]="href"
        [attr.target]="target"
        rel="noreferrer noopener"
        [attr.aria-label]="ariaLabel"
        [attr.download]="download || null"
      >
        <ng-content />
      </a>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      button,
      a {
        box-shadow: 0 10px 20px -15px rgba(37, 99, 235, 0.45);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  private readonly baseClass = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string;
  @Input() target?: string;
  @Input() ariaLabel?: string;
  @Input() size: ButtonSize = 'md';
  @Input() variant: ButtonVariant = 'primary';
  @Input() fullWidth = false;
  @Input() extraClasses = '';
  @Input() download?: string;

  get classes(): string {
    return [
      this.baseClass,
      this.sizeClass,
      this.variantClass,
      this.fullWidth ? 'w-full justify-center' : '',
      this.extraClasses
    ]
      .filter(Boolean)
      .join(' ');
  }

  private get sizeClass(): string {
    return this.size === 'lg' ? 'px-8 py-4 text-lg' : 'px-7 py-3.5 text-base';
  }

  private get variantClass(): string {
    switch (this.variant) {
      case 'secondary':
        return 'bg-white/75 text-slate-900 border border-slate-200 hover:bg-white hover:border-slate-300 dark:bg-slate-800/70 dark:text-slate-100 dark:border-slate-700 dark:hover:border-slate-600';
      case 'ghost':
        return 'bg-transparent text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-slate-800/80';
      default:
        return 'bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 shadow-card dark:bg-primary-500 dark:hover:bg-primary-400';
    }
  }
}
