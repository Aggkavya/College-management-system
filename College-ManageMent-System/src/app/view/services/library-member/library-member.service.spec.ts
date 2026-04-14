import { TestBed } from '@angular/core/testing';

import { LibraryMemberService } from './library-member.service';

describe('LibraryMemberService', () => {
  let service: LibraryMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
