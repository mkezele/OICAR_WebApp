import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserLevelService } from './user-level.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ErrorService } from '../error/error.service';
import { UserLevel } from 'src/app/models/user-level';
import { asyncData } from '../../testing/async-observable-helpers'

describe('UserLevelService', () => {
  let service: UserLevelService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserLevelService ]
    });
    service = TestBed.inject(UserLevelService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    service = new UserLevelService(httpClientSpy, new ErrorService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return expected user level', (done: DoneFn) => {
  //   const expectedUserLevel = new UserLevel(1, 'Basic');
  //   httpClientSpy.get.and.returnValue(asyncData(expectedUserLevel));
  //   service.getUserLevel(1).subscribe({
  //     next: userLevel => {
  //       expect(userLevel.body)
  //         // .withContext('expected userLevel')
  //         .toEqual(expectedUserLevel);
  //       done(); 
  //     },
  //     error: done.fail
  //   });
  //   // await service.getUserLevel(1).subscribe(userLevel => {
  //   //     expect(userLevel.body).toEqual(expectedUserLevel);
  //   // });
  // });

});
