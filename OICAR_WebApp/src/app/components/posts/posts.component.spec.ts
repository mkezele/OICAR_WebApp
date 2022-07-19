import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsComponent } from './posts.component';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ PostsComponent, MatAutocomplete ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categories should exist', () => {
    expect(component.categories).toBeDefined();
  });

  it('project posts should exist', () => {
    expect(component.projectPosts).toBeDefined();
  });

  it('status active filter should be checked', () => {
    expect(component.filters.controls['statusActiveCtrl'].value).toBeTruthy();
  });

  it('status not active filter should be unchecked', () => {
    expect(component.filters.controls['statusNotActiveCtrl'].value).toBeFalsy();
  });

  it('should filter not active project posts', () => {
    component.ngOnInit();
    component.filters.controls['statusActiveCtrl'].setValue(false);
    component.filters.controls['statusNotActiveCtrl'].setValue(true);
    expect(component.filteredProjectPosts.every(p => p.active === false)).toBeTruthy();
  });

  it('should filter active project posts', () => {
    component.ngOnInit();
    component.filters.controls['statusActiveCtrl'].setValue(true);
    component.filters.controls['statusNotActiveCtrl'].setValue(false);
    expect(component.filteredProjectPosts.every(p => p.active === true)).toBeTruthy();
  });

  it('should filter project posts by category', async () => {
    component.filters.controls['categoryCtrl'].setValue(1);
    expect(component.filteredProjectPosts.every(p => p.categoryId === component.filters.controls['categoryCtrl'].value)).toBeTruthy();
  });

  it('should filter project posts by duration', async () => {
    component.filters.controls['durationCtrl'].setValue(4);
    expect(component.filteredProjectPosts.every(p => p.durationInMonths === component.filters.controls['durationCtrl'].value)).toBeTruthy();
  });

  it('should filter project posts by location', async () => {
    component.filters.controls['locationCtrl'].setValue('Zagreb');
    expect(component.filteredProjectPosts.every(p => p.place.toLowerCase().includes(component.filters.controls['locationCtrl'].value))).toBeTruthy();
  });
});
