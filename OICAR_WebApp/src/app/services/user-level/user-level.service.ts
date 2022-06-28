import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserLevel } from 'src/app/models/user-level';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserLevelService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

    // GET user-level by id
    getUserLevel(id: number): Observable<HttpResponse<UserLevel>> {
      return this.http.get<UserLevel>(`${GlobalConstants.userLevelsUrl}/${id}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`User level fetched, id = ${response.body?.iduserLevel}.`)
          } else {
            console.log(`User level not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<UserLevel>>(`getUserLevel id=${id}`))
      );
    }

    // GET all categories
    getUserLevels(): Observable<HttpResponse<UserLevel[]>> {
      return this.http.get<UserLevel[]>(`${GlobalConstants.userLevelsUrl}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`User levels fetched.`)
          } else {
            console.log(`User levels not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<UserLevel[]>>(`getUserLevels`))
      );
    }
}
