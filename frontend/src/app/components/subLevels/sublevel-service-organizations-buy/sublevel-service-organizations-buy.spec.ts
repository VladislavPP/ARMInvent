import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelServiceOrganizationsBuy } from './sublevel-service-organizations-buy';

describe('SublevelServiceOrganizationsBuy', () => {
  let component: SublevelServiceOrganizationsBuy;
  let fixture: ComponentFixture<SublevelServiceOrganizationsBuy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelServiceOrganizationsBuy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelServiceOrganizationsBuy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
