import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PrescriptionComponent } from './prescription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
    declarations: [PrescriptionComponent, YesNoPipe],
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
    exports: [PrescriptionComponent],
    providers: [],
    bootstrap: [PrescriptionComponent],
})
export class PrescriptionModule { }