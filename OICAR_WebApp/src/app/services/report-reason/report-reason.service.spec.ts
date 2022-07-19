import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReportReasonService } from './report-reason.service';

describe('ReportReasonService', () => {
  let service: ReportReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(ReportReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
