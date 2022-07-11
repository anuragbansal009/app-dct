import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientListDoctorComponent } from './patient-list-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
    declarations: [PatientListDoctorComponent, YesNoPipe],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    exports: [PatientListDoctorComponent],
    providers: [],
    bootstrap: [PatientListDoctorComponent],
})
export class PatientListDoctorModule { }