import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedReports } from './created-reports';

describe('CreatedReports', () => {
  let component: CreatedReports;
  let fixture: ComponentFixture<CreatedReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
