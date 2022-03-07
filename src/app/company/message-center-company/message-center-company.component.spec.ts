import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCenterCompanyComponent } from './message-center-company.component';

describe('MessageCenterCompanyComponent', () => {
  let component: MessageCenterCompanyComponent;
  let fixture: ComponentFixture<MessageCenterCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCenterCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCenterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
