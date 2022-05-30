import { AfterViewInit, Component, ViewChild, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import {MatTable} from '@angular/material/table'
import { Router } from '@angular/router';

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
  styleUrls: ['./patient-list.component.css']
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

  displayedColumns: string[] = ['position', 'name', 'mobile', 'email', 'Update'];
  dataSource = ELEMENT_DATA;

  constructor(private http: HttpClient,private router: Router) { }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild('table', { static: true,read:MatTable }) table: any
  
  createRange(number: any) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;

    this.http.get('http://localhost:5000/api/patient/get').subscribe((res) => {

      this.list = res

      this.len = this.list.length;

      // console.log(this.list)

      // ELEMENT_DATA = this.list;

      this.list.forEach((element: any, index: number) => {
        this.dataSource.push(element);
          // { position: index, name: element.name, mobile: element.mobile, email: element.email, age: element.age }
        
      });
      console.log(ELEMENT_DATA)
      this.tableCreate = true;
    })
    
  }
  updateEmployee(id: number){
    this.router.navigate(['update-patient', id]);
  }
  

}


