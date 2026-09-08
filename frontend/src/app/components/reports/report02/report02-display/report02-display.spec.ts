import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report02Display } from './report02-display';

describe('Report02Display', () => {
  let component: Report02Display;
  let fixture: ComponentFixture<Report02Display>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Report02Display]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report02Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
