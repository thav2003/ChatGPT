import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartedComponent } from './started/started.component';
import {  VerifyMailComponent } from './verification/verification.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'started',
    component: StartedComponent
  },
   {
    path: 'verification',
    component: VerifyMailComponent
   }
];
