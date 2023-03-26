import { createReducer, on } from '@ngrx/store';
import { TimeRecordReport } from '../timesheet.state';
import { TODAY_SUCCESS } from './today.actions';

const INITIAL_STATE: TimeRecordReport = {
  timeRecords: [],
};

export const todayReducer = createReducer(
  INITIAL_STATE,
  on(
    TODAY_SUCCESS,
    (state: TimeRecordReport, { timeRecords, totalDuration }) => ({
      ...state,
      timeRecords,
      totalDuration,
    })
  )
);
