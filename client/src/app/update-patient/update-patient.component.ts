import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
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
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id:any
  patient:any

  inputname: any
  inputmobile: any
  inputgender: any
  inputage: any
  inputbloodgroup: any
  inputcity: any
  inputpin: any
  inputdoctor: any

  // createForm() {
  //   this.formGroup = this.formBuilder.group({
  //     name: [this.inputname, Validators.required, this.checkInUseUsername,],
  //     gender: [this.inputgender, Validators.required],
  //     dob: [this.inputdob, Validators.required],
  //     age: [this.inputage, Validators.required],
  //     mobile: [this.inputmobile, Validators.required],
  //     email: [this.inputemail, Validators.required],
  //     bloodgroup: [this.inputbloodgroup, Validators.required],
  //     city: [this.inputcity, Validators.required],
  //     pin: [this.inputpin, Validators.required],
  //     doctor_name: [this.inputdoctor, Validators.required],
  //   });
  // }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];

    this.http.post('http://localhost:5000/api/patient/getid', {_id: this.id}).subscribe((res)=>{
    this.patient = res

    console.log(this.patient)
    
    this.inputname = this.patient[0].name
    this.inputmobile = this.patient[0].mobile
    this.inputgender = this.patient[0].gender
    this.inputage = this.patient[0].age
    this.inputbloodgroup = this.patient[0].bloodgroup
    this.inputcity = this.patient[0].city
    this.inputpin = this.patient[0].pin
    this.inputdoctor = this.patient[0].doctor_name

    this.formGroup = this.formBuilder.group({
      name: [this.inputname, Validators.required, this.checkInUseUsername,],
      gender: [this.inputgender, Validators.required],
      age: [this.inputage, Validators.required],
      mobile: [this.inputmobile, Validators.required],
      bloodgroup: [this.inputbloodgroup, Validators.required],
      city: [this.inputcity, Validators.required],
      pin: [this.inputpin, Validators.required],
      doctor_name: [this.inputdoctor, Validators.required],
    });


    })

    // this.createForm();

    console.log(this.id)
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseUsername(control: any) {
    let db = ['anuragbansal'];
    return new Observable((observer: any) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required')
      ? 'Field is required'
      : this.formGroup.get('username').hasError('alreadyInUse')
        ? 'This Username Address is already in use'
        : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number)'
      : this.formGroup.get('password').hasError('requirements')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number'
        : '';
  }
  
  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    this.http.post(this.patientRegistrationAPI, post).subscribe({
      next: res => {
        console.log('Patient Updated')
        this.showSuccess = true;
        this.router.navigate(['doctordashboard']);
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Error! Please Check the Fields';
        }
        else if (error.status === 500) {
          this.showError = true;
          this.errorString = 'Error! User Already Registered';
        }
        else {
          this.showError = true;
          this.errorString = 'Error! Please Try Again';
        }
        console.error('There was an error!', error);
      }

    })
  }

  handleEvent()
  {
    
    this.router.navigate(['doctordashboard']);
  }



}
