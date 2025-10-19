import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/content.service';
import { LucideAngularModule } from 'lucide-angular';
import { ChipComponent } from '../../shared/chip/chip.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, ChipComponent],
  template: `
    <section class="bg-white py-20 dark:bg-slate-950">
      <div class="mx-auto max-w-5xl space-y-10 px-6">
        <header class="space-y-4 animate-fade-up">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'experience.title' | translate }}</h1>
          <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {{ 'experience.subtitle' | translate }}
          </p>
        </header>

        <ol class="relative border-l border-slate-200 dark:border-slate-800" aria-label="Linha do tempo de experiências profissionais">
          <li
            *ngFor="let item of experience(); let idx = index"
            class="ml-6 space-y-4 pb-12 last:pb-0 animate-fade-up"
            [ngClass]="{ 'delay-1': idx % 2 === 1 }"
            [attr.aria-posinset]="idx + 1"
            [attr.aria-setsize]="experience().length"
          >
            <div class="absolute -left-3 flex size-6 items-center justify-center rounded-full border-2 border-white bg-primary-500 text-white dark:border-slate-950">
              <lucide-icon name="Briefcase" class="size-3.5"></lucide-icon>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/80">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ item.role }}</h2>
                  <p class="text-sm text-primary-600 dark:text-primary-300">
                    {{ item.company }}
                  </p>
                </div>
                <span class="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
                  {{ item.period }}
                </span>
              </div>
              <div class="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-300">
                <span *ngIf="item.location" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                  {{ item.location }}
                </span>
                <span *ngIf="item.contractType" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                  {{ item.contractType }}
                </span>
              </div>
              <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                <li *ngFor="let highlight of item.highlights">{{ highlight }}</li>
              </ul>
              <div *ngIf="item.stack?.length" class="mt-4 flex flex-wrap gap-2">
                <app-chip
                  *ngFor="let tech of item.stack"
                  [label]="tech"
                  icon="Cpu"
                ></app-chip>
              </div>
              <div *ngIf="item.competencies?.length" class="mt-3 flex flex-wrap gap-2">
                <app-chip
                  *ngFor="let competency of item.competencies"
                  [label]="competency"
                  icon="Award"
                ></app-chip>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  private readonly content = inject(ContentService);
  readonly experience = computed(() => this.content.profile()?.experience ?? []);
}
