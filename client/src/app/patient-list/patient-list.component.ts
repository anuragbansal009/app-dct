import { AfterViewInit, Component, ViewChild, OnInit, Inject, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTable} from '@angular/material/table'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';
import { UpdatePatientComponent } from '../update-patient/update-patient.component';
import { BillComponent } from '../bill/bill.component';
import { DatePipe } from '@angular/common';
import { VitalsComponent } from '../vitals/vitals.component';

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
export class PatientListComponent implements AfterViewInit {



  list: any;
  name: any = [];
  mobile: any = [];
  allocateid: any = [];
  email: any = [];
  position: any = [];
  len: any;
  tableCreate: boolean = false;
  date: any;

  displayedColumns: string[] = ['allocateid','name','vitals','doctor','slotdate','slottime','update', 'status','print'];
  dataSource!: MatTableDataSource<any>;

  constructor(private http: HttpClient,private router: Router, public dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.getallpatients();
    
  }

  getallpatients()
  {
    this.http.get('http://localhost:5000/api/patient/get').subscribe((res) => {

      this.list = res
      // console.log(this.list)
      this.list.forEach((element: { slotdate: any; time: any; }) => {
        element.slotdate = this.datepipe.transform(element.slotdate, 'dd-MM-yyyy');
        element.time = this.datepipe.transform("01-01-1970 " + element.time, 'shortTime');
      });
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  filterPatients()
  {
    this.date = document.getElementById('filterdate');
    this.date = new Date(this.date.value).valueOf();
    console.log(this.date)

  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateEmployee(id:number){
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
      data: { id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleBill(id:number)
  { 
    // this.router.navigate(['bill', id]);
    const dialogRef = this.dialog.open(BillComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getallpatients();
    });
  }

  handleprint(id: number)
  { 
    this.router.navigate(['billinvoice']);
  }

  handleclick()
  { 
    this.router.navigate(['doctordashboard']);
  }

  handlestatus(id:number)
  { 
    this.router.navigate(['doctordashboard', id]);
  }


  

}


