import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistration } from './form-registration';

describe('FormRegistration', () => {
  let component: FormRegistration;
  let fixture: ComponentFixture<FormRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
