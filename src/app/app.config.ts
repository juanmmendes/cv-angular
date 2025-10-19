import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { appRoutes } from './app.routes';
import { LucideAngularModule } from 'lucide-angular';
import { lucideIcons } from './shared/icons';

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function translateInitializer(translate: TranslateService) {
  return async () => {
    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang('pt');
    if (typeof window === 'undefined') {
      await firstValueFrom(translate.use('pt'));
      return;
    }
    const browserLang = window.navigator.language.startsWith('en') ? 'en' : 'pt';
    await firstValueFrom(translate.use(browserLang));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pt',
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }),
      LucideAngularModule.pick(lucideIcons)
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: translateInitializer,
      deps: [TranslateService],
      multi: true
    }
  ]
};
