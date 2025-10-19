import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';
import { ContentService } from '../../core/content.service';
import { signal } from '@angular/core';
import { ProfileData } from '../../core/models/profile.model';
import { TranslateModule } from '@ngx-translate/core';

class MockContentService {
  private readonly profileSignal = signal<ProfileData | null>({
    name: 'Juan Mendes',
    headline: '',
    tagline: '',
    location: '',
    contacts: { email: '', phone: '', github: '', linkedin: '' },
    summary: '',
    studying_now: [],
    skills: {
      languages_frameworks: [],
      data_bi_ml: [],
      devops_tools: [],
      automation_tools: []
    },
    experience: [
      {
        role: 'Dev',
        company: 'Empresa',
        period: '2024',
        highlights: ['Entrega de projetos Angular', 'Automação com n8n']
      }
    ],
    education: [],
    languages: [],
    certifications: [],
    projects: []
  });

  profile = () => this.profileSignal();
}

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent, TranslateModule.forRoot()],
      providers: [{ provide: ContentService, useClass: MockContentService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the timeline component', () => {
    expect(component).toBeTruthy();
  });

  it('should render experience items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('ol li');
    expect(items.length).toBeGreaterThan(0);
  });
});
