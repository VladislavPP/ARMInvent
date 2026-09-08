import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edrpouView',
  standalone: false
})
export class EdrpouViewPipe implements PipeTransform {

  transform(value: any): any {
    let str: '';
    str = value.replace(/[0-9]/g, '*');
    return str;
  }

}
