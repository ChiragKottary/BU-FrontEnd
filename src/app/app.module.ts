import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './Components/header/header.module';
import { ConfigureModule } from './Components/configure/configure.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './Components/register/register.module';
import { ButtonModule } from './Shared/button/button.module';
import { LabelInputModule } from './Shared/label-input/label-input.module';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { IconModule } from '@progress/kendo-angular-icons';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ConfigureModule,
    BrowserAnimationsModule,
    RegisterModule,
    ButtonModule,
    LabelInputModule,
    NotificationModule,
    IconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
