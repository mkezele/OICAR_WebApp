import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppnavComponent } from './appnav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalConstants } from 'src/app/common/global-constants';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { UserLevel } from 'src/app/models/user-level';

describe('AppnavComponent', () => {
  let component: AppnavComponent;
  let fixture: ComponentFixture<AppnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} }
      ],
      declarations: [ AppnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigation should contain logout, posts, profile', () => {
    sessionStorage.setItem(GlobalConstants.userId, '1');
    expect(fixture.debugElement.query(By.css('#logout'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#posts'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#profile'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('#login'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#registration'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#reports'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#suspensions'))).toBeNull();
  });

  it('navigation should contain login, registration, posts', () => {
    sessionStorage.removeItem(GlobalConstants.userId);
    expect(fixture.debugElement.query(By.css('#login'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#registration'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#posts'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('#logout'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#profile'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#reports'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#suspensions'))).toBeNull();
  });

  it('navigation should contain logout, posts, profile, suspensions, reports', () => {
    sessionStorage.setItem(GlobalConstants.userId, '1');
    component.user = new User(
      1, 
        'John', 
        'Doe',
        'john.doe@gmail.com',
        'bsvjedkclčs',
        'hucondsć',
        false,
        1,
        new UserLevel(2, 'Admin'),
        [], [], [], [], [], [], []
    );
    component.user.userLevelId = component.adminUserLevelId;
    expect(fixture.debugElement.query(By.css('#logout'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#posts'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#profile'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#reports'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('#suspensions'))).toBeDefined();

    expect(fixture.debugElement.query(By.css('#login'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#registration'))).toBeNull();
  });

});
