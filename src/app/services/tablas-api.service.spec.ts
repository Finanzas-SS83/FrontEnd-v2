import { TestBed } from '@angular/core/testing';

import { TablasApiService } from './tablas-api.service';

describe('TablasApiService', () => {
  let service: TablasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
