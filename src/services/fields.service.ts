import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' and 'map'
import { map, tap } from 'rxjs/operators'; // Import 'map'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FieldInResponseType, FieldType } from '../types/fields';
import { castToFieldType } from '../utils/dto/field.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  fields: FieldType[] | null = null;

  constructor(private http: HttpClient) {}

  // In a real application, this would fetch from an API
  getFields(): Observable<FieldType[]> {
    if (this.fields) return of(this.fields);

    return this.http
      .get<FieldInResponseType[]>(`${environment.apiUrl}/fields`)
      .pipe(
        map((fields) => fields.map((field) => castToFieldType(field))),
        tap((fields) => (this.fields = fields))
      );
  }
}
