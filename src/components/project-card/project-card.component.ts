import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectType } from '../../types/projects';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() project!: ProjectType;

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

  getFieldTextColor(field: string): string {
    return 'text-white';
  }
}
