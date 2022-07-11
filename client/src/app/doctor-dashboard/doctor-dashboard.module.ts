import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DoctorDashboardComponent, ModalComponent, SecondModalComponent } from './doctor-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CoreUIModule } from 'src/coreui.module';
import { PatientRegistrationModule } from '../patient-registration/patient-registration.module';
import { PatientListModule } from '../patient-list/patient-list.module';
import { PatientListDoctorModule } from '../patient-list-doctor/patient-list-doctor.module';

import { BilSummaryModule } from '../bil-summary/bill-summary.module';
import { AddServicesModule } from '../add-services/add-services.module';
import { AddLabtestModule } from '../add-labtest/add-labtest.module';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  } from '@angular-material-components/datetime-picker';
  import { NavbarService } from '../navbar.service';

@NgModule({
    declarations: [DoctorDashboardComponent, ModalComponent, SecondModalComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule,
        NgApexchartsModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
        CoreUIModule,
        PatientRegistrationModule,
        PatientListModule,
        PatientListDoctorModule,
        BilSummaryModule,
        AddServicesModule,
        AddLabtestModule
    ],
    exports: [DoctorDashboardComponent],
    providers: [NavbarService],
    bootstrap: [DoctorDashboardComponent],
})
export class DoctorDashboardModule { }