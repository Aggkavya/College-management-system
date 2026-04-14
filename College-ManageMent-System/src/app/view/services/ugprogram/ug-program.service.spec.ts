import { TestBed } from '@angular/core/testing';

import { UgProgramService } from './ug-program.service';

describe('UgProgramService', () => {
  let service: UgProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UgProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
