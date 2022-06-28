import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ReportReason } from 'src/app/models/report-reason';
import { Suspension } from 'src/app/models/suspension';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReportReasonService } from 'src/app/services/report-reason/report-reason.service';
import { SuspensionService } from 'src/app/services/suspension/suspension.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-suspension',
  templateUrl: './suspension.component.html',
  styleUrls: ['./suspension.component.css']
})
export class SuspensionComponent implements OnInit {

  @Input() suspension!: Suspension;
  suspendedUser: User | undefined = undefined;
  suspensionReason: ReportReason | undefined = undefined;

  constructor(
    private userService: UserService,
    private reportReasonService: ReportReasonService,
    private router: Router,
    private authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
    this.userService.getUser(this.suspension.appUserId).subscribe(result => {
      if(result.body != null){
        this.suspendedUser = result.body;
      }  
    });
    this.reportReasonService.getReportReason(this.suspension.reportReasonId).subscribe(result => {
      if(result.body != null){
        this.suspensionReason = result.body;
      }  
    });
  }

  visitProfile(id: number) {
    this.router.navigate([`/profile/view/${this.authService.getLoggedUserId()}/${id}`]).then(() => {
      window.location.reload();
    });
  }

  getDateString(date: Date): string{
    return new Date(date).toLocaleDateString();
  }
}
