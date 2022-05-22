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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(post: any) {
    this.token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });

    const requestOptions = { headers: headers };

    this.http.post('http://localhost:5000/api/admin/login', post, requestOptions).subscribe({
      next: res => {
        this.user = res
        localStorage.setItem("currentUser", JSON.stringify(this.user));
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
