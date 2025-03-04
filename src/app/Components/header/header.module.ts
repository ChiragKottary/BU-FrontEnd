import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ButtonModule } from 'src/app/Shared/button/button.module';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
