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
import { PostCreateComponent } from './components/post-create/post-create.component'; 
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { PostsComponent } from './components/posts/posts.component'; 
import {MatTabsModule} from '@angular/material/tabs';
import { ProjectPostComponent } from './components/project-post/project-post.component';
import { ServicePostComponent } from './components/service-post/service-post.component';
import { ProjectPostEditComponent } from './components/project-post-edit/project-post-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { ReviewCreateComponent } from './components/review-create/review-create.component';
import { ReviewComponent } from './components/review/review.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { ChatComponent } from './components/chat/chat.component';
import { ReportComponent } from './components/report/report.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SuspensionsComponent } from './components/suspensions/suspensions.component';
import { SuspensionComponent } from './components/suspension/suspension.component';
import { CreateSuspensionComponent } from './components/suspension-create/suspension-create.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { SuspensionEditComponent } from './components/suspension-edit/suspension-edit.component';

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
    PostCreateComponent,
    PostsComponent,
    ProjectPostComponent,
    ServicePostComponent,
    ProjectPostEditComponent,
    ProfileViewComponent,
    ReportCreateComponent,
    ReviewCreateComponent,
    ReviewComponent,
    ChatComponent,
    ReportComponent,
    ReportsComponent,
    SuspensionsComponent,
    SuspensionComponent,
    CreateSuspensionComponent,
    SuspensionEditComponent,
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
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
