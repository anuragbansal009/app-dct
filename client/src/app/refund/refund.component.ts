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
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})

export class RefundComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id: any
  _id: any
  refundamount: any;
  reason: any;
  billDetails: any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: any, _id: any},
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {

    this.id = this.data.id;
    this._id = this.data._id
    console.log(this.id, this._id)

    this.formGroup = this.formBuilder.group({
      refund: [],
      reason: [],
    });

    this.http.post(environment.billGetId, {_id: this._id}).subscribe({
      next: res => {
        console.log(res)
        this.billDetails = res
        this.billDetails = this.billDetails.at(-1)
      },
      error: error => {
        console.error(error)
      }
    })
  }


  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.refundBillAmount, {allocateid: this.id, refund: post.refund, reason: post.reason}).subscribe({
      next: res => {
        this.snackBar.open('Refunded Successfully', 'Close', {
          duration: 3000,
        });
        this.showSuccess = true;
        this.router.navigate(['doctordashboard']);
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

