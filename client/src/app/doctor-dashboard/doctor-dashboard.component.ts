import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from '../navbar.service';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#00ff00',
    secondary: '#00ff00',
  }
};

@Component({
  selector: 'second-modal-component',
  templateUrl: 'second-modal-component.html',
})
export class SecondModalComponent {
  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-component',
  templateUrl: 'modal-component.html',
})
export class ModalComponent {
  constructor(public dialog: MatDialog) { }

    openDialog() {
      const dialogRef = this.dialog.open(SecondModalComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  
}



@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('0ms ease', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('0ms ease', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class DoctorDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, public nav: NavbarService) { }
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  ngOnInit(): void {
    this.nav.showCalIcon();
  }
  isPatientRegistrationShowing = false;
  isPatientListShowing = false;
  patientCount: number = 100;
  totalBillAmount: string = '$10000';
  isBillSummaryShowing = false;
  isAddServicesShowing = false;
  isAddLabtestShowing = false;

  togglePatientRegistration() {
    this.isPatientRegistrationShowing = !this.isPatientRegistrationShowing;
    console.log(this.isPatientRegistrationShowing);
  }

  togglePatientList() {
    this.isPatientListShowing = !this.isPatientListShowing;
  }

  toggleBillSummary() {
    this.isBillSummaryShowing = !this.isBillSummaryShowing;
  }
  toggleAddServices() {
    this.isAddServicesShowing = !this.isAddServicesShowing;
  }
  toggleAddLabtest() {
    this.isAddLabtestShowing = !this.isAddLabtestShowing;
  }
}
