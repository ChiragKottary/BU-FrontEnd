import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelInputComponent } from './label-input.component';

@NgModule({
  declarations: [LabelInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LabelInputComponent]
})
export class LabelInputModule { }
