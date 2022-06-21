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
import { CreatePostComponent } from './components/create-post/create-post.component'; 
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { PostsComponent } from './components/posts/posts.component'; 
import {MatTabsModule} from '@angular/material/tabs';
import { ProjectPostComponent } from './components/project-post/project-post.component';
import { ServicePostComponent } from './components/service-post/service-post.component';
import { EditProjectPostComponent } from './components/edit-project-post/edit-project-post.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { ReviewComponent } from './components/review/review.component';

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
    PostsComponent,
    ProjectPostComponent,
    ServicePostComponent,
    EditProjectPostComponent,
    ProfileViewComponent,
    CreateReportComponent,
    CreateReviewComponent,
    ReviewComponent,
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
    MatTabsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
