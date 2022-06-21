import { Component, OnInit } from '@angular/core';
import { compareNumbers } from 'src/app/common/utilities';
import { ProjectPost } from 'src/app/models/project-post';
import { ServicePost } from 'src/app/models/service-post';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public user: User | undefined;
  public projectPosts: ProjectPost[];
  public servicePosts: ServicePost[];
  public reviews: Review[];

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    public authService: AuthService,
    private reviewService: ReviewService,
    private profileService: ProfileService,) {
      this.projectPosts = new Array<ProjectPost>();
      this.servicePosts = new Array<ServicePost>();
      this.reviews = new Array<Review>();

      const userId = parseInt(this.route.snapshot.paramMap.get('viewedUserId') ?? '0');
      this.userService.getUser(userId).subscribe(result => { 
        this.user = result.body ?? undefined; 

        if(this.user !== undefined){
          this.profileService.getUserProjectPosts(this.user.idappUser).subscribe(postsResult => {
            if(postsResult.body != null){
              this.projectPosts = postsResult.body;
              this.projectPosts.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
            }  
          });
          this.reviewService.getUserReviews(this.user.idappUser).subscribe(result => {
            if(result.body != null){
              this.reviews = result.body;
              this.reviews.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
            }  
          });
        }
      });
    }

  ngOnInit(): void {

  }

}
