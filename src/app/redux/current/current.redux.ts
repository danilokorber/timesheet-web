import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { currentReducer } from './current.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CurrentEffect } from './current.effect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('current', currentReducer),
    EffectsModule.forFeature([CurrentEffect]),
  ],
})
export class CurrentRedux {}
