import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
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
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { AddLabtestComponent } from './add-labtest/add-labtest.component';

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
    primary: '#21ad3b',
    secondary: '#e3fae5',
  }
};

const eventList: CalendarEvent[] = [];


@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  constructor(public dialog: MatDialog) { }
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  openAddPatient() {
    const dialogRef = this.dialog.open(PatientRegistrationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = eventList;

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe, DoctorDashboardComponent],
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
export class AppComponent implements OnInit {
  title = 'Front Desk App - DCT';
  constructor(public dialog: MatDialog, public nav: NavbarService, private http: HttpClient, public datepipe: DatePipe, public docDash: DoctorDashboardComponent) { }

  showCalendar() {
    console.log(this.nav.showCal)
    this.nav.showCal = !this.nav.showCal;
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

  openDialog() {
    const dialogRef = this.dialog.open(CalendarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPatientRegistration() {
    const dialogRef = this.dialog.open(PatientRegistrationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddServices() {
    const dialogRef = this.dialog.open(AddServicesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddLabtest() {
    const dialogRef = this.dialog.open(AddLabtestComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  lists: any;
  temp: any;
  enddate: any;
  colorSet: any;

  ngOnInit() {
    this.http.get('http://localhost:5000/api/patient/get').subscribe((res) => {
      this.lists = res;
      this.lists.forEach((element: { slotdate: any; time: any; name: any; doctor_name: any; }) => {
        element.slotdate = this.datepipe.transform(element.slotdate, 'yyyy-MM-dd');
        element.time = this.datepipe.transform("01-01-1970 " + element.time, 'shortTime');
        this.enddate = new Date(element.slotdate + " " + element.time);
        if (element.doctor_name == "gulshan") {
          this.colorSet = colors.green
        }
        else if (element.doctor_name == "dhirendra") {
          this.colorSet = colors.red
        }
        else if (element.doctor_name == "doctor") {
          this.colorSet = colors.blue
        }
        else {
          this.colorSet = colors.yellow
        }
        this.temp = {
          start: new Date(element.slotdate + " " + element.time),
          end: new Date(this.enddate.getTime() + (60*60*1000)),
          title: `<strong>` + element.time + `</strong>` + " " + element.name + " - " + element.doctor_name,
          color: this.colorSet,
          draggable: true,
        }
        eventList.push(this.temp);
      });
    });
  }
}
