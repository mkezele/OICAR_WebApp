import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialog-data';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { UserLevel } from 'src/app/models/user-level';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User | undefined = undefined;
  successfulUpdate: boolean | undefined = undefined;
  successfulDeletion: boolean | undefined = undefined;
  form: FormGroup;
  formValuesChanged = false;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  
  private timeout = 1000;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private authService: AuthService,
    private location: Location,) {
      this.form = this.formBuilder.group({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUser(id).subscribe(result => {
      if (result.body != null) {
        this.user = result.body;
      }

      this.form.patchValue({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
      });

      this.form.valueChanges.subscribe(changedForm => {
        this.formValuesChanged = changedForm.firstName != this.user?.firstName || changedForm.lastName != this.user?.lastName;
      }); 
    });
  }

  submit() {
    if(this.form.valid && this.user != undefined){
      let updatedUser = this.user;
      updatedUser.firstName = this.form.value.firstName;
      updatedUser.lastName = this.form.value.lastName;

      this.userService.updateUser(updatedUser).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.NoContent){
          this.successfulUpdate = true;
          setTimeout(() => { this.router.navigate([`/profile/${this.user?.idappUser}`]); }, this.timeout);
        } else {
          this.successfulUpdate = false;
        }        
      });
    }
  }

  changePassword() {  
    // TODO
  }

  openDeleteProfileDialog() {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { data: { title: 'Delete profile', text: 'Do you really want to delete your profile?' } as DialogData }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteProfile();
      }
    });
  }

  deleteProfile(){
    if(this.user != undefined){
      this.userService.deleteUser(this.user.idappUser).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.NoContent){
          this.successfulDeletion = true;
          this.authService.logout();
          setTimeout(() => { this.router.navigate([`/registration`]); }, this.timeout)
        } else {
          this.successfulDeletion = false;
        }
      });
    }    
  }

  goBack(){
    this.location.back();
  }

}
