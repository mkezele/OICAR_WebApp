import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuspensionService } from './suspension.service';

describe('SuspensionService', () => {
  let service: SuspensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(SuspensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
