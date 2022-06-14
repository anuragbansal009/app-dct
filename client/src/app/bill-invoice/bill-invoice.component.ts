import { Component, OnInit } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { Subscription, Observable } from 'rxjs';
import { PrintItem } from 'ngx-printer';

@Component({
  selector: 'app-bill-invoice',
  templateUrl: './bill-invoice.component.html',
  styleUrls: ['./bill-invoice.component.css']
})
export class BillInvoiceComponent implements OnInit {

  hospitalName: string = 'Frozen Hospital & Research';
  hospitalSubtext: string = 'Advanced Treatment Center with 24/7 availability';
  hospitalAddress: string = '21st Street, New York City, New York, NY, 100001';
  patientName: string = 'John Doe';
  patientMobileNumber: string = '+91-9876543210';
  patientId: string = 'P-001';
  referredBy: string = 'Dr. John Doe';
  billDate: string = '2020-01-01';
  billNumber: string = 'B-001';
  billStatus: string = 'PAID';
  services: any[] = [
    {
      serviceName: 'Consultation',
      servicePrice: 1000,
      serviceNetPrice: 1000,
    },
    {
      serviceName: 'Blood Test',
      servicePrice: 100,
      serviceNetPrice: 100,
    },
    {
      serviceName: 'BP Test',
      servicePrice: 100,
      serviceNetPrice: 200,
    },
    {
      serviceName: 'X-Ray',
      servicePrice: 100,
      serviceNetPrice: 300,
    },
    {
      serviceName: 'ECG',
      servicePrice: 100,
      serviceNetPrice: 400,
    },
    {
      serviceName: 'Ultrasound',
      servicePrice: 500,
      serviceNetPrice: 500,
    }
  ];
  paymentMode: string = 'CASH';
  amountInWords: string = 'TWO THOUSAND RUPEES ONLY';
  billedAmount: number = 0;
  temp: any = this.services.forEach(serviceNetPrice => {
    this.billedAmount = this.billedAmount + serviceNetPrice.serviceNetPrice;
  });
  discountedAmount: any = 300;
  finalAmount = this.billedAmount - this.discountedAmount;
  recievedAmount: any = 2000;
  balanceAmount: any = this.finalAmount - this.recievedAmount;

  printWindowSubscription: Subscription;
  $printItems: Observable<PrintItem[]>;

  constructor(private printerService: NgxPrinterService) { 
    this.printWindowSubscription = this.printerService.$printWindowOpen.subscribe(
      val => {
        console.log('Print window is open:', val);
      }
    );

    this.$printItems = this.printerService.$printItems;
  }

  printDiv() {
    this.printerService.printOpenWindow = false;
    this.printerService.printDiv('pdfTable');
    this.printerService.printOpenWindow = true;
  }

  ngOnInit(): void {
  }
}
