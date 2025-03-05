import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelInputComponent } from './label-input.component';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
@NgModule({
  declarations: [LabelInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LabelModule,
    InputsModule
  ],
  exports: [LabelInputComponent]
})
export class LabelInputModule { }
