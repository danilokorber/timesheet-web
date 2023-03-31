import { createReducer, on } from '@ngrx/store';
import { TimeRecordReport } from '../timesheet.state';
import { REPORT_WEEK_SUCCESS } from './week.actions';

const INITIAL_STATE: TimeRecordReport = {
  timeRecords: [],
};

export const WEEK_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    REPORT_WEEK_SUCCESS,
    (state: TimeRecordReport, { timeRecords, totalDuration }) => ({
      ...state,
      timeRecords,
      totalDuration,
    })
  )
);
