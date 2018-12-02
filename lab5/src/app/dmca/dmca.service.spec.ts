import { TestBed } from '@angular/core/testing';

import { DMCAService } from './dmca.service';

describe('DMCAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DMCAService = TestBed.get(DMCAService);
    expect(service).toBeTruthy();
  });
});
