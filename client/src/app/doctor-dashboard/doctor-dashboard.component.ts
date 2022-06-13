import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('0ms ease', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('0ms ease', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class DoctorDashboardComponent implements OnInit {

  constructor(private modal: NgbModal) { }
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

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

  events: CalendarEvent[] = [
    {
      start: new Date('Tue Jun 12 2022 14:00:57 GMT+0530 (India Standard Time)'),
      end: new Date('Tue Jun 12 2022 14:30:57 GMT+0530 (India Standard Time)'),
      title: 'Skin - doctor',
      color: colors.green,
      draggable: true,
    },
    {
      start: new Date('Tue Jun 14 2022 13:00:57 GMT+0530 (India Standard Time)'),
      end: new Date('Tue Jun 14 2022 19:00:57 GMT+0530 (India Standard Time)'),
      title: 'Ortho - Dhirendra',
      color: colors.red,
      draggable: true,
    },
    {
      start: new Date('Mon Jun 13 2022 15:00:04 GMT+0530 (India Standard Time)'),
      end: new Date('Mon Jun 13 2022 16:00:04 GMT+0530 (India Standard Time)'),
      title: 'ENT - gulshan',
      color: colors.yellow,
      draggable: true,
    },
  ];

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

  ngOnInit(): void {
  }
  isPatientRegistrationShowing = false;
  isPatientListShowing = false;
  patientCount: number = 100;
  totalBillAmount: string = '$10000';
  isBillSummaryShowing = false;
  isAddServicesShowing = false;

  togglePatientRegistration() {
    this.isPatientRegistrationShowing = !this.isPatientRegistrationShowing;
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
}
