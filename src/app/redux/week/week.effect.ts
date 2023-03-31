import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FAILURE, REPORT_WEEK, REPORT_WEEK_SUCCESS } from './week.actions';
import { TimeRecordReport } from '../timesheet.state';

@Injectable()
export class WeekEffect {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REPORT_WEEK),
      mergeMap((props) => {
        return this.http
          .get<TimeRecordReport>('/api/v1/timesheets/week/' + props.employeeId)
          .pipe(
            map((res: TimeRecordReport) =>
              REPORT_WEEK_SUCCESS({
                totalDuration: res.totalDuration ?? '',
                timeRecords: res.timeRecords,
              })
            ),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(FAILURE({ httpErrorResponse }))
            )
          );
      })
    )
  );
}
