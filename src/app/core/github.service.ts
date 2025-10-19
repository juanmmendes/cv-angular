import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ProfileProject } from './models/profile.model';

interface GithubApiRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://api.github.com/users/juanmmendes/repos?sort=updated&per_page=12';

  getLatestRepositories() {
    return this.http.get<GithubApiRepository[]>(this.apiUrl).pipe(
      map((repos) =>
        repos.map((repo) => ({
          name: repo.name,
          description: repo.description ?? 'Repositório sem descrição detalhada.',
          stack: this.resolveStack(repo),
          links: {
            github: repo.html_url,
            demo: repo.homepage || undefined
          }
        }))
      )
    );
  }

  mergeProjects(profileProjects: ProfileProject[]) {
    return this.getLatestRepositories().pipe(
      map((reposFromApi) => {
        const existingNames = new Set(profileProjects.map((project) => project.name.toLowerCase()));
        const mappedApiProjects: ProfileProject[] = reposFromApi
          .filter((repo) => !existingNames.has(repo.name.toLowerCase()))
          .map((repo) => ({
            name: repo.name,
            description: repo.description,
            stack: repo.stack,
            links: repo.links
          }));

        return [...profileProjects, ...mappedApiProjects];
      }),
      catchError((error) => {
        console.warn('Fallback para projetos estáticos devido a erro GitHub', error);
        return of(profileProjects);
      })
    );
  }

  private resolveStack(repo: GithubApiRepository): string[] {
    const topics = repo.topics ?? [];
    const candidates = new Set<string>();
    if (repo.language) {
      candidates.add(repo.language);
    }
    topics.forEach((topic) => candidates.add(topic));
    if (candidates.size === 0) {
      candidates.add('Node.js');
    }
    return Array.from(candidates);
  }
}
