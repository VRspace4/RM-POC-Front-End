import { TestBed, inject } from '@angular/core/testing';

import { UiGraphService } from './ui-graph.service';

describe('UiGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiGraphService]
    });
  });

  it('should be created', inject([UiGraphService], (service: UiGraphService) => {
    expect(service).toBeTruthy();
  }));
});
