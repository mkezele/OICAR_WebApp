import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServicePostService } from './service-post.service';

describe('ServicePostService', () => {
  let service: ServicePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(ServicePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
