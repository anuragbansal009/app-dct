import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientRegistrationComponent } from './patient-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [PatientRegistrationComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatNativeDateModule,
        MaterialModule
    ],
    exports: [PatientRegistrationComponent],
    providers: [],
    bootstrap: [PatientRegistrationComponent],
})
export class PatientRegistrationModule { }