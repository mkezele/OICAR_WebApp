import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialog-data';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User | undefined;
  form: FormGroup;
  public successfulUpdate = false;
  public successfulDeletion: boolean | undefined = undefined;
  public formValuesChanged = false;
  private timeout = 1000;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    public formValidationService: FormValidationService,
    private authService: AuthService,
    private location: Location,
    public dialog: MatDialog,) {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => {
      this.user = user;

      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });

      this.form.valueChanges.subscribe(changedForm => {
        this.formValuesChanged = changedForm.firstName != user.firstName || changedForm.lastName != user.lastName;
      }); 
    });
  }

  submit() {
    if(this.form.valid && this.user != undefined){
      const val = this.form.value;
      let updatedUser = this.user;
      updatedUser.firstName = val.firstName;
      updatedUser.lastName = val.lastName;

      this.userService.updateUser(updatedUser).subscribe((u: User) => {
        if(u.idAppUser != 0){
          this.successfulUpdate = true;
          setTimeout(() => { this.router.navigate([`/profile/${u.idAppUser}`]); }, this.timeout)
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
      this.userService.deleteUser(this.user.idAppUser).subscribe((deleted: Boolean) => {
        if(deleted){
          this.successfulDeletion = true;
          this.authService.logout();
          setTimeout(() => { this.router.navigate([`/registration`]); }, this.timeout)
        }
      });
    }    
  }

  goBack(){
    this.location.back();
  }

}
