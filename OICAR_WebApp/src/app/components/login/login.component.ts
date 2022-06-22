import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  successfulAuthentication: boolean | undefined = undefined;
  private timeout = 1000;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
  }

  formValid() {
    return this.email.valid && this.password.valid;
  }

  submit() {
    if(this.formValid()){
      let email = this.email.value.trim();
      let passwordHash = btoa(this.password.value.trim());

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

}
