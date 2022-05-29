import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ServicePost } from 'src/app/models/service-post';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ServicePostService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

    // POST
  createServicePost(servicePost: ServicePost): Observable<HttpResponse<ServicePost>> {
    return this.http.post<ServicePost>(GlobalConstants.servicePostsUrl, ObjectMapper.serialize(servicePost), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`Service post created, id = ${response.body?.idservicePost}.`)
        } else {
          console.log(`Service post not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<ServicePost>>('createServicePost'))
    );
  }
}
