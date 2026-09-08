import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsForm } from './equipments-form';

describe('EquipmentsForm', () => {
  let component: EquipmentsForm;
  let fixture: ComponentFixture<EquipmentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
