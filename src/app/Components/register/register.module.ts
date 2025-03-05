import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/Shared/button/button.module';
import { LabelInputModule } from 'src/app/Shared/label-input/label-input.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    LabelInputModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
