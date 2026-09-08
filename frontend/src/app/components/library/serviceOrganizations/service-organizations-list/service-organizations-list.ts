import {Component, OnInit, signal} from '@angular/core';
import { ServiceOrganizationsService } from '../../../../services/service-organizations-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-service-organizations-list',
  standalone: false,
  templateUrl: './service-organizations-list.html',
  styleUrl: './service-organizations-list.scss'
})

export class ServiceOrganizationsList implements OnInit{

  serviceOrganizations = signal<any>(null);
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private serviceOrganizationsService:ServiceOrganizationsService,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getServiceOrganizations()
    }, 1000)
  }

  getServiceOrganizations() {
    let serviceOrganizations: any;
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_SRV_LST', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_SRV_LST', 'list');

    if (blocked) {
      this.serviceOrganizationsService.getAll().subscribe(
        res => {
          serviceOrganizations = res;
          this.serviceOrganizations.set(serviceOrganizations.filter((obj: any) => {
            return obj.edrpou == this.userEDRPOU
          }));
        },
        err => console.log(err)
      );
    }
  }

    deleteServiceOrganizations(id: string) {
      let blocked: boolean;

      blocked = this.protectionModule.blockOpp('ARM1_SRV_EDT', this.userRoles);
      this.protectionModule.blockedInformationMessage('ARM1_SRV_EDT', 'edit');

      if (blocked) {
        this.serviceOrganizationsService.delete(id)
          .subscribe(
            res => {
              this.getServiceOrganizations();
            },
            err => alert(err)
          )
      }
    }

    onTableDataChange(event: any) {
      this.page = event;
    }

    searchRows(nameCol: any) {
      this.page = 1;
      switch (nameCol) {
        case 'searchValue':
          this.searchCondition = this.searchValue;
          break;
        case 'dumping':
          this.searchCondition = '';
          break;
      }
    }
  }
