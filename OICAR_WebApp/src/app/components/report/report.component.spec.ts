import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportComponent } from './report.component';
import { Report } from 'src/app/models/report';
import { ReportReason } from 'src/app/models/report-reason';
import { User } from 'src/app/models/user';
import { UserLevel } from 'src/app/models/user-level';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} }
      ],
      declarations: [ ReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    component.report = new Report(
      1, 
      1,
      2,
      1,
      new ReportReason(
        1, 
        'Title',
        [],
        [],
      ),
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
