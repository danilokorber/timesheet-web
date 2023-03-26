import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  TIMESHEET_END,
  TIMESHEET_FAILURE,
  TIMESHEET_START,
  TIMESHEET_TODAY,
  TODAY_DELETE,
  TODAY_SUCCESS,
  TODAY_UPDATE,
  TODAY_UPDATE_SUCCESS,
} from './today.actions';
import {
  TimeRecord,
  TimeRecordReport,
  TimesheetState,
} from '../timesheet.state';
import { Store } from '@ngrx/store';
import { TIMESHEET_CURRENT } from '../current/current.actions';

@Injectable()
export class TodayEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<TimesheetState>
  ) {}

  getToday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_TODAY),
      mergeMap((props) => {
        return this.http
          .get<TimeRecordReport>('/api/v1/timesheets/today/' + props.employeeId)
          .pipe(
            map((res: TimeRecordReport) =>
              TODAY_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              })
            ),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(TIMESHEET_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TODAY_UPDATE),
      mergeMap((props) => {
        return this.http
          .put<TimeRecordReport>('/api/v1/timesheets/id/' + props.id, props)
          .pipe(
            map((res: TimeRecordReport) => {
              this.store.dispatch(
                TIMESHEET_CURRENT({ employeeId: props.employeeId })
              );
              return TODAY_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              });
            }),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(TIMESHEET_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TODAY_DELETE),
      mergeMap((props) => {
        return this.http
          .delete<TimeRecordReport>('/api/v1/timesheets/id/' + props.id)
          .pipe(
            map((res: TimeRecordReport) => {
              this.store.dispatch(
                TIMESHEET_CURRENT({ employeeId: props.employeeId })
              );
              return TODAY_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              });
            }),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(TIMESHEET_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );

  start$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_START),
      mergeMap((props) => {
        return this.http
          .post<TimeRecordReport>(
            '/api/v1/timesheets/start/' + props.employeeId,
            ''
          )
          .pipe(
            map((res: TimeRecordReport) => {
              this.store.dispatch(
                TIMESHEET_CURRENT({ employeeId: props.employeeId })
              );
              return TODAY_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              });
            }),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(TIMESHEET_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );

  end$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_END),
      mergeMap((props) => {
        return this.http
          .post<TimeRecordReport>(
            '/api/v1/timesheets/end/' + props.employeeId,
            ''
          )
          .pipe(
            map((res: TimeRecordReport) => {
              this.store.dispatch(
                TIMESHEET_CURRENT({ employeeId: props.employeeId })
              );
              return TODAY_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              });
            }),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(TIMESHEET_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );
}
