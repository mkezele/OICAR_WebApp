import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserPostGuard } from './user-post.guard';

describe('UserPostGuard', () => {
  let guard: UserPostGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    });
    guard = TestBed.inject(UserPostGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
