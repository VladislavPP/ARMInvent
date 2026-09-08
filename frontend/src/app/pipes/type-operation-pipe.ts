import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeOperation',
  standalone: false
})
export class TypeOperationPipe implements PipeTransform {

  transform(value: any): any {
    let str: any;
    if (value == '1') {
      str = 'Додавання в базу';//Додавання в базу
    } else if (value == '2'){
      str = 'Придбання';//Внутрішнє переміщення
    } else if (value == '3'){
      str = 'Внутрішнє переміщення';//Відправка на ремонт
    } else if (value == '4') {
      str = 'Відправлення на ремонт';//Видалення
    } else if (value == '5') {
      str = 'Видалення';//Списання
    } else if (value == '6') {
      str = 'Списання';//Списання
    }
    return str;
  }

}
