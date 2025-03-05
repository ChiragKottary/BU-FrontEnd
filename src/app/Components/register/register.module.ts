import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../Shared/button/button.module';
import { LabelInputModule } from '../../Shared/label-input/label-input.module';
import { FormStateService } from '../services/form-state.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    LabelInputModule
  ],
  providers: [FormStateService],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
