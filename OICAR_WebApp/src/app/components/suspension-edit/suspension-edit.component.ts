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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from 'src/app/models/dialog-data';

@Component({
  selector: 'app-suspension-edit',
  templateUrl: './suspension-edit.component.html',
  styleUrls: ['./suspension-edit.component.css']
})
export class SuspensionEditComponent implements OnInit {

  public stepperOrientation: Observable<StepperOrientation>;
  public editSuspension: FormGroup;
  public users: User[];
  public reasons: ReportReason[];
  public successfulSuspensionUpdate : boolean | undefined = undefined; 
  public successfulSuspensionDeletion: boolean | undefined = undefined;
  private timeout = 1000;
  public suspension : Suspension | undefined;
  formValuesChanged = false;

  constructor(
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private suspensionService: SuspensionService,
    private reportReasonService: ReportReasonService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,) {
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.editSuspension = this.formBuilder.group({
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
    this.editSuspension.valueChanges.subscribe(changedForm => {
      this.formValuesChanged = 
        changedForm.usersCtrl != this.suspension?.appUserId ||
        changedForm.reasonsCtrl != this.suspension?.reportReasonId ||
        changedForm.startDateCtrl != this.suspension?.startDate ||
        changedForm.endDateCtrl != this.suspension?.endDate;
    }); 

    const suspensionId = parseInt(this.route.snapshot.paramMap.get('suspensionId') ?? '0');
    if(suspensionId != 0) {
      this.suspensionService.getSuspension(suspensionId).subscribe(suspensionResult => {
        if (suspensionResult.body != undefined && suspensionResult.body != null){
          this.suspension = suspensionResult.body;

          this.userService.getUser(this.suspension.appUserId).subscribe(userResult => {
            if (userResult.body != undefined){
              this.editSuspension.patchValue({
                usersCtrl: userResult.body.idappUser,
              });
            }
          });

          this.reportReasonService.getReportReason(this.suspension.reportReasonId).subscribe(reasonResult => {
            if(reasonResult.body != undefined) {
              this.editSuspension.patchValue({
                reasonsCtrl: reasonResult.body.idreportReason,
              });
            }
          });

          this.editSuspension.patchValue({
            startDateCtrl: this.suspension.startDate,
            endDateCtrl: this.suspension.endDate,
          });
        }
      });
    }
  }

  submit() {
    this.updateSuspension();
  }

  updateSuspension(): void {
    const suspension = new Suspension(
      this.suspension?.idsuspension!!,
      this.editSuspension.get('usersCtrl')?.value.idappUser,
      this.editSuspension.get('reasonsCtrl')?.value.idreportReason,
      this.editSuspension.get('startDateCtrl')?.value,
      this.editSuspension.get('endDateCtrl')?.value,
    );
    suspension.idsuspension = this.suspension?.idsuspension;
    this.suspensionService.updateSuspension(suspension).subscribe(result => {
      if(result != undefined && result.status == HttpStatusCode.NoContent){
        this.successfulSuspensionUpdate = true;
        setTimeout(() => {this.location.back();}, this.timeout);
      }
    });
  }

  allControlsValid(): boolean {
    return (this.editSuspension.get('usersCtrl')?.valid ?? false) 
    && (this.editSuspension.get('reasonsCtrl')?.valid ?? false)
    && (this.editSuspension.get('startDateCtrl')?.valid ?? false)
    && (this.editSuspension.get('endDateCtrl')?.valid ?? false);
  }

  goBack(){
    this.location.back();
  }

  openDeleteSuspensionDialog() {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { data: { title: ($localize`Delete suspension`), text: ($localize`Do you really want to delete this suspension?`) } as DialogData }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteSuspension();
      }
    });
  }

  deleteSuspension() {
    if(this.suspension != undefined){
      this.suspensionService.deleteSuspension(this.suspension.idsuspension!!).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.NoContent){
          this.successfulSuspensionDeletion = true;
          setTimeout(() => { this.location.back(); }, this.timeout)
        } else {
          this.successfulSuspensionDeletion = false;
        }
      });
    }
  }

}
