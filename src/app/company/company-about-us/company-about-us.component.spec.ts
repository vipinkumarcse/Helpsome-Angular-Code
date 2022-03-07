import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAboutUsComponent } from './company-about-us.component';

describe('CompanyAboutUsComponent', () => {
  let component: CompanyAboutUsComponent;
  let fixture: ComponentFixture<CompanyAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
