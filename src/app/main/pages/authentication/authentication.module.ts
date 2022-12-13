import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { AuthRegisterV2Component } from './auth-register-v2/auth-register-v2.component';

// routing
const routes: Routes = [
  {
    path: 'authentication/login-v2',
    component: AuthLoginV2Component,
    data: { animation: 'auth' }
  },
  {
    path: 'authentication/register-v2',
    component: AuthRegisterV2Component
  }
];

@NgModule({
  declarations: [AuthLoginV2Component,AuthRegisterV2Component],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
