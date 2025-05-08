import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClientsData() {
    return this.http.get('http://localhost:8080/students');
  }
}
