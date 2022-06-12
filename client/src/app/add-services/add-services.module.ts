import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { AddServicesComponent } from './add-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

@NgModule({
    declarations: [AddServicesComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MaterialModule,
    ],
    exports: [AddServicesComponent],
    providers: [],
    bootstrap: [AddServicesComponent],
})
export class AddServicesModule { }