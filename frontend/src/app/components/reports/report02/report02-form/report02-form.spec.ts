import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report02Form } from './report02-form';

describe('Report02Form', () => {
  let component: Report02Form;
  let fixture: ComponentFixture<Report02Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Report02Form]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report02Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
