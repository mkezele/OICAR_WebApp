import { HttpStatusCode } from '@angular/common/http';
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
  
  public form: FormGroup;
  public successfulRegistration: boolean | undefined = undefined;
  public showPassword = false;
  private timeout = 1000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public formValidationService: FormValidationService,
  ) { 
    this.form = this.formBuilder.group({
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
        btoa(this.form.value.password.trim()),
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
