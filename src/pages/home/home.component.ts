import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FieldCardComponent } from '../../components/field-card/field-card.component';
import { HeroBackgroundComponent } from '../../components/hero-background/hero-background.component';
import { ProjectService } from '../../services/projects.service';
import { FieldService } from '../../services/fields.service';
import { FieldType } from '../../types/fields';
import { ProjectType } from '../../types/projects';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ProjectCardComponent,
    FieldCardComponent,
    HeroBackgroundComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fields: FieldType[] = [];
  projects: ProjectType[] = [];

  constructor(
    protected router: Router,
    projectService: ProjectService,
    fieldService: FieldService
  ) {
    projectService.getProjects().subscribe({
      next: (projects) => {
        console.log('Projects loaded:', projects); // Debug log
        this.projects = projects;
      },
      error: () => {
        // Handle error (show message to user, etc.)
      },
    });

    fieldService.getFields().subscribe({
      next: (fields) => {
        console.log(fields);
        this.fields = fields;
      },
      error: () => {
        // Handle error (show message to user, etc.)
      },
    });
  }

  navigateToProjects(field: string = '') {
    if (field) {
      this.router.navigate(['/projects'], { queryParams: { field } });
    } else {
      this.router.navigate(['/projects']);
    }
  }
}
