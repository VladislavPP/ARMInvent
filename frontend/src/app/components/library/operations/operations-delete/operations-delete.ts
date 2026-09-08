import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { EquipmentsService } from '../../../../services/equipments-service';
import { OperationsListService } from '../../../../services/operations-list-service';
import { Router } from '@angular/router';
import { DatesModule } from "../../../../modules/dates/dates-module";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-operations-delete',
  standalone: false,
  templateUrl: './operations-delete.html',
  styleUrl: './operations-delete.scss'
})

export class OperationsDelete implements OnInit {

  modalServiceOrganizationVisible = false;

  tOperationsList: any;
  idOperationsList: any;

  onDate: any;
  onDatePlaceholder: any;

  tEquipment: any;
  idEquipment: any;
  equipmentsValue: any;

  idServiceOrganization: any;
  serviceOrganizationTitle: any;

  note: any;
  typeOpp: any = '';

  typeOperation5: boolean = false;
  typeOperation6: boolean = false;

  userEDRPOU: any;
  userRoles: any;

  form = this.fb.group({
    type_operation: [''],
    date: [''],
    id_equipment: [''],
    id_service_organization: [''],
    note: [''],
    actual: ['0'],
    edrpou: ['']
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private operationsListService: OperationsListService,
    private equipmentsService: EquipmentsService,
    private router: Router,
    private datesModule: DatesModule,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
  ) {  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    let idEquipment: any;

    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['id']) {
      idEquipment = params['id'];
      this.onDatePlaceholder = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
      this.onDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
      this.getEquipment (idEquipment);
    }
  }

  getEquipment(idEquipment: any) {
    let tEquipment: any;
    this.equipmentsService.get(idEquipment)
      .subscribe(
        res => {
          tEquipment = res;
          this.idEquipment = idEquipment;
          this.equipmentsValue = tEquipment.title;

          this.form.patchValue(
            { id_equipment: idEquipment },
            { emitEvent: false }
          );

        },
        err => console.error(err)
      )
  }

  typeOppCreate(value: any){
    let returnData = '';
    switch (value) {
      case 5: returnData = 'ВИДАЛЕННЯ'; this.typeOperation5 = true; break;
      case 6: returnData = 'СПИСАННЯ'; this.typeOperation6 = true; break;
    }
    return returnData;
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

  ChangeTypeOperation(e: any){
    this.idServiceOrganization = null;

    this.form.patchValue(
      { type_operation: e.target.value },
      { emitEvent: false }
    );

    this.form.patchValue(
      { id_service_organization: '' },
      { emitEvent: false }
    );

    switch (e.target.value) {
      case '5':
        this.typeOperation5 = true;
        this.typeOperation6 = false;
        break;
      case '6':
        this.typeOperation5 = false;
        this.typeOperation6 = true;
        break;
    }
  }

  OnDateChange(): void {
    let date: HTMLInputElement | null;
    date = document.getElementById('date') as HTMLInputElement | null;
    this.onDate = date?.value;
  }

  dataVerification() {
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_OPL_ADD', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_OPL_ADD', 'save');

    if (blocked){
      this.disactiveActualEquipment();
      this.saveOperationList();
      this.updateOperationList();
    }
  }

  disactiveActualEquipment(){
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_EQP_EDT', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_EQP_EDT', 'edit');

    if (blocked) {
      this.equipmentsService.disactive(this.idEquipment)
        .subscribe(
          res => {
            //this.router.navigate(['/Equipments/List']);
          },
          err => console.log(err)
        )
    }
  }

  saveOperationList() {
    this.form.patchValue(
      {date: this.onDate},
      {emitEvent: false}
    );

    this.form.patchValue(
      {id_service_organization: this.idServiceOrganization},
      {emitEvent: false}
    );

    this.form.patchValue(
      {note: this.note},
      {emitEvent: false}
    );

    this.form.patchValue(
      {edrpou: this.userEDRPOU},
      {emitEvent: false}
    );

    this.operationsListService.create(this.form.value)
      .subscribe(
        res => {
          //this.router.navigate(['/OperationsList/List']);
        },
        err => console.log(err)
      )
  }

  updateOperationList(){
    this.form.patchValue(
      {date: this.onDate},
      {emitEvent: false}
    );
    this.operationsListService.updateActual(this.idEquipment, this.form.value)
      .subscribe(
        res => {
          this.router.navigate(['/Equipments/List']);
        },
        err => console.log(err)
      )
  }

}
