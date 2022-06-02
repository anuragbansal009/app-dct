import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CoreUIModule } from 'src/coreui.module';
import { PatientRegistrationModule } from '../patient-registration/patient-registration.module';
import { PatientListModule } from '../patient-list/patient-list.module';
import { BilSummaryModule } from '../bil-summary/bill-summary.module';
@NgModule({
    declarations: [DoctorDashboardComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule,
        NgApexchartsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
        CoreUIModule,
        PatientRegistrationModule,
        PatientListModule,
        BilSummaryModule
        
    ],
    exports: [DoctorDashboardComponent],
    providers: [],
    bootstrap: [DoctorDashboardComponent],
})
export class DoctorDashboardModule { }