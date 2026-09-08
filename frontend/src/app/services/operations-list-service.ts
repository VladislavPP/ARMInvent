import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { OperationsList } from '../models/OperationsList';
import {Equipments} from '../models/Equipments';

@Injectable({
  providedIn: 'root'
})

export class OperationsListService {
  //baseUrl = 'http://127.0.0.1:8080/api/operationsList';//localhost
  //baseUrl = 'http://78.154.177.34:3001/api/operationsList';//webhost
  baseUrl = 'http://139.28.37.15:3001/api/operationsList';//DeltaHost

  constructor(private http: HttpClient) { }

  getAll(): Observable<OperationsList[]> {
    return this.http.get<OperationsList[]>(this.baseUrl);
  }

  get(id: any): Observable<OperationsList> {
    return this.http.get<OperationsList>(`${(this.baseUrl)}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  updateActual(idEquipment: any, data?: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateActual/${idEquipment}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
