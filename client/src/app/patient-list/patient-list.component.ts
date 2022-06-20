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
import { DateAdapter } from '@angular/material/core';
import { BillInvoiceComponent } from '../bill-invoice/bill-invoice.component';

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
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [DatePipe]
})
export class PatientListComponent implements OnInit {


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

  displayedColumns: string[] = ['allocateid', 'name', 'vitals', 'doctor', 'slotdate', 'slottime','followup', 'update', 'status', 'print'];
  dataSource!: MatTableDataSource<any>;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public datepipe: DatePipe, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.getallpatients();
  }

  getallpatients() {
    // console.log(now);
    this.date = document.getElementById('filterdate');
    this.date = new Date(this.date.value).valueOf();
    this.http.post('http://localhost:5000/api/patient/filter', { date: this.now }).subscribe((res) => {

      this.list = res

      this.list.forEach((element: { slotdate: any; time: any; }) => {
        element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
        element.time = this.datepipe.transform("01/01/1970 " + element.time, 'shortTime');
      });
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }


  filterallpatients(event: any) {

    this.date = new Date(event.value).valueOf();
    this.date = this.date + 19800000;
    this.now = this.date;
    this.http.post('http://localhost:5000/api/patient/filter', { date: this.date }).subscribe({
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
          this.list.forEach((element: { slotdate: any; time: any; }) => {
            element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
            element.time = this.datepipe.transform("01-01-1970 " + element.time, 'shortTime');
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  handlevitals(id: number) {
    const dialogRef = this.dialog.open(VitalsComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleBill(id: number) {
    // this.router.navigate(['bill', id]);
    const dialogRef = this.dialog.open(BillComponent, {
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

  handleclick() {
    this.router.navigate(['doctordashboard']);
  }

  handlestatus(id: number) {
    this.router.navigate(['doctordashboard', id]);
  }




}


