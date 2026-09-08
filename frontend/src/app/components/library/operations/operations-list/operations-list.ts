import {Component, OnInit, signal} from '@angular/core';
import { OperationsListService } from "../../../../services/operations-list-service";
import { ProtectionModule } from '../../../../modules/protection-module/protection-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-operations-list',
  standalone: false,
  templateUrl: './operations-list.html',
  styleUrl: './operations-list.scss'
})

export class OperationsList implements OnInit {

  operations = signal<any>(null);
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;

  userEDRPOU: any;
  userRoles: any;

  constructor(
    private operationsListService: OperationsListService,
    private protectionModule:ProtectionModule,
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    this.protectionModule.getUserRoles();
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    this.userRoles = this.cookieService.get('userRoles');

    setTimeout(() => {
      this.getOperations()
    }, 1000)
  }

  getOperations() {
    let operations: any;
    let blocked: boolean;

    blocked = this.protectionModule.blockOpp('ARM1_OPL_LST', this.userRoles);
    this.protectionModule.blockedInformationMessage('ARM1_OPL_LST', 'list');

    if (blocked) {
      this.operationsListService.getAll()
        .subscribe(
          res => {
            operations = res;
            this.operations.set(operations[0].filter((obj: any) => {
              return obj.OperationsListActual == '1' && obj.OperationsListEDRPOU == this.userEDRPOU
            }));
          },
          err => console.log(err)
        );
    }
  }

  onTableDataChange(event:any){
    this.page = event;
  }

  searchRows(nameCol:any){
    this.page = 1;
    switch (nameCol) {
      case 'searchValue': this.searchCondition =  this.searchValue; break;
      case 'dumping':
        this.searchCondition =  '';
        this.searchValue = '';
        break;
    }
  }
}
