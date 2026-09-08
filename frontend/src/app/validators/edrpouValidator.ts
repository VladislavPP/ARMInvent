import { AbstractControl, ValidationErrors } from '@angular/forms';

export function EDRPOUValidator(forbiddenName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;//Значення, що вводиться
    if (value && value.toLowerCase() === forbiddenName.toLowerCase()) {
      return { forbiddenName: { value } }; // Возвращаем объект с ошибкой
    }
    return null; // Если все в порядке, возвращаем null
  };
}
