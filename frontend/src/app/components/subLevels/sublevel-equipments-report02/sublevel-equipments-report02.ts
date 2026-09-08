import {Component, OnInit, signal} from '@angular/core';
import { EquipmentsService } from '../../../services/equipments-service';
import { Report02Form } from "../../reports/report02/report02-form/report02-form";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sublevel-equipments-report02',
  standalone: false,
  templateUrl: './sublevel-equipments-report02.html',
  styleUrl: './sublevel-equipments-report02.scss'
})
export class SublevelEquipmentsReport02 implements OnInit {

  equipments = signal<any>(null);
  tEquipment: any;
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;

  constructor(
    private equipmentsService: EquipmentsService,
    private report02Form: Report02Form,
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
        this.equipments.set(equipments.filter((obj: any) => {return obj.edrpou == this.userEDRPOU}));
      },
      err => console.log(err)
    );
  }

  transferEquipment(idEquipment: number){
    this.equipmentsService.get(idEquipment).subscribe(
      res => {
        this.tEquipment = res;
        setTimeout(() => { this.report02Form.EquipmentsID = this.tEquipment.id }, 500);
        setTimeout(() => { this.report02Form.genToDisplay() }, 500);

        //setTimeout(() => { this.report02Form.EquipmentsValue = this.tEquipment.title }, 500);
        //setTimeout(() => { this.report02Form.EquipmentsSerialN = this.tEquipment.serial_n }, 500);
        //setTimeout(() => { this.report02Form.EquipmentsInventN = this.tEquipment.invent_n }, 500);
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
