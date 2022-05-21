import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import {AdminRegistrationComponent} from './admin-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [AdminRegistrationComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule
  ],
  exports: [AdminRegistrationComponent],
  providers: [],
  bootstrap: [AdminRegistrationComponent],
})
export class AdminRegistrationModule {}