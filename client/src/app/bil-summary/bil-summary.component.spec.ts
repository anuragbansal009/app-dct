import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilSummaryComponent } from './bil-summary.component';

describe('BilSummaryComponent', () => {
  let component: BilSummaryComponent;
  let fixture: ComponentFixture<BilSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
