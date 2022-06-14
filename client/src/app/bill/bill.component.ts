import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
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
  data: any;

  constructor(private http: HttpClient,
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

    this.id = this.route.snapshot.params['id'];

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
      labtests: [this.labtests],
      advice: [this.advice],

    });


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  serviceDetails()
  {
    this.http.post('http://localhost:5000/api/services/get', {id: this.id}).subscribe((res) => {
      this.services = res;
      this.dropdownList = this.services
      console.log(this.dropdownList);
    });

  }

  LabDetails()
  {
    this.http.post('http://localhost:5000/api/labtest/get', {id: this.id}).subscribe((res) => {
      this.testlist = res;
      this.dropdowntestlist = this.testlist
      console.log(this.dropdowntestlist);
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

    this.http.post(`http://localhost:5000/api/patient/bill/${this.id}`,post).subscribe((res) => {
      this.snackBar.open('Bill Made Successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['doctordashboard']);
    })

  }

  handleEvent() {

    this.router.navigate(['doctordashboard']);
  }



}
