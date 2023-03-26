import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TimeRecord } from '../timesheet.state';

export interface ReduxHttpError {
  httpErrorResponse: HttpErrorResponse;
}

export enum CurrentActionType {
  REPORT_CURRENT = 'REPORT_CURRENT',
  REPORT_CURRENT_SUCCESS = 'REPORT_CURRENT_SUCCESS',
  FAILURE = 'FAILURE',
}

export const TIMESHEET_CURRENT = createAction(
  CurrentActionType.REPORT_CURRENT,
  props<{ employeeId: string }>()
);

export const CURRENT_SUCCESS = createAction(
  CurrentActionType.REPORT_CURRENT_SUCCESS,
  props<{ timeRecords: TimeRecord[]; totalDuration: string }>()
);
export const CURRENT_FAILURE = createAction(
  CurrentActionType.FAILURE,
  props<ReduxHttpError>()
);
