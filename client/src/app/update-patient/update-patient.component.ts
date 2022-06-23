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
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id: any
  patient: any

  inputname: any = ''
  inputmobile: any = ''
  inputgender: any = ''
  inputage: any = ''
  inputbloodgroup: any = ''
  inputcity: any = ''
  inputpin: any = ''
  inputdoctor: any = ''
  inputdate: any = ''
  inputtime: any = ''

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

    this.http.post(environment.getAllocateId, { allocateid: this.id }).subscribe((res) => {
      this.patient = res

      this.inputname = this.patient[0].name
      this.inputmobile = this.patient[0].mobile
      this.inputgender = this.patient[0].gender
      this.inputage = this.patient[0].age
      this.inputbloodgroup = this.patient[0].bloodgroup
      this.inputcity = this.patient[0].city
      this.inputpin = this.patient[0].pin
      this.inputdoctor = this.patient[0].doctor_name
      this.inputdate = this.patient[0].slotdate
      this.inputtime = this.patient[0].time

    })

    this.formGroup = this.formBuilder.group({
      name: [this.inputname],
      gender: [this.inputgender],
      age: [this.inputage],
      mobile: [this.inputmobile],
      bloodgroup: [this.inputbloodgroup],
      city: [this.inputcity],
      pin: [this.inputpin],
      doctor_name: [this.inputdoctor],
      slotdate: [this.inputdate],
      time: [this.inputtime],
    });

    // this.createForm();
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseUsername(control: any) {
    let db = ['anuragbansal'];
    return new Observable((observer: any) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required')
      ? 'Field is required'
      : this.formGroup.get('username').hasError('alreadyInUse')
        ? 'This Username Address is already in use'
        : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number)'
      : this.formGroup.get('password').hasError('requirements')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number'
        : '';
  }

  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.updatePatient + this.id, post).subscribe({
      next: res => {
        console.log('Patient Updated')
        this.snackBar.open('Patient Updated Successfully', 'Close', {
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
          this.errorString = 'Error! User Already Registered';
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
