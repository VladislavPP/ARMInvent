import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsForm } from './operations-form';

describe('OperationsForm', () => {
  let component: OperationsForm;
  let fixture: ComponentFixture<OperationsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
