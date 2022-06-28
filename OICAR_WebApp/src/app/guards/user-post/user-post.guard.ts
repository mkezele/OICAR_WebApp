import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, firstValueFrom, lastValueFrom, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectPostService } from 'src/app/services/project-post/project-post.service';

@Injectable({
  providedIn: 'root'
})
export class UserPostGuard implements CanActivate {

  constructor(
    private projectPostService: ProjectPostService, 
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<boolean>((resolve, reject) => {
        // if post with postId parameter was not created by user with userId parameter redirect to login 
        const routeParamUserId = parseInt(route.paramMap.get('userId') ?? '0');
        const routeParamPostId = parseInt(route.paramMap.get('postId') ?? '0');        
        if(routeParamUserId === 0 || !this.authService.userLoggedIn() || routeParamUserId != this.authService.getLoggedUserId()) {
          this.router.navigate(['login']);
          reject(false);
        }
        this.projectPostService.getProjectPost(routeParamPostId).subscribe(result => {
          if(result.body?.appUserId != routeParamUserId){
            this.router.navigate(['login']);
            reject(false);
          }
          resolve(true);
        })
      }).then(
        function(value: boolean = true) { return value; }, 
        function(value: boolean = false) { return value; }
      );
  }
  
}
