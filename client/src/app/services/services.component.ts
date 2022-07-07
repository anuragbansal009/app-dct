import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';


  service: any
  serviceName: any
  doctorName: any
  inputservice: any
  inputcharge: any
  inputdoctor: any
  inputgst: any
  everydoctor: any;
  id: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: any, doctor:any},
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

    
  ngOnInit() {

    this.alldoctors()

    this.serviceName = this.data.name;
    this.doctorName = this.data.doctor;

    this.http.post(environment.getOneService, { service: this.serviceName, doctor_name: this.doctorName}).subscribe((res) => {

      this.service = res
      this.id = this.service[0]._id
      this.inputservice = this.service[0].service
      this.inputcharge = this.service[0].charges
      this.inputdoctor = this.service[0].doctor_name
      this.inputgst = this.service[0].gst

    })

    this.formGroup = this.formBuilder.group({
      service: [this.inputservice],
      charges: [this.inputcharge],
      doctor_name: [this.inputdoctor],
      gst: [this.inputgst],
    });

    // this.createForm();
  }
  alldoctors() {
    this.http.get(environment.getAllDoctors).subscribe((res) => {
      this.everydoctor = res
    })
  }

  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.updateService + this.id, post).subscribe({
      next: res => {
        console.log('Service Updated')
        this.snackBar.open('Service Updated Successfully', 'Close', {
          duration: 3000,
        });
        this.showSuccess = true;
        window.location.reload();
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Error! Please Check the Fields';
        }
        else if (error.status === 500) {
          this.showError = true;
          this.errorString = 'Error!';
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
