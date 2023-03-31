import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TimeRecord } from '../timesheet.state';

export interface ReduxHttpError {
  httpErrorResponse: HttpErrorResponse;
}

export enum WeekActionType {
  REPORT_WEEK = 'REPORT_WEEK',
  REPORT_WEEK_SUCCESS = 'REPORT_WEEK_SUCCESS',
  FAILURE = 'FAILURE',
}

export const REPORT_WEEK = createAction(
  WeekActionType.REPORT_WEEK,
  props<{ employeeId: string }>()
);

export const REPORT_WEEK_SUCCESS = createAction(
  WeekActionType.REPORT_WEEK_SUCCESS,
  props<{ timeRecords: TimeRecord[]; totalDuration: string }>()
);
export const FAILURE = createAction(
  WeekActionType.FAILURE,
  props<ReduxHttpError>()
);
