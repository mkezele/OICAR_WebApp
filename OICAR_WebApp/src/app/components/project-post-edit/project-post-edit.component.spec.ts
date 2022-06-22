import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPostEditComponent } from './project-post-edit.component';

describe('EditPostComponent', () => {
  let component: ProjectPostEditComponent;
  let fixture: ComponentFixture<ProjectPostEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPostEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
