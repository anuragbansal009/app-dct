import { AfterViewInit, Component, ViewChild, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTable} from '@angular/material/table'
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';

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
  selector: 'app-bil-summary',
  templateUrl: './bil-summary.component.html',
  styleUrls: ['./bil-summary.component.css']
})
export class BilSummaryComponent implements AfterViewInit {



  list: any;
  name: any = [];
  mobile: any = [];
  allocateid: any = [];
  email: any = [];
  position: any = [];
  len: any;
  tableCreate: boolean = false;

  displayedColumns: string[] = ['allocateid','name', 'email', 'doctor','consultation'];
  dataSource!: MatTableDataSource<any>;

  constructor(private http: HttpClient,private router: Router, public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.getallpatients();
    
  }

  getallpatients()
  {
    this.http.get('http://localhost:5000/api/patient/billsummary').subscribe((res) => {

      this.list = res
      console.log(this.list)
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleclick()
  { 
    this.router.navigate(['doctorhomepage']);
  }
  

}

