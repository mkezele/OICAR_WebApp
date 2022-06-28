import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Report[];
  userId = Number(sessionStorage.getItem(GlobalConstants.userId));

  constructor(private reportService: ReportService) {
    this.reports = [];
    this.reportService.getReports().subscribe(result => {
      if(result.body != null){
        this.reports = result.body;
      }  
    });
  }

  ngOnInit(): void {
  }

  deleteReport(id: number){
    this.reportService.deleteReport(id).subscribe(result => {
      if(result != undefined && result.status == HttpStatusCode.NoContent){
        window.location.reload();
      }
    });
  }

}
