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
import { PatientListModule } from './patient-list/patient-list.module';
import { UpdatePatientModule } from './update-patient/update-patient.module';
import { BillModule } from './bill/bill.module';
import { BilSummaryModule } from './bil-summary/bill-summary.module';
import { DoctorDashboardModule} from './doctor-dashboard/doctor-dashboard.module';
import { AddServicesModule } from './add-services/add-services.module';
//import { UpdateBillModule } from './update-bill/update-bill.module';


// import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotModule,
    BilSummaryModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminRegistrationModule,
    DoctorRegistrationModule,
    PatientRegistrationModule,
    AdminLoginModule,
    HomepageModule,
    // UpdateBillModule,
    BillModule,
    PatientListModule,
    DoctorLoginModule,
    UpdatePatientModule,
    DoctorHomepageModule,
    DoctorDashboardModule,
    AddServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
