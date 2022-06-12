import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdatePatientComponent } from './update-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [UpdatePatientComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule
    ],
    exports: [UpdatePatientComponent],
    providers: [],
    bootstrap: [UpdatePatientComponent],
})
export class UpdatePatientModule { }