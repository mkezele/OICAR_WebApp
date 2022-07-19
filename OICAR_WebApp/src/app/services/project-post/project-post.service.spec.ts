import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectPostService } from './project-post.service';

describe('ProjectPostService', () => {
  let service: ProjectPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(ProjectPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
