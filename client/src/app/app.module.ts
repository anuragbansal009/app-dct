import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRegistrationModule} from './admin-registration/admin-registration.module';
import { DoctorRegistrationModule } from './doctor-registration/doctor-registration.module';
import { MaterialModule } from 'src/material.module';
import { AdminLoginModule } from './admin-login/admin-login.module';
import { HomepageModule } from './homepage/homepage.module';
import { DoctorLoginModule } from './doctor-login/doctor-login.module';
import { ForgotModule } from './forgot/forgot.module';
import { DoctorHomepageModule } from './doctor-homepage/doctor-homepage.module';
import { PatientRegistrationModule } from './patient-registration/patient-registration.module';
// import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    // AdminForgotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminRegistrationModule,
    DoctorRegistrationModule,
    PatientRegistrationModule,
    AdminLoginModule,
    HomepageModule,
    DoctorLoginModule,
    DoctorHomepageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
