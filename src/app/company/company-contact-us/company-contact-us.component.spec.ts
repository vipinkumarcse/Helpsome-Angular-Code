import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactUsComponent } from './company-contact-us.component';

describe('CompanyContactUsComponent', () => {
  let component: CompanyContactUsComponent;
  let fixture: ComponentFixture<CompanyContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
