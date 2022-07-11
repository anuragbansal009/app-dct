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
  selector: 'app-labtests',
  templateUrl: './labtests.component.html',
  styleUrls: ['./labtests.component.css']
})

export class LabtestsComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';


  labtest: any
  labtestName: any
  doctorName: any
  inputlabtest: any
  inputcharge: any
  inputdoctor: any
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

    this.labtestName = this.data.name;
    this.doctorName = this.data.doctor;

    this.http.post(environment.getOneLabtest, { labtest: this.labtestName, doctor_name: this.doctorName}).subscribe((res) => {

      this.labtest = res
      this.id = this.labtest[0]._id
      this.inputlabtest = this.labtest[0].labtest
      this.inputcharge = this.labtest[0].charges
      this.inputdoctor = this.labtest[0].doctor_name

    })

    this.formGroup = this.formBuilder.group({
      labtest: [this.inputlabtest],
      charges: [this.inputcharge],
      doctor_name: [this.inputdoctor],
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
    this.http.post(environment.updateLabtest + this.id, post).subscribe({
      next: res => {
        console.log('Service Updated')
        this.snackBar.open('Labtest Updated Successfully', 'Close', {
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
