import { Component, OnInit } from '@angular/core';
import { compareNumbers } from 'src/app/common/utilities';
import { ProjectPost } from 'src/app/models/project-post';
import { ServicePost } from 'src/app/models/service-post';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review/review.service';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public viewedUser: User | undefined;
  public viewingUser: User | undefined;
  public projectPosts: ProjectPost[];
  public servicePosts: ServicePost[];
  public reviews: Review[];
  public adminUserLevelId = GlobalConstants.adminUserLevelId;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    public authService: AuthService,
    private reviewService: ReviewService,
    private profileService: ProfileService,) {
      this.projectPosts = new Array<ProjectPost>();
      this.servicePosts = new Array<ServicePost>();
      this.reviews = new Array<Review>();
      const viewedUserId = parseInt(this.route.snapshot.paramMap.get('viewedUserId') ?? '0');
      this.userService.getUser(viewedUserId).subscribe(result => { 
        this.viewedUser = result?.body ?? undefined; 
        if(this.viewedUser !== undefined){
          this.profileService.getUserProjectPosts(this.viewedUser.idappUser).subscribe(postsResult => {
            if(postsResult.body != null){
              this.projectPosts = postsResult.body;
              this.projectPosts.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
            }  
          });
          this.reviewService.getUserReviews(this.viewedUser.idappUser).subscribe(result => {
            if(result.body != null){
              this.reviews = result.body;
              this.reviews.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
            }  
          });
        }
      });
      const viewingUserId = parseInt(this.route.snapshot.paramMap.get('userId') ?? '0');
      this.userService.getUser(viewingUserId).subscribe(result => { 
        this.viewingUser = result?.body ?? undefined; 
      });
    }

  ngOnInit(): void {

  }

}
