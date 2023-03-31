import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { WEEK_REDUCER } from './week.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeekEffect } from './week.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('week', WEEK_REDUCER),
    EffectsModule.forFeature([WeekEffect]),
  ],
})
export class WeekRedux {}
