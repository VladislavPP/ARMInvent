import { TestBed } from '@angular/core/testing';

import { ServiceOrganizationsService } from './service-organizations-service';

describe('ServiceOrganizationsService', () => {
  let service: ServiceOrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
