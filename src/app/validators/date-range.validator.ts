import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(
  group: AbstractControl
): ValidationErrors | null {
  const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // Matches HH:mm format
  //const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  const start = group.get('start')?.value ?? undefined;
  const end = group.get('end')?.value ?? undefined;

  if (!start || !end) {
    // If either field is empty, the form is considered valid
    return {};
  }

  if (!timeRegex.test(start)) {
    return { startTime: true };
  }

  if (!timeRegex.test(end)) {
    return { endTime: true };
  }

  if (start > end) {
    // If the start date is later than the end date, the form is invalid
    return { dateRange: true };
  }

  // If the start date is earlier than the end date, the form is considered valid
  return {};
}
