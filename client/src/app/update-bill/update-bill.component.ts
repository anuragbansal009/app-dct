import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
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
  selector: 'app-update-bill',
  templateUrl: './update-bill.component.html',
  styleUrls: ['./update-bill.component.css']
})
export class UpdateBillComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';
  patientRegistrationAPI = environment.patientRegistrationAPI;

  id:any
  patient:any

  inputname: any
  inputgender: any
  inputage: any
  inputdoctor: any
  allocateid: any

  medicines: any = null
  labcharges: any = null
  nextvisit: any = null
  advice: any = null

  // data: any;

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: any},
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];

    this.http.post(environment.patientGetid, {_id: this.id}).subscribe((res)=>{
    this.patient = res

    console.log(this.patient)
    
    this.inputname = this.patient[0].name
    this.inputgender = this.patient[0].gender
    this.inputage = this.patient[0].age
    this.inputdoctor = this.patient[0].doctor_name
    this.allocateid = this.patient[0].allocateid

    this.formGroup = this.formBuilder.group({
      name: [this.inputname],
      gender: [this.inputgender],
      age: [this.inputage],
      doctor_name: [this.inputdoctor],
      allocateid: [this.allocateid],
      medicines: [this.medicines ],
      labcharges: [this.labcharges],
      nextvisit: [this.nextvisit],
      advice: [this.advice],
      
    });


    })

    console.log(this.id)
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

    this.http.post(environment.patientBill, {name: post.name, allocateid: post.allocateid, medicines: post.medicines, labcharges: post.labcharges, nextvisit: post.nextvisit, advice: post.advice}).subscribe((res)=>{
      console.log(res);
    })
    this.router.navigate(['doctordashboard']);
    // this.showSuccess = false;
    // this.showError = false;
    // this.http.post(this.patientRegistrationAPI, post).subscribe({
    //   next: res => {
    //     console.log('Patient Updated')
    //     this.showSuccess = true;
    //     window.location.replace(environment.doctorHomepage)
    //   },
    //   error: error => {
    //     if (error.status === 400) {
    //       this.showError = true;
    //       this.errorString = 'Error! Please Check the Fields';
    //     }
    //     else if (error.status === 500) {
    //       this.showError = true;
    //       this.errorString = 'Error! User Already Registered';
    //     }
    //     else {
    //       this.showError = true;
    //       this.errorString = 'Error! Please Try Again';
    //     }
    //     console.error('There was an error!', error);
    //   }

    // })
  }

  handleEvent()
  {
    
    this.router.navigate(['doctordashboard']);
  }



}

