import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabtestsComponent } from '../labtests/labtests.component';

@Component({
  selector: 'app-add-labtest',
  templateUrl: './add-labtest.component.html',
  styleUrls: ['./add-labtest.component.css']
})
export class AddLabtestComponent implements OnInit {

  formGroup: any = FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  errorString: string = 'Error! Please Try Again';

  hide = true;
  patientid:any;
  patientdata:any;
  services: any;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.alldoctors();
    this.createForm();
    
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      labtest: [null, Validators.required],
      charges: [null, Validators.required],
      doctor_name: [null, Validators.required],
    });
  }

  handleclick()
  { 
    this.router.navigate(['doctordashboard']);
  }

  doctors: any;
  selectedDoctor: any
  labtestPreview: any
  everydoctor: any;

  changePreview() {
    console.log(this.selectedDoctor)
    this.getLabtests()
  }


  alldoctors() {
    this.http.get(environment.getAllDoctors).subscribe((res) => {
      this.everydoctor = res
      console.log(this.everydoctor)
    })
  }

  editLabtest(labtest: any, doctor: any) {
    const dialogRef = this.dialog.open(LabtestsComponent, {
      data: { name: labtest, doctor: doctor },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteLabtest(labtest: any, doctor: any) {
    this.http.post(environment.deleteLabtest, { labtest: labtest,doctor_name: doctor }).subscribe({
      next: res => {
        console.log(res)
      },
      error: error => {
        console.log(error)
      }
    })
  }


  getLabtests() {
    this.http.post(environment.getLabtestDoc, { doctor_name: this.selectedDoctor }).subscribe({
      next: res => {
        console.log(res)
        this.labtestPreview = res
      },
      error: error => {
        console.log(error)
      }
    })
  }


  onSubmit(post: any) {
    this.showSuccess = false;
    this.showError = false;
    console.log(post);
    this.http.post(environment.labtestAdd, post).subscribe({
      next: res => {
        console.log('Labtest Added')
        this.showSuccess = true;
      },
      error: error => {
        if (error.status === 400) {
          this.showError = true;
          this.errorString = 'Labtest Already Exists';
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
