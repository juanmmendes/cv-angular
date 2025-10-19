import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';
import { ProfileData } from './models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  private readonly profileState = signal<ProfileData | null>(null);
  private readonly loadingState = signal<boolean>(false);
  private readonly errorState = signal<string | null>(null);
  private loadedLang: string | null = null;

  readonly profile = computed(() => this.profileState());
  readonly loading = computed(() => this.loadingState());
  readonly error = computed(() => this.errorState());

  constructor() {
    const initialLang = this.normalizeLang(this.translate.currentLang || this.translate.defaultLang || 'pt');
    this.loadProfile(initialLang);

    this.translate.onLangChange.subscribe(({ lang }) => {
      this.loadProfile(this.normalizeLang(lang));
    });
  }

  loadProfile(lang?: string): void {
    const targetLang = this.normalizeLang(lang ?? this.translate.currentLang ?? this.translate.defaultLang ?? 'pt');

    if (this.loadedLang === targetLang && this.profileState()) {
      return;
    }

    this.loadingState.set(true);

    this.http
      .get<ProfileData>(`assets/data/profile.${targetLang}.json`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao carregar dados do portfólio', error);
          this.errorState.set('Não foi possível carregar os dados do portfólio.');
          return of(null);
        })
      )
      .subscribe((profile) => {
        this.profileState.set(profile);
        this.loadingState.set(false);
        this.loadedLang = targetLang;
      });
  }

  private normalizeLang(lang: string): 'pt' | 'en' {
    return lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
  }
}
