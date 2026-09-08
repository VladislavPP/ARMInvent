import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Equipments } from '../models/Equipments';

@Injectable({
  providedIn: 'root'
})

export class EquipmentsService {
  //baseUrl = 'http://127.0.0.1:8080/api/equipments';//localhost
  //baseUrl = 'http://78.154.177.34:3001/api/equipments';//webhost
  baseUrl = 'http://139.28.37.15:3001/api/equipments';//DeltaHost

  constructor(private http: HttpClient) { }

  getAll(): Observable<Equipments[]> {
    return this.http.get<Equipments[]>(this.baseUrl);
  }

  get(id: any): Observable<Equipments> {
    return this.http.get<Equipments>(`${(this.baseUrl)}/${id}`);
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

  disactive(id: any): Observable<Equipments> {
    return this.http.get<Equipments>(`${(this.baseUrl)}/disactive/${id}`);
  }

  getLastId(edrpou: any): Observable<Equipments> {
    return this.http.get<Equipments>(`${(this.baseUrl)}/lastId/${edrpou}`);
  }

}
