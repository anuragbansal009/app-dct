import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

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

  onSubmit(post: any) {

    this.http.post('http://localhost:5000/api/login', post).subscribe({
      next: res => {
        this.user = res
        localStorage.setItem("currentDoctor", JSON.stringify(this.user));
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
