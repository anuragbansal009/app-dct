import { OnInit, Component, ViewChild, Inject, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTable } from '@angular/material/table'
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePatientComponent } from '../update-patient/update-patient.component';
import { BillComponent } from '../bill/bill.component';
import { DatePipe } from '@angular/common';
import { VitalsComponent } from '../vitals/vitals.component';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { DateAdapter } from '@angular/material/core';
import { BillInvoiceComponent } from '../bill-invoice/bill-invoice.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { RefundComponent } from '../refund/refund.component';
import { DiscountComponent } from '../discount/discount.component';
import { environment } from 'src/environments/environment';
import { identity } from 'rxjs';

export interface PeriodicElement {
  name: string;
  age: number;
  mobile: number;
  email: string;
  bloodgroup: string;
  city: string;
  dob: string;
  doctor_name: string;
  gender: string;
  opd_number: string;
  pin: string;
  __v: number;
  _id: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-patient-list-doctor',
  templateUrl: './patient-list-doctor.component.html',
  styleUrls: ['./patient-list-doctor.component.css'],
  providers: [DatePipe]
})
export class PatientListDoctorComponent implements OnInit {

  message: string = "firstLine\nSecondLine";
  serviceitems: any
  labtestitems: any
  bill: any;
  list: any;
  name: any = [];
  mobile: any = [];
  allocateid: any = [];
  email: any = [];
  position: any = [];
  len: any;
  tableCreate: boolean = false;
  date: any;
  interval: any = 1000 * 60 * 60 * 24;
  todayDate: any = Math.floor(Date.now() / this.interval) * this.interval
  now: any = Date.now();

