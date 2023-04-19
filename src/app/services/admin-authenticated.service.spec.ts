import { TestBed } from '@angular/core/testing';

import { AdminAuthenticatedService } from './admin-authenticated.service';

describe('AdminAuthenticatedService', () => {
  let service: AdminAuthenticatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthenticatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
