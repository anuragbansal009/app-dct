import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs-compat/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BillComponent } from '../bill/bill.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  hide = true;
  patientid: any;
  patientdata: any;
  storedDate: any;
  storedTime: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {date: Date},
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private router: Router, 
    private http: HttpClient, 
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    if (this.data) {
      // console.log(this.data.date)
      this.storedDate = this.data.date
      this.storedTime = this.data.date.toTimeString().split(' ')[0].split(':')[0] + ':' + this.data.date.toTimeString().split(' ')[0].split(':')[1]
    }
    else {
      this.storedDate = new Date()
      this.storedTime = this.storedDate.toTimeString().split(' ')[0].split(':')[0] + ':' + this.storedDate.toTimeString().split(' ')[0].split(':')[1]
    }
    this.storedDate = new Date(this.storedDate.toISOString().split('T')[0] + 'T18:30:00.000Z')
    this.storedDate.setDate(this.storedDate.getDate()-1)
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      mobile: [null, Validators.required],
      bloodgroup: [null,],
      // allocate_id: [null, Validators.required],
      city: [null,],
      pin: [null,],
      doctor_name: [null,],
      slotdate: [this.storedDate, Validators.required],
      time: [this.storedTime, Validators.required],

    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
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
  handleclick() {
    this.router.navigate(['doctordashboard']);
  }

  options: string[] = ['One', 'Two', 'Three'];
  list: any
  genderVal: any
  nameVal: any
  ageVal: any
  bgVal: any
  cityVal: any
  pinVal: any

  clickAC(event: any) {
    const val = this.list[event]
    this.genderVal = val.gender
    this.nameVal = val.name
    this.ageVal = val.age
    this.bgVal = val.bloodgroup
    this.cityVal = val.city
    this.pinVal = val.pin
  }

  patientGet(event: any) {
    this.http.post(environment.patientsGet + 'Mobile', { "mobile": event }).subscribe({
      next: res => {
        console.log(res)
        this.list = res
      },
      error: error => {
        console.log(error)
      }
    });
  }



  onSubmit(post: any) {
    console.log(post)
    this.showSuccess = false;
    this.showError = false;
    this.http.post(this.patientRegistrationAPI, post).subscribe({
      next: res => {
        this.patientdata = res
        this.patientid = this.patientdata._id
        this.showSuccess = true;

        // this.router.navigate([`bill/${this.patientid}`]);

        const dialogRef = this.dialog.open(BillComponent, {
          data: { id: this.patientid },
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if (result == true) {
            let element: HTMLElement = document.getElementsByClassName('closebutton')[0] as HTMLElement;
            element.click();
          }
        });
        // this.router.navigate(['doctordashboard']);

        this.snackBar.open('Patient Registered Successfully', 'Close', {
          duration: 3000,
        });

      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Error! Please Check the Fields';
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
