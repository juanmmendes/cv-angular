import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ChipComponent } from '../../shared/chip/chip.component';
import { ContentService } from '../../core/content.service';
import { ProfileCertification } from '../../core/models/profile.model';

type HighlightedCertification = ProfileCertification & { evidenceUrl: string };

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, ChipComponent, LucideAngularModule],
  template: `
    <section class="bg-white py-20 dark:bg-slate-950">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div class="flex flex-col gap-6">
          <div
            class="relative overflow-hidden rounded-[2rem] border border-primary-200 bg-gradient-to-br from-primary-200 via-primary-50 to-white shadow-card dark:border-primary-500/40 dark:from-primary-500/20 dark:via-slate-900/60 dark:to-slate-950"
          >
            <img
              [src]="photoUrl"
              [alt]="profile()?.name ? 'Retrato de ' + profile()?.name : 'Foto de perfil'"
              class="aspect-[4/5] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white/85 p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">{{ profile()?.name }}</h2>
            <p class="text-sm text-slate-600 dark:text-slate-300">{{ profile()?.headline }}</p>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {{ profile()?.location }}
            </p>
          </div>
        </div>

        <div class="space-y-8">
          <section class="space-y-4 animate-fade-up">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'about.title' | translate }}</h1>
            <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {{ profile()?.summary }}
            </p>
          </section>

          <section
            *ngIf="highlightedCertifications().length"
            class="rounded-3xl border border-primary-200/80 bg-white/95 p-6 shadow-card dark:border-primary-500/20 dark:bg-slate-900/80 animate-fade-up delay-1"
          >
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {{ 'about.highlight_certifications.title' | translate }}
                </h2>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  {{ 'about.highlight_certifications.description' | translate }}
                </p>
              </div>
              <div class="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-200">
                <lucide-icon name="Award" class="size-5"></lucide-icon>
              </div>
            </div>

            <div class="mt-6 grid gap-4 lg:grid-cols-2">
              <article
                *ngFor="let cert of highlightedCertifications(); let index = index"
                class="flex h-full flex-col gap-4 rounded-2xl border border-primary-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-primary-500/10 dark:bg-slate-900/80"
                [ngClass]="{ 'delay-1': index % 2 === 1 }"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                      {{ cert.name }}
                    </h3>
                    <p class="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                      {{ cert.issuer }}
                    </p>
                  </div>
                  <span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
                    {{ cert.type }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                  <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                    {{ 'certifications.issued' | translate }} {{ cert.issued }}
                  </span>
                  <span *ngIf="cert.credentialId" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                    {{ 'certifications.credential' | translate }} {{ cert.credentialId }}
                  </span>
                </div>
                <div *ngIf="cert.competencies?.length" class="flex flex-wrap gap-2">
                  <app-chip
                    *ngFor="let competency of cert.competencies | slice:0:3"
                    [label]="competency"
                    icon="Award"
                  ></app-chip>
                </div>
                <a
                  [href]="cert.evidenceUrl"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:text-primary-500"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {{ 'certifications.view_certificate' | translate }}
                  <lucide-icon name="ExternalLink" class="size-4"></lucide-icon>
                </a>
              </article>
            </div>
          </section>

          <div class="grid gap-6 lg:grid-cols-2">
            <section class="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-2">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ 'about.availability' | translate }}</h2>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">
                {{ 'about.availability_description' | translate }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <app-chip
                  *ngFor="let stack of profile()?.skills.devops_tools | slice:0:5"
                  [label]="stack"
                  icon="Cpu"
                ></app-chip>
              </div>
            </section>

            <section class="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-3">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ 'about.studying_now' | translate }}</h2>
              <div class="mt-3 flex flex-wrap gap-3">
                <app-chip
                  *ngFor="let item of profile()?.studying_now"
                  [label]="item"
                  icon="Wand2"
                  ariaLabel="Estudando {{ item }}"
                ></app-chip>
              </div>
            </section>

            <section
              *ngIf="languages().length"
              class="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-4 lg:col-span-2"
            >
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ 'about.languages_title' | translate }}</h2>
              <div class="mt-3 flex flex-wrap gap-3">
                <app-chip
                  *ngFor="let language of languages()"
                  [label]="language"
                  icon="Languages"
                  ariaLabel="Idioma {{ language }}"
                ></app-chip>
              </div>
            </section>

            <section
              *ngIf="featuredCourses().length"
              class="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-5 lg:col-span-2"
            >
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ 'about.courses_title' | translate }}</h2>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">
                {{ 'about.courses_description' | translate }}
              </p>
              <div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                  *ngFor="let course of featuredCourses()"
                  class="flex h-full flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div>
                    <h3 class="text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">
                      {{ course.name }}
                    </h3>
                    <p class="text-xs font-medium uppercase tracking-wide text-primary-600 dark:text-primary-300">
                      {{ course.issuer }}
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                    <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                      {{ 'certifications.issued' | translate }} {{ course.issued }}
                    </span>
                    <span *ngIf="course.credentialId" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                      {{ 'certifications.credential' | translate }} {{ course.credentialId }}
                    </span>
                  </div>
                  <div *ngIf="course.competencies?.length" class="flex flex-wrap gap-2">
                    <app-chip
                      *ngFor="let competency of course.competencies | slice:0:3"
                      [label]="competency"
                      icon="Award"
                    ></app-chip>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  private readonly content = inject(ContentService);

  private readonly certificationEvidence = new Map<string, string>([
    ['Administrando Banco de Dados', this.createEvidencePath('ADMINISTRANDO BANCO DE DADOS.pdf')],
    ['Implementação de Banco de Dados', this.createEvidencePath('IMPLEMENTANDO BANCO DE DADOS.pdf')],
    ['Análise de Dados no Power BI', this.createEvidencePath('PowerBiAnalise.pdf')],
    ['Visualizando Dados no Power BI', this.createEvidencePath('VisualizaçãoDeDadosPowerBI.pdf')],
    ['SharePoint', this.createEvidencePath('SharePoint.pdf')],
    ['Postura e Imagem Profissional', this.createEvidencePath('Postura e Imagem Profissional.pdf')],
    ['IA para seu Novo Emprego: do Currículo à Entrevista', this.createEvidencePath('IAparaCurriculo.pdf')],
    ['Inteligência Artificial e o Novo Contexto da Cultura Digital', this.createEvidencePath('Inteligência Artificial e o Novo Contexto da Cultura Digital.pdf')],
    ['Segurança em Tecnologia da Informação', this.createEvidencePath('SEGURANÇA EM TECNOLOGIA DA INFORMAÇÃO.pdf')],
    ['Oficina de Língua Portuguesa (Gramática)', this.createEvidencePath('CursoGramatica.pdf')]
  ]);

  readonly profile = computed(() => this.content.profile());
  readonly photoUrl = 'assets/docs/perfil.jpg';

  readonly languages = computed(() => this.profile()?.languages ?? []);

  readonly highlightedCertifications = computed<HighlightedCertification[]>(() => {
    const certifications = this.profile()?.certifications ?? [];
    return certifications
      .map((certification) => {
        const evidenceUrl = certification.evidenceUrl ?? this.certificationEvidence.get(certification.name);
        return evidenceUrl ? { ...certification, evidenceUrl } : null;
      })
      .filter((certification): certification is HighlightedCertification => certification !== null);
  });

  readonly featuredCourses = computed(() => {
    const highlightedNames = new Set(this.highlightedCertifications().map((certification) => certification.name));
    const certifications = this.profile()?.certifications ?? [];
    return certifications
      .filter((certification) => !highlightedNames.has(certification.name) && this.isHighlightCourse(certification))
      .slice(0, 6);
  });

  private isHighlightCourse(certification: ProfileCertification): boolean {
    const highlightTypes = ['Curso', 'Certificação', 'Licença', 'Course', 'Certification', 'License'];
    const highlightIssuers = [
      'Fundação Bradesco',
      'Hashtag Treinamentos',
      'Even3',
      'Amazon Web Services',
      'SAP',
      'n8n',
      'Alura'
    ];

    return highlightTypes.includes(certification.type) || highlightIssuers.includes(certification.issuer);
  }

  private createEvidencePath(fileName: string): string {
    return `assets/docs/${encodeURI(fileName)}`;
  }
}
