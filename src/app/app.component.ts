import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentService } from './core/content.service';
import { SeoService } from './core/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule, NgIf],
  template: `
    <a class="skip-link" href="#main-content">{{ 'a11y.skip_to_content' | translate }}</a>
    <app-header aria-label="Topo do site de Juan Mendes"></app-header>
    <main id="main-content" class="flex-1">
      <router-outlet />
    </main>
    <app-footer></app-footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        background: var(--app-background);
        color: var(--app-foreground);
      }
      .skip-link {
        position: absolute;
        left: -999px;
        top: 1rem;
        background: #1d4ed8;
        color: #ffffff;
        padding: 0.5rem 1rem;
        border-radius: 999px;
        z-index: 1000;
        transition: left 0.2s ease;
      }
      .skip-link:focus {
        left: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private readonly seo: SeoService, content: ContentService) {
    this.seo.init();
  }
}
