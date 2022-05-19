import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ChatMessage } from 'src/app/models/chat-message';
import { ProjectPost } from 'src/app/models/project-post';
import { Report } from 'src/app/models/report';
import { Review } from 'src/app/models/review';
import { ServicePost } from 'src/app/models/service-post';
import { Suspension } from 'src/app/models/suspension';
import { User } from 'src/app/models/user';
import { ErrorService } from '../error/error.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | undefined = undefined;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService, 
    private userService: UserService) { }

  authenticateUser(email: string, password: string): Observable<Number> {
    // simulate user authenticated - delete after inspection
    //return of(1);
    //

    return this.http.post<Number>(`${ GlobalConstants.authUrl }?email=${ email }&passwordHash=${ password }`, null, this.httpOptions).pipe(
      tap((userId: Number) => {
        if(userId != 0){
          console.log(`Successful authentication of user, user id=${userId}`);
          // call on call site
          // sessionStorage.setItem(GlobalConstants.userId, userId.toString());
        } else {
          console.log(`Unsuccessful authentication of user.`);
        }
      }),
      catchError(this.errorService.handleError<Number>('authenticateUser'))
    );
  }

  userLoggedIn(): boolean {
    return parseInt(sessionStorage.getItem(GlobalConstants.userId) ?? '0') != 0;
  }

  getLoggedUserId(): number {
    return parseInt(sessionStorage.getItem(GlobalConstants.userId) ?? '0');
  }

  logout() {
    sessionStorage.removeItem(GlobalConstants.userId);
    this.user = undefined;
  }

}
