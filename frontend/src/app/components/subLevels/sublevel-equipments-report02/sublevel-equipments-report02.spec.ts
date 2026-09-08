import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelEquipmentsReport02 } from './sublevel-equipments-report02';

describe('SublevelEquipmentsReport02', () => {
  let component: SublevelEquipmentsReport02;
  let fixture: ComponentFixture<SublevelEquipmentsReport02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelEquipmentsReport02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelEquipmentsReport02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
