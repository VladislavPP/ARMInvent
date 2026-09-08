import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersForm } from './workers-form';

describe('WorkersForm', () => {
  let component: WorkersForm;
  let fixture: ComponentFixture<WorkersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
