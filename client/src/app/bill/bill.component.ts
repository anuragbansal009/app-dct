import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabdiscountComponent } from '../labdiscount/labdiscount.component';
import { ServicediscountComponent } from '../servicediscount/servicediscount.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [DatePipe]
})
export class BillComponent implements OnInit {

  dropdownList: any = [];
  dropdowntestlist: any = [];
  selectedservice = [];
  selectedlabtest = [];
  dropdownSettings!: IDropdownSettings;
  dropdownTests!: IDropdownSettings;
  public isEditing: number;
  public pendingValue: string;
  public value!: string;
  public valueChangeEvents: EventEmitter<string>;
  selectedIndex: any = 0;


  color = 'primary';
  formGroup: any = FormGroup;
  addingServices: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id: any
  patient: any

  item!: number
  itemn!: string

  inputname: any
  inputmobile: any
  inputgender: any
  inputage: any
  inputdoctor: any
  allocateid: any
  inputpaymentmode: any
  inputsubtotal: any
  inputbalance: any = 0
  inputpayment: any = 0
  discountdata: any;
  discount: any;
  sdiscount: any;
  alllabtests: any;
  allservices: any;
  billdiscount: any;

  patientservices: any;
  labcharges: any = [];
  bill: any;
  services: any;
  labtests: any = [];
  testlist: any;
  followup: any;
  patientbills: any;
  // data: any;

