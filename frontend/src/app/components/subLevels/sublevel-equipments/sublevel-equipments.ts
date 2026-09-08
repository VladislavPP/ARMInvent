import {Component, OnInit, signal} from '@angular/core';
import { EquipmentsService } from '../../../services/equipments-service';
import { OperationsForm } from "../../library/operations/operations-form/operations-form";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sublevel-equipments',
  standalone: false,
  templateUrl: './sublevel-equipments.html',
  styleUrl: './sublevel-equipments.scss'
})

export class SublevelEquipments implements OnInit {

  equipments = signal<any>(null);
  tEquipment: any;
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;

  constructor(
    private equipmentsService:EquipmentsService,
    private operationsForm:OperationsForm,
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    setTimeout(() => {
      this.getEquipments()
    }, 1000)
  }

  getEquipments() {
    let equipments: any;
    this.equipmentsService.getAll().subscribe(
      res => {
        equipments = res;
        this.equipments.set(equipments.filter((obj: any) => {return obj.edrpou == this.userEDRPOU && obj.actual == 1}));
      },
      err => console.log(err)
    );
  }

  transferEquipment(idEquipment: number){
    this.equipmentsService.get(idEquipment).subscribe(
      res => {
        this.tEquipment = res;
        setTimeout(() => { this.operationsForm.idEquipment = this.tEquipment.id }, 500);
        setTimeout(() => { this.operationsForm.equipmentsValue = this.tEquipment.title }, 500);
        setTimeout(() => { this.operationsForm.closeModalEquipments()}, 500);
      },
      err => alert(err)
    )
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
