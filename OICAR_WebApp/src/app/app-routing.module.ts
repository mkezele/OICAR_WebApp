import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserPostGuard } from './guards/user-post/user-post.guard';
import { EditProjectPostComponent } from './components/edit-project-post/edit-project-post.component';

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
    path: 'profile/edit/:userId', 
    component: ProfileEditComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'create-post/:userId', 
    component: CreatePostComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'posts', 
    component: PostsComponent,
  },
  {
    path: 'profile/:userId/project-posts/:postId/edit', 
    component: EditProjectPostComponent,
    canActivate: [AuthGuard, UserPostGuard]
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
