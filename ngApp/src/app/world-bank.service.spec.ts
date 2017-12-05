import { TestBed, inject } from '@angular/core/testing';

import { WorldBankService } from './world-bank.service';

describe('WorldBankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorldBankService]
    });
  });

  it('should be created', inject([WorldBankService], (service: WorldBankService) => {
    expect(service).toBeTruthy();
  }));
});
