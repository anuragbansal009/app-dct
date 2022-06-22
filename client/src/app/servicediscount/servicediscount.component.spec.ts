import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicediscountComponent } from './servicediscount.component';

describe('ServicediscountComponent', () => {
  let component: ServicediscountComponent;
  let fixture: ComponentFixture<ServicediscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicediscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicediscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
