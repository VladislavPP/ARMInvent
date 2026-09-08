import {Component, OnInit, signal} from '@angular/core';
import { ServiceOrganizationsService } from '../../../services/service-organizations-service';
import { OperationsForm } from "../../library/operations/operations-form/operations-form";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sublevel-service-organizations',
  standalone: false,
  templateUrl: './sublevel-service-organizations.html',
  styleUrl: './sublevel-service-organizations.scss'
})

export class SublevelServiceOrganizations implements OnInit {
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
    private operationsForm:OperationsForm,
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
        setTimeout(() => { this.operationsForm.idServiceOrganization = this.tServiceOrganizations.id }, 500);
        setTimeout(() => { this.operationsForm.serviceOrganizationTitle = this.tServiceOrganizations.title }, 500);
        setTimeout(() => { this.operationsForm.closeModalServiceOrganizations()}, 500);
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
