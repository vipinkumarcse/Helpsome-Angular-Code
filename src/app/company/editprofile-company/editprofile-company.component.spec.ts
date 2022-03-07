import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileCompanyComponent } from './editprofile-company.component';

describe('EditprofileCompanyComponent', () => {
  let component: EditprofileCompanyComponent;
  let fixture: ComponentFixture<EditprofileCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofileCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
