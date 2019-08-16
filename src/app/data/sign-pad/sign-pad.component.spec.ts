import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPadComponent } from './sign-pad.component';

describe('SignPadComponent', () => {
  let component: SignPadComponent;
  let fixture: ComponentFixture<SignPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignPadComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
