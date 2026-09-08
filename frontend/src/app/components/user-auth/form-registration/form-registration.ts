import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

import { UsersService } from '../../../services/users-service';
import { RolesService } from '../../../services/roles-service';
import { FormBuilder, Validators } from '@angular/forms';
import { EDRPOUValidator } from '../../../validators/edrpouValidator';

@Component({
  selector: 'app-form-registration',
  standalone: false,
  templateUrl: './form-registration.html',
  styleUrl: './form-registration.scss'
})

export class FormRegistration implements OnInit {
  public allRoles: any;
  public guestRoles: any;

  tRolesForUser: any = [];
  //allEDRPOU: any = [];

  form = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    pass: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    roles: [''],
    edrpou: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]]
  });

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
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

  ngOnInit() {
    this.getAllEDRPOU()
    this.getAllRoles()
  }

  getAllRoles(){
    let guestUser: any;

    this.rolesService.getAll().subscribe(
      res => {
        this.allRoles = res;

        this.usersService.get(2)
          .subscribe(
            res => {
              guestUser = res;
              this.guestRoles = JSON.parse(guestUser.roles);
              for (let i = 0; i < this.guestRoles.length; i++){
                this.tRolesForUser.push(this.guestRoles[i])
              }
            },
            err => console.error(err)
          )

      })
  }

  CHBoxView(name: string){
    let checked: boolean = false;
    let stateEll: boolean;

      stateEll = this.tRolesForUser.includes(name);
      if (stateEll) {
        checked = true;
      }
    return checked;
  }

  async saveUser() {
    this.form.patchValue(
      { roles: JSON.stringify(this.tRolesForUser) },
      { emitEvent: false }
    );
    this.usersService.create(this.form.value)
      .subscribe(
        res => {
            alert('Вас зареєстровано. Ввійдіть використовуючи свої дані')
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000)
          },
        err => console.log(err)
      )
    }

    getAllEDRPOU(){
    let edrpouControl: any = this.form.get('edrpou');
    let allUser: any;
      this.usersService.getAll()
        .subscribe(
          res => {
            allUser = res;
            for (let i = 0; i < allUser.length; i++){
              edrpouControl.addValidators([EDRPOUValidator(allUser[i].edrpou)]);
              edrpouControl.updateValueAndValidity();
            }
          },
          err => console.error(err)
        )
    }
}
