import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ProtectionModule {

  userId: any;
  userLogin: any;
  userRoles: any;
  userEDRPOU: any;
  blocked: boolean = false;
  tUser: any;
  userRolesArr: any = [];

  constructor(
    public cookieService:CookieService,
  ) { }

  leadUpData () {
    document.getElementById("logo")?.click();
  }

  getUserRoles() {
    if (this.cookieService.get('userId')) {
      this.userRoles = this.cookieService.get('userRoles');
    } else {
      alert('Вами не пройдено реєстрацію');
      document.getElementById("logo")?.click();
    }
  }

  blockOpp(nameOperation: any, allOperation: any){
    let blocked: boolean;
    blocked = allOperation.includes(nameOperation);
    return blocked;
  }

  blockedInformationMessage(nameOperation: string, typeOpp: string) {
    let action: boolean;
    action = !this.userRoles.includes(nameOperation);

    if (action) {
      switch (typeOpp) {
        case 'list':
          typeOpp = 'перегляд';
          break;
        case 'save':
          typeOpp = 'збереження';
          break;
        case 'edit':
          typeOpp = 'редагування';
          break;
        case 'report':
          typeOpp = 'генерація звіту';
          break;
      }

      switch (nameOperation) {
        /*Roles*/
        case 'ADM_RLE_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ADM_RLE_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ADM_RLE_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;

        /*Users*/
        case 'ADM_USR_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ADM_USR_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ADM_USR_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;

        /*Operations List*/
        case 'ARM1_OPL_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_OPL_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        /*case 'ARM1_OPL_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;*/

        /*Equipments*/
        case 'ARM1_EQP_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_EQP_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_EQP_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;

        /*Workers*/
        case 'ARM1_WRK_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_WRK_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_WRK_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;

        /*Reports*/
        case 'ARM1_RPT_01':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          document.getElementById("logo")?.click();
          break;
        case 'ARM1_RPT_02':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          document.getElementById("logo")?.click();
          break;
        case 'ARM1_RPT_03':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          document.getElementById("logo")?.click();
          break;
        case 'ARM1_RPT_C':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          document.getElementById("logo")?.click();
          break;

        /*Service Organization*/
        case 'ARM1_SRV_LST':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_SRV_ADD':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
        case 'ARM1_SRV_EDT':
          alert(`Вам заборонено виконувати процедуру ${typeOpp} інформації (${nameOperation})`);
          //document.getElementById("logo")?.click();
          break;
      }
    }
  }
}
