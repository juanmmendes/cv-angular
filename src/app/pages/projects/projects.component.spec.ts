import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ContentService } from '../../core/content.service';
import { GithubService } from '../../core/github.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
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
    experience: [],
    education: [],
    languages: [],
    certifications: [],
    projects: [
      {
        name: 'Projeto Local',
        description: 'Projeto estático',
        stack: ['Angular', 'TypeScript'],
        links: { github: 'https://github.com/juanmmendes/projeto' }
      }
    ]
  });

  profile = () => this.profileSignal();
}

class MockGithubService {
  mergeProjects(projects: ProfileData['projects']) {
    return of(projects);
  }
}

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ContentService, useClass: MockContentService },
        { provide: GithubService, useClass: MockGithubService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the projects component', () => {
    expect(component).toBeTruthy();
  });

  it('should render project cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});
