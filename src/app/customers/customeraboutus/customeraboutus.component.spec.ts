import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraboutusComponent } from './customeraboutus.component';

describe('CustomeraboutusComponent', () => {
  let component: CustomeraboutusComponent;
  let fixture: ComponentFixture<CustomeraboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeraboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
