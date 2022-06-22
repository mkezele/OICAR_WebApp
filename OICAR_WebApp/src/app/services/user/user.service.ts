import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserLevel } from 'src/app/models/user-level';
import { GlobalConstants } from '../../common/global-constants';
import { User } from '../../models/user';
import { ErrorService } from '../error/error.service';
import { ReportReasonService } from '../report-reason/report-reason.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

  // GET
  getUser(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${GlobalConstants.usersUrl}/${id}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok && response.body != null) {
          // fix when api is fixed
          response.body.userLevel = new UserLevel(1, 'Basic');
          console.log(`User fetched, id = ${response.body?.idappUser}.`)
        } else {
          console.log(`User not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<User>>(`getUser id=${id}`))
    );
  }

  // POST
  createUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(GlobalConstants.usersUrl, ObjectMapper.serialize(user), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`User created, id = ${response.body?.idappUser}.`)
        } else {
          console.log(`User not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<User>>('createUser'))
    );
  }

  // PUT
  updateUser(user: User): Observable<HttpResponseBase> {
    return this.http.put<User>(`${GlobalConstants.usersUrl}/${user.idappUser}`, ObjectMapper.serialize(user), this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`User updated.`)
        } else {
          console.log(`User not updated.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('updateUser'))
    );
  }

  // DELETE
  deleteUser(id: number): Observable<HttpResponseBase> {
    const url = `${GlobalConstants.usersUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`User deleted.`)
        } else {
          console.log(`User not deleted.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('deleteUser'))
    );
  }
}
