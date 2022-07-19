import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProjectPost } from 'src/app/models/project-post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css']
})
export class ProjectPostComponent implements OnInit {

  yes = $localize`YES`
  no = $localize`NO`

  @Input() projectPost!: ProjectPost;
  
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    public authService: AuthService,
  ) {
    	
  }

  ngOnInit(): void {
    this.categoryService.getCategory(this.projectPost?.categoryId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
        this.projectPost.category = result.body;
      }
    });

    this.userService.getUser(this.projectPost?.appUserId).subscribe(result => {
      if(result.status == HttpStatusCode.Ok && result.body != null){
          this.projectPost.appUser = result.body;
      }
    });
  }

  getDateString(date: Date): string{
    return new Date(date).toLocaleDateString();
  }

}
