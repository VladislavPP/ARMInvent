import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users-service';
import { Router } from '@angular/router';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList implements OnInit {


  users: any;
  page = 1;
  count = 0;
  tableSize = 10;
  sortCol: any = 'id';
  sortProp: any = 'ASC';
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private usersService:UsersService,
    private router: Router,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService) { }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    this.getUsers();
  }

  async getUsers() {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ADM_USR_LST', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_USR_LST', 'list');

    if (blocked) {
      this.usersService.getAll().subscribe(
        res => {
          this.users = res;
          if (this.userEDRPOU != '02005310'){
            this.users = this.users.filter((obj: any) => {return obj.edrpou == this.userEDRPOU});
          }
        },
        err => console.log(err)
      );
    }
  }

  async deleteUser(id: number) {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ADM_USR_EDT', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_USR_EDT', 'edit');

    if (blocked) {
      this.usersService.delete(id)
        .subscribe(
          res => {
            this.getUsers();
          },
          err => alert(err)
        )
    }
  }

  editUser(id: number){
    this.router.navigate(['/Users/Edit/', id]);
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  sortCondition(cond: any){
    switch (cond) {
      case 'loginASC': this.sortCol = 'login'; this.sortProp = 'ASC'; break;
      case 'loginDESC': this.sortCol = 'login'; this.sortProp = 'DESC'; break;
      case 'passASC': this.sortCol = 'pass'; this.sortProp = 'ASC'; break;
      case 'passDESC': this.sortCol = 'pass'; this.sortProp = 'DESC'; break;
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
