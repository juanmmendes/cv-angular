import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '../../core/content.service';
import { GithubService } from '../../core/github.service';
import { CardComponent } from '../../shared/card/card.component';
import { TagComponent } from '../../shared/tag/tag.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

type FilterKey = 'all' | string;

interface FilterOption {
  key: FilterKey;
  label: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardComponent, TagComponent, ButtonComponent, LucideAngularModule],
  template: `
    <section class="overflow-x-hidden bg-gradient-to-b from-white via-white to-primary-50/30 py-20 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-900">
      <div class="mx-auto max-w-6xl space-y-12 px-6">
        <header class="space-y-4 animate-fade-up">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'projects.title' | translate }}</h1>
          <p class="max-w-3xl text-base text-slate-600 dark:text-slate-300">
            {{ 'projects.subtitle' | translate }}
          </p>
        </header>

        <div class="flex w-full flex-wrap gap-3 animate-fade-up delay-1" role="toolbar" aria-label="Filtros de projetos por tecnologia">
          <button
            *ngFor="let option of filters()"
            type="button"
            class="rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            [ngClass]="selectedFilter() === option.key ? 'bg-primary-600 text-white border-primary-500 shadow-md' : 'bg-white/85 text-slate-600 border-slate-200 hover:border-primary-400 hover:text-primary-500 dark:bg-slate-900/70 dark:text-slate-300 dark:border-slate-700'"
            (click)="selectFilter(option.key)"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <app-card
            *ngFor="let project of filteredProjects(); let i = index"
            [ariaLabel]="project.name"
            role="listitem"
            class="group w-full animate-fade-up"
            [ngClass]="{ 'delay-1': i % 3 === 1, 'delay-2': i % 3 === 2 }"
          >
            <div class="flex h-full flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900 transition group-hover:text-primary-600 dark:text-slate-50 dark:group-hover:text-primary-300">
                    {{ project.name }}
                  </h2>
                  <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {{ project.description }}
                  </p>
                </div>
                <a
                  *ngIf="project.links.github"
                  class="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:text-slate-300"
                  [href]="project.links.github"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Abrir repositório {{ project.name }} no GitHub"
                >
                  <lucide-icon name="Github" class="size-5"></lucide-icon>
                </a>
              </div>
              <div class="flex flex-wrap gap-2">
                <app-tag *ngFor="let tag of project.stack" [text]="tag"></app-tag>
              </div>
              <div class="mt-auto flex flex-wrap items-center gap-3">
                <app-button
                  *ngIf="project.links.demo"
                  [href]="project.links.demo"
                  target="_blank"
                  variant="ghost"
                  ariaLabel="Abrir demonstração de {{ project.name }}"
                  extraClasses="hover:-translate-y-0.5"
                >
                  <lucide-icon name="ExternalLink" class="size-5"></lucide-icon>
                  {{ 'projects.view_demo' | translate }}
                </app-button>
                <app-button
                  *ngIf="project.links.github"
                  [href]="project.links.github"
                  target="_blank"
                  variant="secondary"
                  ariaLabel="Abrir código de {{ project.name }} no GitHub"
                  extraClasses="hover:-translate-y-0.5"
                >
                  <lucide-icon name="Github" class="size-5"></lucide-icon>
                  {{ 'projects.view_code' | translate }}
                </app-button>
              </div>
            </div>
          </app-card>
        </div>

        <div class="flex justify-center animate-fade-up delay-1">
          <app-button
            href="https://github.com/juanmmendes?tab=repositories"
            target="_blank"
            variant="ghost"
            ariaLabel="Ver todos os repositórios públicos de Juan Mendes"
            extraClasses="hover:-translate-y-0.5"
          >
            <lucide-icon name="ExternalLink" class="size-5"></lucide-icon>
            {{ 'projects.more_repos' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly content = inject(ContentService);
  private readonly github = inject(GithubService);
  private readonly translate = inject(TranslateService);

  private readonly profileProjects = computed(() => this.content.profile()?.projects ?? []);
  private readonly allProjects = signal(this.profileProjects());
  readonly selectedFilter = signal<FilterKey>('all');

  readonly filters = computed<FilterOption[]>(() => {
    const map = new Map<string, string>();
    map.set('all', this.allLabel());
    this.allProjects().forEach((project) => {
      project.stack.forEach((tag) => {
        const key = tag.toLowerCase();
        if (!map.has(key)) {
          map.set(key, tag);
        }
      });
    });
    for (const highlight of this.highlightedFilters) {
      const key = highlight.toLowerCase();
      if (!map.has(key)) {
        map.set(key, highlight);
      }
    }
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  });

  readonly filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') {
      return this.allProjects();
    }
    return this.allProjects().filter((project) =>
      project.stack.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  private readonly highlightedFilters = [
    'TypeScript',
    'Angular',
    'Node.js',
    'Python',
    'Power BI',
    'n8n',
    'AWS',
    'VPS',
    'DNS',
    'Hospedagens',
    'Domínios',
    'Power Automate'
  ];

  private readonly allLabel = signal(this.translate.instant('projects.filter_all'));

  constructor() {
    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.allLabel.set(this.translate.instant('projects.filter_all'));
    });
    effect((onCleanup) => {
      const projects = this.profileProjects();
      if (!projects.length) {
        return;
      }
      const subscription = this.github.mergeProjects(projects).subscribe((combined) => {
        this.allProjects.set(
          combined.map((project) => ({
            ...project,
            stack: this.ensureHighlightTags(project.stack)
          }))
        );
      });
      onCleanup(() => subscription.unsubscribe());
    });
  }

  selectFilter(filter: FilterKey): void {
    this.selectedFilter.set(filter);
  }

  private ensureHighlightTags(stack: string[]): string[] {
    const normalized = new Set(stack);
    for (const highlight of this.highlightedFilters) {
      if (highlight === 'AWS') {
        if (stack.some((item) => item.toLowerCase().includes('aws'))) {
          normalized.add('AWS Cloud');
        }
      }
      if (highlight === 'Power Automate') {
        if (stack.some((item) => item.toLowerCase().includes('power'))) {
          normalized.add('Power Automate');
          normalized.add('Microsoft 365');
        }
      }
    }
    return Array.from(normalized);
  }
}
