/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VoosComponent } from './voos.component';

describe('VoosComponent', () => {
  let component: VoosComponent;
  let fixture: ComponentFixture<VoosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
