import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ContentService } from './content.service';
import { ProfileData, ProfileProject } from './models/profile.model';

interface RouteSeoData {
  title: string;
  description: string;
  ogType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly jsonLdId = 'json-ld-schema';

  constructor(
    private readonly router: Router,
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly content: ContentService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  init(): void {
    const initialSeo = this.collectSeoData(this.router.routerState.root);
    this.applySeo(initialSeo);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap(() => {
          const seoData = this.collectSeoData(this.router.routerState.root);
          this.applySeo(seoData);
        })
      )
      .subscribe();
  }

  private collectSeoData(route: ActivatedRoute): RouteSeoData | null {
    let snapshot = route.snapshot;
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    return snapshot.data['seo'] ?? null;
  }

  private applySeo(seoData: RouteSeoData | null): void {
    const profile = this.content.profile();
    if (!seoData) {
      return;
    }

    this.title.setTitle(seoData.title);
    this.meta.updateTag({ name: 'description', content: seoData.description });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:type', content: seoData.ogType ?? 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:url', content: this.currentUrl() });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });

    this.updateCanonicalLink();
    if (profile) {
      this.updateJsonLd(profile);
    }
  }

  private updateCanonicalLink(): void {
    const head = this.document.head;
    let canonicalLink = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', this.currentUrl());
  }

  private updateJsonLd(profile: ProfileData): void {
    const graph = [
      this.buildPersonNode(profile),
      ...profile.projects.map((project) => this.buildProjectNode(project))
    ];

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': graph
    };

    let script = this.document.getElementById(this.jsonLdId);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', this.jsonLdId);
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }

  private buildPersonNode(profile: ProfileData) {
    return {
      '@type': 'Person',
      name: profile.name,
      headline: profile.headline,
      description: profile.summary,
      email: `mailto:${profile.contacts.email}`,
      telephone: profile.contacts.phone,
      url: this.currentUrl(),
      sameAs: [profile.contacts.github, profile.contacts.linkedin],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hortolândia',
        addressRegion: 'SP',
        addressCountry: 'BR'
      },
      knowsAbout: [
        'TypeScript',
        'Angular',
        'Node.js',
        'Python',
        'Power BI',
        'n8n',
        'AWS Cloud',
        'VPS',
        'DNS',
        'Hospedagens',
        'Domínios',
        'Power Automate',
        'Microsoft 365'
      ]
    };
  }

  private buildProjectNode(project: ProfileProject) {
    return {
      '@type': 'CreativeWork',
      name: project.name,
      description: project.description,
      url: project.links.demo ?? project.links.github,
      inLanguage: 'pt-BR',
      keywords: project.stack.join(', '),
      sameAs: project.links.github ? [project.links.github] : []
    };
  }

  private currentUrl(): string {
    if (typeof window === 'undefined') {
      return 'https://juanmmendes.dev';
    }
    return window.location.origin + this.router.url;
  }
}
