import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDelete } from './operations-delete';

describe('OperationsDelete', () => {
  let component: OperationsDelete;
  let fixture: ComponentFixture<OperationsDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
