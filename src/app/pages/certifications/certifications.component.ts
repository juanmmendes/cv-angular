import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/content.service';
import { LucideAngularModule } from 'lucide-angular';
import { ChipComponent } from '../../shared/chip/chip.component';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, ChipComponent],
  template: `
    <section class="bg-gradient-to-b from-white via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div class="mx-auto max-w-5xl space-y-8 px-6">
        <header class="space-y-3 animate-fade-up">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'certifications.title' | translate }}</h1>
          <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {{ 'certifications.subtitle' | translate }}
          </p>
        </header>

        <div class="grid gap-6 md:grid-cols-2">
          <article
            *ngFor="let item of certifications(); let index = index"
            class="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card dark:border-slate-700 dark:bg-slate-900/80 animate-fade-up"
            [ngClass]="{ 'delay-1': index % 2 === 1 }"
            [attr.aria-posinset]="index + 1"
            [attr.aria-setsize]="certifications().length"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ item.name }}</h2>
                <p class="text-sm text-primary-600 dark:text-primary-300">{{ item.issuer }}</p>
              </div>
              <span class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
                {{ item.type }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3 text-xs font-medium text-slate-500 dark:text-slate-300">
              <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{{ 'certifications.issued' | translate }} {{ item.issued }}</span>
              <span *ngIf="item.expires" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                {{ 'certifications.expires' | translate }} {{ item.expires }}
              </span>
              <span *ngIf="item.credentialId" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                {{ 'certifications.credential' | translate }} {{ item.credentialId }}
              </span>
            </div>

            <p *ngIf="item.description" class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ item.description }}
            </p>

            <div *ngIf="item.competencies?.length" class="flex flex-wrap gap-2">
              <app-chip
                *ngFor="let competency of item.competencies"
                [label]="competency"
                icon="Award"
              ></app-chip>
            </div>

            <a
              *ngIf="item.evidenceUrl"
              class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:text-primary-500"
              [href]="item.evidenceUrl"
              target="_blank"
              rel="noreferrer noopener"
            >
              {{ 'certifications.view_certificate' | translate }}
              <lucide-icon name="ExternalLink" class="size-4"></lucide-icon>
            </a>
          </article>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificationsComponent {
  private readonly content = inject(ContentService);
  readonly certifications = computed(() => this.content.profile()?.certifications ?? []);
}
