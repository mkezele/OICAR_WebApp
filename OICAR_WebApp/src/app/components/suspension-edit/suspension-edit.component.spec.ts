import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionEditComponent } from './suspension-edit.component';

describe('SuspensionEditComponent', () => {
  let component: SuspensionEditComponent;
  let fixture: ComponentFixture<SuspensionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspensionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
