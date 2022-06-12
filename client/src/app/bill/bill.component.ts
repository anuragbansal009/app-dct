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


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  
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
  data: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {

    this.http.get(environment.servicesGet).subscribe((res) => {
      this.services = res;
      console.log(this.data);
    });

    this.id = this.route.snapshot.params['id'];

    this.patientdetails()

    this.billdetails()

    this.formGroup = this.formBuilder.group({
      name: [this.inputname],
      gender: [this.inputgender],
      age: [this.inputage],
      doctor_name: [this.inputdoctor],
      allocateid: [this.allocateid],
      labcharges: [this.labcharges],
      advice: [this.advice],

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

          if (this.bill[0].advice) {
            this.labcharges = this.bill[0].labcharges
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
      this.router.navigate(['doctordashboard']);
    })

  }

  handleEvent() {

    this.router.navigate(['doctordashboard']);
  }



}
