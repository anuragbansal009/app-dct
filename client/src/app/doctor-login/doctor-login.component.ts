import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { RecaptchaComponent,RecaptchaErrorParameters, RecaptchaFormsModule } from 'ng-recaptcha';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  formGroup: any = FormGroup;
  hide = true;
  user: any;
  showError: boolean = false;
  errorMessage: any;
  token: any;
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent | any;
  recComp: RecaptchaComponent|any;
  recaptchaPublicKey: string = environment.recaptcha.siteKey;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]]
    });
  }

  executeReCaptcha() {
    this.captchaRef.execute();
  }

  getReCaptchaResponse(response: string) {
    this.formGroup.patchValue({
      'g-recaptcha-response': response
    });
    // Submit your form
  }

  onSubmit(post: any) {

    this.http.post(environment.login, post).subscribe({
      next: res => {
        this.user = res
        localStorage.setItem("currentDoctor", JSON.stringify(this.user));
        console.log("Login Successful");
        window.location.replace(environment.doctorHomepage);
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
