import {Component, OnInit, signal} from '@angular/core';
import { WorkersService } from '../../../services/workers-service';
import { OperationsForm } from "../../library/operations/operations-form/operations-form";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sublevel-workers',
  standalone: false,
  templateUrl: './sublevel-workers.html',
  styleUrl: './sublevel-workers.scss'
})

export class SublevelWorkers implements OnInit {
  workers = signal<any>(null);
  tWorker: any;
  page = 1;
  count = 0;
  tableSize = 10;
  searchCondition: any;
  searchValue: any;
  userEDRPOU: any;

  constructor(
    private workersService:WorkersService,
    private operationsForm:OperationsForm,
    private cookieService:CookieService
  ) {}

  ngOnInit(): void {
    this.userEDRPOU = this.cookieService.get('userEDRPOU');
    setTimeout(() => {
      this.getWorkers()
    }, 1000)
  }

  getWorkers() {
    let workers: any;
    this.workersService.getAll().subscribe(
      res => {
        workers = res;
        this.workers.set(workers.filter((obj: any) => {return obj.edrpou == this.userEDRPOU}));
      },
      err => console.log(err)
    );
  }

  transferWorker(idWorker: number){
    this.workersService.get(idWorker).subscribe(
      res => {
        this.tWorker = res;
        setTimeout(() => { this.operationsForm.idWorker = this.tWorker.id }, 500);
        setTimeout(() => { this.operationsForm.workerFIOFull = this.tWorker.fio_full }, 500);
        setTimeout(() => { this.operationsForm.closeModalWorkers()}, 500);
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
