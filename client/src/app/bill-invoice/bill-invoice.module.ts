import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillInvoiceComponent } from './bill-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NgxPrinterModule, ngxPrintMarkerPosition  } from 'ngx-printer';
@NgModule({
    declarations: [BillInvoiceComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxPrinterModule.forRoot({printOpenWindow: true})
    ],
    exports: [BillInvoiceComponent],
    providers: [],
    bootstrap: [BillInvoiceComponent],
})
export class BillInvoiceModule { }