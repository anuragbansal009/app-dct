import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListDoctorComponent } from './patient-list-doctor.component';

describe('PatientListDoctorComponent', () => {
  let component: PatientListDoctorComponent;
  let fixture: ComponentFixture<PatientListDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
