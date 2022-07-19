import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectPostComponent } from './project-post.component';
import { ProjectPost } from 'src/app/models/project-post';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { UserLevel } from 'src/app/models/user-level';

describe('ProjectPostComponent', () => {
  let component: ProjectPostComponent;
  let fixture: ComponentFixture<ProjectPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ ProjectPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPostComponent);
    component = fixture.componentInstance;
    component.projectPost = new ProjectPost(
      1,
      1,
      true,
      'Title',
      'Comment',
      'Place',
      new Date(),
      3,
      3,
      false,
      new User(
        1, 
        'John', 
        'Doe',
        'john.doe@gmail.com',
        'bsvjedkclčs',
        'hucondsć',
        false,
        1,
        new UserLevel(1, 'Basic'),
        [], [], [], [], [], [], []),
      new Category(1, 'IT', [], [])
    ); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
