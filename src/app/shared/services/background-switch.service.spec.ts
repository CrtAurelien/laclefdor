import { TestBed } from '@angular/core/testing';

import { BackgroundSwitchService } from './background-switch.service';

describe('BackgroundSwitchService', () => {
  let service: BackgroundSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
