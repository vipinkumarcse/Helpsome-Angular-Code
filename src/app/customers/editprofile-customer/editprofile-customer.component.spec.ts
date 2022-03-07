import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileCustomerComponent } from './editprofile-customer.component';

describe('EditprofileCustomerComponent', () => {
  let component: EditprofileCustomerComponent;
  let fixture: ComponentFixture<EditprofileCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofileCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
