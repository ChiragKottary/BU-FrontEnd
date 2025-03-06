import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { ConfigureComponent } from './Components/configure/configure.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'configure', component: ConfigureComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
