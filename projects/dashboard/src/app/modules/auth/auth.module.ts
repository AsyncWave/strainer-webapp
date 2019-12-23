import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { QueryService } from '../../services/query.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LandingComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [QueryService]
})
export class AuthModule { }
