import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';

import { ConfigureComponent } from './configure.component';
import { RegisterModule } from '../register/register.module';
import { ButtonModule } from "../../Shared/button/button.module";


@NgModule({
  declarations: [
    ConfigureComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    RegisterModule,
    ButtonModule
],exports:[
    ConfigureComponent
  ]
})
export class ConfigureModule { }
