import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogData } from 'src/app/models/dialog-data';
import { Suspension } from 'src/app/models/suspension';
import { SuspensionService } from 'src/app/services/suspension/suspension.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-suspensions',
  templateUrl: './suspensions.component.html',
  styleUrls: ['./suspensions.component.css']
})
export class SuspensionsComponent implements OnInit {

  suspensions: Suspension[];
  userId = Number(sessionStorage.getItem(GlobalConstants.userId));

  constructor(
    private suspensionService: SuspensionService,
    private dialog: MatDialog,
    ) {
    this.suspensions = [];
    this.suspensionService.getSuspensions().subscribe(result => {
      if(result.body != null){
        this.suspensions = result.body;
      }  
    });
  }

  ngOnInit(): void {
  }

  openDeleteSuspensionDialog(suspension: Suspension) {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { data: { title: $localize`Delete suspension`, text: $localize`Do you really want to delete this suspension?` } as DialogData }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteSuspension(suspension.idsuspension);
      }
    });
  }

  deleteSuspension(id: number) {
    this.suspensionService.deleteSuspension(id).subscribe(result => {
      if(result != undefined && result.status == HttpStatusCode.NoContent){
        window.location.reload();
      }
    });
  }

}
