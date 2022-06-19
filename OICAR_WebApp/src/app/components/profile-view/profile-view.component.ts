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

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public user: User | undefined;
  public projectPosts: ProjectPost[];
  public servicePosts: ServicePost[];

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    public authService: AuthService,
    private profileService: ProfileService,) {
      this.projectPosts = new Array<ProjectPost>();
      this.servicePosts = new Array<ServicePost>();

      const userId = parseInt(this.route.snapshot.paramMap.get('viewedUserId') ?? '0');
      this.userService.getUser(userId).subscribe(result => { 
        this.user = result.body ?? undefined; 

        if(this.user != undefined){
          this.profileService.getUserProjectPosts(this.user?.idappUser).subscribe(postsResult => {
            if(postsResult.body != null){
              this.projectPosts = postsResult.body.filter(p => p.appUserId == this.user?.idappUser);
              this.projectPosts.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
            }  
          });
        }
    
        // TODO: fetch user service posts
      });
    }

  ngOnInit(): void {

  }

}
