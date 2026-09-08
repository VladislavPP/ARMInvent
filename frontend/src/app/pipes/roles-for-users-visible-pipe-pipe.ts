import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolesForUsersVisiblePipe',
  standalone: false
})
export class RolesForUsersVisiblePipePipe implements PipeTransform {

  transform(value: any): any {
    let str: '';
    str = value
      .replace(/\[\[{"name":"/g, '')
      .replace(/checked":1}\],\[{"name":"/g, '')
      .replace(/, checked":1}\]\]/g, '');
    return str;
  }
}
