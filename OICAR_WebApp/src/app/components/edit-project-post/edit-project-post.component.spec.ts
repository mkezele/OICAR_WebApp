import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPostComponent } from './edit-project-post.component';

describe('EditPostComponent', () => {
  let component: EditProjectPostComponent;
  let fixture: ComponentFixture<EditProjectPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
