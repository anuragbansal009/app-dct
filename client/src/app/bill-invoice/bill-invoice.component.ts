import { Component, OnInit, Inject } from '@angular/core';
import { NgxPrinterService } from 'ngx-printer';
import { Subscription, Observable } from 'rxjs';
import { PrintItem } from 'ngx-printer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill-invoice',
  templateUrl: './bill-invoice.component.html',
  styleUrls: ['./bill-invoice.component.css']
})
export class BillInvoiceComponent implements OnInit {
  hospitalName: any
  hospitalSubtext: string = 'Subtext';
  hospitalAddress: any
  patientName: any;
  patientMobileNumber: any;
  patientId: any;
  referredBy: any;
  billDate: any;
  billNumber: any;
  billStatus: any;
  services: any[] = [];
  paymentMode: any;
  amountInWords: any;
  billedAmount: number = 0;
  temp: any = this.services.forEach(serviceNetPrice => {
    this.billedAmount = this.billedAmount + serviceNetPrice.serviceNetPrice;
  });
  discountedAmount: any = 300;
  balanceAmount: any
  finalAmount: any
  recievedAmount: any = 2000;
  id: any;

  printWindowSubscription: Subscription;
  $printItems: Observable<PrintItem[]>;

  list: any;
  interval: any = 1000 * 60 * 60 * 24;
  status: any;
  show: boolean = false;
  tempS: any
  discount: any;

  a: any = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];

  b: any = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  n: any

  inWords (num: any) {
    if ((num = num.toString()).length > 9) return 'overflow';
    this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!this.n) return; var str = '';
    str += (this.n[1] != 0) ? (this.a[Number(this.n[1])] || this.b[this.n[1][0]] + ' ' + this.a[this.n[1][1]]) + 'crore ' : '';
    str += (this.n[2] != 0) ? (this.a[Number(this.n[2])] || this.b[this.n[2][0]] + ' ' + this.a[this.n[2][1]]) + 'lakh ' : '';
    str += (this.n[3] != 0) ? (this.a[Number(this.n[3])] || this.b[this.n[3][0]] + ' ' + this.a[this.n[3][1]]) + 'thousand ' : '';
    str += (this.n[4] != 0) ? (this.a[Number(this.n[4])] || this.b[this.n[4][0]] + ' ' + this.a[this.n[4][1]]) + 'hundred ' : '';
    str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(this.n[5])] || this.b[this.n[5][0]] + ' ' + this.a[this.n[5][1]]) + 'rupees only ' : '';
    return str;
}

  constructor(private printerService: NgxPrinterService, @Inject(MAT_DIALOG_DATA) public data: { id: any, status: any }, private http: HttpClient) {
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
  
  values: any = localStorage.getItem("currentDoctor");

  ngOnInit(): void {

    this.id = this.data.id;
    this.status = this.data.status;

    this.values = JSON.parse(this.values).doctor
    this.hospitalName = this.values.hospital_name
    this.hospitalAddress = this.values.location

    this.getData();

  }

  temp3: any

  refundServices: any
  totalrefund: any
  refundSection: boolean = false

  getData() {
    this.http.post(environment.billGetId, { _id: this.id }).subscribe((res) => {
      this.list = res
      this.refundServices = this.list.at(-1).refundarr
      this.totalrefund = this.list.at(-1).totalrefund
      this.patientName = this.list.at(-1).name;
      this.patientMobileNumber = '+91-' + this.list.at(-1).mobile;
      this.patientId = this.list.at(-1).uid;
      this.referredBy = 'Dr. ' + this.list.at(-1).doctor_name;
      this.billDate = Math.floor(this.list.at(-1).date / this.interval) * this.interval
      this.billNumber = this.list.at(-1).allocateid;
      this.billStatus = this.status;
      if(this.refundServices.length == 0) {
        this.refundSection = false
      }
      else {
        this.refundSection = true
      }
      this.list.at(-1).discount.forEach((element: { service: any; charges: any; gst: any; discount: any }) => {
        this.temp3 = 0
        this.tempS = {
          serviceName: element.service,
          servicePrice: element.charges,
          serviceDiscountPct: element.discount,
          serviceDiscount: element.charges * (element.discount / 100),
          serviceNetPrice: element.charges - (element.charges * (element.discount / 100)),
        }
        this.services.push(this.tempS);
      });
      this.billedAmount = this.list.at(-1).subtotal
      this.recievedAmount = this.list.at(-1).payment
      this.discountedAmount = this.list.at(-1).totalDiscount
      if(this.discountedAmount == null || this.discountedAmount == 0){
        this.discountedAmount = 0
      }
      // this.finalAmount = this.billedAmount;
      this.finalAmount = this.billedAmount - this.discountedAmount;
      this.balanceAmount = this.finalAmount - this.recievedAmount;
      this.paymentMode = this.list.at(-1).paymentmode
      this.amountInWords = this.inWords(this.finalAmount)
    })

  }
  
}
