import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  CURRENT_FAILURE,
  TIMESHEET_CURRENT,
  CURRENT_SUCCESS,
} from './current.actions';
import { TimeRecordReport } from '../timesheet.state';

@Injectable()
export class CurrentEffect {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_CURRENT),
      mergeMap((props) => {
        return this.http
          .get<TimeRecordReport>(
            '/api/v1/timesheets/current/' + props.employeeId
          )
          .pipe(
            map((res: TimeRecordReport) =>
              CURRENT_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              })
            ),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(CURRENT_FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );
}
