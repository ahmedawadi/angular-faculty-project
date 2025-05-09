import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FieldCardComponent } from '../../components/field-card/field-card.component';
import { HeroBackgroundComponent } from '../../components/hero-background/hero-background.component';
import { ProjectsService } from '../../services/projects.service';
import { FieldsService } from '../../services/fields.service';
import { FieldType } from '../../types/fields';
import { ProjectType } from '../../types/projects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    HttpClientModule,
    ProjectCardComponent,
    FieldCardComponent,
    HeroBackgroundComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fields: FieldType[] = [];
  projects: ProjectType[] = [];

  constructor(
    protected router: Router,
    projectService: ProjectsService,
    fieldService: FieldsService
  ) {
    console.log('joined');

    projectService.getProjects().subscribe({
      next: (projects) => {
        console.log('Projects loaded:', projects); // Debug log
        this.projects = projects;
      },
      error: (error) => {
        console.log(error);
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
