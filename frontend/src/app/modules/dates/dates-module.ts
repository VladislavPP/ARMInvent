import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class DatesModule {

  DateMySQLToInput (onDate: any) {//22.03.2025 => 2025-03-22
    let returnDate: string;
    let dateSplit: any;
    dateSplit = onDate.split('.');
    returnDate = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    return returnDate;
  }

  DateInputToMySQL(onDate: any){//2025-03-22 => 22.03.2025
    let returnDate: string;
    let dateSplit: any;
    dateSplit = onDate.split('-');
    returnDate = `${dateSplit[0]}.${dateSplit[1]}.${dateSplit[2]}`;
    return returnDate;
  }

  DateToFilterPoint(onDate:any){//22.03.2025 => 20250322
    let returnDate: string;
    let dateSplit: any;
    dateSplit = onDate.split('.');
    returnDate = `${dateSplit[2]}${dateSplit[1]}${dateSplit[0]}`;
    return returnDate;
  }

  DateToFilterLineDESC(onDate:any){//2025-03-22 => 20250322
    let returnDate: string;
    let dateSplit: any;
    dateSplit = onDate.split('-');
    returnDate = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;
    return returnDate;
  }

}
