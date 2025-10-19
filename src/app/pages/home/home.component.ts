import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { ChipComponent } from '../../shared/chip/chip.component';

import { ButtonComponent } from '../../shared/button/button.component';

import { TagComponent } from '../../shared/tag/tag.component';

import { CardComponent } from '../../shared/card/card.component';

import { ContentService } from '../../core/content.service';

import { LucideAngularModule } from 'lucide-angular';



@Component({

  selector: 'app-home',

  standalone: true,

  imports: [

    CommonModule,

    RouterLink,

    TranslateModule,

    ChipComponent,

    ButtonComponent,

    TagComponent,

    CardComponent,

    LucideAngularModule

  ],

  template: `

    <section class="relative overflow-hidden bg-gradient-to-b from-white via-white to-transparent px-6 pb-24 pt-20 dark:from-slate-950 dark:via-slate-950/95">

      <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]"></div>

      <div class="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">

        <div class="space-y-6 animate-fade-up">

          <app-tag text="data-driven" aria-label="Profissional orientado a dados"></app-tag>

          <h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">

            {{ profile()?.name }}<br />

            <span class="text-primary-600">{{ profile()?.headline }}</span>

          </h1>

          <p class="text-lg text-slate-600 dark:text-slate-300">

            {{ animatedTagline() }}<span class="animate-pulse text-primary-500">|</span>

          </p>

          <p class="max-w-2xl text-base text-slate-500 dark:text-slate-300">

            {{ profile()?.summary }}

          </p>



          <div class="flex flex-wrap items-center gap-4">
            <app-button
              href="assets/docs/juan-mendes-cv.pdf"
              variant="primary"
              size="lg"
              [ariaLabel]="'home.cta_cv_aria' | translate"
              extraClasses="hover:-translate-y-0.5 shadow-lg hover:shadow-xl transition-transform"
              download="juan-mendes-cv.pdf"
            >
              <lucide-icon name="Download" class="size-5"></lucide-icon>
              {{ 'home.cta_cv' | translate }}
            </app-button>
            <app-button
              href="https://wa.me/5519999791601"
              target="_blank"
              variant="ghost"
              size="lg"
              [ariaLabel]="'home.cta_whatsapp_aria' | translate"
              extraClasses="hover:-translate-y-0.5 transition-transform"
            >
              <lucide-icon name="Zap" class="size-5"></lucide-icon>
              {{ 'home.cta_whatsapp' | translate }}
            </app-button>
          </div>


          <div class="mt-10 space-y-4">

            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">

              {{ 'home.main_stacks' | translate }}

            </h2>

            <div class="flex flex-wrap gap-3" aria-label="Stacks principais destacadas">

              <app-chip

                *ngFor="let stack of highlightedStacks"

                [label]="stack.label"

                [icon]="stack.icon"

                [ariaLabel]="stack.aria"

              ></app-chip>

            </div>

          </div>

        </div>



        <div class="relative isolate flex justify-center animate-fade-up delay-1">
          <div class="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-primary-100 bg-white/85 p-6 shadow-card backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/80">
            <div class="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-100/60 via-white/30 to-transparent dark:from-primary-500/25 dark:via-slate-900/40"></div>
            <div class="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <img
                src="assets/docs/perfil.jpg"
                [alt]="profile()?.name ? 'Foto de ' + profile()?.name : 'Foto de perfil'"
                class="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div class="pointer-events-none absolute inset-0 rounded-2xl border border-white/60 mix-blend-overlay dark:border-slate-700/50"></div>
            </div>
            <div class="mt-6 space-y-4">
              <div class="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                <p class="font-semibold text-slate-700 dark:text-slate-100">
                  {{ 'home.hero_status' | translate }}
                </p>
                <p>{{ profile()?.location }}</p>

              </div>

              <div class="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">

                <h3 class="text-sm font-semibold text-slate-600 dark:text-slate-200">

                  {{ 'home.studying_now' | translate }}

                </h3>

                <ul class="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-300">

                  <li *ngFor="let item of profile()?.studying_now">&bull; {{ item }}</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>



    <section class="bg-white/95 py-20 dark:bg-slate-950/90">

      <div class="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">

        <app-card

          *ngFor="let highlight of highlights; let i = index"

          [ariaLabel]="highlight.title | translate"

          class="animate-fade-up"

          [ngClass]="{ 'delay-1': i === 1, 'delay-2': i === 2 }"

        >

          <div class="flex flex-col gap-3">

            <div class="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">

              <lucide-icon [name]="highlight.icon" class="size-5"></lucide-icon>

            </div>

            <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">

              {{ highlight.title | translate }}

            </h3>

            <p class="text-sm text-slate-600 dark:text-slate-300">

              {{ highlight.description | translate }}

            </p>

          </div>

        </app-card>

      </div>

    </section>

  `,

  changeDetection: ChangeDetectionStrategy.OnPush

})

export class HomeComponent {

  private readonly destroyRef = inject(DestroyRef);

  private readonly content = inject(ContentService);

  private intervalHandle: ReturnType<typeof setInterval> | null = null;



  readonly profile = computed(() => this.content.profile());

  readonly animatedTagline = signal<string>('');



  readonly highlightedStacks = [

    { label: 'AWS Cloud', icon: 'Globe' as const, aria: 'Especialista em AWS Cloud' },

    { label: 'VPS & DNS', icon: 'Globe' as const, aria: 'Gerência VPS e DNS' },

    { label: 'Hospedagens', icon: 'Layout' as const, aria: 'Manutenção de Hospedagens' },

    { label: 'Domínios & Provedores', icon: 'Tag' as const, aria: 'Registro de domínios e provedores' },

    { label: 'Power Automate / Microsoft 365', icon: 'Wand2' as const, aria: 'Automação Microsoft 365' },

    { label: 'n8n & Node.js', icon: 'Cpu' as const, aria: 'Automação com n8n e Node.js' }

  ];



  readonly highlights = [

    {

      icon: 'Brain' as const,

      title: 'home.highlights.analytics_title',

      description: 'home.highlights.analytics_description'

    },

    {

      icon: 'Briefcase' as const,

      title: 'home.highlights.operations_title',

      description: 'home.highlights.operations_description'

    },

    {

      icon: 'Zap' as const,

      title: 'home.highlights.automation_title',

      description: 'home.highlights.automation_description'

    }

  ];



  constructor() {

    effect(() => {

      const tagline = this.profile()?.tagline;

      if (tagline) {

        this.startTypewriter(tagline);

      }

    });

    this.destroyRef.onDestroy(() => {

      if (this.intervalHandle) {

        clearInterval(this.intervalHandle);

      }

    });

  }



  private startTypewriter(text: string): void {

    if (!text) {

      return;

    }

    if (this.intervalHandle) {

      clearInterval(this.intervalHandle);

    }

    let index = 0;

    this.animatedTagline.set('');

    if (typeof window === 'undefined') {

      this.animatedTagline.set(text);

      return;

    }

    this.intervalHandle = setInterval(() => {

      if (index <= text.length) {

        this.animatedTagline.set(text.slice(0, index));

        index++;

      } else if (this.intervalHandle) {

        clearInterval(this.intervalHandle);

      }

    }, 60);

  }

}

