import { TestBed } from '@angular/core/testing';

import { ErreursService } from './erreurs.service';

describe('ErreursService', () => {
  let service: ErreursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErreursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
