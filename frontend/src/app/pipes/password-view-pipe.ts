import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordView',
  standalone: false
})
export class PasswordViewPipe implements PipeTransform {

  transform(value: any): any {
    let str: '';
    str = value.replace(/[0-9a-zA-Z]/g, '*');
    return str;
  }

}
