import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { map, Observable, of, startWith, tap } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { compareNumbers } from 'src/app/common/utilities';
import { Category } from 'src/app/models/category';
import { ProjectPost } from 'src/app/models/project-post';
import { ServicePost } from 'src/app/models/service-post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProjectPostService } from 'src/app/services/project-post/project-post.service';
import { ServicePostService } from 'src/app/services/service-post/service-post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  panelOpenState = false;
  public filters: FormGroup;
  locationOptions: Set<string>;
  filteredLocationOptions: Observable<string[]>;
  public categories: Category[];

  public projectPosts: ProjectPost[]; 
  public filteredProjectPosts: ProjectPost[];
  //public servicePosts: ServicePost[];

  constructor(
    private formBuilder: FormBuilder,
    private projectPostService: ProjectPostService,
    private servicePostService: ServicePostService,
    private categoryService: CategoryService,
    public authService: AuthService,
  ) {
    this.filters = this.formBuilder.group({
      categoryCtrl: [],
      statusActiveCtrl: [true],
      statusNotActiveCtrl: [false],
      locationCtrl: [''],
      durationCtrl: [null],
    });

    this.locationOptions = new Set<string>();
    this.filteredLocationOptions = of(new Array<string>())
    this.projectPosts = new Array<ProjectPost>();
    this.filteredProjectPosts = new Array<ProjectPost>();
    this.categories = new Array<Category>();

    categoryService.getCategories().subscribe(result => {
      if(result.body != null) {
        this.categories = result.body;
      }     
    });

    this.projectPostService.getProjectPosts().subscribe(result => {
      if(result.body != null){
        this.projectPosts = result.body;
        this.filteredProjectPosts = 
          this.projectPosts
            .filter(p => p.active == true)
            .sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
        this.locationOptions = new Set<string>(this.projectPosts.map(p => p.place));
      }  
    });
  }

  ngOnInit(): void {
    this.filteredLocationOptions = this.filters.get('locationCtrl')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocations(value || '')),
    );

    this.filters.valueChanges.subscribe(changedFilters => {
        this.filteredProjectPosts = [];

        if(changedFilters.statusActiveCtrl == true){
          this.projectPosts.filter(p => p.active == true).forEach(post => {
            this.filteredProjectPosts.push(post);
          });
        } 
        if(changedFilters.statusNotActiveCtrl == true){
          this.projectPosts.filter(p => p.active == false).forEach(post => {
            this.filteredProjectPosts.push(post);
          });
        }

        if(changedFilters.categoryCtrl != null){
          this.filteredProjectPosts = this.filteredProjectPosts.filter(p => p.categoryId == changedFilters.categoryCtrl); 
        }

        if(changedFilters.durationCtrl != null){
          this.filteredProjectPosts = this.filteredProjectPosts.filter(p => p.durationInMonths == changedFilters.durationCtrl); 
        }

        if(changedFilters.locationCtrl != ''){
          this.filteredProjectPosts = this.filteredProjectPosts
            .filter(p => p.place.toLowerCase().includes(changedFilters.locationCtrl.toLowerCase() as string)); 
        }

        this.filteredProjectPosts.sort((a, b) => -compareNumbers(a.dateOfCreation.valueOf(), b.dateOfCreation.valueOf()));
    }); 
  }

  private _filterLocations(value: string): string[] {
    return Array.from(this.locationOptions).filter(option => option.toLowerCase().includes(value.toLowerCase()));
  } 

}
