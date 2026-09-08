import { TestBed } from '@angular/core/testing';

import { CreatedReportsService } from './created-reports-service';

describe('CreatedReportsService', () => {
  let service: CreatedReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatedReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
