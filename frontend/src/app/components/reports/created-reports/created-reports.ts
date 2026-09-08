import { Component, OnInit } from '@angular/core';
import { CreatedReportsService } from '../../../services/created-reports-service';
import { formatDate } from "@angular/common";
import { DatesModule } from '../../../modules/dates/dates-module';
import { ProtectionModule } from '../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-created-reports',
  standalone: false,
  templateUrl: './created-reports.html',
  styleUrl: './created-reports.scss'
})

export class CreatedReports implements OnInit {
  libraryReports: any;
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;

  datePlaceholder: any;

  onDate: any;

  user: any;

  userRoles: any;
  userEDRPOU: any;

  constructor(
    private createdReportsService:CreatedReportsService,
    private protectionModule: ProtectionModule,
    private cookieService: CookieService,
    private datesModule:DatesModule
  ) { }

  ngOnInit() {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    this.onDate = formatDate(Date(), 'dd.MM.yyyy', 'en');
    setTimeout(() => {
      this.getLibraryReports()
    }, 1000)
  }

  async getLibraryReports() {
    let blocked: boolean;

    blocked = await this.protectionModule.blockOpp('ARM1_RPT_C', this.userRoles);
    await this.protectionModule.blockedInformationMessage('ARM1_RPT_C', 'list');

    if (blocked) {
      this.createdReportsService.getAll().subscribe(
        res => {
          this.libraryReports = res;
          this.libraryReports = this.libraryReports.filter((obj: any) => {
            return obj.edrpou == this.userEDRPOU
          });
        },
        err => console.log(err)
      );
    }
  }

  deleteReport(id: string) {
    this.createdReportsService.delete(id)
      .subscribe(
        res => {
          this.getLibraryReports();
        },
        err => alert(err)
      )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getLibraryReports();
  }

  public OnDateChange(): void {
    let date : HTMLInputElement | null;
    date = document.getElementById('date') as HTMLInputElement | null;
    this.onDate = date?.value;
  }

  searchRows(nameCol: any) {
    switch (nameCol) {
      case 'DateLibraryReports':
        this.searchCondition = this.onDate;
        break;

      case 'dumping':
        this.searchCondition = '';
        break;
    }
  }

  downloadFile(id: number) {
    this.createdReportsService.downloadFileCreatedAReports(id).subscribe(
      res => {

      },
      err => console.log(err)
    )
  }


}
