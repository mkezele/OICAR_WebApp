import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuspensionComponent } from './suspension-create.component';

describe('CreateSuspensionComponent', () => {
  let component: CreateSuspensionComponent;
  let fixture: ComponentFixture<CreateSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuspensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
