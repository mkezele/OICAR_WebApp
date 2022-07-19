import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuspensionComponent } from './suspension.component';
import { Suspension } from 'src/app/models/suspension';

describe('SuspensionComponent', () => {
  let component: SuspensionComponent;
  let fixture: ComponentFixture<SuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ SuspensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensionComponent);
    component = fixture.componentInstance;
    component.suspension = new Suspension(
      1, 
      1,
      1,
      new Date(),
      new Date(),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
