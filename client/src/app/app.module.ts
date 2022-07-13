import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';
import { CoreUIModule } from 'src/coreui.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRegistrationModule} from './admin-registration/admin-registration.module';
import { DoctorRegistrationModule } from './doctor-registration/doctor-registration.module';
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
import { BillInvoiceModule } from './bill-invoice/bill-invoice.module';
import { AddLabtestModule } from './add-labtest/add-labtest.module';
import { UpdateBillModule } from './update-bill/update-bill.module';
import { VitalsModule } from './vitals/vitals.module';
import { LabdiscountModule } from './labdiscount/labdiscount.module';
import { ServicediscountModule } from './servicediscount/servicediscount.module';
import { NavbarService } from './navbar.service';
import { CalendarComponent } from './app.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDetailsModule } from './patient-details/patient-details.module';
import { TemporaryRegistrationModule } from './temporary-registration/temporary-registration.module';
import { ServicesModule } from './services/services.module';
import { LabtestsModule } from './labtests/labtests.module';
import { RefundModule } from './refund/refund.module';
import { LabtestsComponent } from './labtests/labtests.component';
import { PrescriptionModule } from './prescription/prescription.module';
import { PatientListDoctorModule } from './patient-list-doctor/patient-list-doctor.module';
import { DiscountModule } from './discount/discount.module';

@NgModule({
  declarations: [
    AppComponent, CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ForgotModule,
    LabdiscountModule,
    DiscountModule,
    ServicediscountModule,
    BilSummaryModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CoreUIModule,
    AdminRegistrationModule,
    DoctorRegistrationModule,
    PatientRegistrationModule,
    AdminLoginModule,
    HomepageModule,
    RefundModule,
    BillModule,
    VitalsModule,
    LabtestsModule,
    PatientListModule,
    PatientDetailsModule,
    DoctorLoginModule,
    UpdatePatientModule,
    ServicesModule,
    DoctorHomepageModule,
    DoctorDashboardModule,
    AddServicesModule,
    BillInvoiceModule,
    AddLabtestModule,
    UpdateBillModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbPopoverModule,
    TemporaryRegistrationModule,
    PrescriptionModule,
    PatientListDoctorModule
  ],
  providers: [NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
