import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../services/reports-service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-report01-display',
  standalone: false,
  templateUrl: './report01-display.html',
  styleUrl: './report01-display.scss'
})

export class Report01Display implements OnInit {

  tWorker: any;
  equipments: any;
  tWorkersFilter: any;
  rolesUser: any;
  reportData: any;
  userEDRPOU = '02005310';

  date = formatDate(new Date(), 'd.MM.y', 'en');

  constructor(
    private reportsService: ReportsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    let params = this.activatedRoute.snapshot.params;

    if (params['idWorker']) {
      setTimeout(() => {
        this.genReport01Display(params['idWorker'])
      }, 1000)
    }
  }

  genReport01Display(workerID: number) {
      this.reportsService.genReport01(workerID)
        .subscribe(
          res => {
            this.reportData = res;
            this.reportData = this.reportData[0];
            this.reportData = this.reportData.filter((dataFilter: any) => {
              return dataFilter.WorkersID == workerID && dataFilter.OperationsListActual == 1;
            })
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
      this.reportsService.report01TXT(fileToGen).subscribe(
        res => {

        },
        err => console.log(err)
      );
    } else if (type == 'pdf') {
      this.reportsService.report01PDF(fileToGen).subscribe(
        res => {

        },
        err => console.log(err)
      );
    }
  }

}
