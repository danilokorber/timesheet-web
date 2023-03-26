import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TimeRecord } from '../timesheet.state';

export interface ReduxHttpError {
  httpErrorResponse: HttpErrorResponse;
}

export enum TodayActionType {
  REPORT_TODAY = 'REPORT_TODAY',
  REPORT_TODAY_SUCCESS = 'REPORT_TODAY_SUCCESS',
  START = 'START',
  END = 'END',
  FAILURE = 'FAILURE',
  DELETE_TODAY = 'DELETE_TODAY',
  UPDATE_TODAY = 'UPDATE_TODAY',
  UPDATE_TODAY_SUCCESS = 'UPDATE_TODAY_SUCCESS',
}

export const TIMESHEET_TODAY = createAction(
  TodayActionType.REPORT_TODAY,
  props<{ employeeId: string }>()
);
export const TODAY_SUCCESS = createAction(
  TodayActionType.REPORT_TODAY_SUCCESS,
  props<{ timeRecords: TimeRecord[]; totalDuration: string }>()
);
export const TODAY_DELETE = createAction(
  TodayActionType.DELETE_TODAY,
  props<TimeRecord>()
);
export const TODAY_UPDATE = createAction(
  TodayActionType.UPDATE_TODAY,
  props<TimeRecord>()
);
export const TODAY_UPDATE_SUCCESS = createAction(
  TodayActionType.UPDATE_TODAY,
  props<TimeRecord>()
);
export const TIMESHEET_START = createAction(
  TodayActionType.START,
  props<{ employeeId: string }>()
);
export const TIMESHEET_END = createAction(
  TodayActionType.END,
  props<{ employeeId: string }>()
);
export const TIMESHEET_FAILURE = createAction(
  TodayActionType.FAILURE,
  props<ReduxHttpError>()
);
