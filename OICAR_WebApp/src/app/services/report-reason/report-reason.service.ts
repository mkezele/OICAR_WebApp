import { HttpHeaders, HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ReportReason } from 'src/app/models/report-reason';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ReportReasonService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService,
  ) { }

    // GET report reason by id
    getReportReason(id: number): Observable<HttpResponse<ReportReason>> {
      return this.http.get<ReportReason>(`${GlobalConstants.reportReasonsUrl}/${id}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`Report reason fetched, id = ${response.body?.idreportReason}.`)
          } else {
            console.log(`Report reason not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<ReportReason>>(`getReportReason id=${id}`))
      );
    }

    // GET all report reasons
    getReportReasons(): Observable<HttpResponse<ReportReason[]>> {
      return this.http.get<ReportReason[]>(`${GlobalConstants.reportReasonsUrl}`, this.httpOptions).pipe(
        tap(response => {
          if (response.status == HttpStatusCode.Ok) {
            console.log(`Report reasons fetched.`)
          } else {
            console.log(`Report reasons not found.`);
          }
        }),
        catchError(this.errorService.handleError<HttpResponse<ReportReason[]>>(`getReportReasons`))
      );
    }
}
