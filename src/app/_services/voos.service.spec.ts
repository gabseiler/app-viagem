/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoosService } from './voos.service';

describe('Service: Voos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoosService]
    });
  });

  it('should ...', inject([VoosService], (service: VoosService) => {
    expect(service).toBeTruthy();
  }));
});
