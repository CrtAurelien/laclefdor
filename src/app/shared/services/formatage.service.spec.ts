import { TestBed } from '@angular/core/testing';

import { FormatageService } from './formatage.service';

describe('FormatageService', () => {
  let service: FormatageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
