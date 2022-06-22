import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ProjectPost } from 'src/app/models/project-post';
import { Report } from 'src/app/models/report';
import { Review } from 'src/app/models/review';
import { ServicePost } from 'src/app/models/service-post';
import { Suspension } from 'src/app/models/suspension';
import { User } from 'src/app/models/user';
import { UserLevel } from 'src/app/models/user-level';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  successfulRegistration: boolean | undefined = undefined;
  private timeout = 1000;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { 

  }

  ngOnInit(): void {
  }

  formValid() {
    return this.firstName.valid && this.lastName.valid && this.email.valid && this.password.valid;
  }

  submit(){
    if(this.formValid()){
      this.addUser(
        this.firstName.value.trim(),
        this.lastName.value.trim(),
        this.email.value.trim(),
        btoa(this.password.value.trim()),
      );
    }
  }

  addUser(firstName: string, lastName: string, email: string, passwordHash: string): void {
    const newUser = new User(
      0,
      firstName,
      lastName,
      email,
      passwordHash,
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      false,
      1,
      // fix when api is fixed
      new UserLevel(1, 'Basic'),
      new Array<ProjectPost>(),
      new Array<Report>(),
      new Array<Report>(),
      new Array<Review>(),
      new Array<Review>(),
      new Array<ServicePost>(),
      new Array<Suspension>()
    ); 

    this.userService.createUser(newUser)
      .subscribe(result => {
        if(result.status == HttpStatusCode.Created){
          this.successfulRegistration = true;
          sessionStorage.setItem(GlobalConstants.userId, result.body?.idappUser.toString() ?? '');
          setTimeout(() => { this.router.navigate([`/profile/${result.body?.idappUser}`]); }, this.timeout);
        } else {
          this.successfulRegistration = false;
        }
      });
  }
}
