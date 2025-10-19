export interface ProfileProjectLink {
  github?: string;
  demo?: string;
}

export interface ProfileProject {
  name: string;
  description: string;
  stack: string[];
  links: ProfileProjectLink;
}

export interface ProfileExperience {
  role: string;
  company: string;
  period: string;
  location?: string;
  contractType?: string;
  highlights: string[];
  stack?: string[];
  competencies?: string[];
}

export interface ProfileEducation {
  course: string;
  institution: string;
  period: string;
}

export interface ProfileCertification {
  name: string;
  issuer: string;
  type: 'Certificação' | 'Curso' | 'Licença' | string;
  issued: string;
  expires?: string | null;
  credentialId?: string;
  competencies?: string[];
  description?: string;
  evidenceUrl?: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  contacts: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    discord?: string;
    steam?: string;
  };
  summary: string;
  studying_now: string[];
  skills: {
    languages_frameworks: string[];
    data_bi_ml: string[];
    devops_tools: string[];
    automation_tools: string[];
  };
  experience: ProfileExperience[];
  education: ProfileEducation[];
  languages: string[];
  certifications: ProfileCertification[];
  projects: ProfileProject[];
}
