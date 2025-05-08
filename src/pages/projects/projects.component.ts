import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { ProjectType } from '../../types/projects';
import { ProjectService } from '../../services/projects.service';
import { FieldService } from '../../services/fields.service';
import { FieldType } from '../../types/fields';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  projects: ProjectType[] = [];
  filteredProjects: ProjectType[] = [];

  // Filter states
  selectedField: string = '';
  selectedType: string = '';
  selectedYear: number | null = null;
  searchTerm: string = '';

  // Available filter options
  fields: FieldType[] = [];
  types: string[] = ['PFA', 'Course'];
  years: number[] = [2023, 2022, 2021, 2020];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private fieldService: FieldService
  ) {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        console.log('Projects loaded:', projects); // Debug log
        this.projects = projects;
        this.filteredProjects = [...projects]; // Use spread operator for immutability
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        // Handle error (show message to user, etc.)
      },
    });

    this.fieldService.getFields().subscribe({
      next: (fields) => {
        console.log('Fields loaded:', fields); // Debug log
        this.fields = fields;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        // Handle error (show message to user, etc.)
      },
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedField = params['field'];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = this.projects;

    // Apply field filter
    if (this.selectedField) {
      filtered = filtered.filter(
        (project) => project.field.id === this.selectedField
      );
    }

    // Apply type filter
    if (this.selectedType) {
      filtered = filtered.filter(
        (project) => project.type === this.selectedType
      );
    }

    // Apply year filter
    if (this.selectedYear) {
      console.log(this.selectedYear);
      console.log(filtered);
      filtered = filtered.filter((project) => {
        console.log(`${project.year} ${this.selectedYear}`);

        return project.year == this.selectedYear;
      });

      console.log(filtered);
    }

    // Apply search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(term))
      );
    }

    this.filteredProjects = filtered;
  }

  resetFilters(): void {
    this.selectedField = '';
    this.selectedType = '';
    this.selectedYear = null;
    this.searchTerm = '';
    this.filteredProjects = this.projects;
  }

  // Helper methods for display
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

  getFieldColor(index: number): string {
    switch (index % 4) {
      case 1:
        return 'bg-blue-700';
      case 2:
        return 'bg-green-600';
      case 3:
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  }

  getFieldTextColor(field: number): string {
    return 'text-white';
  }
}
