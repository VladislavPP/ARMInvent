import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelWorkersReport01 } from './sublevel-workers-report01';

describe('SublevelWorkersReport01', () => {
  let component: SublevelWorkersReport01;
  let fixture: ComponentFixture<SublevelWorkersReport01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelWorkersReport01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelWorkersReport01);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
