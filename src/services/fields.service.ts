import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' and 'map'
import { FieldType } from '../types/fields';
import { mockFields } from '../mock-data/fields';
import { castToFieldType } from '../utils/dto/field.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  // In a real application, this would fetch from an API
  getFields(): Observable<FieldType[]> {
    return of(mockFields.map((field) => castToFieldType(field))); // Returning the mockProjects
  }
}
