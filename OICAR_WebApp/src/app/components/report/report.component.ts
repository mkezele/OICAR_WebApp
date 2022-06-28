import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/models/report';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReportReasonService } from 'src/app/services/report-reason/report-reason.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @Input() report!: Report;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private reportReasonService: ReportReasonService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.report.reportingUserId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
        this.report.reportingUser = result.body;
      }
    });
    this.userService.getUser(this.report.reportedUserId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
        this.report.reportedUser = result.body;
      }
    });
    this.reportReasonService.getReportReason(this.report.reportReasonId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
        this.report.reportReason = result.body;
      }
    });
  }

  visitProfile(id: number) {
    this.router.navigate([`/profile/view/${this.authService.getLoggedUserId()}/${id}`]).then(() => {
      window.location.reload();
    });
  }

}
