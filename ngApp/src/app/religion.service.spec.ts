import { TestBed, inject } from '@angular/core/testing';

import { ReligionService } from './religion.service';

describe('ReligionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReligionService]
    });
  });

  it('should be created', inject([ReligionService], (service: ReligionService) => {
    expect(service).toBeTruthy();
  }));
});
