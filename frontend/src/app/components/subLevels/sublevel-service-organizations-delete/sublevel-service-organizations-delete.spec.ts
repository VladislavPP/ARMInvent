import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublevelServiceOrganizationsDelete } from './sublevel-service-organizations-delete';

describe('SublevelServiceOrganizationsDelete', () => {
  let component: SublevelServiceOrganizationsDelete;
  let fixture: ComponentFixture<SublevelServiceOrganizationsDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SublevelServiceOrganizationsDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SublevelServiceOrganizationsDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
