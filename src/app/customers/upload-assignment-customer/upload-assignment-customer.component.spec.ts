import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAssignmentCustomerComponent } from './upload-assignment-customer.component';

describe('UploadAssignmentCustomerComponent', () => {
  let component: UploadAssignmentCustomerComponent;
  let fixture: ComponentFixture<UploadAssignmentCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAssignmentCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAssignmentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
