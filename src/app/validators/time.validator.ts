import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validTimeFormat(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // Matches HH:mm format
    const isValid = timeRegex.test(control.value);
    console.log('time is valid', isValid);

    return isValid ? null : { invalidTimeFormat: true };
  };
}
