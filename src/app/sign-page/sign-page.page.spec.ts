import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPagePage } from './sign-page.page';

describe('SignPagePage', () => {
  let component: SignPagePage;
  let fixture: ComponentFixture<SignPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
