import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceOrganizationsService } from '../../../../services/service-organizations-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-service-organizations-form',
  standalone: false,
  templateUrl: './service-organizations-form.html',
  styleUrl: './service-organizations-form.scss'
})

export class ServiceOrganizationsForm implements OnInit {

  public edit: boolean = false;
  public tServiceOrganization: any;
  public idServiceOrganization: any;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    adress: ['', [Validators.required, Validators.maxLength(100)]],
    services_provided: ['', [Validators.required, Validators.maxLength(250)]],
    edrpou: ['']
  });

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private fb: FormBuilder,
    private serviceOrganizationsService: ServiceOrganizationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService
  ) {
  }

  get title() {
    return this.form.controls['title'];
  }

  get adress() {
    return this.form.controls['adress'];
  }

  get services_provided() {
    return this.form.controls['services_provided'];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['id']) {
      this.serviceOrganizationsService.get(params['id'])
        .subscribe(
          res => {
            this.tServiceOrganization = res;
            this.idServiceOrganization = this.tServiceOrganization.id;
            this.form.setValue({
              title: this.tServiceOrganization.title,
              adress: this.tServiceOrganization.adress,
              services_provided: this.tServiceOrganization.services_provided,
              edrpou: this.tServiceOrganization.edrpou
            });

            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  async saveServiceOrganization() {
    let blocked: boolean;

    this.form.patchValue(
      {edrpou: this.userEDRPOU},
      {emitEvent: false}
    );

    blocked = await this.protectionModule.blockOpp('ARM1_SRV_ADD', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_SRV_ADD', 'save');

    if (blocked) {
      this.serviceOrganizationsService.create(this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/ServiceOrganizations/List']);
          },
          err => console.log(err)
        )
    }
  }

  async updateServiceOrganization() {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ARM1_SRV_EDT', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_SRV_EDT', 'edit');

    if (blocked) {
      this.serviceOrganizationsService.update(this.idServiceOrganization, this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/ServiceOrganizations/List']);
          },
          err => console.log(err)
        )
    }
  }
}
