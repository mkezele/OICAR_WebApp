import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreateComponent } from './report-create.component';

describe('ReportUserComponent', () => {
  let component: ReportCreateComponent;
  let fixture: ComponentFixture<ReportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
