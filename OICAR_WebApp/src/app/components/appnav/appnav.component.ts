import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialog-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-appnav',
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent implements OnInit {

  @Input() title!: string;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router, 
  ) { }

  ngOnInit(): void {
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { data: { title: 'Log out', text: 'Do you really want to log out?' } as DialogData }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.logout();
        this.router.navigate(['login']);
      }
    });
  }

}
