import { HttpClient, HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Category } from 'src/app/models/category';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

    // GET category by id
    getCategory(id: number): Observable<HttpResponse<Category>> {
      return this.http.get<Category>(`${GlobalConstants.categoriesUrl}/${id}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`Category fetched, id = ${response.body?.idcategory}.`)
          } else {
            console.log(`Category not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<Category>>(`getCategory id=${id}`))
      );
    }

    // GET all categories
    getCategories(): Observable<HttpResponse<Category[]>> {
      return this.http.get<Category[]>(`${GlobalConstants.categoriesUrl}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`Categories fetched.`)
          } else {
            console.log(`Categories not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<Category[]>>(`getCategories`))
      );
    }
}
