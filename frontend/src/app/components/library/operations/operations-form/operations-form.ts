import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";
import { OperationsListService } from '../../../../services/operations-list-service';
import { Router } from '@angular/router';
import { DatesModule } from "../../../../modules/dates/dates-module";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-operations-form',
  standalone: false,
  templateUrl: './operations-form.html',
  styleUrl: './operations-form.scss'
})

export class OperationsForm implements OnInit {

  modalWorkersVisible = false;
  modalEquipmentsVisible = false;
  modalServiceOrganizationVisible = false;

  tOperationsList: any;
  idOperationsList: any;

  onDate: any;
  onDatePlaceholder: any;

  idWorker: any;
  workerFIOFull: any;

  idEquipment: any;
  equipmentsValue: any;

  idServiceOrganization: any;
  serviceOrganizationTitle: any;

  note: any;
  typeOpp: any = '';

  typeOperationAdd: boolean = false;
  typeOperation3: boolean = false;
  typeOperation4: boolean = false;

  userEDRPOU: any;
  userRoles: any;

  form = this.fb.group({
    type_operation: [''],
    date: [''],
    id_worker: [''],
    id_equipment: [''],
    id_service_organization: [''],
    note: [''],
    actual: [1],
    edrpou: ['']
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private operationsListService: OperationsListService,
    private router: Router,
    private datesModule: DatesModule,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
  ) {  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    if (params['id']) {
      this.onDatePlaceholder = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
      this.getOperation(params['id']);
    } else {
      this.typeOperationAdd = true;
      this.onDatePlaceholder = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
      this.onDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
    }
  }

  getOperation(idOperationList: any) {
    this.operationsListService.get(idOperationList)
      .subscribe(
        res => {
          this.tOperationsList = res;
          this.onDatePlaceholder = this.datesModule.DateMySQLToInput(this.tOperationsList[0][0].OperationsListDate);
          this.onDate = this.datesModule.DateInputToMySQL(this.onDatePlaceholder);
          this.idOperationsList = this.tOperationsList[0][0].OperationsListID;
          this.typeOpp = this.typeOppCreate(this.tOperationsList[0][0].OperationsListTypeOperation);
          this.idEquipment = this.tOperationsList[0][0].EquipmentsID;
          this.equipmentsValue = this.tOperationsList[0][0].EquipmentsValue;
          this.idWorker = this.tOperationsList[0][0].WorkersID;
          this.workerFIOFull = this.tOperationsList[0][0].WorkersFIOFull;
          this.idServiceOrganization = this.tOperationsList[0][0].ServiceOrganizationsID;
          this.serviceOrganizationTitle = this.tOperationsList[0][0].ServiceOrganizationsTitle;
          this.note = this.tOperationsList[0][0].OperationsListNote;

          this.form.setValue({
            type_operation: this.tOperationsList[0][0].OperationsListTypeOperation,
            date: this.tOperationsList[0][0].OperationsListDate,
            id_worker: this.tOperationsList[0][0].WorkersID,
            id_equipment: this.tOperationsList[0][0].EquipmentsID,
            id_service_organization: this.tOperationsList[0][0].ServiceOrganizationsID,
            note: this.tOperationsList[0][0].OperationsListNote,
            actual: this.tOperationsList[0][0].OperationsListActual,
            edrpou: ''
          });
        },
        err => console.error(err)
      )
  }

  typeOppCreate(value: any){
    let returnData = '';
    switch (value) {
      case 3: returnData = 'ВНУТРІШНЄ ПЕРЕМІЩЕННЯ'; this.typeOperation3 = true; break;
      case 4: returnData = 'ВІДПРАВКА НА РЕМОНТ'; this.typeOperation4 = true; break;
    }
    return returnData;
  }

  openModalWorkers(): void {
    if (!this.modalWorkersVisible){
      this.modalWorkersVisible = true;
      this.modalEquipmentsVisible = false;
      this.modalServiceOrganizationVisible = false;
    } else if (this.modalWorkersVisible){
      this.modalWorkersVisible = false;
    }
  }

  closeModalWorkers(): void {
    this.modalWorkersVisible = false;
  }

  openModalEquipments(): void {
    if (!this.modalEquipmentsVisible){
      this.modalEquipmentsVisible = true;
      this.modalWorkersVisible = false;
      this.modalServiceOrganizationVisible = false;
    } else if (this.modalEquipmentsVisible){
      this.modalEquipmentsVisible = false
    }
  }

  closeModalEquipments(): void {
    this.modalEquipmentsVisible = false;
  }

  openModalServiceOrganizations(): void {
    if (!this.modalServiceOrganizationVisible){
      this.modalServiceOrganizationVisible = true;
      this.modalEquipmentsVisible = false;
      this.modalWorkersVisible = false;
    } else if (this.modalServiceOrganizationVisible){
      this.modalServiceOrganizationVisible = false;
    }
  }

  closeModalServiceOrganizations(): void {
    this.modalServiceOrganizationVisible = false;
  }

  ChangeTypeOperation(e: any){
    this.idServiceOrganization = null;
    this.idWorker = null;

    this.form.patchValue(
      { type_operation: e.target.value },
      { emitEvent: false }
    );

    this.form.patchValue(
      { id_service_organization: '' },
      { emitEvent: false }
    );

    this.form.patchValue(
      { id_worker: '' },
      { emitEvent: false }
    );

    switch (e.target.value) {
      case '3':
        this.typeOperation3 = true;
        this.typeOperation4 = false;

        break;
      case '4':
        this.typeOperation3 = false;
        this.typeOperation4 = true;
        break;
    }
  }

  OnDateChange(): void {
    let date: HTMLInputElement | null;
    date = document.getElementById('date') as HTMLInputElement | null;
    this.onDate = date?.value;
  }

  async dataVerification() {
    let operations: any;
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ARM1_OPL_ADD', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_OPL_ADD', 'save');

    this.operationsListService.getAll()
      .subscribe(
        res => {
          operations = res[0];
          operations = operations.filter((obj: any) => {
            return obj.OperationsListActual == '1' && obj.OperationsListEDRPOU == this.userEDRPOU && obj.EquipmentsID == this.idEquipment
          });

          if (blocked){
            if (operations.length != 0) {
              this.updateOperationList()
              setTimeout(() => {
                this.saveOperationList();
              }, 1000)
            } else {
              this.saveOperationList()
            }
          }

        },
        err => console.log(err)
      );
  }

  saveOperationList() {

    this.form.patchValue(
      {id_equipment: this.idEquipment},
      {emitEvent: false}
    );

    this.form.patchValue(
      {date: this.onDate},
      {emitEvent: false}
    );

    this.form.patchValue(
      {id_service_organization: this.idServiceOrganization},
      {emitEvent: false}
    );
    this.form.patchValue(
      {id_worker: this.idWorker},
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
          this.router.navigate(['/OperationsList/List']);
        },
        err => console.log(err)
      )
  }

  updateOperationList(){
    let data: any = [{'actual' : 0}];

    this.operationsListService.updateActual(this.idEquipment, data)
      .subscribe(
        res => {

        },
        err => console.log(err)
      )

  }

}
