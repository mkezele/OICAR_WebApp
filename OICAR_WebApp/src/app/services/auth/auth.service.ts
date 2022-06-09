import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,) { }

  authenticateUser(email: string, password: string): Observable<Number> {
    return this.http.post<Number>(`${ GlobalConstants.authUrl }?email=${ email }&passwordHash=${ password }`, null, this.httpOptions).pipe(
      tap((userId: Number) => {
        if(userId > 0){
          console.log(`User authenticated, id=${userId}.`);
        } else {
          console.log(`User not authenticated.`);
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
  }

}
