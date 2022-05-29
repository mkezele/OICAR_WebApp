import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppnavComponent } from './components/appnav/appnav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CreatePostComponent } from './create-post/create-post.component'; 
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; 

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
    DialogComponent,
    AppnavComponent,
    PageNotFoundComponent,
    ProfileEditComponent,
    CreatePostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
