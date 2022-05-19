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

  form: FormGroup;
  public successfulAuthentication = false;
  private timeout = 1000;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public formValidationService: FormValidationService,
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.valid){
      const val = this.form.value;
      this.authService.authenticateUser(val.email.trim(), val.password.trim()).subscribe(userId => {
        if(userId != undefined && userId != 0){
          console.log('user id: ' + userId)
          this.successfulAuthentication = true;
          sessionStorage.setItem(GlobalConstants.userId, userId.toString());
          setTimeout(() => { this.router.navigate([`/profile/${userId}`]); }, this.timeout);
        }
      });
    }
  }

}
