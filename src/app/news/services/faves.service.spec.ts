import { TestBed } from '@angular/core/testing';

import { FavesService } from './faves.service';

describe('FavesService', () => {
  let service: FavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
