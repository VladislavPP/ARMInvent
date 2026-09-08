import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersRolesVisible',
  standalone: false
})
export class UsersRolesVisiblePipe implements PipeTransform {

  transform(value: any): any {
    let str: '';
    str = value.replace(/\["/g, '')


      .replace(/","/g, ', ')
      .replace(/"]/g, '');
    return str;
  }

}
