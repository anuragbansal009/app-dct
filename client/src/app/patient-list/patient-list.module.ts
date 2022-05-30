import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientListComponent } from './patient-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

@NgModule({
    declarations: [PatientListComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule
    ],
    exports: [PatientListComponent],
    providers: [],
    bootstrap: [PatientListComponent],
})
export class PatientListModule { }