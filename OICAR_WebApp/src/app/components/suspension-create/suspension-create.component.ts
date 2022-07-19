import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { ReportReason } from 'src/app/models/report-reason';
import { ReportReasonService } from 'src/app/services/report-reason/report-reason.service';
import { SuspensionService } from 'src/app/services/suspension/suspension.service';
import { Suspension } from 'src/app/models/suspension';
import { compareStrings } from 'src/app/common/utilities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suspension-create',
  templateUrl: './suspension-create.component.html',
  styleUrls: ['./suspension-create.component.css']
})
export class CreateSuspensionComponent implements OnInit {

  public stepperOrientation: Observable<StepperOrientation>;
  public createSuspension: FormGroup;
  public users: User[];
  public reasons: ReportReason[];
  public successfulSuspensionCreation : boolean | undefined = undefined; 
  private timeout = 1000;

  constructor(
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private suspensionService: SuspensionService,
    private reportReasonService: ReportReasonService,
    private location: Location,
    private route: ActivatedRoute,) {
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.createSuspension = this.formBuilder.group({
        usersCtrl: ['', Validators.required],
        reasonsCtrl: ['', Validators.required],
        startDateCtrl: ['', Validators.required],
        endDateCtrl: ['', Validators.required],
      });

      this.users = new Array<User>();
      this.userService.getUsers().subscribe(result => {
        if(result.body != null) {
          this.users = result.body.sort((a, b) => compareStrings(a.firstName + a.lastName, b.firstName + b.lastName));
        }     
      });

      this.reasons = new Array<ReportReason>();
      this.reportReasonService.getReportReasons().subscribe(result => {
        if(result.body != null) {
          this.reasons = result.body.sort((a, b) => compareStrings(a.title, b.title));
        }     
      });
  }

  ngOnInit(): void {
    const suspendedUserId = parseInt(this.route.snapshot.paramMap.get('suspendedUserId') ?? '0');
    if(suspendedUserId != 0) {
      this.userService.getUser(suspendedUserId).subscribe(result => {
        if (result.body != undefined){
          this.createSuspension.patchValue({
            usersCtrl: result.body.idappUser,
          });
        }
      });
    }
    const suspensionReasonId = parseInt(this.route.snapshot.paramMap.get('suspensionReasonId') ?? '0');
    if(suspensionReasonId != 0) {
      this.reportReasonService.getReportReason(suspensionReasonId).subscribe(result => {
        if(result.body != undefined) {
          this.createSuspension.patchValue({
            reasonsCtrl: result.body.idreportReason,
          });
        }
      });
    }
  }

  submit() {
    this.addSuspension();
  }

  addSuspension(): void {
    const suspension = new Suspension(
      0,
      this.createSuspension.get('usersCtrl')?.value.idappUser,
      this.createSuspension.get('reasonsCtrl')?.value.idreportReason,
      this.createSuspension.get('startDateCtrl')?.value,
      this.createSuspension.get('endDateCtrl')?.value,
    );

    this.suspensionService.createSuspension(suspension).subscribe(result => {
      if(result != undefined && result.status == HttpStatusCode.Created){
        this.successfulSuspensionCreation = true;
        setTimeout(() => {this.location.back();}, this.timeout);
      } else {
        this.successfulSuspensionCreation = false;
      }
    });
  }

  allControlsValid(): boolean {
    return (this.createSuspension.get('usersCtrl')?.valid ?? false) 
    && (this.createSuspension.get('reasonsCtrl')?.valid ?? false)
    && (this.createSuspension.get('startDateCtrl')?.valid ?? false)
    && (this.createSuspension.get('endDateCtrl')?.valid ?? false);
  }

  goBack(){
    this.location.back();
  }

}
