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
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  dropdownList = [];
  dropdowntestlist = [];
  selectedItems = [];
  dropdownSettings!:IDropdownSettings;
  dropdownTests!:IDropdownSettings;
  
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

  medicines: any = null
  labcharges: any = null
  nextvisit: any = null
  advice: any = null
  bill: any;
  services: any;
  labtests: any;
  testlist: any;
  // data: any;

  patientcharges: any;
  subtotal: any = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: any},
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
      labcharges: [this.labcharges],
      labtests: [],
      discount: [],
      payment: [],
      paymentmode: [],
      subtotal: [this.subtotal],
      advice: [this.advice],
    });

  }

  onItemDeSelect(item: any) {
    this.patientcharges = item
    this.subtotal = this.subtotal - this.patientcharges.charges
    console.log(this.subtotal)
  }

  onItemSelect(item: any) {
    this.patientcharges = item
    this.subtotal = this.subtotal + this.patientcharges.charges
    console.log(this.subtotal)
  }

  onUnselectAll(item: any) {
    
    console.log('unselect all')
  }

  onSelectAll(items: any) {
    
    this.patientcharges = items
    this.patientcharges.forEach((charges:any) => {
      this.subtotal = charges.charges + this.subtotal
    });

    console.log('sss',this.subtotal)
  }

  serviceDetails()
  {
    this.http.post('http://localhost:5000/api/services/get', {id: this.id}).subscribe((res) => {
      this.services = res;
      this.dropdownList = this.services
    });

  }

  LabDetails()
  {
    this.http.post('http://localhost:5000/api/labtest/get', {id: this.id}).subscribe((res) => {
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

      if (res) {
        this.bill = res

        if (this.bill.length !== 0) {

          
          if (this.bill[0].advice) {
            this.advice = this.bill[0].advice
          }
        }

      }

      else {
        console.log('create bill first')
      }

    })

  }

  onSubmit(post: any) {
    console.log(post)
    this.http.post(`http://localhost:5000/api/patient/bill/${this.id}`,{post, subtotal: this.subtotal}).subscribe((res) => {
      this.snackBar.open('Bill Made Successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['doctordashboard']);
    })

  }

  handleclose() {

    console.log('handle close')

    this.router.navigate(['doctordashboard']);
  }



}
