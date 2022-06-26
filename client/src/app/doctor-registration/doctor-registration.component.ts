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
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {
  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  doctorRegistrationAPI = environment.doctorRegistrationAPI;
  hide = true;
  doctorList: any = [];
  apiLoaded: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      hospital_name: [null, Validators.required],
      designation: [null, Validators.required],
      location: [null, Validators.required],
      allocateid: [null, Validators.required],
      specialization: [null, Validators.required],
      followup: [null, Validators.required],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required')
      ? 'Field is required'
        : this.formGroup.get('username').hasError('alreadyInUse')
          ? 'This Username Address is already in use'
          : '';
  }

  logout() {
    localStorage.removeItem("currentUser")
    window.location.replace(environment.adminLogin);
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
    this.http.post(this.doctorRegistrationAPI, post).subscribe({
      next: res => {
          console.log('User Created')
          this.showSuccess = true;
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
