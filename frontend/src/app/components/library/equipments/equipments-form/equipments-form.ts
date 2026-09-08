import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { EquipmentsService } from '../../../../services/equipments-service';
import { OperationsListService } from '../../../../services/operations-list-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-equipments-form',
  standalone: false,
  templateUrl: './equipments-form.html',
  styleUrl: './equipments-form.scss'
})

export class EquipmentsForm implements OnInit {

  edit: boolean = false;
  tEquipment: any;
  idEquipment: any;

  titleOpp: any;

  modalServiceOrganizationVisible = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    invent_n: ['', [Validators.required, Validators.maxLength(50)]],
    serial_n: ['', [Validators.required, Validators.maxLength(50)]],
    new: [''],
    actual: ['1'],
    edrpou: ['']
  });

  addOperation = this.fb.group({
    type_operation: [''],
    date: [''],
    id_equipment: [''],
    id_service_organization: [''],
    actual: ['1'],
    edrpou: ['']
  });

  lastId: any;

  selectedRows: boolean[] = [false, true];
  valueRadioButtonNew: boolean = false;
  checkedNew: any | undefined;

  typeOperation2: boolean = false;

  idServiceOrganization: any;
  serviceOrganizationTitle: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private fb: FormBuilder,
    private equipmentsService: EquipmentsService,
    private operationsListService: OperationsListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService
  ) {
  }

  get title() {
    return this.form.controls['title'];
  }

  get invent_n() {
    return this.form.controls['invent_n'];
  }

  get serial_n() {
    return this.form.controls['serial_n'];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['status'] == 'Old') {
      this.titleOpp = 'Введіть інформацію про обладнання (наявне)';
      this.addOperation.patchValue(
        {type_operation: '1'},
        {emitEvent: false}
      );
      this.form.patchValue(
        {new: '0'},
        {emitEvent: false}
      );
    } else if (params['status'] == 'New') {
      this.titleOpp = 'Введіть інформацію про обладнання (придбане)';
      this.typeOperation2 = true;
      this.addOperation.patchValue(
        {type_operation: '2'},
        {emitEvent: false}
      );
      this.form.patchValue(
        {new: '1'},
        {emitEvent: false}
      );
    }

    if (params['id']) {
      this.edit = true;
      this.idEquipment = params['id'];
      this.equipmentsService.get(this.idEquipment)
        .subscribe(
          res => {
            this.tEquipment = res;
            this.form.setValue({
              title: this.tEquipment.title,
              invent_n: this.tEquipment.invent_n,
              serial_n: this.tEquipment.serial_n,
              new: this.tEquipment.new,
              actual: this.tEquipment.actual,
              edrpou: this.tEquipment.edrpou,
            })
            if (this.tEquipment.new == 1) {
              this.valueRadioButtonNew = true;
              this.checkedNew = 1;
            } else if (this.tEquipment.new == 0) {
              this.valueRadioButtonNew = false;
              this.checkedNew = 0;
            }
          },
          err => console.error(err)
        )
    }
  }

  openModalServiceOrganizations(): void {
    if (!this.modalServiceOrganizationVisible){
      this.modalServiceOrganizationVisible = true;
    } else if (this.modalServiceOrganizationVisible){
      this.modalServiceOrganizationVisible = false;
    }
  }

  closeModalServiceOrganizations(): void {
    this.modalServiceOrganizationVisible = false;
  }

  radioButtonNew() {
    if (this.valueRadioButtonNew) {
      this.valueRadioButtonNew = false;
      this.checkedNew = 0;
      this.form.patchValue(
        {new: '0'},
        {emitEvent: false}
      );
    } else if (!this.valueRadioButtonNew) {
      this.valueRadioButtonNew = true;
      this.checkedNew = 1;
      this.form.patchValue(
        {new: '1'},
        {emitEvent: false}
      );
    }
  }

  saveEquipment() {
    let blocked: boolean;
    let lastId: any;

    this.form.patchValue(
      {edrpou: this.userEDRPOU},
      {emitEvent: false}
    );

    blocked = this.protectionModule.blockOpp('ARM1_EQP_ADD', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_EQP_ADD', 'save');

    if (blocked) {
      this.equipmentsService.create(this.form.value)
        .subscribe(
          res => {

            setTimeout(() => {
              this.equipmentsService.getLastId(this.userEDRPOU).subscribe(
                res => {
                  lastId = res;
                  this.lastId = lastId[0][0].id;
                }
              )
            }, 1000);

            setTimeout(() => {
              this.addOperation.patchValue(
                { date: formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB') },
                { emitEvent: false }
              );

              this.addOperation.patchValue(
                { id_equipment: this.lastId },
                { emitEvent: false }
              );

              this.addOperation.patchValue(
                { id_service_organization: this.idServiceOrganization },
                { emitEvent: false }
              );

              this.addOperation.patchValue(
                { edrpou: this.userEDRPOU },
                { emitEvent: false }
              );

              this.operationsListService.create(this.addOperation.value)
                .subscribe(
                  res => {
                    this.router.navigate(['/Equipments/List']);
                  },
                  err => console.log(err)
                )
            }, 2000)
          },
          err => console.log(err)
        )
    }
  }

  updateEquipment() {
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_EQP_EDT', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_EQP_EDT', 'edit');

    if (blocked) {
      this.equipmentsService.update(this.idEquipment, this.form.value)
        .subscribe(
          res => {
            this.router.navigate(['/Equipments/List']);
          },
          err => console.log(err)
        )
    }
  }
}
