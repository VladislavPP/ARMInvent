import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../../services/roles-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-roles-list',
  standalone: false,
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.scss'
})

export class RolesList implements OnInit {


  roles: any;
  page = 1;
  count = 0;
  tableSize = 10;
  sortCol: any = 'name';
  sortProp: any = 'ASC';
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private rolesService:RolesService,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService
  ){ }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    this.getRoles();
  }

  async getRoles() {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ADM_RLE_LST', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_RLE_LST', 'list');

    if (blocked && this.userEDRPOU == '02005310') {
      this.rolesService.getAll().subscribe(
        res => {
          this.roles = res;
        },
        err => console.log(err)
      );
    }
  }

  async deleteRole(id: string) {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ADM_RLE_EDT', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_RLE_EDT', 'edit');

    if (blocked) {
      this.rolesService.delete(id)
        .subscribe(
          res => {
            this.getRoles();
          },
          err => alert(err)
        )
    }
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  sortCondition(cond: any){
    switch (cond) {
      case 'valueASC': this.sortCol = 'value'; this.sortProp = 'ASC'; break;
      case 'valueDESC': this.sortCol = 'value'; this.sortProp = 'DESC'; break;
      case 'nameASC': this.sortCol = 'name'; this.sortProp = 'ASC'; break;
      case 'nameDESC': this.sortCol = 'name'; this.sortProp = 'DESC'; break;
    }
  }

  searchRows(nameCol: any){
    this.page = 1;
    switch (nameCol) {
      case 'SearchValue': this.searchCondition =  this.searchValue; break;

      case 'dumping': this.searchCondition =  ''; break;
    }
  }

}
