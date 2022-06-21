import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Review } from 'src/app/models/review';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

  // GET review by id
  getReview(id: number): Observable<HttpResponse<Review>> {
    return this.http.get<Review>(`${GlobalConstants.reviewsUrl}/${id}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok) {
          console.log(`Review fetched, id = ${response.body?.idreview}.`)
        } else {
          console.log(`Review not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Review>>(`getReview id=${id}`))
    );
  }

    // GET user reviews by user id
    getUserReviews(userId: number): Observable<HttpResponse<Review[]>> {
      // http://localhost:5131/Review?userId=1020
      return this.http.get<Review[]>(`${GlobalConstants.reviewsUrl}?userId=${userId}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`User reviews fetched.`)
          } else {
            console.log(`User reviews not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<Review[]>>(`getReviews`))
      );
    }

  // POST
  createReview(review: Review): Observable<HttpResponse<Review>> {
    return this.http.post<Review>(GlobalConstants.reviewsUrl, ObjectMapper.serialize(review), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`Review created, id = ${response.body?.idreview}.`)
        } else {
          console.log(`Review not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Review>>('createReview'))
    );
  }

  // PUT
  updateReview(review: Review): Observable<HttpResponseBase> {
    return this.http.put<Review>(`${GlobalConstants.reviewsUrl}/${review.idreview}`, ObjectMapper.serialize(review), this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Review updated.`)
        } else {
          console.log(`Review not updated.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('updateReview'))
    );
  }

  // DELETE
  deleteReview(id: number): Observable<HttpResponseBase> {
    const url = `${GlobalConstants.reviewsUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Review deleted.`)
        } else {
          console.log(`Review not deleted.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('deleteReview'))
    );
  }
}
