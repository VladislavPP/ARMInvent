import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report01Form } from './report01-form';

describe('Report01Form', () => {
  let component: Report01Form;
  let fixture: ComponentFixture<Report01Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Report01Form]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report01Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
