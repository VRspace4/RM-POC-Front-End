import { TestBed, inject } from '@angular/core/testing';

import { UiUpdaterService } from './ui-updater.service';

describe('UiUpdaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiUpdaterService]
    });
  });

  it('should be created', inject([UiUpdaterService], (service: UiUpdaterService) => {
    expect(service).toBeTruthy();
  }));
});
