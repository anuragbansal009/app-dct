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
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})

export class DiscountComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id: any
  discountamount: any;
  reason: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: any},
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {

    this.id = this.data.id;

    console.log(this.id)

    this.formGroup = this.formBuilder.group({
      discount: [],
      reason: [],
    });

  }


  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.discountBill, {allocateid: this.id, discount: post.discount, reason: post.reason}).subscribe({
      next: res => {
        this.snackBar.open('Discount Given Successfully', 'Close', {
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

