import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPadPage } from './sign-pad.page';

describe('SignPadPage', () => {
  let component: SignPadPage;
  let fixture: ComponentFixture<SignPadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignPadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
