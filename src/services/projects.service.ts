import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' and 'map'
import { map, tap } from 'rxjs/operators'; // Import 'map'
import { ProjectInResponseType, ProjectType } from '../types/projects';
import { castToProject } from '../utils/dto/project.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: ProjectType[] = [];

  constructor(private http: HttpClient) {}

  // In a real application, this would fetch from an API
  getProjects(): Observable<ProjectType[]> {
    if (this.projects.length !== 0) return of(this.projects);

    return this.http
      .get<ProjectInResponseType[]>(`${environment.apiUrl}/projects`)
      .pipe(
        map((projects) => projects.map((p) => castToProject(p))),
        tap((projects) => (this.projects = projects))
      );
  }

  getProjectById(id: string): Observable<ProjectType | undefined> {
    return this.getProjects().pipe(
      map((projects) => projects.find((project) => project.id === id))
    );
  }

  getProjectsByField(field: string): Observable<ProjectType[]> {
    return this.getProjects().pipe(
      map((projects) =>
        projects.filter((project) => project.field.id === field)
      )
    );
  }

  getProjectsByType(type: 'PFA' | 'Course'): Observable<ProjectType[]> {
    return this.getProjects().pipe(
      map((projects) => projects.filter((project) => project.type === type))
    );
  }

  getProjectsByYear(year: number): Observable<ProjectType[]> {
    return this.getProjects().pipe(
      map((projects) => projects.filter((project) => project.year === year))
    );
  }
}
