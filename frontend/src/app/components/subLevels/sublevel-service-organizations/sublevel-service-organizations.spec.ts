import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelServiceOrganizations } from './sublevel-service-organizations';

describe('SublevelServiceOrganizations', () => {
  let component: SublevelServiceOrganizations;
  let fixture: ComponentFixture<SublevelServiceOrganizations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelServiceOrganizations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelServiceOrganizations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
