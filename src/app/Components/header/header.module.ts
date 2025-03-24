import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ButtonModule } from 'src/app/Shared/button/button.module';
import { IconModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    IconModule,
    ButtonsModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
