import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import { HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { ReportReason } from 'src/app/models/report-reason';
import { ReportReasonService } from 'src/app/services/report-reason/report-reason.service';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {

  public stepperOrientation: Observable<StepperOrientation>;
  public reportReason: FormGroup; 
  public reportReasons: ReportReason[];
  public successfulReportCreation: boolean | undefined = undefined;
  public reportingUser: User | undefined = undefined;
  public reportedUser: User | undefined = undefined;

  private timeout = 1000;

  constructor(    
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute, 
    private authService: AuthService,
    private userService: UserService,
    private reportService: ReportService,
    private location: Location,
    private reportReasonService: ReportReasonService,
    private router: Router,) { 
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
        this.reportReason = this.formBuilder.group({
          reportReasonCtrl: ['', Validators.required],
        });

        const reportingUserId = parseInt(this.route.snapshot.paramMap.get('userId') ?? '0');
        this.userService.getUser(reportingUserId).subscribe(result => {
          if(result.body != null) {
            this.reportingUser = result.body
          }
        });

        const reportedUserId = parseInt(this.route.snapshot.paramMap.get('reportedUserId') ?? '0');
        this.userService.getUser(reportedUserId).subscribe(result => {
          if(result.body != null) {
            this.reportedUser = result.body
          }
        });

        this.reportReasons = new Array<ReportReason>();   
        reportReasonService.getReportReasons().subscribe(result => {
          if(result.body != null) {
            this.reportReasons = result.body;
          }     
        });
    }

  ngOnInit(): void {
  }

  submit() {
    this.createReport();
  }

  createReport() {
    this.reportReasonService.getReportReason(this.reportReason.get('reportReasonCtrl')?.value.idreportReason).subscribe(reportReasonResult => {
      if(reportReasonResult.status == HttpStatusCode.Ok && reportReasonResult.body != null){
        if(this.reportingUser !== undefined && this.reportedUser !== undefined){
          const report = new Report(
            0,
            this.reportingUser.idappUser,
            this.reportedUser.idappUser,
            this.reportReason.get('reportReasonCtrl')?.value.idreportReason,
            reportReasonResult.body,
            this.reportedUser,
            this.reportingUser,
          ); 
          this.reportService.createReport(report).subscribe(reportResult => {
            if(reportResult != undefined && reportResult.status == HttpStatusCode.Created){
              this.successfulReportCreation = true;
              setTimeout(() => { this.location.back(); }, this.timeout);
            }
          });
        }
      }
    });
  }

  allControlsValid(): boolean {
    return this.reportReason.valid;
  }

  goBack(){
    this.location.back();
  }
}
