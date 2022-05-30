import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DoctorHomepageComponent } from './doctor-homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CardModule } from '@coreui/angular';
@NgModule({
    declarations: [DoctorHomepageComponent],
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
          CardModule
        
    ],
    exports: [DoctorHomepageComponent],
    providers: [],
    bootstrap: [DoctorHomepageComponent],
})
export class DoctorHomepageModule { }