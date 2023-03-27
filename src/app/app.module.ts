import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from 'primeng/dialog';

import { ServiceWorkerModule } from '@angular/service-worker';
import { TodayRedux } from './redux/today/today.redux';
import { TimesheetState } from './redux/timesheet.state';
import { Store, StoreModule } from '@ngrx/store';
import { TIMESHEET_TODAY } from './redux/today/today.actions';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TIMESHEET_CURRENT } from './redux/current/current.actions';
import { CurrentRedux } from './redux/current/current.redux';
import { ReactiveFormsModule } from '@angular/forms';

// Register the German locale data
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

import { NZ_I18N, de_DE } from 'ng-zorro-antd/i18n';

export const STEMPEL: string = '5318';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzTimePickerModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    TodayRedux,
    CurrentRedux,
    EffectsModule.forRoot([]),
    DialogModule,
    TableModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: NZ_I18N, useValue: de_DE },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private store: Store<TimesheetState>) {
    store.dispatch(TIMESHEET_TODAY({ employeeId: STEMPEL }));
    store.dispatch(TIMESHEET_CURRENT({ employeeId: STEMPEL }));
  }
}
