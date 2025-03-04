/// <reference types="@angular/localize" />
//added newly to the file to make the confifuration work
import '@angular/localize/init';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
