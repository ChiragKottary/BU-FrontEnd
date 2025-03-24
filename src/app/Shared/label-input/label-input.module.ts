import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelInputComponent } from './label-input.component';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { IconModule } from '@progress/kendo-angular-icons';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [LabelInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LabelModule,
    InputsModule,
    IconModule,
    ButtonModule
  ],
  exports: [LabelInputComponent]
})
export class LabelInputModule { }
