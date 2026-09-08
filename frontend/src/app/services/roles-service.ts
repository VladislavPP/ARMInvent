import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  //baseUrl = 'http://127.0.0.1:8080/api/roles';//localhost
  //baseUrl = 'http://78.154.177.34:3001/api/roles';//webhost
  baseUrl = 'http://139.28.37.15:3001/api/roles';//DeltaHost

  constructor(private http: HttpClient) { }

  getAll(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.baseUrl);
  }

  get(id: any): Observable<Roles> {
    return this.http.get<Roles>(`${(this.baseUrl)}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
