import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { todayReducer } from './today.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodayEffect } from './today.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('today', todayReducer),
    EffectsModule.forFeature([TodayEffect]),
  ],
})
export class TodayRedux {}
