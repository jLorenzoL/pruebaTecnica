import { LoginComponent } from './components/main/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectComponent } from './components/main/prospect/prospect.component';
import { FormComponent } from './components/main/form/form.component';


const APP_ROUTES: Routes = [
  { path : '', component : ProspectComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'prospect' },
  { path : 'login', component : LoginComponent},
  { path : 'validateForm', component : FormComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);