import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../services/reports-service';
import { ActivatedRoute } from '@angular/router';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-report02-display',
  standalone: false,
  templateUrl: './report02-display.html',
  styleUrl: './report02-display.scss'
})

export class Report02Display implements OnInit {

  tEquipments: any;
  tEquipmentsFilter: any;
  rolesUser: any;
  reportData: any;
  userEDRPOU = '02005310';


  date = formatDate(new Date(), 'd.MM.y', 'en');

  constructor(
    private reportsService: ReportsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    let params = this.activatedRoute.snapshot.params;
    if (params['idEquipment']) {
      setTimeout(() => {
        this.genReport02Display(params['idEquipment'])
      }, 1000)
    }
  }

  async genReport02Display(equipmentsID: number) {
      this.reportsService.genReport02(equipmentsID)
        .subscribe(
          res => {
            this.reportData = res;
            this.reportData = this.reportData[0];
          },
          err => console.log(err)
        );
  }

  generateFile(type: string){
    let fileToGen = [];

    fileToGen.push(this.userEDRPOU);
    fileToGen.push(this.reportData);

    alert("Звіт сформовано. Вивантажити сфомований звіт можливо в розділі 'Сформовані звіти'");
    if (type == 'txt'){
      this.reportsService.report02TXT(fileToGen).subscribe(
        res => {

        },
        err => console.log(err)
      );
    } else if (type == 'pdf') {
      this.reportsService.report02PDF(fileToGen).subscribe(
        res => {

        },
        err => console.log(err)
      );
    }
  }

}