  displayedColumns: string[] = ['tokennumber','uid', 'name', 'vitals', 'doctor_name', 'slotdate', 'time', 'followup', 'prescription', 'update', 'refund', 'discount', 'status', 'print'];
  dataSource!: MatTableDataSource<any>;
  fulldataSource!: MatTableDataSource<any>

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public datepipe: DatePipe, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.getallpatients();
    this.alldoctors();
  }

  doctors: any
  doctorSelect: any

  doctorChange(event: any) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  alldoctors() {
    this.http.get(environment.getAllDoctors).subscribe((res) => {
      this.doctors = res
      console.log(this.doctors)
    })
  }

  getallpatients() {
    // console.log(now);
    this.date = document.getElementById('filterdate');
    this.date = new Date(this.date.value).valueOf();
    this.http.post(environment.patientFilter, { date: this.now }).subscribe((res) => {

      this.list = res
      this.list.forEach((element: { slotdate: any; time: any; vitals: any; vitalTooltip: any }) => {
        element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
        element.time = this.datepipe.transform("01/01/1970 " + element.time, 'shortTime');
        element.vitalTooltip = "";
        if (element.vitals[0]) {
          if (element.vitals[0].weight) {
            element.vitalTooltip = element.vitalTooltip + "Weight: " + element.vitals[0].weight + " Kg" + "\n"
          }
          if (element.vitals[0].height) {
            element.vitalTooltip = element.vitalTooltip + "Height: " + element.vitals[0].height + " cm" + "\n"
          }
          if (element.vitals[0].fewer) {
            element.vitalTooltip = element.vitalTooltip + "Fever: " + element.vitals[0].fewer + " F" + "\n"
          }
          if (element.vitals[0].sbp && element.vitals[0].dbp) {
            element.vitalTooltip = element.vitalTooltip + "Blood Pressure: " + element.vitals[0].sbp + "/" + element.vitals[0].dbp + " mmHg" + "\n"
          }
          if (element.vitals[0].pulse) {
            element.vitalTooltip = element.vitalTooltip + "Pulse: " + element.vitals[0].pulse + " bpm" + "\n"
          }
        }
      });
      console.log(this.list)
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }


  filterallpatients(event: any) {
    this.date = new Date(event.value).valueOf();
    this.date = this.date + 19800000;
    this.now = this.date;
    this.http.post(environment.patientFilter, { date: this.date }).subscribe({
      next: res => {
        this.list = res
        if (this.list.length == 0) {
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        }
        else {
          this.serviceitems = this.list[0].services
          this.labtestitems = this.list[0].labtests
          this.list.forEach((element: { slotdate: any; time: any; vitals: any; vitalTooltip: any }) => {
            element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
            element.time = this.datepipe.transform("01-01-1970 " + element.time, 'shortTime');
            element.vitalTooltip = "";
            if (element.vitals[0]) {
              if (element.vitals[0].weight) {
                element.vitalTooltip = element.vitalTooltip + "Weight: " + element.vitals[0].weight + " Kg" + "\n"
              }
              if (element.vitals[0].height) {
                element.vitalTooltip = element.vitalTooltip + "Height: " + element.vitals[0].height + " cm" + "\n"
              }
              if (element.vitals[0].fewer) {
                element.vitalTooltip = element.vitalTooltip + "Fever: " + element.vitals[0].fewer + " F" + "\n"
              }
              if (element.vitals[0].sbp && element.vitals[0].dbp) {
                element.vitalTooltip = element.vitalTooltip + "Blood Pressure: " + element.vitals[0].sbp + "/" + element.vitals[0].dbp + " mmHg" + "\n"
              }
              if (element.vitals[0].pulse) {
                element.vitalTooltip = element.vitalTooltip + "Pulse: " + element.vitals[0].pulse + " bpm" + "\n"
              }
            }
          });
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        }
      },
      error: err => {
        this.list = [];
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == '') {
      const tempDate = {
        value: new Date().setHours(0,0,0,0)
      }
      this.filterallpatients(tempDate)
    }
    else {
      this.http.get(environment.patientsGet).subscribe({
        next: res => {
          this.list = res
          this.list.forEach((element: { slotdate: any; time: any; vitals: any; vitalTooltip: any }) => {
            element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
            element.time = this.datepipe.transform("01-01-1970 " + element.time, 'shortTime');
            element.vitalTooltip = "";
            if (element.vitals[0]) {
              if (element.vitals[0].weight) {
                element.vitalTooltip = element.vitalTooltip + "Weight: " + element.vitals[0].weight + " Kg" + "\n"
              }
              if (element.vitals[0].height) {
                element.vitalTooltip = element.vitalTooltip + "Height: " + element.vitals[0].height + " cm" + "\n"
              }
              if (element.vitals[0].fewer) {
                element.vitalTooltip = element.vitalTooltip + "Fever: " + element.vitals[0].fewer + " F" + "\n"
              }
              if (element.vitals[0].sbp && element.vitals[0].dbp) {
                element.vitalTooltip = element.vitalTooltip + "Blood Pressure: " + element.vitals[0].sbp + "/" + element.vitals[0].dbp + " mmHg" + "\n"
              }
              if (element.vitals[0].pulse) {
                element.vitalTooltip = element.vitalTooltip + "Pulse: " + element.vitals[0].pulse + " bpm" + "\n"
              }
            }
          });
          this.dataSource = new MatTableDataSource(this.list)
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        },
        error: error => {
          console.error(error)
        }
      })
    }
  }

  updateEmployee(id: number) {
    // this.router.navigate(['update-patient', id]);
    const dialogRef = this.dialog.open(UpdatePatientComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  refundAmount(id: number) {
    // this.router.navigate(['update-patient', id]);
    const dialogRef = this.dialog.open(BillComponent, {
      height: '560px',
      width: '1400px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  discountAmount(id: number) {
    // this.router.navigate(['update-patient', id]);
    const dialogRef = this.dialog.open(BillComponent, {
      height: '560px',
      width: '1400px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  handlePrescription(id: number) {
    const dialogRef = this.dialog.open(PrescriptionComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  handlevitals(id: number) {
    const dialogRef = this.dialog.open(VitalsComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  handleBill(id: number) {
    // this.router.navigate(['bill', id]);
    const dialogRef = this.dialog.open(BillComponent, {
      height: '600px',
      width: '1400px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  handleprint(id: number, status: any) {
    const dialogRef = this.dialog.open(BillInvoiceComponent, {
      data: { id: id, status: status },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getallpatients();
    });
    // this.router.navigate(['billinvoice']);
  }

  handledetails(id: number) {
    const dialogRef = this.dialog.open(PatientDetailsComponent, {
      data: { id: id },
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getallpatients();
    });
  }

  handleclick() {
    this.router.navigate(['doctordashboard']);
  }

  handlestatus(id: number) {
    this.router.navigate(['doctordashboard', id]);
  }

}