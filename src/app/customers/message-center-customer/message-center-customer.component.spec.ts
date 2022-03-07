import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCenterCustomerComponent } from './message-center-customer.component';

describe('MessageCenterCustomerComponent', () => {
  let component: MessageCenterCustomerComponent;
  let fixture: ComponentFixture<MessageCenterCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCenterCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCenterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
