import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/content.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ButtonComponent, LucideAngularModule],
  template: `
    <section class="bg-gradient-to-b from-white via-white to-primary-50/40 py-20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/80">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_0.9fr]">
        <div class="space-y-6 animate-fade-up">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">{{ 'contact.title' | translate }}</h1>
          <p class="text-base text-slate-600 dark:text-slate-300">
            {{ 'contact.subtitle' | translate }}
          </p>
          <div class="space-y-4">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ 'contact.direct_links' | translate }}
            </h2>
            <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li *ngFor="let link of quickLinks()" class="animate-fade-up">
                <a
                  class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 transition hover:border-primary-500 hover:text-primary-500 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-primary-400"
                  [href]="link.href"
                  [attr.target]="link.target"
                  rel="noreferrer noopener"
                >
                  <lucide-icon [name]="link.icon" class="size-5"></lucide-icon>
                  <span class="font-semibold">{{ link.label }}</span>
                </a>
              </li>
            </ul>
            <div class="space-y-3">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {{ 'contact.social_title' | translate }}
              </h3>
              <div class="flex flex-wrap gap-3">
                <a
                  *ngFor="let social of socialLinks()"
                  class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary-500 hover:text-primary-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-primary-400"
                  [href]="social.href"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <lucide-icon [name]="social.icon" class="size-4"></lucide-icon>
                  {{ social.label }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          class="space-y-7 rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-[0_25px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80"
          [formGroup]="contactForm"
          (ngSubmit)="submitForm()"
          novalidate
        >
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200" for="name">
              {{ 'contact.form.name' | translate }}
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-300"
              [attr.aria-invalid]="hasError('name')"
            />
            <p *ngIf="hasError('name')" class="mt-1 text-xs text-red-500">
              {{ 'contact.form.name_error' | translate }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200" for="email">
              {{ 'contact.form.email' | translate }}
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-300"
              [attr.aria-invalid]="hasError('email')"
            />
            <p *ngIf="hasError('email')" class="mt-1 text-xs text-red-500">
              {{ 'contact.form.email_error' | translate }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200" for="message">
              {{ 'contact.form.message' | translate }}
            </label>
            <textarea
              id="message"
              formControlName="message"
              rows="5"
              class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-primary-300"
              [attr.aria-invalid]="hasError('message')"
            ></textarea>
            <p *ngIf="hasError('message')" class="mt-1 text-xs text-red-500">
              {{ 'contact.form.message_error' | translate }}
            </p>
          </div>

          <div class="flex flex-col gap-3 animate-fade-up">
            <button
              type="submit"
              class="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 px-7 py-4 text-lg font-semibold text-white shadow-[0_25px_45px_-25px_rgba(59,130,246,0.65)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 hover:shadow-[0_35px_55px_-25px_rgba(99,102,241,0.55)]"
              aria-label="Enviar mensagem de contato"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <lucide-icon name="Send" class="size-5"></lucide-icon>
              <span class="relative">{{ ('contact.form.submit' | translate) || 'Enviar Mensagem' }}</span>
            </button>
            <p class="text-xs text-center text-slate-500 dark:text-slate-300">
              {{ 'contact.form.notice_whatsapp' | translate }}
            </p>
          </div>

          <div
            *ngIf="toast()"
            class="flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50/80 px-4 py-3 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-200"
            role="status"
          >
            <lucide-icon name="CheckCircle2" class="size-5"></lucide-icon>
            {{ toast() }}
          </div>
        </form>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly content = inject(ContentService);
  private readonly translate = inject(TranslateService);
  readonly toast = signal<string | null>(null);

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly quickLinks = computed(() => {
    const contacts = this.content.profile()?.contacts;
    return [
      {
        label: contacts?.email ?? 'Email',
        icon: 'Mail' as const,
        href: `mailto:${contacts?.email ?? ''}`,
        target: '_self'
      },
      {
        label: 'LinkedIn',
        icon: 'Linkedin' as const,
        href: contacts?.linkedin ?? '#',
        target: '_blank'
      },
      {
        label: 'GitHub',
        icon: 'Github' as const,
        href: contacts?.github ?? '#',
        target: '_blank'
      },
      {
        label: 'WhatsApp',
        icon: 'Zap' as const,
        href: this.buildWhatsAppLink(),
        target: '_blank'
      }
    ];
  });

  readonly socialLinks = computed(() => {
    const contacts = this.content.profile()?.contacts;
    return [
      {
        label: 'Discord',
        icon: 'MessageCircle' as const,
        href: contacts?.discord ?? '#'
      },
      {
        label: 'Steam',
        icon: 'Gamepad2' as const,
        href: contacts?.steam ?? '#'
      },
      {
        label: 'LinkedIn',
        icon: 'Linkedin' as const,
        href: contacts?.linkedin ?? '#'
      },
      {
        label: 'GitHub',
        icon: 'Github' as const,
        href: contacts?.github ?? '#'
      },
    ].filter((link) => link.href && link.href !== '#');
  });

  submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const { name, email, message } = this.contactForm.getRawValue();
    const composedMessage = this.translate.instant('contact.form.whatsapp_template', {
      name,
      email,
      message
    });
    const whatsappUrl = this.buildWhatsAppLink(composedMessage);

    if (typeof window !== 'undefined' && whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener');
    }

    this.toast.set(this.translate.instant('contact.form.success'));
    this.contactForm.reset();
    if (typeof window !== 'undefined') {
      setTimeout(() => this.toast.set(null), 5000);
    }
  }

  hasError(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private getWhatsappNumber(): string {
    const phone = this.content.profile()?.contacts.phone ?? '';
    return phone.replace(/\D/g, '');
  }

  private buildWhatsAppLink(message?: string): string {
    const number = this.getWhatsappNumber();
    if (!number) {
      return '#';
    }
    const base = `https://wa.me/55${number}`;
    if (!message) {
      return base;
    }
    return `${base}?text=${encodeURIComponent(message)}`;
  }
}
