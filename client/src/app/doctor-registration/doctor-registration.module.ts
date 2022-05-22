import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {DoctorRegistrationComponent} from './doctor-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [DoctorRegistrationComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule
  ],
  exports: [DoctorRegistrationComponent],
  providers: [],
  bootstrap: [DoctorRegistrationComponent],
})
export class DoctorRegistrationModule {}