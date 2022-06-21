import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Location } from '@angular/common';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-review-user',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  public stepperOrientation: Observable<StepperOrientation>;
  public comment: FormGroup; 
  public successfulReviewCreation = false;
  public reviewingUser: User | undefined = undefined;
  public reviewedUser: User | undefined = undefined;

  private timeout = 1000;

  constructor(    
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute, 
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private location: Location,
    private router: Router,) { 
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
        this.comment = this.formBuilder.group({
          commentCtrl: ['', Validators.required],
        });

        const reviewingUserId = parseInt(this.route.snapshot.paramMap.get('userId') ?? '0');
        this.userService.getUser(reviewingUserId).subscribe(result => {
          if(result.body != null) {
            this.reviewingUser = result.body
          }
        });

        const reviewedUserId = parseInt(this.route.snapshot.paramMap.get('reviewedUserId') ?? '0');
        this.userService.getUser(reviewedUserId).subscribe(result => {
          if(result.body != null) {
            this.reviewedUser = result.body
          }
        });   
    }

  ngOnInit(): void {
  }

  submit() {
    this.createReview();
  }

  createReview() {
    if(this.reviewingUser !== undefined && this.reviewedUser !== undefined){
      const review = new Review(
        0,
        this.reviewingUser.idappUser,
        this.reviewedUser.idappUser,
        new Date(),
        this.comment.get('commentCtrl')?.value,
        this.reviewedUser,
        this.reviewingUser,
      ); 
      this.reviewService.createReview(review).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.Created){
          this.successfulReviewCreation = true;
          setTimeout(() => { this.location.back(); }, this.timeout);
        }
      });
    }
  }

  allControlsValid(): boolean {
    return this.comment.valid;
  }

  goBack(){
    this.location.back();
  }
}
