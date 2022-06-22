import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import { ProjectPostService } from '../../services/project-post/project-post.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import { ProjectPost } from '../../models/project-post';
import { HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { DialogData } from 'src/app/models/dialog-data';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-post',
  templateUrl: './project-post-edit.component.html',
  styleUrls: ['./project-post-edit.component.css']
})
export class ProjectPostEditComponent implements OnInit {

  post: ProjectPost | undefined = undefined;
  stepperOrientation: Observable<StepperOrientation>;
  details: FormGroup;
  categories: Category[];
  formValuesChanged = false;
  successfulPostEdit: boolean | undefined = undefined;
  successfulPostDeletion: boolean | undefined = undefined;

  private timeout = 1000;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute, 
    private categoryService: CategoryService,
    private location: Location,
    private projectPostService: ProjectPostService,
    private router: Router,) {
      this.stepperOrientation = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

        this.details = this.formBuilder.group({
          categoryCtrl: ['', Validators.required],
          placeCtrl: ['', Validators.required],
          titleCtrl: ['', Validators.required],
          commentCtrl: ['', Validators.required],
          durationCtrl: ['', Validators.required],
          numOfTeammatesCtrl: ['', Validators.required],
          activeCtrl: ['']
        });

        this.categories = new Array<Category>();
        this.categoryService.getCategories().subscribe(result => {
          if(result.body != null) {
            this.categories = result.body;
          }     
        });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('postId'));
    this.projectPostService.getProjectPost(id).subscribe(response => {
      this.post = (response.status == HttpStatusCode.Ok && response != undefined && response.body != null) ? response.body : undefined;  
            
      this.details.patchValue({
        categoryCtrl: this.post?.categoryId,
        titleCtrl: this.post?.title,
        commentCtrl: this.post?.comment,
        placeCtrl: this.post?.place,
        durationCtrl: this.post?.durationInMonths,
        numOfTeammatesCtrl: this.post?.numberOfTeammates,
        activeCtrl: this.post?.active
      });
  
      this.details.valueChanges.subscribe(changedForm => {
        this.formValuesChanged = 
          changedForm.categoryCtrl != this.post?.categoryId ||
          changedForm.titleCtrl != this.post?.title ||
          changedForm.commentCtrl != this.post?.comment ||
          changedForm.placeCtrl != this.post?.place ||
          changedForm.durationCtrl != this.post?.durationInMonths ||
          changedForm.numOfTeammatesCtrl != this.post?.numberOfTeammates ||
          changedForm.activeCtrl != this.post?.active;
      });  
    });
  }

  submit() {
    this.updateProjectPost();
  }

  updateProjectPost(): void {
    if(this.details.valid && this.post != undefined){
      let updatedPost = this.post;
      updatedPost.categoryId = this.details.value.categoryCtrl;
      updatedPost.title = this.details.value.titleCtrl;
      updatedPost.comment = this.details.value.commentCtrl;
      updatedPost.place = this.details.value.placeCtrl;
      updatedPost.durationInMonths = this.details.value.durationCtrl;
      updatedPost.numberOfTeammates = this.details.value.numOfTeammatesCtrl;
      updatedPost.category = this.categories.find(c => c.idcategory == updatedPost.categoryId)!!;
      updatedPost.active = this.details.value.activeCtrl;

      this.projectPostService.updateProjectPost(updatedPost).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.NoContent){
          this.successfulPostEdit = true;
          setTimeout(() => { this.router.navigate([`/profile/${this.post?.appUserId}`]); }, this.timeout);
        } else {
          this.successfulPostEdit = false;
        }        
      });
    }
  }

  allDetailsControlsValid(): boolean {
    return this.details.valid;
  }

  goBack(){
    this.location.back();
  }

  openDeletePostDialog() {
    const dialogRef = this.dialog.open(
      DialogComponent,
      { data: { title: 'Delete post', text: 'Do you really want to delete post?' } as DialogData }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteProjectPost();
      }
    });
  }

  deleteProjectPost() {
    if(this.post != undefined){
      this.projectPostService.deleteProjectPost(this.post.idprojectPost).subscribe(result => {
        if(result != undefined && result.status == HttpStatusCode.NoContent){
          this.successfulPostDeletion = true;
          console.log(`/profile/${this.post?.appUserId}`);
          setTimeout(() => { this.router.navigate([`/profile/${this.post?.appUserId}`]); }, this.timeout)
        } else {
          this.successfulPostDeletion = false;
        }
      });
    }
  }


}
