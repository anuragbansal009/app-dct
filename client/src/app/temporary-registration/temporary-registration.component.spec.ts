import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryRegistrationComponent } from './temporary-registration.component';

describe('TemporaryRegistrationComponent', () => {
  let component: TemporaryRegistrationComponent;
  let fixture: ComponentFixture<TemporaryRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
