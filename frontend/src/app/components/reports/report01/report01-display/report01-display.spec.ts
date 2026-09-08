import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report01Display } from './report01-display';

describe('Report01Display', () => {
  let component: Report01Display;
  let fixture: ComponentFixture<Report01Display>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Report01Display]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report01Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
