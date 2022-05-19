import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { catchError, Observable, of, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { GlobalConstants } from '../../common/global-constants';
import { ChatMessage } from '../../models/chat-message';
import { ProjectPost } from '../../models/project-post';
import { Report } from '../../models/report';
import { Review } from '../../models/review';
import { ServicePost } from '../../models/service-post';
import { Suspension } from '../../models/suspension';
import { User } from '../../models/user';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // for simulation purposes only - delete after inspection
  newUser = new User(
    1,
    'John',
    'Doe',
    'john.doe@gmail.com',
    '123',
    'salt',
    false,
    new Array<ChatMessage>(),
    new Array<ChatMessage>(),
    new Array<ProjectPost>(),
    new Array<Report>(),
    new Array<Report>(),
    new Array<Review>(),
    new Array<Review>(),
    new Array<ServicePost>(),
    new Array<Suspension>()
  ); 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    // simulate user fetched - delete after inspection
    // return of(this.newUser);
    //

    // TODO: deserialize object ?
    return this.http.get<User>(`${GlobalConstants.usersUrl}/${id}`).pipe(
      tap(user => {
        console.log(`fetched user id=${user.idAppUser}`);
      }),
      catchError(this.errorService.handleError<User>(`getUser id=${id}`))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    // simulate user added - delete after inspection
    // return of(this.newUser);
    //

    return this.http.post<User>(GlobalConstants.usersUrl, ObjectMapper.serialize(user), this.httpOptions).pipe(
      tap((addedUser: User) => {
        console.log(`added user with id=${addedUser.idAppUser}`);
      }),
      catchError(this.errorService.handleError<User>('addUser'))
    );
  }

    /** PUT: update the user on the server */
    updateUser(user: User): Observable<User> {
      // simulate user updated - delete after inspection
      // return of(this.newUser);
      //
  
      return this.http.put<User>(`${GlobalConstants.usersUrl}/${user.idAppUser}`, ObjectMapper.serialize(user), this.httpOptions).pipe(
        tap(updatedUser => console.log(`updated user id=${updatedUser.idAppUser}`)),
        catchError(this.errorService.handleError<User>('updateUser'))
      );
    }

    /** DELETE: delete the user from the server */
    deleteUser(id: number): Observable<Boolean> {
      // simulate user deleted - delete after inspection
      // return of(true);
      //

      const url = `${GlobalConstants.usersUrl}/${id}`;
      return this.http.delete<Boolean>(url, this.httpOptions).pipe(
        tap(_ => console.log(`deleted user id=${id}`)),
        catchError(this.errorService.handleError<Boolean>('deleteUser'))
      );
    }
}
