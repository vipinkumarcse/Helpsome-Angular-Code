import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentCustomerComponent } from './add-assignment-customer.component';

describe('AddAssignmentCustomerComponent', () => {
  let component: AddAssignmentCustomerComponent;
  let fixture: ComponentFixture<AddAssignmentCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignmentCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
