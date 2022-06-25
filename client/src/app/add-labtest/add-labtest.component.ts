import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-labtest',
  templateUrl: './add-labtest.component.html',
  styleUrls: ['./add-labtest.component.css']
})
export class AddLabtestComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  hide = true;
  patientid:any;
  patientdata:any;
  services: any;

  constructor(private formBuilder: FormBuilder, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllDoctors();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      labtest: [null, Validators.required],
      charges: [null, Validators.required],
      doctor_name: [null, Validators.required],
    });
  }

  handleclick()
  { 
    this.router.navigate(['doctordashboard']);
  }

  doctors: any;
  selectedDoctor: any
  servicesPreview: any

  changePreview() {
    console.log(this.selectedDoctor)
    this.getServices()
  }

  editService(i: any) {
    console.log(i)
  }

  getServices() {
    this.http.post(environment.getServicesDoc, {doctor_name: this.selectedDoctor}).subscribe({
      next: res => {
        console.log(res)
        this.servicesPreview = res
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getAllDoctors() {
    this.http.get(environment.getAllDoctors).subscribe({
      next: res => {
        console.log(res)
        this.doctors = res
      },
      error: error => {
        console.log(error)
      }
    })
  }


  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.labtestAdd, post).subscribe({
      next: res => {
        console.log('Labtest Added')
        this.showSuccess = true;
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Labtest Already Exists';
        }
        else if (error.status === 500) {
          this.showError = true;
          this.errorString = 'Error';
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
