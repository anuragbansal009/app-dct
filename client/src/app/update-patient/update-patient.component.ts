import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
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

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required, this.checkInUseUsername,],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      age: [null, Validators.required],
      mobile: [null, Validators.required],
      email: [null, Validators.required],
      bloodgroup: [null, Validators.required],
      city: [null, Validators.required],
      pin: [null, Validators.required],
      doctor_name: [null, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.http.post('http://localhost:5000/api/patient/getid', {_id: this.id}).subscribe((response)=>{
      this.patient = response
      console.log(this.patient)
    })
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
        console.log('Patient Created')
        this.showSuccess = true;
        window.location.replace(environment.doctorHomepage)
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



}
