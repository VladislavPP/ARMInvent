import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { RolesService } from '../../../../services/roles-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-roles-form',
  standalone: false,
  templateUrl: './roles-form.html',
  styleUrl: './roles-form.scss'
})

export class RolesForm implements OnInit {

  public edit: boolean = false;
  public tRoles: any;
  public idRole: any;

  form = this.fb.group({
    value: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
  });

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService) {
  }

  get value() {
    return this.form.controls['value'];
  }

  get name() {
    return this.form.controls['name'];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['id']) {
      this.rolesService.get(params['id'])
        .subscribe(
          res => {
            this.tRoles= res;
            this.idRole = this.tRoles.id;
            this.form.setValue({
              value: this.tRoles.value,
              name: this.tRoles.name
            });
            this.edit = true;
          }
        )
    }
  }

  async saveRole() {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ARM1_RLE_ADD', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ADM_RLE_ADD', 'save');

    if (blocked) {
      this.rolesService.create(this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/Roles/List']);
          },
          err => console.log(err)
        )
    }
  }

    async updateRole() {
      let blocked: boolean;

      blocked = await this.protectionModule.blockOpp('ADM_RLE_EDT', this.userRoles);
      await this.protectionModule.blockedInformationMessage('ADM_RLE_EDT', 'edit');

      if (blocked) {

        this.rolesService.update(this.idRole, this.form.value)
          .subscribe(
            res => {
              this.router.navigate(['/Roles/List']);
            },
            err => console.log(err)
          )
      }
    }}
