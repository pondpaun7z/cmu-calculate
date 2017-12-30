import { TestBed, inject } from '@angular/core/testing';

import { CmuSisService } from './cmu-sis.service';

describe('CmuSisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmuSisService]
    });
  });

  it('should be created', inject([CmuSisService], (service: CmuSisService) => {
    expect(service).toBeTruthy();
  }));
});
