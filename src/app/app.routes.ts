import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: {
      seo: {
        title: 'Juan Mendes | Portfólio & Currículo',
        description:
          'Transformo curiosidade em código e dados em soluções. Conheça o portfólio completo de Juan Mendes com projetos em Angular, dados e automação.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: {
      seo: {
        title: 'Sobre | Juan Mendes',
        description: 'Perfil profissional, trajetória e objetivos de Juan Mendes, especialista em dados, automação e desenvolvimento full stack.',
        ogType: 'profile'
      }
    }
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then((m) => m.SkillsComponent),
    data: {
      seo: {
        title: 'Skills | Juan Mendes',
        description: 'Principais habilidades em TypeScript, Angular, Python, Power BI, AWS, VPS, DNS, hospedagens e automações Microsoft 365.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent),
    data: {
      seo: {
        title: 'Experiência | Juan Mendes',
        description:
          'Experiências profissionais de Juan Mendes com foco em automação jurídica, gestão administrativa e soluções orientadas a dados.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'education',
    loadComponent: () => import('./pages/education/education.component').then((m) => m.EducationComponent),
    data: {
      seo: {
        title: 'Formação | Juan Mendes',
        description: 'Formação acadêmica de Juan Mendes, incluindo Sistemas de Informação e Técnico em Informática no UNASP Hortolândia.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
    data: {
      seo: {
        title: 'Projetos | Juan Mendes',
        description: 'Projetos em dados, automação e desenvolvimento full stack de Juan Mendes, com integrações GitHub atualizadas.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'certifications',
    loadComponent: () => import('./pages/certifications/certifications.component').then((m) => m.CertificationsComponent),
    data: {
      seo: {
        title: 'Certificações | Juan Mendes',
        description: 'Certificações relevantes em SAP, n8n, Power BI, Node.js e AWS Skill Builder de Juan Mendes.',
        ogType: 'website'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      seo: {
        title: 'Contato | Juan Mendes',
        description: 'Entre em contato com Juan Mendes para projetos em dados, automação e desenvolvimento full stack.',
        ogType: 'website'
      }
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
