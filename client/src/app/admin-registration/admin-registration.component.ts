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
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent implements OnInit {
  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  adminRegistrationAPI = environment.adminRegistrationAPI;
  token: any;

  hide = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail,
      ],
      name: [null, Validators.required],
      password: [null, [Validators.required, this.checkPassword]],
      allocateid: [null, Validators.required],
      occupation: [null, Validators.required],
      status: [null, Validators.required],
      account_type: [null, Validators.required],
      credits: [null, Validators.required],
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

  checkInUseEmail(control: any) {
    let db = ['tony@gmail.com'];
    return new Observable((observer: any) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? 'Field is required'
      : this.formGroup.get('email').hasError('pattern')
        ? 'Not a valid Email Address'
        : this.formGroup.get('email').hasError('alreadyInUse')
          ? 'This Email Address is already in use'
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
    this.http.post(this.adminRegistrationAPI, post).subscribe({
      next: res => {
          this.token = res;
          this.token = this.token.token;
          localStorage.setItem('token', this.token);
          console.log('User Created')
          this.showSuccess = true;
          this.router.navigate(['adminlogin']);
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
