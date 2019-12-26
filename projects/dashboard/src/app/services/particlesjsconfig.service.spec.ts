/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParticlesjsconfigService } from './particlesjsconfig.service';

describe('Service: Particlesjsconfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticlesjsconfigService]
    });
  });

  it('should ...', inject([ParticlesjsconfigService], (service: ParticlesjsconfigService) => {
    expect(service).toBeTruthy();
  }));
});
