import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabelInputComponent } from './Shared/label-input/label-input.component';
import { HeaderModule } from './Components/header/header.module';
import { ConfigureModule } from './Components/configure/configure.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './Components/register/register.module';
import { ButtonModule } from './Shared/button/button.module';

@NgModule({
  declarations: [
    AppComponent,
    LabelInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ConfigureModule,
    BrowserAnimationsModule,
    RegisterModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
