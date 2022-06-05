import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { compareNumbers } from 'src/app/common/utilities';
import { ProjectPost } from 'src/app/models/project-post';
import { ServicePost } from 'src/app/models/service-post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectPostService } from 'src/app/services/project-post/project-post.service';
import { ServicePostService } from 'src/app/services/service-post/service-post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User | undefined;
  public projectPosts: ProjectPost[];
  public servicePosts: ServicePost[];

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private projectPostService: ProjectPostService,
    private servicePostService: ServicePostService) {
      this.projectPosts = new Array<ProjectPost>();
      this.servicePosts = new Array<ServicePost>();

      const id = Number(sessionStorage.getItem(GlobalConstants.userId));
      this.userService.getUser(id).subscribe(result => { 
        this.user = result.body ?? undefined; 

        // TODO: fetch user project posts directly when API is fixed 
        this.projectPostService.getProjectPosts().subscribe(result => {
          if(result.body != null){
            this.projectPosts = result.body.filter(p => p.appUserId == this.user?.idappUser);
            this.projectPosts.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
          }  
        });
    
        // TODO: fetch user service posts directly when API is fixed
      });
    }

  ngOnInit(): void {

  }

}
