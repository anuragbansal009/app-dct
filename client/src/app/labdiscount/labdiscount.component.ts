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
  selector: 'app-labdiscount',
  templateUrl: './labdiscount.component.html',
  styleUrls: ['./labdiscount.component.css']
})
export class LabdiscountComponent implements OnInit {

  id: any

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  labtests: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public patient: { id: any, labtests: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }
    

  ngOnInit(): void {

    this.id = this.patient.id;
    this.labtests = this.patient.labtests;
    // this.alllabtests()

    this.formGroup = this.formBuilder.group({
      labtest: [],
      discount: [],
    });
  }

  alllabtests() {
    this.http.post('http://localhost:5000/api/labtest/get', { id: this.id }).subscribe((res) => {
      this.labtests = res
    })

  }

  onSubmit(post: any) {
    this.http.post(`http://localhost:5000/api/patient/bill/${this.id}`, { discount: post }).subscribe((res: any) => {
    })
  }


}
