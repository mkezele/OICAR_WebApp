import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Report } from 'src/app/models/report';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

  // GET
  getReport(id: number): Observable<HttpResponse<Report>> {
    return this.http.get<Report>(`${GlobalConstants.reportsUrl}/${id}`, this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Ok) {
          console.log(`Report fetched, id = ${response.body?.idreport}.`)
        } else {
          console.log(`Report not found.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Report>>(`getReport id=${id}`))
    );
  }

    // GET all reports
    getReports(): Observable<HttpResponse<Report[]>> {
      return this.http.get<Report[]>(`${GlobalConstants.reportsUrl}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`Reports fetched.`)
          } else {
            console.log(`Reports not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<Report[]>>(`getReports`))
      );
    }

  // POST
  createReport(report: Report): Observable<HttpResponse<Report>> {
    console.log();
    return this.http.post<Report>(GlobalConstants.reportsUrl, ObjectMapper.serialize(report), this.httpOptions).pipe(
      tap(response => {
        if (response.status == HttpStatusCode.Created){
          console.log(`Report created, id = ${response.body?.idreport}.`)
        } else {
          console.log(`Report not created.`);
        }
      }),
      catchError(this.errorService.handleError<HttpResponse<Report>>('createReport'))
    );
  }

  // PUT
  updateReport(report: Report): Observable<HttpResponseBase> {
    return this.http.put<Report>(`${GlobalConstants.reportsUrl}/${report.idreport}`, ObjectMapper.serialize(report), this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Report updated.`)
        } else {
          console.log(`Report not updated.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('updateReport'))
    );
  }

  // DELETE
  deleteReport(id: number): Observable<HttpResponseBase> {
    const url = `${GlobalConstants.reportsUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(response => {
        if(response.status == HttpStatusCode.NoContent){
          console.log(`Report deleted.`)
        } else {
          console.log(`Report not deleted.`)
        }
      }),
      catchError(this.errorService.handleError<HttpResponseBase>('deleteReport'))
    );
  }
}
