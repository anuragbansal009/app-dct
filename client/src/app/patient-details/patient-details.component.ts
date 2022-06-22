import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  providers: [DatePipe]
})

export class PatientDetailsComponent implements OnInit {

  id: any

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  labtests: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public patient: { id: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private router: Router) { }

    patinentData: any;
    allocateid: any;
    name: any;
    gender: any;
    age: any;
    mobile: any;
    bloodgroup: any;
    city: any;
    pin: any;
    doctor: any;
    date: any;
    time: any;
    status: any;

  ngOnInit(): void {

    this.id = this.patient.id;

    this.http.post('http://localhost:5000/api/patient/getallocateid', { allocateid : this.id}).subscribe((res)=>{

      this.patinentData = res;
      console.log(this.patinentData)

      this.allocateid = this.patinentData[0].allocateid
      this.name = this.patinentData[0].name
      this.gender = this.patinentData[0].gender
      this.age = this.patinentData[0].age
      this.mobile = this.patinentData[0].mobile
      this.bloodgroup = this.patinentData[0].bloodgroup
      this.city = this.patinentData[0].city
      this.pin = this.patinentData[0].pin
      this.doctor = this.patinentData[0].doctor_name
      
      this.date = this.patinentData[0].slotdate
      this.date = this.datepipe.transform(this.date, 'dd-MM-yyyy');
      

      this.time = this.patinentData[0].time
      this.time = this.datepipe.transform("01-01-1970 " + this.time, 'shortTime');

      this.status = this.patinentData[0].status

    })
    
  }


}
