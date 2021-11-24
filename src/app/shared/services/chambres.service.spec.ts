import { TestBed } from '@angular/core/testing';

import { ChambresService } from './chambres.service';

describe('ChambresService', () => {
  let service: ChambresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChambresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
