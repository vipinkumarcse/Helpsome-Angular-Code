import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCompanyComponent } from './homepage-company.component';

describe('HomepageCompanyComponent', () => {
  let component: HomepageCompanyComponent;
  let fixture: ComponentFixture<HomepageCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
