import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FieldType } from '../../types/fields';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-card',
  imports: [CommonModule],
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.css',
})
export class FieldCardComponent {
  @Input() field!: FieldType;

  constructor(private router: Router) {}
  getGradientClass(): string {
    switch (this.field.id) {
      case '1':
        return 'bg-gradient-to-r from-blue-700 to-blue-600';
      case '2':
        return 'bg-gradient-to-r from-green-600 to-green-500';
      case '3':
        return 'bg-gradient-to-r from-purple-600 to-purple-500';
      default:
        return 'bg-gradient-to-r from-blue-700 to-blue-600';
    }
  }

  getButtonClass(): string {
    switch (this.field.id) {
      case '1':
        return 'bg-blue-700 hover:bg-blue-800';
      case '2':
        return 'bg-green-600 hover:bg-green-700';
      case '3':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-blue-700 hover:bg-blue-800';
    }
  }

  onViewProjects(): void {
    if (this.field)
      this.router.navigate(['/projects'], {
        queryParams: {
          field: this.field.id,
        },
      });
  }
}
