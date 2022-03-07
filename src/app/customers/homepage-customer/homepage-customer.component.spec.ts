import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCustomerComponent } from './homepage-customer.component';

describe('HomepageCustomerComponent', () => {
  let component: HomepageCustomerComponent;
  let fixture: ComponentFixture<HomepageCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
