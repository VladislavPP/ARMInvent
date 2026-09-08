import {Component, signal} from '@angular/core';
import { EquipmentsService } from '../../../../services/equipments-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-equipments-list',
  standalone: false,
  templateUrl: './equipments-list.html',
  styleUrl: './equipments-list.scss'
})

export class EquipmentsList {

  equipments = signal<any>(null);
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
    private equipmentsService:EquipmentsService,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getEquipments()
    }, 1000)
  }

  getEquipments() {
    let equipments: any;
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_EQP_LST', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_EQP_LST', 'list');

    if (blocked){
      this.equipmentsService.getAll().subscribe(
        res => {
          equipments = res;
          this.equipments.set(equipments.filter((obj: any) => {return obj.edrpou == this.userEDRPOU && obj.actual == '1'}));
        },
        err => console.log(err)
      );
    }
  }

  async deleteEquipment(id: string) {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ARM1_EQP_EDT', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_EQP_EDT', 'edit');

    if (blocked){
      this.equipmentsService.delete(id)
        .subscribe(
          res => {
            this.getEquipments();
          },
          err => alert(err)
        )
    }
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  searchRows(nameCol: any){
    this.page = 1;
    switch (nameCol) {
      case 'searchValue': this.searchCondition =  this.searchValue; break;
      case 'dumping': this.searchCondition =  ''; break;
    }
  }
}
