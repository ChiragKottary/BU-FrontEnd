import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/Shared/button/button.module';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
