import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ProjectPost } from 'src/app/models/project-post';
import { CategoryService } from '../category/category.service';
import { ErrorService } from '../error/error.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
    private userService: UserService,
    private categoryService: CategoryService,
  ) { }

    // GET user project posts
    getUserProjectPosts(userId: number): Observable<HttpResponse<ProjectPost[]>> {
      return this.http.get<ProjectPost[]>(`${GlobalConstants.profileUserPostsUrl}/${userId}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`User project posts fetched.`)
          } else {
            console.log(`User project posts not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<ProjectPost[]>>(`getUserProjectPosts`))
      );
    }
}
