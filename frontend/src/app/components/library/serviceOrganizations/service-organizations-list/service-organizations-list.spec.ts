import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrganizationsList } from './service-organizations-list';

describe('ServiceOrganizationsList', () => {
  let component: ServiceOrganizationsList;
  let fixture: ComponentFixture<ServiceOrganizationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOrganizationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrganizationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
