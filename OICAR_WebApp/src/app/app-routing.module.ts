import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserPostGuard } from './guards/user-post/user-post.guard';
import { ProjectPostEditComponent } from './components/project-post-edit/project-post-edit.component';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { ReviewCreateComponent } from './components/review-create/review-create.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { SuspensionsComponent } from './components/suspensions/suspensions.component';
import { CreateSuspensionComponent } from './components/suspension-create/suspension-create.component';
import { SuspensionEditComponent } from './components/suspension-edit/suspension-edit.component';

const routes: Routes = [
  { path: '',   redirectTo: 'posts', pathMatch: 'full' },
  { 
    path: 'registration', component: RegistrationComponent 
  },
  { 
    path: 'login', component: LoginComponent 
  },
  { 
    path: 'profile/:userId', 
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'profile/view/:userId/:viewedUserId', 
    component: ProfileViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit/:userId', 
    component: ProfileEditComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'create-post/:userId', 
    component: PostCreateComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'posts', 
    component: PostsComponent,
  },
  {
    path: 'profile/:userId/project-posts/:postId/edit', 
    component: ProjectPostEditComponent,
    canActivate: [AuthGuard, UserPostGuard]
  },
  { 
    path: 'report/:userId/:reportedUserId', 
    component: ReportCreateComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'review/:userId/:reviewedUserId', 
    component: ReviewCreateComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'reports/:userId', 
    component: ReportsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: 'suspensions/:userId/:suspensionId/edit', 
    component: SuspensionEditComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: 'suspensions/:userId', 
    component: SuspensionsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: 'create-suspension/:userId/:suspendedUserId/:suspensionReasonId', 
    component: CreateSuspensionComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: 'create-suspension/:userId/:suspendedUserId', 
    component: CreateSuspensionComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: 'create-suspension/:userId', 
    component: CreateSuspensionComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { 
    path: '**', component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 