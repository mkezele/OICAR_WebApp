import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode, HttpResponseBase } from '@angular/common/http';
import { unary } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError, of } from 'rxjs';
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

  // GET project post by id
  getProjectPost(id: number): Observable<HttpResponse<ProjectPost>> {
    return this.http.get<ProjectPost>(`${GlobalConstants.projectPostsUrl}/${id}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok) {
          console.log(`Project post fetched, id = ${response.body?.idprojectPost}.`)
        } else {
          console.log(`Project post not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<ProjectPost>>(`getProjectPost id=${id}`))
    );
  }

  // GET all project posts
  getProjectPosts(): Observable<HttpResponse<ProjectPost[]>> {
    return this.http.get<ProjectPost[]>(`${GlobalConstants.projectPostsUrl}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok) {
          console.log(`Project posts fetched.`)
        } else {
          console.log(`Project posts not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<ProjectPost[]>>(`getProjectPosts`))
    );
  }

  // PUT
  updateProjectPost(projectPost: ProjectPost): Observable<HttpResponseBase> {
    return this.http.put<ProjectPost>(`${GlobalConstants.projectPostsUrl}/${projectPost.idprojectPost}`, ObjectMapper.serialize(projectPost), this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Project post updated.`)
        } else {
          console.log(`Project post not updated.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('updateProjectPost'))
    );
  }

  // DELETE
  deleteProjectPost(id: number): Observable<HttpResponseBase> {
    const url = `${GlobalConstants.projectPostsUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Project post deleted.`)
        } else {
          console.log(`Project post deleted.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('deleteProjectPost'))
    );
  }

}
