import { TestBed } from '@angular/core/testing';

import { PgStudentService } from './pg-student.service';

describe('PgStudentService', () => {
  let service: PgStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