  patientcharges: any;
  subtotal: any = 0;
  result: any = [];
  serviceresult: any = [];
  temp1: any = 0
  temp2: any = 0
  count: any = 0
  stemp1: any = 0
  stemp2: any = 0
  scount: any = 0
  discountString: string = 'Lab Discount'
  servicediscountString: string = 'Service Discount'
  serviceArr: any = [];
  serviceArr2: any = [];
  selectedValue: any;
  tempValue: any = '';
  discountValue: any = null
  tempArr: any = {}
  serviceSubtotal: any = 0
  serviceInputBalance: any = 0
  labtestSubtotal: any = 0
  labtestInputBalance: any = 0
  discountArr: any = []
  sArr: any = []
  visits: any = []
  visitdate: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any, selectedIndex: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public datepipe: DatePipe) {
      this.selectedIndex = this.data.selectedIndex
      this.isEditing = -1;
      this.pendingValue = "";
      this.valueChangeEvents = new EventEmitter();
  }

  public cancel(): void {
    this.isEditing = -1;
  }

  public edit(i: any): void {
    this.pendingValue = this.value;
    this.isEditing = i;
  }

  public processChanges(i: any): void {
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }
    this.prevDue = this.prevDue + this.serviceArr2[i].charges * (this.serviceArr2[i].discount - parseInt(this.pendingValue))/100
    this.subtotal = this.subtotal + this.serviceArr2[i].charges * (this.serviceArr2[i].discount - parseInt(this.pendingValue))/100
    this.serviceArr2[i].discount = parseInt(this.pendingValue)
    this.isEditing = -1;
  }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'charges',
      textField: 'service',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownTests = {
      singleSelection: false,
      idField: 'charges',
      textField: 'labtest',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    // this.id = this.route.snapshot.params['id'];
    this.id = this.data.id

    this.billdetails()

    this.patientdetails()

    this.serviceDetails()

    this.LabDetails()

    this.formGroup = this.formBuilder.group({
      name: [this.inputname],
      gender: [this.inputgender],
      age: [this.inputage],
      doctor_name: [this.inputdoctor],
      allocateid: [this.allocateid],
      labcharges: [null],
      labtests: [null],
      discount: [],
      totalDiscount: [null],
      payment: [null],
      paymentmode: [null],
      subtotal: [null],
      followup: [this.followup],
    });
    this.addingServices = this.formBuilder.group({
      service: [null],
      charges: [null],
      discount: [null],
    });


    this.patientBills()

  }

  onItemDeSelect(item: any) {
    this.patientcharges = item
    this.subtotal = this.subtotal - this.patientcharges.charges
    this.inputbalance = this.inputbalance - this.patientcharges.charges

  }

  onItemSelect(item: any) {
    this.patientcharges = item
    this.subtotal = this.subtotal + this.patientcharges.charges
    this.inputbalance = this.inputbalance + this.patientcharges.charges
  }

  onUnselectAll(item: any) {
  }

  onSelectAll(items: any) {

    this.patientcharges = items
    this.patientcharges.forEach((charges: any) => {
      this.subtotal = charges.charges + this.subtotal
    });

  }

  patientVisits() {

    this.http.post(environment.patientVisit, { name: this.inputname, mobile: this.inputmobile }).subscribe((res) => {
      this.visits = res
      this.visits.forEach((element: any) => {
        element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
      })

    })
  }

  patientBills() {
    this.http.post(environment.patientBills, { name: this.inputname, mobile: this.inputmobile }).subscribe((res) => {
      this.patientbills = res
    })
  }



  handleAdd(post: any) {
    if (post.service == null || post.service == '') {
      this.snackBar.open('Please Select a Service', 'Close', {
        duration: 3000,
      });
    }
    else {
      if (post.discount == null) {
        post.discount = 0
      }
      if (post.charges == null) {
        post.charges = this.selectedValue
      }
      this.serviceArr.push(post)
      this.serviceArr2.push(post)
    }
    this.tempValue = ''
    this.selectedValue = null
    this.discountValue = null

    this.priceCalculate()
  }

  servicesArray: any = []
  labtestArray: any = []
  tempArr2: any = {}

  priceCalculate() {
    this.temp2 = this.inputbalance
    this.serviceInputBalance = 0
    this.serviceSubtotal = 0
    this.labtestInputBalance = 0
    this.labtestSubtotal = 0
    this.serviceArr.forEach((event: { charges: any; discount: any; service: any }) => {
      this.dropdownList.forEach((element: { service: any; charges: any }) => {
        if (event.service == element.service) {
          this.tempArr = {}
          this.tempArr2 = {}
          this.tempArr2.service = element.service
          this.tempArr2.charges = event.charges
          this.tempArr.service = element.service
          this.tempArr.discount = event.discount
          this.serviceSubtotal = this.serviceSubtotal + event.charges - (event.charges * (event.discount / 100))
          this.serviceInputBalance = this.serviceInputBalance + event.charges - (event.charges * (event.discount / 100))
        }
      });
    });

    this.serviceArr.forEach((event: { charges: any; discount: any; service: any }) => {
      this.dropdowntestlist.forEach((element: { labtest: any; charges: any }) => {
        if (event.service == element.labtest) {
          this.tempArr = {}
          this.tempArr2 = {}
          this.tempArr2.service = element.labtest
          this.tempArr2.charges = event.charges
          this.tempArr.labtest = element.labtest
          this.tempArr.discount = event.discount
          this.labtestSubtotal = this.labtestSubtotal + event.charges - (event.charges * (event.discount / 100))
          this.labtestInputBalance = this.labtestInputBalance + event.charges - (event.charges * (event.discount / 100))
        }
      });
    });
    this.subtotal = this.serviceSubtotal + this.labtestSubtotal + this.prevDue
    this.inputbalance = this.inputbalance + this.serviceInputBalance + this.labtestInputBalance + this.prevDue

    if (this.tempArr.service) {
      this.servicesArray.push(this.tempArr)
      this.labcharges.push(this.tempArr2)
    }
    else {
      this.labtestArray.push(this.tempArr)
      this.labtests.push(this.tempArr2)
    }

    // for (var i = this.dropindex.length - 1; i>=0; i++) {
    //   this.dropdownList.splice(i, 1);
    // }

    // for (var i = this.droptestindex.length - 1; i>=0; i++) {
    //   this.dropdowntestlist.splice(i, 1);
    // }
  }

  subtotalTemp: any;
  countVar: any = 0
  showDiscountError: boolean = false

  discountTot(event: any) {
    // if (event > this.subtotalTemp) {
    //   this.showDiscountError = true
    // }
    // else {
    // this.showDiscountError = false
    if (this.countVar == 0) {
      this.subtotalTemp = this.subtotal
      this.subtotal = this.subtotal - event
      this.countVar += 1
    }
    else {
      this.subtotal = this.subtotalTemp - event
    }
    // }
  }

  deleteService(i: any) {
    this.serviceArr.splice(i, 1)
    this.priceCalculate()
  }

  // dropindex: any = []
  // droptestindex: any = []

  priceValue(event: any) {
    // var index = 0
    this.dropdownList.forEach((element: { service: any; charges: any }) => {
      if (element.service == event.value) {
        this.selectedValue = element.charges
        // this.dropindex.push(index)
      }
      // index += 1
    });
    // var index2 = 0
    this.dropdowntestlist.forEach((element: { labtest: any; charges: any }) => {
      if (element.labtest == event.value) {
        this.selectedValue = element.charges
        // this.droptestindex.push(index2)
      }
      // index2 += 1
    });
    // console.log(this.dropindex, this.droptestindex)
  }

  handleDiscount() {
    // console.log(this.formGroup.value.labtests)
    const dialogRef = this.dialog.open(LabdiscountComponent, {
      data: { id: this.id, labtests: this.formGroup.value.labtests }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.result.push(result);
      console.log(this.result)
      this.labdiscount()
    });
  }

  handleServiceDiscount() {
    // console.log(this.formGroup.value.labtests)
    const dialogRef = this.dialog.open(ServicediscountComponent, {
      data: { id: this.id, labcharges: this.formGroup.value.labcharges }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.serviceresult.push(result);
      console.log(this.serviceresult)
      this.serviceDiscount()
    });
  }

  serviceDetails() {
    this.http.post(environment.servicesGet, { id: this.id }).subscribe((res) => {
      this.services = res;
      this.dropdownList = this.services
    });

  }

  LabDetails() {
    this.http.post(environment.labtestGet, { id: this.id }).subscribe((res) => {
      this.testlist = res;
      this.dropdowntestlist = this.testlist
    });

  }

  patientdetails() {

    this.http.post(environment.patientGetid, { _id: this.id }).subscribe((res) => {
      this.patient = res


      this.inputname = this.patient[0].name
      this.inputmobile = this.patient[0].mobile
      this.inputgender = this.patient[0].gender
      this.inputage = this.patient[0].age
      this.inputdoctor = this.patient[0].doctor_name
      this.allocateid = this.patient[0].allocateid
      this.followup = this.patient[0].followup

      this.patientBills()
      this.patientVisits()
    })
  }

  refundError: boolean = false;

  refundAdd(i: any, j: any, event: any) {
    this.refundError = false
    const tempRef: any = []
    const refAmount = parseInt((event.target as HTMLInputElement).value);

    tempRef.service = this.patientbills[i].discount[j].service
    tempRef.charges = this.patientbills[i].discount[j].charges
    tempRef.discount = this.patientbills[i].discount[j].discount
    tempRef.refundAmount = refAmount

    if (tempRef.charges - tempRef.discount < tempRef.refundAmount) {
      this.refundError = true
    }
    else {
      var count: any = 0
      this.refundList.forEach((element: { service: any; charges: any; discount: any; refundAmount: any }) => {
        if (tempRef.service == element.service) {
          element.refundAmount = refAmount
          count = 1
        }
      });
      if (count == 0) {
        this.refundList.push(tempRef)
      }
    }
  }

  refundList: any = [];
  refundReason: any

  refundFunc(allocateid: any, service: any, charge: any, discount: any) {
    const temp = {
      refunds: this.refundList,
      reason: this.refundReason
    }
    this.http.post(environment.refundBill, { allocateid: allocateid, service: service, charge: charge, discount: discount, reason: this.refundReason }).subscribe((res) => {
    })

  }

  prevDue: any;
  previousTotal: any = 0;

  billdetails() {
    this.http.post(environment.billGetId, { _id: this.id }).subscribe((res) => {

      this.bill = res
      if (this.bill.length !== 0) {

        this.billdiscount = this.bill[0].billDiscount

        this.selectedservice = this.bill.at(-1).labcharges
        this.selectedlabtest = this.bill.at(-1).labtests
        if (this.bill.at(-1).subtotal) {
          this.subtotal = this.bill.at(-1).subtotal - this.bill.at(-1).payment
          if (this.bill.at(-1).totalDiscount) {
            this.subtotal = this.subtotal
          }
          if (this.bill.at(-1).payment) {
            this.inputpayment = this.bill.at(-1).payment
            this.prevDue = this.bill.at(-1).subtotal - this.bill.at(-1).payment
            if (this.bill.at(-1).totalDiscount) {
              this.prevDue = this.prevDue
            }
          }
          else {
            this.prevDue = this.bill.at(-1).subtotal
            if (this.bill.at(-1).totalDiscount) {
              this.prevDue = this.prevDue
            }
          }
        }
        if (this.bill.at(-1).paymentmode) {
          this.inputpaymentmode = this.bill.at(-1).paymentmode
        }
        if (this.bill.at(-1).discount) {
          this.sArr = this.bill.at(-1).discount
          this.sArr.forEach((service: any) => {
            this.serviceArr2.push(service)
          });
        }
      }
      if (!this.prevDue) {
        this.prevDue = 0
      }
    })
  }


  //---------- indivisual discount ----------------//

  labdiscount() {

    if (this.count == 0) {
      this.discountString = ''
      this.temp1 = this.subtotal
      this.temp2 = this.inputbalance
      this.alllabtests = this.formGroup.value.labtests
      this.discount = this.result
      this.alllabtests.forEach((labtest: any) => {
        this.discount.forEach((element: any) => {
          if (labtest.labtest == element.labtest) {
            this.discountString = this.discountString + ' ' + element.labtest + ' (' + element.discount + '%)'
            this.subtotal = this.subtotal - (labtest.charges * (element.discount / 100))
            this.inputbalance = this.inputbalance - (labtest.charges * (element.discount / 100))
          }
        });
      })
      this.count = 1
    }
    else {
      this.discountString = ''
      this.subtotal = this.temp1
      this.inputbalance = this.temp2
      this.alllabtests = this.formGroup.value.labtests
      this.discount = this.result
      this.alllabtests.forEach((labtest: any) => {
        this.discount.forEach((element: any) => {
          if (labtest.labtest == element.labtest) {
            this.discountString = element.labtest + '(' + element.discount + '%)' + ' ' + this.discountString

            this.subtotal = this.subtotal - (labtest.charges * (element.discount / 100))
            this.inputbalance = this.inputbalance - (labtest.charges * (element.discount / 100))
          }
        });
      })
    }
  }

  serviceDiscount() {

    if (this.scount == 0) {
      this.servicediscountString = ''
      this.stemp1 = this.subtotal
      this.stemp2 = this.inputbalance
      this.allservices = this.formGroup.value.labcharges

      this.sdiscount = this.serviceresult
      this.allservices.forEach((service: any) => {
        this.sdiscount.forEach((element: any) => {
          if (service.service == element.service) {
            this.servicediscountString = this.servicediscountString + ' ' + element.service + ' (' + element.discount + '%)'
            this.subtotal = this.subtotal - (service.charges * (element.discount / 100))
            this.inputbalance = this.inputbalance - (service.charges * (element.discount / 100))
          }
        });
      })
      this.scount = 1
    }
    else {
      this.servicediscountString = ''
      this.subtotal = this.stemp1
      this.inputbalance = this.stemp2
      this.allservices = this.formGroup.value.labcharges

      this.sdiscount = this.serviceresult
      this.allservices.forEach((service: any) => {
        this.sdiscount.forEach((element: any) => {
          if (service.service == element.service) {
            this.servicediscountString = element.service + '(' + element.discount + '%)' + ' ' + this.servicediscountString

            this.subtotal = this.subtotal - (service.charges * (element.discount / 100))
            this.inputbalance = this.inputbalance - (service.charges * (element.discount / 100))

          }
        });
      })
    }
  }

  //---------- indivisual discount ----------------//

  refundAmount: any
  payment: any
  onSubmit(post: any) {

    // this.sArr.forEach((element: { charges: number; discount: number; }) => {
    //   this.previousTotal = this.previousTotal + element.charges - (element.charges * (element.discount / 100))
    // });

    this.serviceArr2.forEach((element: { charges: number; discount: number; }) => {
      this.previousTotal = this.previousTotal + element.charges - (element.charges * (element.discount / 100))
    });

    if (this.billdiscount) {
      this.previousTotal = this.previousTotal - this.billdiscount
    }

    post.discount = this.serviceArr2
    post.subtotal = this.previousTotal
    if (this.inputbalance !== 0) {
      post.payment = post.payment + this.inputpayment
    }
    post.payment = this.payment
    console.log(post)
    this.http.post(environment.patientBill + this.id, post).subscribe((res) => {
      this.snackBar.open('Bill Made Successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['doctordashboard']);
    })

  }

  handleclose() {
    this.router.navigate(['doctordashboard']);
  }



}
