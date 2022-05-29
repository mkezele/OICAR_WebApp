import { TestBed } from '@angular/core/testing';

import { ProjectPostService } from './project-post.service';

describe('ProjectPostService', () => {
  let service: ProjectPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
