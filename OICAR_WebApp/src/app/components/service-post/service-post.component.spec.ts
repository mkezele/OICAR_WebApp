import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePostComponent } from './service-post.component';

describe('ServicePostComponent', () => {
  let component: ServicePostComponent;
  let fixture: ComponentFixture<ServicePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
