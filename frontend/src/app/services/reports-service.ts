import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  //baseUrl = 'http://127.0.0.1:8080/api/Reports';//localhost
  //baseUrl = 'http://78.154.177.34:3001/api/Reports';//webhost
  baseUrl = 'http://139.28.37.15:3001/api/Reports';//DeltaHost

  constructor(private http: HttpClient) { }

  //REPORT 01
  genReport01(id_worker: number){
    return this.http.get(`${this.baseUrl}/GenReport01/${id_worker}`);
  }

  report01TXT(dataToGen: any | undefined){
    return this.http.post(`${this.baseUrl}/GenReport01TXT`, dataToGen);
  }

  report01PDF(dataToGen: any | undefined){
    return this.http.post(`${this.baseUrl}/GenReport01PDF`, dataToGen);
  }

  //REPORT 02
  genReport02(id_equipment: number){
    return this.http.get(`${this.baseUrl}/GenReport02/${id_equipment}`);
  }

  report02TXT(dataToGen: any | undefined){
    return this.http.post(`${this.baseUrl}/GenReport02TXT`, dataToGen);
  }

  report02PDF(dataToGen: any | undefined){
    return this.http.post(`${this.baseUrl}/GenReport02PDF`, dataToGen);
  }

  //REPORT A03
  genReport03(dateToGen: any){
    return this.http.get(`${this.baseUrl}/GenReport03/${dateToGen}`);
  }

  report03XLSX(dataToGen: any){
    return this.http.post(`${this.baseUrl}/GenReport03XLSX`, dataToGen);
  }
}
