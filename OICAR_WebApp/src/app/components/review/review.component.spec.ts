import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewComponent } from './review.component';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { UserLevel } from 'src/app/models/user-level';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ ReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    component.review = new Review(
      1, 
      1,
      2,
      new Date(),
      'Comment',
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
      new User(
        2, 
        'Jane', 
        'Doe',
        'jane.doe@gmail.com',
        'bsvjedkclčs',
        'hucondsć',
        false,
        1,
        new UserLevel(1, 'Basic'),
        [], [], [], [], [], [], []
      ),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
