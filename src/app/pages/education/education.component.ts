import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/content.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  template: `
    <section class="bg-slate-50 py-20 dark:bg-slate-900/90">
      <div class="mx-auto max-w-5xl space-y-8 px-6">
        <header class="space-y-4">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'education.title' | translate }}</h1>
          <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {{ 'education.subtitle' | translate }}
          </p>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          <article
            *ngFor="let item of education()"
            class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div class="flex items-center gap-3">
              <div class="flex size-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <lucide-icon name="BookOpen" class="size-5"></lucide-icon>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ item.course }}</h2>
                <p class="text-sm text-primary-600 dark:text-primary-300">{{ item.institution }}</p>
              </div>
            </div>
            <p class="mt-4 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
              {{ item.period }}
            </p>
          </article>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent {
  private readonly content = inject(ContentService);
  readonly education = computed(() => this.content.profile()?.education ?? []);
}
