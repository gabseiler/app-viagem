/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoteisComponent } from './hoteis.component';

describe('HoteisComponent', () => {
  let component: HoteisComponent;
  let fixture: ComponentFixture<HoteisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoteisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
