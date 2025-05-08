import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' and 'map'
import { map } from 'rxjs/operators'; // Import 'map'
import { ProjectType } from '../types/projects';
import { mockProjects } from '../mock-data/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // In a real application, this would fetch from an API
  getProjects(): Observable<ProjectType[]> {
    return of(mockProjects); // Returning the mockProjects
  }

  getProjectById(id: string): Observable<ProjectType | undefined> {
    return this.getProjects().pipe(
      map((projects) => projects.find((project) => project.id === id))
    );
  }

  getProjectsByField(fieldId: string): Observable<ProjectType[]> {
    return this.getProjects().pipe(
      map((projects) =>
        projects.filter((project) => project.field.id === fieldId)
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
