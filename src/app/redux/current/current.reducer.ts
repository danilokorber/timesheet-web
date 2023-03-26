import { createReducer, on } from '@ngrx/store';
import { TimeRecordReport } from '../timesheet.state';
import { CURRENT_SUCCESS } from './current.actions';

const INITIAL_STATE: TimeRecordReport = {
  timeRecords: [],
};

export const currentReducer = createReducer(
  INITIAL_STATE,
  on(
    CURRENT_SUCCESS,
    (state: TimeRecordReport, { timeRecords, totalDuration }) => ({
      ...state,
      timeRecords,
      totalDuration,
    })
  )
);
