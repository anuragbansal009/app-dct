import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { VitalsComponent } from './vitals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [VitalsComponent],
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
    exports: [VitalsComponent],
    providers: [],
    bootstrap: [VitalsComponent],
})
export class VitalsModule { }