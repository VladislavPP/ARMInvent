import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrganizationsForm } from './service-organizations-form';

describe('ServiceOrganizationsForm', () => {
  let component: ServiceOrganizationsForm;
  let fixture: ComponentFixture<ServiceOrganizationsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOrganizationsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrganizationsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
