import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/content.service';
import { RatingComponent } from '../../shared/rating/rating.component';
import { ChipComponent } from '../../shared/chip/chip.component';

type SkillLevelKey = 'skills.level.intermediate' | 'skills.level.advanced';

interface SkillItem {
  name: string;
  level: SkillLevelKey;
  value: number;
}

interface SkillGroup {
  titleKey: string;
  items: SkillItem[];
}

interface TranslatedChip {
  label: string;
  icon: string;
  aria?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, RatingComponent, ChipComponent],
  template: `
    <section
      class="bg-gradient-to-b from-white via-white to-slate-50 py-20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/90"
    >
      <div class="mx-auto max-w-6xl space-y-12 px-6">
        <header class="space-y-4 animate-fade-up">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {{ 'skills.title' | translate }}
          </h1>
          <p class="max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {{ 'skills.subtitle' | translate }}
          </p>
        </header>

        <div class="grid gap-10 md:grid-cols-2">
          <section
            *ngFor="let group of groupedSkills(); let idx = index"
            class="space-y-6 animate-fade-up"
            [ngClass]="{ 'delay-1': idx === 1, 'delay-2': idx === 2 }"
          >
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {{ group.titleKey | translate }}
              </h2>
              <app-chip
                *ngIf="group.titleKey === 'skills.devops_title'"
                label="AWS Â· VPS Â· DNS"
                icon="Globe"
                [ariaLabel]="'skills.devops_chip_aria' | translate"
                extraClasses="text-xs sm:text-sm"
              ></app-chip>
            </div>
            <div class="space-y-4">
              <app-rating
                *ngFor="let skill of group.items"
                [label]="skill.name"
                [level]="skill.level"
                [value]="skill.value"
                [ariaLabel]="skill.name + ' ' + (skill.level | translate)"
              ></app-rating>
            </div>
          </section>
        </div>

        <section
          class="rounded-3xl border border-primary-100 bg-white/80 p-8 shadow-card dark:border-primary-500/20 dark:bg-slate-900/70 animate-fade-up delay-1"
        >
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {{ 'skills.infrastructure_focus.title' | translate }}
          </h2>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {{ 'skills.infrastructure_focus.description' | translate }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <app-chip
              *ngFor="let highlight of infrastructureHighlights"
              [label]="highlight.label | translate"
              [icon]="highlight.icon"
              [ariaLabel]="
                highlight.aria ? (highlight.aria | translate) : (highlight.label | translate)
              "
            ></app-chip>
          </div>
        </section>

        <section
          class="rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-card dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-2"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {{ 'skills.soft_skills.title' | translate }}
              </h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ 'skills.soft_skills.description' | translate }}
              </p>
            </div>
            <div class="flex gap-2 text-xs text-slate-500 dark:text-slate-300">
              <span
                class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"
              >
                <span class="size-2 rounded-full bg-primary-500"></span>
                {{ 'skills.soft_skills.focus_people' | translate }}
              </span>
              <span
                class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"
              >
                <span class="size-2 rounded-full bg-emerald-500"></span>
                {{ 'skills.soft_skills.focus_delivery' | translate }}
              </span>
            </div>
          </div>
          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <app-chip
              *ngFor="let soft of softSkills"
              [label]="soft.label | translate"
              [icon]="soft.icon"
              [ariaLabel]="soft.aria ? (soft.aria | translate) : (soft.label | translate)"
            ></app-chip>
          </div>
        </section>

        <section
          class="rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-card dark:border-slate-700 dark:bg-slate-900/70 animate-fade-up delay-3"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {{ 'skills.advanced_knowledge.title' | translate }}
              </h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ 'skills.advanced_knowledge.description' | translate }}
              </p>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <app-chip
              *ngFor="let topic of advancedExpertise"
              [label]="topic.label | translate"
              [icon]="topic.icon"
              [ariaLabel]="topic.aria ? (topic.aria | translate) : (topic.label | translate)"
            ></app-chip>
          </div>
        </section>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private readonly content = inject(ContentService);
  private readonly profile = computed(() => this.content.profile());

  readonly infrastructureHighlights: TranslatedChip[] = [
    {
      label: 'skills.infrastructure_focus.items.aws',
      icon: 'Globe',
      aria: 'skills.infrastructure_focus.items_aria.aws',
    },
    {
      label: 'skills.infrastructure_focus.items.hosting',
      icon: 'Layout',
      aria: 'skills.infrastructure_focus.items_aria.hosting',
    },
    {
      label: 'skills.infrastructure_focus.items.domains',
      icon: 'Tag',
      aria: 'skills.infrastructure_focus.items_aria.domains',
    },
    {
      label: 'skills.infrastructure_focus.items.m365',
      icon: 'BookOpen',
      aria: 'skills.infrastructure_focus.items_aria.m365',
    },
  ];

  readonly softSkills: TranslatedChip[] = [
    { label: 'skills.soft_skills.items.communication', icon: 'MessageCircle' },
    { label: 'skills.soft_skills.items.leadership', icon: 'Users' },
    { label: 'skills.soft_skills.items.analytics', icon: 'Brain' },
    { label: 'skills.soft_skills.items.time', icon: 'Clock' },
    { label: 'skills.soft_skills.items.organization', icon: 'Calendar' },
    { label: 'skills.soft_skills.items.problem_solving', icon: 'Lightbulb' },
    { label: 'skills.soft_skills.items.learning', icon: 'BookOpen' },
    { label: 'skills.soft_skills.items.agile', icon: 'Layers' },
    { label: 'skills.soft_skills.items.adaptability', icon: 'RefreshCcw' },
  ];

  readonly advancedExpertise: TranslatedChip[] = [
    {
      label: 'skills.advanced_knowledge.items.security',
      icon: 'ShieldCheck',
      aria: 'skills.advanced_knowledge.items_aria.security',
    },
    {
      label: 'skills.advanced_knowledge.items.lgpd',
      icon: 'FileLock',
      aria: 'skills.advanced_knowledge.items_aria.lgpd',
    },
    {
      label: 'skills.advanced_knowledge.items.crypto',
      icon: 'Lock',
      aria: 'skills.advanced_knowledge.items_aria.crypto',
    },
    {
      label: 'skills.advanced_knowledge.items.ml',
      icon: 'Cpu',
      aria: 'skills.advanced_knowledge.items_aria.ml',
    },
    {
      label: 'skills.advanced_knowledge.items.agents',
      icon: 'Bot',
      aria: 'skills.advanced_knowledge.items_aria.agents',
    },
    {
      label: 'skills.advanced_knowledge.items.protocols',
      icon: 'Network',
      aria: 'skills.advanced_knowledge.items_aria.protocols',
    },
    {
      label: 'skills.advanced_knowledge.items.http',
      icon: 'Rocket',
      aria: 'skills.advanced_knowledge.items_aria.http',
    },
  ];

  readonly groupedSkills = computed<SkillGroup[]>(() => {
    const profile = this.profile();
    if (!profile) {
      return [];
    }

    const groups: SkillGroup[] = [
      {
        titleKey: 'skills.languages_title',
        items: profile.skills.languages_frameworks.map((name) => this.mapSkill(name)),
      },
      {
        titleKey: 'skills.data_title',
        items: profile.skills.data_bi_ml.map((name) => this.mapSkill(name)),
      },
    ];

    if (profile.skills.devops_tools?.length) {
      groups.push({
        titleKey: 'skills.devops_title',
        items: profile.skills.devops_tools.map((name) => this.mapSkill(name)),
      });
    }

    if (profile.skills.automation_tools?.length) {
      groups.push({
        titleKey: 'skills.tooling_title',
        items: profile.skills.automation_tools.map((name) => this.mapSkill(name)),
      });
    }

    return groups;
  });

  private mapSkill(name: string): SkillItem {
    const normalized = name.toLowerCase();
    const advancedKeywords = [
      'typescript',
      'angular',
      'node',
      'python',
      'power bi',
      'aws',
      'n8n',
      'docker',
      'segurança',
      'security',
      'lgpd',
      'governança',
      'governance',
      'criptografia',
      'cryptography',
      'encryption',
      'http',
    ];
    const isAdvanced = advancedKeywords.some((keyword) =>
      normalized.includes(keyword.replace('.', ''))
    );

    return {
      name,
      level: isAdvanced ? 'skills.level.advanced' : 'skills.level.intermediate',
      value: isAdvanced ? 94 : 82,
    };
  }
}
