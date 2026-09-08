import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateForReportView',
  standalone: false
})
export class DateForReportViewPipe implements PipeTransform {

  transform(value: any): any {
    let strSplit: any;
    let returnDate: any;

    strSplit = value.split("-");

    returnDate = strSplit[2]+'.'+strSplit[1]+'.'+strSplit[0];
    return returnDate;
  }

}
