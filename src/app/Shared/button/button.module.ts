import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonModule as KendoButtonModule } from '@progress/kendo-angular-buttons';
@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    KendoButtonModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
