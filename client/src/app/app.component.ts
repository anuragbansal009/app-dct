import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, Inject } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe, DOCUMENT } from '@angular/common';
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
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TemporaryRegistrationComponent } from './temporary-registration/temporary-registration.component'

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

  clickedDate!: Date;

  clickedColumn!: number;

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  openAddPatient() {
    const dialogRef = this.dialog.open(PatientRegistrationComponent, {
      data: { date: this.clickedDate }
    });
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

  openAddTempPatient() {
    const dialogRef = this.dialog.open(TemporaryRegistrationComponent, {
      data: { date: this.clickedDate }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  run() {
    // console.log(this.clickedDate)
    const todayDate = new Date()
    if (this.clickedDate.getTime() - todayDate.getTime() >= 0) {
      this.openAddTempPatient()
    }
    else {
      console.log("Choose New Date")
    }
    // console.log(this.clickedColumn)
  }

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
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Front Desk App - DCT';
  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog, public nav: NavbarService, private http: HttpClient, public datepipe: DatePipe, public docDash: DoctorDashboardComponent, private cdref: ChangeDetectorRef, private router: Router) {
    this.nav.calIcon = false;
  }

  showCalendar() {
    this.nav.showCal = !this.nav.showCal;
  }

  logoUrl: string = environment.logoUrl
  isPatientRegistrationShowing = false;
  isPatientListShowing = false;
  patientCount: number = 100;
  totalBillAmount: string = '$10000';
  isBillSummaryShowing = false;
  isAddServicesShowing = false;
  isAddLabtestShowing = false;
  values: any = localStorage.getItem("currentDoctor");
  authorized: boolean = false;
  hospitalName: any;

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
    const dialogRef = this.dialog.open(AddServicesComponent, {
      height: '565px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddLabtest() {
    const dialogRef = this.dialog.open(AddLabtestComponent, {
      height: '475px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  lists: any;
  temp: any;
  enddate: any;
  colorSet: any;

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  titleCase(str: any) {
    return str.replace(/(^|\s)\S/g, function (t: any) { return t.toUpperCase() });
  }

  logout() {
    localStorage.clear();
    this.showCalendar();
    this.document.location.href = environment.doctorLogin;
    // this.router.navigate(['doctorlogin']);
  }

  docList: any = []

  ngOnInit() {
    if (!this.values) {
      this.authorized = false
      this.hospitalName = 'Front Desk App - DCT'
      // this.router.navigate(['doctorlogin']);
      // this.document.location.href = environment.doctorLogin;
    }
    else {
      this.values = JSON.parse(this.values).doctor
      this.hospitalName = this.values.hospital_name
      this.logoUrl = this.values.logolink
      this.authorized = true
      this.http.get(environment.getAllDoctors).subscribe((res) => {
        this.docList = res
      });
      this.http.get(environment.patientsGet).subscribe((res) => {
        this.lists = res;
        console.log(this.lists)
        console.log(this.docList)
        this.lists.forEach((element: { slotdate: any; time: any; name: any; doctor_name: any; }) => {
          element.slotdate = this.datepipe.transform(element.slotdate, 'yyyy-MM-dd');
          element.time = this.datepipe.transform("01/01/1970 " + element.time, 'shortTime');
          this.enddate = new Date(element.slotdate + " " + element.time);

          if(this.docList.indexOf(element.doctor_name) % 3 == 0) {
            this.colorSet = colors.green
          }
          else if(this.docList.indexOf(element.doctor_name) % 3 == 1) {
            this.colorSet = colors.red
          }
          else if(this.docList.indexOf(element.doctor_name) % 3 == 2) {
            this.colorSet = colors.blue
          }
          else {
            this.colorSet = colors.yellow
          }

          this.temp = {
            start: new Date(element.slotdate + " " + element.time),
            end: new Date(this.enddate.getTime() + (60 * 60 * 1000)),
            title: `<strong>` + element.time + `</strong>` + " " + this.titleCase(element.name) + " - " + 'Dr. ' + this.titleCase(element.doctor_name),
            color: this.colorSet,
            draggable: true,
          }
          eventList.push(this.temp);
        });
      });
    }
  }

}
