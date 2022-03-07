import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercompanyComponent } from './footercompany.component';

describe('FootercompanyComponent', () => {
  let component: FootercompanyComponent;
  let fixture: ComponentFixture<FootercompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
