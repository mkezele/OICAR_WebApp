import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { ProjectPost } from 'src/app/models/project-post';
import { Report } from 'src/app/models/report';
import { Review } from 'src/app/models/review';
import { ServicePost } from 'src/app/models/service-post';
import { Suspension } from 'src/app/models/suspension';

describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
