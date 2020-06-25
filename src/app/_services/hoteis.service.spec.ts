/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoteisService } from './hoteis.service';

describe('Service: Hoteis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoteisService]
    });
  });

  it('should ...', inject([HoteisService], (service: HoteisService) => {
    expect(service).toBeTruthy();
  }));
});
