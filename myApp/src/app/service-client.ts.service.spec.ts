import { TestBed } from '@angular/core/testing';

import { ServiceClient.TsService } from './service-client.ts.service';

describe('ServiceClient.TsService', () => {
  let service: ServiceClient.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceClient.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
