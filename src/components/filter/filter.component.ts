import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Input() fields: string[] = [];
  @Input() types: string[] = [];
  @Input() years: number[] = [];

  @Input() selectedField: string = '';
  @Input() selectedType: string = '';
  @Input() selectedYear: number | null = null;
  @Input() searchTerm: string = '';

  @Output() fieldChange = new EventEmitter<string>();
  @Output() typeChange = new EventEmitter<string>();
  @Output() yearChange = new EventEmitter<number | null>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  onFieldChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedField = select.value;
    this.fieldChange.emit(this.selectedField);
  }

  onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType = select.value;
    this.typeChange.emit(this.selectedType);
  }

  onYearChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedYear = select.value ? +select.value : null;
    this.yearChange.emit(this.selectedYear);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.searchChange.emit(this.searchTerm);
  }

  onResetFilters(): void {
    this.resetFilters.emit();
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
}
