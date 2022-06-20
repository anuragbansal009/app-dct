import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdiscountComponent } from './labdiscount.component';

describe('LabdiscountComponent', () => {
  let component: LabdiscountComponent;
  let fixture: ComponentFixture<LabdiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
