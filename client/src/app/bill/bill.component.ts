import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
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


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  dropdownList = [];
  dropdowntestlist = [];
  selectedservice = [];
  selectedlabtest = [];
  dropdownSettings!: IDropdownSettings;
  dropdownTests!: IDropdownSettings;

  color = 'primary';
  formGroup: any = FormGroup;
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

  labcharges: any = null
  bill: any;
  services: any;
  labtests: any;
  testlist: any;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

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
      payment: [null],
      paymentmode: [null],
      subtotal: [null],
    });

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

    console.log('unselect all')
  }

  onSelectAll(items: any) {

    this.patientcharges = items
    this.patientcharges.forEach((charges: any) => {
      this.subtotal = charges.charges + this.subtotal
    });

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
    this.http.post('http://localhost:5000/api/services/get', { id: this.id }).subscribe((res) => {
      this.services = res;
      this.dropdownList = this.services
    });

  }

  LabDetails() {
    this.http.post('http://localhost:5000/api/labtest/get', { id: this.id }).subscribe((res) => {
      this.testlist = res;
      this.dropdowntestlist = this.testlist
    });

  }

  patientdetails() {

    this.http.post('http://localhost:5000/api/patient/getid', { _id: this.id }).subscribe((res) => {
      this.patient = res


      this.inputname = this.patient[0].name
      this.inputgender = this.patient[0].gender
      this.inputage = this.patient[0].age
      this.inputdoctor = this.patient[0].doctor_name
      this.allocateid = this.patient[0].allocateid

    })
  }

  billdetails() {
    this.http.post('http://localhost:5000/api/bill/getid', { _id: this.id }).subscribe((res) => {

      this.bill = res
      if (this.bill.length !== 0) {

        this.selectedservice = this.bill[0].labcharges
        this.selectedlabtest = this.bill[0].labtests
        if (this.bill[0].subtotal) {
          this.subtotal = this.bill[0].subtotal
          if (this.bill[0].payment) {
            this.inputpayment = this.bill[0].payment
            this.inputbalance = this.bill[0].subtotal - this.bill[0].payment
          }
          else {
            this.inputbalance = this.bill[0].subtotal
          }
        }
        if (this.bill[0].paymentmode) {
          this.inputpaymentmode = this.bill[0].paymentmode
        }
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
      // this.http.post('http://localhost:5000/api/bill/getid', { _id: this.id }).subscribe((res) => {
      //   this.discountdata = res
      //   this.discount = this.discountdata[0].discount
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
      console.log(this.alllabtests)
      this.discount = this.result
      this.alllabtests.forEach((labtest: any) => {
        this.discount.forEach((element: any) => {
          if (labtest.labtest == element.labtest) {
            this.discountString = element.labtest + '(' + element.discount + '%)' + ' ' + this.discountString 
            console.log(this.discountString)

            this.subtotal = this.subtotal - (labtest.charges * (element.discount / 100))
            this.inputbalance = this.inputbalance - (labtest.charges * (element.discount / 100))
            console.log(labtest.labtest, this.inputbalance)
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


  onSubmit(post: any) {

    post.subtotal = this.subtotal

    if (this.inputbalance !== 0) {
      post.payment = post.payment + this.inputpayment
    }

    this.http.post(`http://localhost:5000/api/patient/bill/${this.id}`, post).subscribe((res) => {
      this.snackBar.open('Bill Made Successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['doctordashboard']);
    })

  }

  handleclose() {
    window.location.reload();
  }



}
