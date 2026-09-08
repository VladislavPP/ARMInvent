import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../services/reports-service';
import {formatDate} from "@angular/common";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report03-display',
  standalone: false,
  templateUrl: './report03-display.html',
  styleUrl: './report03-display.scss'
})

export class Report03Display implements OnInit {

  reportData: any;
  page = 1;
  count = 0;
  tableSize = 10;
  buttonGenFile: any = false;

  onDate: any;
  onDatePlaceholder: any;

  userRoles: any;
  userEDRPOU: any;

  constructor(
    private reportsService: ReportsService,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    this.onDatePlaceholder = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');
    this.onDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-GB');

    setTimeout(() => {
      this.testRoles()
    }, 1000)

  }

  async testRoles() {
    await this.protectionModule.blockedInformationMessage('ARM1_RPT_03', 'list');
  }

  public OnDateChange() :  void {
    let date : HTMLInputElement | null;
    date = document.getElementById('date') as HTMLInputElement | null;
    this.onDate = date?.value;
  }

  onTableDataChange(event : any ) {
    this.page = event;
  }

  genReport03() {
    this.reportsService.genReport03(this.onDate).subscribe(
      res => {
        this.reportData = res;
        this.reportData = this.reportData[0];
        this.reportData = this.reportData.filter((obj: any) => {return obj.OperationsListEDRPOU == this.userEDRPOU});
        this.page = 1;
        this.buttonGenFile = true;
      },
      err => console.log(err)
    );
  }

  report03XLSX() {
    let dataToGen = [];

    dataToGen.push({'dateReport': this.onDate, 'EDRPOU': this.userEDRPOU});
    dataToGen.push(this.reportData);
    console.log(this.reportData)
    alert("Звіт сформовано. Вивантажити сфомований звіт можливо в розділі 'Сформовані звіти'");

    this.reportsService.report03XLSX(dataToGen).subscribe(
      res => {

      },
      err => console.log(err)
    );
  }

}
