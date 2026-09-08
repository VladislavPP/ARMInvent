import {Component, OnInit, signal} from '@angular/core';
import { ServiceOrganizationsService } from '../../../services/service-organizations-service';
import { OperationsDelete } from "../../library/operations/operations-delete/operations-delete";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sublevel-service-organizations-delete',
  standalone: false,
  templateUrl: './sublevel-service-organizations-delete.html',
  styleUrl: './sublevel-service-organizations-delete.scss'
})

export class SublevelServiceOrganizationsDelete implements OnInit {
  serviceOrganizations = signal<any>(null);
  tServiceOrganizations: any;
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;

  constructor(
    private serviceOrganizationsService:ServiceOrganizationsService,
    private operationsDelete:OperationsDelete,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    setTimeout(() => {
      this.getServiceOrganizations()
    }, 1000)
  }

  getServiceOrganizations() {
    let serviceOrganizations: any;
    this.serviceOrganizationsService.getAll().subscribe(
      res => {
        serviceOrganizations = res;
        this.serviceOrganizations.set(serviceOrganizations.filter((obj: any) => {return obj.edrpou == this.userEDRPOU}));
      },
      err => console.log(err)
    );
  }

  transferServiceOrganization(idServiceOrganization: number){
    this.serviceOrganizationsService.get(idServiceOrganization).subscribe(
      res => {
        this.tServiceOrganizations = res;
        setTimeout(() => { this.operationsDelete.idServiceOrganization = this.tServiceOrganizations.id }, 500);
        setTimeout(() => { this.operationsDelete.serviceOrganizationTitle = this.tServiceOrganizations.title }, 500);
        setTimeout(() => { this.operationsDelete.closeModalServiceOrganizations()}, 500);
      },
      err => alert(err)
    )
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  searchRows(nameCol: any){
    this.page = 1;
    switch (nameCol) {
      case 'searchValue': this.searchCondition =  this.searchValue; break;
      case 'dumping': this.searchCondition =  ''; break;
    }
  }
}
