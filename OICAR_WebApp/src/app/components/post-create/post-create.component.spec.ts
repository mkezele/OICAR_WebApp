import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ PostCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('successfulPostCreation variable should be undefined after construction', () => {
    expect(component.successfulPostCreation).toBeUndefined();
  });

  it('form should not be valid after construction', () => {
    expect(component.allDetailsControlsValid()).toBeFalsy();
  });

  it('form should be valid after filling in values', () => {
    component.details.controls['categoryCtrl'].setValue(1);
    component.details.controls['placeCtrl'].setValue('Zagreb');
    component.details.controls['titleCtrl'].setValue('Title');
    component.details.controls['commentCtrl'].setValue('Comment');
    component.details.controls['durationCtrl'].setValue(3);
    component.details.controls['numOfTeammatesCtrl'].setValue(3);
    expect(component.allDetailsControlsValid()).toBeTruthy();
  });

  it('project post should be created', async () => {
    expect(component.createProjectPost()).toBeTruthy();
  });
});
