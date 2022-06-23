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
  selector: 'add-fields',
  templateUrl: './add-fields.html',
  styleUrls: ['./add-fields.css']
})

export class AddFieldsComponent implements OnInit {

  post: any = '';
  addfieldsformGroup: any = FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.addfieldsformGroup = this.formBuilder.group({
      fieldname: [],
      units: []
    });
  }

  onSubmit(post: any) {
    console.log(post);
  }
}


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  id: any

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;
  weight: any
  bmi: any = 0;
  height: any
  weightAdded: boolean = false;
  heightAdded: boolean = false;
  inputs: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public patientVital: { id: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    this.id = this.patientVital.id;
    this.formGroup = this.formBuilder.group({
      weight: [],
      height: [],
      fewer: [],
      sbp: [],
      dbp: [],
      pulse: [],
      fields: this.formBuilder.group({}),
    });
  }

  weightField() {
    // console.log(this.formGroup.get('weight').value)
    if (this.formGroup.get('weight').value) {
      this.weightAdded = true;
      this.weight = this.formGroup.get('weight').value;
    }
    else {
      this.weightAdded = false;
    }
  }

  heightField() {
    console.log(this.formGroup.get('height').value)
    if (this.formGroup.get('height').value) {
      this.heightAdded = true;
      this.height = this.formGroup.get('height').value;
    }
    else {
      this.heightAdded = false;
    }
  }

  addField() {
    const dialogRef = this.dialog.open(AddFieldsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.inputs.push(result.fieldname + '(' + result.units + ')');
        this.formGroup.controls.fields.addControl(result.fieldname + '(' + result.units + ')', new FormControl(''));
      } 
    });
  }

  temp() {
    return new this.formGroup({
      fieldname: new FormControl(''),
      units: new FormControl(''),
    });
  }

  onSubmit(post: any) {
    // console.log(post)
    this.http.post(environment.updatePatient + this.id, {vitals: post}).subscribe((res:any) => {
      console.log(res)
    })
  }
}
