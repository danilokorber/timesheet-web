import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { STEMPEL } from './app.module';
import { TimeRecord, TimesheetState } from './redux/timesheet.state';
import {
  TIMESHEET_END,
  TIMESHEET_START,
  TODAY_DELETE,
  TODAY_UPDATE,
} from './redux/today/today.actions';
import { dateRangeValidator } from './validators/date-range.validator';
import { validTimeFormat } from './validators/time.validator';

@Component({
  selector: 'time-root',
  templateUrl: './app.component.html',
  styles: [],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  currentDate = new Date();
  currentMonth: string | null = null;
  previousMonth: string | null = null;
  time: Date = new Date();
  intervalId: any;
  startChange$: any;

  constructor(
    private datePipe: DatePipe,
    private store: Store<TimesheetState>,
    private fb: FormBuilder
  ) {
    this.currentMonth = this.datePipe.transform(this.currentDate, 'MMMM');

    const previousDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.previousMonth = this.datePipe.transform(previousDate, 'MMMM');
  }

  ngOnInit(): void {
    this.intervalId = interval(1000).subscribe(() => {
      this.time = new Date();
    });
  }
  ngOnDestroy(): void {
    this.intervalId.unsubscribe();
  }

  state$: Observable<TimesheetState> = this.store.pipe(
    select((state) => state)
  );

  start(): void {
    this.store.dispatch(TIMESHEET_START({ employeeId: STEMPEL }));
  }

  end(): void {
    this.store.dispatch(TIMESHEET_END({ employeeId: STEMPEL }));
  }

  tr: TimeRecord | undefined;
  visible: boolean = false;
  deleteVisible: boolean = false;
  currentVisible: boolean = false;
  previousVisible: boolean = false;

  showDialog(tr: TimeRecord): void {
    this.visible = true;
    this.tr = tr;
    this.form.setValue({
      start: tr.start ? this.datePipe.transform(tr.start, 'HH:mm') : '',
      end: tr.end ? this.datePipe.transform(tr.end, 'HH:mm') : '',
    });
  }

  form: FormGroup = new FormGroup(
    {
      start: new FormControl(''),
      end: new FormControl(''),
    },
    dateRangeValidator
  );

  onDeleteCancel(): void {
    this.deleteVisible = false;
  }

  onDelete(): void {
    if (this.tr) {
      let updatedTr: TimeRecord = {
        id: this.tr.id,
        employeeId: this.tr.employeeId,
      };

      this.store.dispatch(TODAY_DELETE(updatedTr));
    }
    this.deleteVisible = false;

    this.visible = false;
  }

  onSubmit(): void {
    if (this.tr) {
      let updatedTr: TimeRecord = {
        id: this.tr.id,
        employeeId: this.tr.employeeId,
        start: this.form.value.start
          ? this.dateOfTime(this.form.value.start)
          : undefined,
        end: this.form.value.end
          ? this.dateOfTime(this.form.value.end)
          : undefined,
      };

      if (!updatedTr.start && !updatedTr.end) {
        //DELETE
        this.store.dispatch(TODAY_DELETE(updatedTr));
      } else {
        //UPDATE
        this.store.dispatch(TODAY_UPDATE(updatedTr));
      }
    }
    this.visible = false;
  }

  dateOfTime(timeString: string): Date {
    const now = new Date(); // current date object
    const [hours, minutes] = timeString.split(':'); // split time string into hours and minutes
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Number(hours),
      Number(minutes)
    ); // create new date object with current year, month, and day, and the given hours and minutes
  }
}
