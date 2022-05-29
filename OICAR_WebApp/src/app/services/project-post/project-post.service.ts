import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ProjectPost } from 'src/app/models/project-post';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectPostService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

    // POST
  createProjectPost(projectPost: ProjectPost): Observable<HttpResponse<ProjectPost>> {
    return this.http.post<ProjectPost>(GlobalConstants.projectPostsUrl, ObjectMapper.serialize(projectPost), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`Project post created, id = ${response.body?.idprojectPost}.`)
        } else {
          console.log(`Project post not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<ProjectPost>>('createProjectPost'))
    );
  }
}
