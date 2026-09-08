import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report03Display } from './report03-display';

describe('Report03Display', () => {
  let component: Report03Display;
  let fixture: ComponentFixture<Report03Display>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Report03Display]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report03Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
