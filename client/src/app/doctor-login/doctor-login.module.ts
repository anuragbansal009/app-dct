import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DoctorLoginComponent } from './doctor-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { MaterialModule } from '../../material.module';
import { NavbarService } from '../navbar.service';

@NgModule({
    declarations: [DoctorLoginComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule,
        RecaptchaModule
    ],
    exports: [DoctorLoginComponent],
    providers: [NavbarService],
    bootstrap: [DoctorLoginComponent],
})
export class DoctorLoginModule { }