import {Component, OnInit, signal} from '@angular/core';
import { WorkersService } from '../../../../services/workers-service';
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-workers-list',
  standalone: false,
  templateUrl: './workers-list.html',
  styleUrl: './workers-list.scss'
})

export class WorkersList implements OnInit {

  workers = signal<any>(null);
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private workersService:WorkersService,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getWorkers()
    }, 1000)
  }

  getWorkers() {
    let workers: any;
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_WRK_LST', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_WRK_LST', 'list');

    if (blocked) {
      this.workersService.getAll().subscribe(
        res => {
          workers = res;
          this.workers.set(workers.filter((obj: any) => {
            return obj.edrpou == this.userEDRPOU
          }));
        },
        err => console.log(err)
      );
    }
  }

    deleteWorker(id: string) {
      let blocked: boolean;

      blocked = this.protectionModule.blockOpp('ARM1_WRK_EDT', this.userRoles);
      this.protectionModule.blockedInformationMessage('ARM1_WRK_EDT', 'edit');

      if (blocked) {
        this.workersService.delete(id)
          .subscribe(
            res => {
              this.getWorkers();
            },
            err => alert(err)
          )
      }
    }

    onTableDataChange(event: any) {
      this.page = event;
    }

    searchRows(nameCol: any) {
      this.page = 1;
      switch (nameCol) {
        case 'searchValue':
          this.searchCondition = this.searchValue;
          break;
        case 'dumping':
          this.searchCondition = '';
          break;
      }
    }
  }
