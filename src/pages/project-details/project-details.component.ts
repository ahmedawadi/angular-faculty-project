import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectType } from '../../types/projects';
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectType | undefined;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Convert to number

      this.projectService.getProjectById(id).subscribe(
        (project) => {
          this.project = project;
          this.loading = false;
          if (!project) {
            this.error = true;
          }
        },
        (error) => {
          this.loading = false;
          this.error = true;
          console.error('Error fetching project:', error);
        }
      );
    });
  }

  getFieldDisplayName(field: string): string {
    switch (field) {
      case 'development':
        return 'Development';
      case 'data-engineering':
        return 'Data Engineering';
      case 'big-data':
        return 'Big Data';
      default:
        return field;
    }
  }

  getFieldColor(field: string): string {
    switch (field) {
      case 'development':
        return 'bg-blue-700';
      case 'data-engineering':
        return 'bg-green-600';
      case 'big-data':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  }

  navigateBack(): void {
    this.router.navigate(['/projects']);
  }
}
