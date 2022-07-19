import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule,  HttpClientTestingModule, ReactiveFormsModule, FormsModule ],
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('successfulRegistration variable should be undefined after construction', () => {
    expect(component.successfulRegistration).toBeUndefined();
  });

  it('form should not be valid after construction', () => {
    expect(component.formValid()).toBeFalsy();
  });

  it('form should be valid after filling in values', () => {
    component.firstName.setValue('John');
    component.lastName.setValue('Doe');
    component.email.setValue('john.doe@gmail.com');
    component.password.setValue('123');
    expect(component.formValid()).toBeTruthy();
  });

  it('user should be created', async () => {
    expect(component.createUser('John', 'Doe', 'john.doe@gmail.com', '123')).toBeTruthy();
  });

});
