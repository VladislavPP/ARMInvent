import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { UsersService } from '../../../../services/users-service';
import { RolesService } from '../../../../services/roles-service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';
import { EDRPOUValidator } from '../../../../validators/edrpouValidator';

@Component({
  selector: 'app-users-form',
  standalone: false,
  templateUrl: './users-form.html',
  styleUrl: './users-form.scss'
})

export class UsersForm implements OnInit {

  public edit: boolean = false;
  public tUsers: any;
  public idUser: any;
  public allRoles: any;
  public rootUser: boolean = false;

  form = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    pass: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    roles: [''],
    edrpou: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), EDRPOUValidator('02005310')]]
  });

  userEDRPOU: any;
  userRoles: any;
  userLogin: any;

  clearRolesForUsers: any = [];//бланк масиву ролей
  rolesForUsers: any = [];//перелік поточних ролей користувача в вигляді обєкту при редагуванні інформації (name + checked)
  tRolesForUser: any = [];//перелік поточних ролей користувача в вигляді масиву при редагуванні інформації (name)

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService
  ) { }

  get login() {
    return this.form.controls['login'];
  }

  get pass() {
    return this.form.controls['pass'];
  }

  get edrpou() {
    return this.form.controls['edrpou'];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');
    this.userLogin = this.cookieService.get('userLogin');

    if (this.userLogin == 'admin') {
      this.rootUser = true
    } else if (this.userLogin == 'ARM1Guest') {
      this.rootUser = false
    } else if (this.userLogin != 'admin' && this.userLogin != 'ARM1Guest') {
      this.rootUser = true
    }

    this.rootUser = true;
    this.form.patchValue(
      {edrpou: this.userEDRPOU},
      {emitEvent: false}
    );

    this.rolesService.getAll().subscribe(
      res => {
        this.allRoles = res;
        if (this.userEDRPOU != '02005310'){
          this.allRoles = this.allRoles.filter((obj: any) => {
            return obj.onlySuperadmin == 0
          });
        }
        for (let i = 0; i < this.allRoles.length; i++){
          this.clearRolesForUsers.push([{
            'name': this.allRoles[i].name,
            'checked': 0
          }])
        }
      },
      err => console.error(err)
    )

    if (params['id']) {

      if (params['id'] == 2 || params['id'] == 1 && this.userLogin != 'admin') {
        alert('По даному користувачу вносити зміни заборонено.');
        document.getElementById("logo")?.click();
      }

      if (this.userLogin == 'admin') {
        this.rootUser = true
      } else if (this.userLogin == 'ARM1Guest') {
        this.rootUser = false
      } else if (this.userLogin != 'admin' && this.userLogin != 'ARM1Guest') {
        this.rootUser = true
      }

      this.form.patchValue(
        {edrpou: this.userEDRPOU},
        {emitEvent: false}
      );
      this.edit = true;
      this.usersService.get(params['id'])
        .subscribe(
          res => {
            this.tUsers= res;
            this.idUser = this.tUsers.id;
            this.rolesForUsers = JSON.parse(this.tUsers.roles);

            for (let i = 0; i < this.rolesForUsers.length; i++){
              this.tRolesForUser.push(this.rolesForUsers[i][0].name)
            }

            /*Синхронізація позначки checked з бланком та поточним ролям користувача*/
            for (let j = 0; j < this.clearRolesForUsers.length; j++) {
              if (this.tRolesForUser.includes(this.clearRolesForUsers[j][0].name)){
                this.clearRolesForUsers[j][0].checked = 1
              }
            }

            this.form.setValue({
              login: this.tUsers.login,
              pass: this.tUsers.pass,
              roles:this.tUsers.roles,
              edrpou: this.tUsers.edrpou
            });

          },
          err => console.error(err)
        )
    }
  }

  CHBoxView(name: string){
    let checked: boolean = false;
    let stateEll: boolean;

    if (this.edit){
      stateEll = this.tRolesForUser.includes(name);
      if (stateEll) {
        checked = true;
      }
    }
    return checked;
  }

  changeCHBox(name: string){
    for (let i = 0; i < this.clearRolesForUsers.length; i++) {
      if (this.clearRolesForUsers[i][0].name == name && this.clearRolesForUsers[i][0].checked == 0) {
        this.clearRolesForUsers[i][0].checked = 1
      } else if (this.clearRolesForUsers[i][0].name == name && this.clearRolesForUsers[i][0].checked == 1) {
        this.clearRolesForUsers[i][0].checked = 0
      }
    }
  }

  async saveUser() {
    let blocked: boolean;
    let roles: any = [];

    blocked = await this.protectionModule.blockOpp('ADM_USR_ADD', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_USR_ADD', 'save');

    let rolesForUsers = this.clearRolesForUsers.filter((obj: any) => {
      return obj[0].checked == 1
    });

    for (let i = 0; i < rolesForUsers.length; i++){
      roles.push(rolesForUsers[i][0].name)
    }

    this.form.patchValue(
      {roles: JSON.stringify(roles)},
      {emitEvent: false}
    );

    if (blocked) {
      this.usersService.create(this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/Users/List']);
          },
          err => console.log(err)
        )
    }
  }

  async updateUser() {
    let blocked: boolean;
    let roles: any = [];

    blocked = await this.protectionModule.blockOpp('ADM_USR_EDT', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_USR_EDT', 'edit');

    let rolesForUsers = this.clearRolesForUsers.filter((obj: any) => {
      return obj[0].checked == 1
    });

    for (let i = 0; i < rolesForUsers.length; i++){
      roles.push(rolesForUsers[i][0].name)
    }

    this.form.patchValue(
      {roles: JSON.stringify(roles)},
      {emitEvent: false}
    );

    if (blocked) {
      this.usersService.update(this.idUser, this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/Users/List']);
          },
          err => console.log(err)
        )
    }
  }
}
