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
  selector: 'app-servicediscount',
  templateUrl: './servicediscount.component.html',
  styleUrls: ['./servicediscount.component.css']
})

export class ServicediscountComponent implements OnInit {

  id: any

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  labcharges: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public patient: { id: any, labcharges: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }
    

  ngOnInit(): void {

    this.id = this.patient.id;
    this.labcharges = this.patient.labcharges;
    // this.alllabtests()

    this.formGroup = this.formBuilder.group({
      service: [],
      discount: [],
    });
  }

  allservices() {
    this.http.post(environment.servicesGet, { id: this.id }).subscribe((res) => {
      this.labcharges = res
      console.log(this.labcharges)
    })

  }

  onSubmit(post: any) {
    this.http.post(environment.patientBill + this.id, { discount: post }).subscribe((res: any) => {
    })
  }


}