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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  medicineCtrl = new FormControl('');
  filteredmedicines: Observable<string[]>;
  medicines: string[] = [];
  allmedicines: string[] = ['Amoxicillin', 'Vitamin D', 'Ibuprofen', 'Cetirizine hydrochloride', 'Azithromycin', 'Amlodipine besylate', 'Albuterol sulfate HFA', 'Cyclobenzaprine hydrochloride', 'Cephalexin'];

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
  patientDetails: any;
  patientVitals: any;
  extraFields: any = [];
  extraFieldsValues: any = [];

  @ViewChild('medicineInput') medicineInput!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public patientVital: { id: any },
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.filteredmedicines = this.medicineCtrl.valueChanges.pipe(
      startWith(null),
      map((medicine: string | null) => (medicine ? this._filter(medicine) : this.allmedicines.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our medicine
    if (value) {
      this.medicines.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();

    this.medicineCtrl.setValue(null);
  }

  remove(medicine: string): void {
    const index = this.medicines.indexOf(medicine);
    if (index >= 0) {
      this.medicines.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.medicines.push(event.option.viewValue);
    this.medicineInput.nativeElement.value = '';
    this.medicineCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allmedicines.filter(medicine => medicine.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.id = this.patientVital.id;
    this.formGroup = this.formBuilder.group({
      medicines: [],
    });
    this.http.post(environment.getAllocateId, { allocateid: this.id }).subscribe((res: any) => {
      this.patientDetails = res
      this.patientVitals = this.patientDetails.at(-1).vitals.at(-1)
      this.patientDetails = this.patientDetails.at(-1)
      if (this.patientVitals.fields) {
        for (const item in this.patientVitals.fields) {
          this.extraFields.push(item.slice(0, item.indexOf("(")))
          this.extraFieldsValues.push(this.patientVitals.fields[item] + " " + item.slice(item.indexOf("(") + 1, item.indexOf(")")))
        }
      }
    })
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
    // const dialogRef = this.dialog.open(AddFieldsComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (result) {
    //     this.inputs.push(result.fieldname + '(' + result.units + ')');
    //     this.formGroup.controls.fields.addControl(result.fieldname + '(' + result.units + ')', new FormControl(''));
    //   } 
    // });
    console.log("Add Field")
  }

  temp() {
    return new this.formGroup({
      fieldname: new FormControl(''),
      units: new FormControl(''),
    });
  }

  onSubmit(post: any) {
    console.log(this.medicines)
    // this.http.post(environment.updatePatient + this.id, { vitals: post }).subscribe((res: any) => {
    //   console.log(res)
    // })
  }
}
