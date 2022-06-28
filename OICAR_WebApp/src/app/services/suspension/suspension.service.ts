import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Suspension } from 'src/app/models/suspension';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class SuspensionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

  // GET
  getSuspension(id: number): Observable<HttpResponse<Suspension>> {
    return this.http.get<Suspension>(`${GlobalConstants.suspensionsUrl}/${id}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok && response.body != null) {
          console.log(`Suspension fetched, id = ${response.body?.idsuspension}.`)
        } else {
          console.log(`Suspension not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Suspension>>(`getSuspension id=${id}`))
    );
  }

  // GET all suspensions
  getSuspensions(): Observable<HttpResponse<Suspension[]>> {
    return this.http.get<Suspension[]>(`${GlobalConstants.suspensionsUrl}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok) {
          console.log(`Suspensions fetched.`)
        } else {
          console.log(`Suspensions not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Suspension[]>>(`getSuspensions`))
    );
  }

  // POST
  createSuspension(suspension: Suspension): Observable<HttpResponse<Suspension>> {
    return this.http.post<Suspension>(GlobalConstants.suspensionsUrl, ObjectMapper.serialize(suspension), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`Suspension created, id = ${response.body?.idsuspension}.`)
        } else {
          console.log(`Suspension not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Suspension>>('createSuspension'))
    );
  }

    // PUT
    updateSuspension(suspension: Suspension): Observable<HttpResponseBase> {
      return this.http.put<Suspension>(`${GlobalConstants.suspensionsUrl}/${suspension.idsuspension}`, ObjectMapper.serialize(Suspension), this.httpOptions).pipe(
        tap(response => {
          if(response.status == HttpStatusCode.NoContent){
            console.log(`Suspension updated.`)
          } else {
            console.log(`Suspension not updated.`)
          }
        }),
        catchError(this.errorService.handleError<HttpResponseBase>('updateSuspension'))
      );
    }
  
    // DELETE
    deleteSuspension(id: number): Observable<HttpResponseBase> {
      const url = `${GlobalConstants.suspensionsUrl}/${id}`;
      return this.http.delete(url, this.httpOptions).pipe(
        tap(response => {
          if(response.status == HttpStatusCode.NoContent){
            console.log(`Suspension deleted.`)
          } else {
            console.log(`Suspension not deleted.`)
          }
        }),
        catchError(this.errorService.handleError<HttpResponseBase>('deleteSuspension'))
      );
    }
}
