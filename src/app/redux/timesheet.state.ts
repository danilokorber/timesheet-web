export interface TimeRecord {
  id: string;
  employeeId: string;
  start?: Date;
  end?: Date;
  duration?: string;
}

export interface TimeRecordReport {
  totalDuration?: string;
  timeRecords: TimeRecord[];
}

export interface TimesheetState {
  previous?: TimeRecordReport;
  current?: TimeRecordReport;
  week?: TimeRecordReport;
  today?: TimeRecordReport;
}
