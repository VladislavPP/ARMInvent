import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatedReports} from "../models/CreatedReports";

@Injectable({
  providedIn: 'root'
})

export class CreatedReportsService {
  //baseUrl = 'http://127.0.0.1:8080/api/CreatedReports';//localhost
  //baseUrl = 'http://78.154.177.34:3001/api/CreatedReports';//WinServer2022
  baseUrl = 'http://139.28.37.15:3001/api/CreatedReports';//DeltaHost

  constructor( private http: HttpClient ) {  }

  getAll(): Observable<CreatedReports[]> {
    return this.http.get<CreatedReports[]>(this.baseUrl);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  downloadFileCreatedAReports(id: number){
    return this.http.get(`${this.baseUrl}/download/${id}`);
  }
}
