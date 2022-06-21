import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review!: Review;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.review.reviewingUserId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
        this.review.reviewingUser = result.body;
      }
    });
  }

  getDateString(date: Date): string{
    return new Date(date).toLocaleDateString();
  }

  visitProfile() {
    this.router.navigate([`/profile/view/${this.authService.getLoggedUserId()}/${this.review.reviewingUser?.idappUser}`]).then(() => {
      window.location.reload();
    });
  }

}
