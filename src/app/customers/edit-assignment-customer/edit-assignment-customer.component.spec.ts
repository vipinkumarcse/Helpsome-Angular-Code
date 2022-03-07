import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentCustomerComponent } from './edit-assignment-customer.component';

describe('EditAssignmentCustomerComponent', () => {
  let component: EditAssignmentCustomerComponent;
  let fixture: ComponentFixture<EditAssignmentCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssignmentCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
