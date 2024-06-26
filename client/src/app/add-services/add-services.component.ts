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
import { MatDialog } from '@angular/material/dialog';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {
  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  hide = true;
  patientid: any;
  patientdata: any;
  services: any;
  inputgst: any = 0;
  everydoctor: any;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.alldoctors()
    this.createForm();
    //this.handleService()
  }

  alldoctors() {
    this.http.get(environment.getAllDoctors).subscribe((res) => {
      this.everydoctor = res
      console.log(this.everydoctor)
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      service: [null, Validators.required],
      charges: [null, Validators.required],
      doctor_name: [null, Validators.required],
      gst: [this.inputgst],
    });
  }

  handleclick() {
    this.router.navigate(['doctordashboard']);
  }

  doctors: any;
  selectedDoctor: any
  servicesPreview: any
  otherservicesPreview: any

  changePreview() {
    console.log(this.selectedDoctor)
    this.getServices()
  }

  otherchangePreview() {
    console.log(this.selectedDoctor)
    this.getotherServices()
  }

  editService(service: any, doctor: any) {
    const dialogRef = this.dialog.open(ServicesComponent, {
      data: { name: service, doctor: doctor },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteService(service: any, doctor: any) {
    this.http.post(environment.deleteService, { service: service,doctor_name: doctor }).subscribe({
      next: res => {
        console.log(res)
      },
      error: error => {
        console.log(error)
      }
    })
  }


  deleteotherService(service: any, doctor: any) {
    this.http.post(environment.deleteotherService, { service: service,doctor_name: doctor }).subscribe({
      next: res => {
        console.log(res)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getServices() {
    this.http.post(environment.getServicesDoc, { doctor_name: this.selectedDoctor }).subscribe({
      next: res => {
        console.log(res)
        this.servicesPreview = res
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getotherServices() {
    this.http.post(environment.getotherServicesDoc, { doctor_name: this.selectedDoctor }).subscribe({
      next: res => {
        console.log(res)
        this.otherservicesPreview = res
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
    if (post.gst !== 0) {
      post.charges =post.charges - post.charges * (post.gst / 100);
    }
    else {
      post.charges = post.charges
    }
    this.http.post(environment.servicesAdd, post).subscribe({
      next: res => {
        console.log('Service Added')
        //this.handleService()
        this.showSuccess = true;
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Service Already Exists';
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

  otherSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    if (post.gst !== 0) {
      post.charges =post.charges - post.charges * (post.gst / 100);
    }
    else {
      post.charges = post.charges
    }
    this.http.post(environment.otherservicesAdd, post).subscribe({
      next: res => {
        console.log('Service Added')
        //this.handleService()
        this.showSuccess = true;
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Service Already Exists';
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
