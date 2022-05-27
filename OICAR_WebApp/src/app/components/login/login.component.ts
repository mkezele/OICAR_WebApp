import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public successfulAuthentication: boolean | undefined = undefined;
  public showPassword = false;

  private timeout = 1000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public formValidationService: FormValidationService,
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.valid){
      let email = this.form.value.email.trim();
      let passwordHash = btoa(this.form.value.password.trim());

      this.authService.authenticateUser(email, passwordHash).subscribe(userId => {
        if(userId > 0){
          this.successfulAuthentication = true;
          sessionStorage.setItem(GlobalConstants.userId, userId.toString());
          setTimeout(() => { this.router.navigate([`/profile/${userId}`]); }, this.timeout);
        } else {
          this.successfulAuthentication = false;
        }
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
