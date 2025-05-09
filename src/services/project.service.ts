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
export class ProjectService {
  project: ProjectType | null = null;

  constructor(private http: HttpClient) {}

  // In a real application, this would fetch from an API
  getProject(id: string): Observable<ProjectType> {
    if (this.project) return of(this.project);

    return this.http
      .get<ProjectInResponseType>(`${environment.apiUrl}/projects/${id}`)
      .pipe(
        map((project) => castToProject(project)),
        tap((project) => (this.project = project))
      );
  }
}
