import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { compareNumbers } from 'src/app/common/utilities';
import { ProjectPost } from 'src/app/models/project-post';
import { Review } from 'src/app/models/review';
import { ServicePost } from 'src/app/models/service-post';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined;
  projectPosts: ProjectPost[];
  servicePosts: ServicePost[];
  public reviews: Review[];

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private profileService: ProfileService,) {
      this.projectPosts = new Array<ProjectPost>();
      this.servicePosts = new Array<ServicePost>();
      this.reviews = new Array<Review>();

      const id = Number(sessionStorage.getItem(GlobalConstants.userId));
      this.userService.getUser(id).subscribe(result => { 
        this.user = result.body ?? undefined; 

        if(this.user != undefined){
          this.profileService.getUserProjectPosts(this.user?.idappUser).subscribe(postsResult => {
            if(postsResult.body != null){
              this.projectPosts = postsResult.body.filter(p => p.appUserId == this.user?.idappUser);
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
    
        // TODO: fetch user service posts
      });
    }

  ngOnInit(): void {

  }

}
