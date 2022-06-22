import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Category } from '../../models/category';
import { ServicePostImage } from '../../models/service-post-image';
import { AuthService } from '../../services/auth/auth.service';
import { CategoryService } from '../../services/category/category.service';
import { ProjectPostService } from '../../services/project-post/project-post.service';
import { ServicePostService } from '../../services/service-post/service-post.service';
import { UserService } from '../../services/user/user.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import { ProjectPost } from '../../models/project-post';
import { ServicePost } from '../../models/service-post';
import { HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public stepperOrientation: Observable<StepperOrientation>;
  public postType: FormGroup; 
  public details: FormGroup;
  public categories: Category[];
  public successfulPostCreation = false; 

  private timeout = 1000;
  private files: FileList | undefined;

  constructor(
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private userService: UserService,
    private categoryService: CategoryService,
    private location: Location,
    private projectPostService: ProjectPostService,
    private servicePostService: ServicePostService,
    private router: Router,) {
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

        this.postType = this.formBuilder.group({
          postTypeCtrl: ['', Validators.required],
        });

        this.details = this.formBuilder.group({
          categoryCtrl: ['', Validators.required],
          placeCtrl: ['', Validators.required],
          titleCtrl: ['', Validators.required],
          commentCtrl: ['', Validators.required],
          durationCtrl: ['', Validators.required],
          numOfTeammatesCtrl: ['', Validators.required],
          imagesCtrl: [''],
        });

        this.categories = new Array<Category>();
        categoryService.getCategories().subscribe(result => {
          if(result.body != null) {
            this.categories = result.body;
          }     
        });

  }

  ngOnInit(): void {
  }

  submit() {
    this.postType.get('postTypeCtrl')?.value == 1 ? this.addProjectPost() : this.addServicePost();
  }

  addProjectPost(): void {
    this.userService.getUser(this.authService.getLoggedUserId()).subscribe(userResult => {
      if(userResult != undefined && userResult.status == HttpStatusCode.Ok && userResult.body != null) {
        this.categoryService.getCategory(this.details.get('categoryCtrl')?.value.idcategory).subscribe(categoryResult => {
          if(categoryResult.status == HttpStatusCode.Ok && categoryResult.body != null){
            const projectPost = new ProjectPost(
              0,
              this.authService.getLoggedUserId(),
              this.details.get('categoryCtrl')?.value.idcategory,
              true,
              this.details.get('titleCtrl')?.value,
              this.details.get('commentCtrl')?.value,
              this.details.get('placeCtrl')?.value,
              new Date(),
              this.details.get('durationCtrl')?.value,
              this.details.get('numOfTeammatesCtrl')?.value,
              false,
              userResult.body!!,
              categoryResult.body
            ); 

            this.projectPostService.createProjectPost(projectPost).subscribe(pPostResult => {
              if(pPostResult != undefined && pPostResult.status == HttpStatusCode.Created){
                this.successfulPostCreation = true;
                setTimeout(() => { this.router.navigate([`/profile/${userResult.body?.idappUser}`]); }, this.timeout);
              }
            });
          }
        });
      }
    });
  }

  addServicePost(): void {
    this.userService.getUser(this.authService.getLoggedUserId()).subscribe(userResult => {
      if(userResult.status == HttpStatusCode.Ok && userResult.body != null) {
        this.categoryService.getCategory(this.details.get('categoryCtrl')?.value.idcategory).subscribe(async categoryResult => {
          if(categoryResult.status == HttpStatusCode.Ok && categoryResult.body != null){
            const servicePost = new ServicePost(
              0,
              this.authService.getLoggedUserId(),
              this.details.get('categoryCtrl')?.value.idcategory,
              true,
              this.details.get('titleCtrl')?.value,
              this.details.get('commentCtrl')?.value,
              this.details.get('placeCtrl')?.value,
              new Date(),
              false,
              userResult.body!!,
              categoryResult.body,
            ); 

            servicePost.servicePostImages = await this.convertFilesToServicePostImages(this.files, servicePost);
            
            this.servicePostService.createServicePost(servicePost).subscribe(sPostResult => {
              if(sPostResult != undefined && sPostResult.status == HttpStatusCode.Created){
                this.successfulPostCreation = true;
                setTimeout(() => { this.router.navigate([`/profile/${userResult.body?.idappUser}`]); }, this.timeout);
              }
            });
          }
        });
      }
    });
  }

  allDetailsControlsValid(): boolean {
    if(this.postType.get('postTypeCtrl')?.value == 1){
      return this.details.valid;
    } else {
      return (this.details.get('categoryCtrl')?.valid ?? false) 
      && (this.details.get('placeCtrl')?.valid ?? false)
      && (this.details.get('titleCtrl')?.valid ?? false)
      && (this.details.get('commentCtrl')?.valid ?? false);
    }
  }

  goBack(){
    this.location.back();
  }

  onFilesChanged(event: Event) {
    this.files = (event.target as HTMLInputElement).files ?? undefined;  
  }

  async convertFilesToServicePostImages(files: FileList | undefined, servicePost: ServicePost): Promise<ServicePostImage[]> {
    let servicePostImages = new Array<ServicePostImage>();

    if(files != undefined) {
      for (let i = 0; i < (files?.length ?? 0); i++) {
        servicePostImages.push(new ServicePostImage(0, servicePost.idservicePost, await this.blobToBase64(files[i])));                
      }
    }

    return servicePostImages;
  }

  async blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

}
