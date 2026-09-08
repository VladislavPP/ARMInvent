import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  standalone: false
})
export class SortByPipe implements PipeTransform {

  transform(array: any, field: string, prop: string): any {
    if (!Array.isArray(array)) {
      return;
    }

    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });

    if (prop == 'ASC') {
      return array;
    } else if (prop == 'DESC') {
      return array.reverse();
    }

  }

}
