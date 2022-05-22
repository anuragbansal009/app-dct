import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import {AdminLoginComponent} from './admin-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule
  ],
  exports: [AdminLoginComponent],
  providers: [],
  bootstrap: [AdminLoginComponent],
})
export class AdminLoginModule {}