import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHomepageComponent } from './doctor-homepage.component';

describe('DoctorHomepageComponent', () => {
  let component: DoctorHomepageComponent;
  let fixture: ComponentFixture<DoctorHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
