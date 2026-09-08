import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelEquipments } from './sublevel-equipments';

describe('SublevelEquipments', () => {
  let component: SublevelEquipments;
  let fixture: ComponentFixture<SublevelEquipments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelEquipments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelEquipments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
