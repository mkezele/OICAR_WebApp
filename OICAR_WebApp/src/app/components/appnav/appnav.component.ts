import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { DialogData } from 'src/app/models/dialog-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-appnav',
  templateUrl: './appnav.component.html',
  styleUrls: ['./appnav.component.css']
})
export class AppnavComponent implements OnInit {

  opened: boolean = false;
  @Input() title!: string;
  @ViewChild("posts", { read: ElementRef }) posts: ElementRef | undefined;
  @ViewChild("registration", { read: ElementRef }) registration: ElementRef | undefined;
  @ViewChild("login", { read: ElementRef }) login: ElementRef | undefined;
  @ViewChild("profile", { read: ElementRef }) profile: ElementRef | undefined;
  @ViewChild("logout", { read: ElementRef }) logout: ElementRef | undefined;
  private navItems: any[];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router, 
  ) { 
    this.navItems = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.navItems = []
    this.navItems.push(this.posts?.nativeElement);
    this.navItems.push(this.registration?.nativeElement);
    this.navItems.push(this.login?.nativeElement);
    this.navItems.push(this.profile?.nativeElement);
    this.navItems.push(this.logout?.nativeElement);
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

  onSelect(element: any) {
    this.ngAfterViewInit();
    this.navItems?.forEach(item => {
      if(item !== undefined) {
        element === item ? item.setAttribute('class', 'color-green mx-2 my-2') : item.setAttribute('class', 'color-white mx-2 my-2');
      }
    });
  }

}
