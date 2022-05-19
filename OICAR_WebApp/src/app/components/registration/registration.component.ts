import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { ChatMessage } from 'src/app/models/chat-message';
import { ProjectPost } from 'src/app/models/project-post';
import { Report } from 'src/app/models/report';
import { Review } from 'src/app/models/review';
import { ServicePost } from 'src/app/models/service-post';
import { Suspension } from 'src/app/models/suspension';
import { User } from 'src/app/models/user';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  public successfulRegistration = false;
  private timeout = 1000;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    public formValidationService: FormValidationService,
  ) { 
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.valid){
      this.addUser(
        this.form.value.firstName.trim(),
        this.form.value.lastName.trim(),
        this.form.value.email.trim(),
        this.form.value.password.trim(),
      );
    }
  }

  addUser(firstName: string, lastName: string, email: string, password: string): void {
    const newUser = new User(
      0,
      firstName,
      lastName,
      email,
      password,
      'salt',
      false,
      new Array<ChatMessage>(),
      new Array<ChatMessage>(),
      new Array<ProjectPost>(),
      new Array<Report>(),
      new Array<Report>(),
      new Array<Review>(),
      new Array<Review>(),
      new Array<ServicePost>(),
      new Array<Suspension>()
    ); 

    this.userService.addUser(newUser)
      .subscribe(user => {
        if(user != undefined && user.idAppUser != 0){
          this.successfulRegistration = true;
          sessionStorage.setItem(GlobalConstants.userId, user.idAppUser.toString());
          setTimeout(() => { this.router.navigate([`/profile/${user.idAppUser}`]); }, this.timeout);
        }
      });
  }

}
