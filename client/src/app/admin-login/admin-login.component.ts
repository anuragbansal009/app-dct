import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { RecaptchaComponent,RecaptchaErrorParameters } from 'ng-recaptcha';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  formGroup: any = FormGroup;
  hide = true;
  user: any;
  showError: boolean = false;
  errorMessage: any;
  token: any;
  @ViewChild('captchaElem') captchaElem: RecaptchaComponent | any;
  recComp: RecaptchaComponent|any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, [Validators.required]],
      // recaptcha: [null, Validators.required]
    });
  }

  public getToken(captchaResponse: string): void {
    console.log('Resolved captcha with response:', captchaResponse);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log('Recaptcha error encountered; details:', errorDetails);
  } 

  onSubmit(post: any) {

    this.http.post('http://localhost:5000/api/admin/login', post).subscribe({
      next: res => {
        this.user = res
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        console.log("Login Successful");
        window.location.replace("http://localhost:4200/doctorregistration");
      },
      error: error => {
        this.showError = true
        if (error.status === 400) {
          this.errorMessage = "Invalid username or password"
        }
        else {
          this.errorMessage = "There has been an error, try again later"
        }
      }
    })
  }

}
