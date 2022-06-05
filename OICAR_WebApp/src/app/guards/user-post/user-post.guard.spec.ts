import { TestBed } from '@angular/core/testing';

import { UserPostGuard } from './user-post.guard';

describe('UserPostGuard', () => {
  let guard: UserPostGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPostGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
