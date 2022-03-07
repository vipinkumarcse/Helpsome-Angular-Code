import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercustomerComponent } from './footercustomer.component';

describe('FootercustomerComponent', () => {
  let component: FootercustomerComponent;
  let fixture: ComponentFixture<FootercustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
