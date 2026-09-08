import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelWorkers } from './sublevel-workers';

describe('SublevelWorkers', () => {
  let component: SublevelWorkers;
  let fixture: ComponentFixture<SublevelWorkers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelWorkers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelWorkers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
