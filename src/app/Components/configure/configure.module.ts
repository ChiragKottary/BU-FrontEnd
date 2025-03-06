import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';

import { ConfigureComponent } from './configure.component';
import { RegisterModule } from '../register/register.module';
import { ButtonModule } from "../../Shared/button/button.module";
import { FormStateService } from '../services/form-state.service';


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
  ],
  providers: [FormStateService]
})
export class ConfigureModule { }
