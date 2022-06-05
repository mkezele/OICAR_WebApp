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
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  public user: User | undefined = undefined;
  public successfulUpdate: boolean | undefined = undefined;
  public successfulDeletion: boolean | undefined = undefined;
  public form: FormGroup;
  public formValuesChanged = false;
  
  private timeout = 1000;

  constructor(
    public formValidationService: FormValidationService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService,
    private authService: AuthService,
    private location: Location,) {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(result => {
      if(result instanceof User){
        this.user = result;
      } else {
        this.user = result.body != null ? result.body : undefined;
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
