import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, firstValueFrom, lastValueFrom, Observable, of, tap } from 'rxjs';
import { ProjectPostService } from 'src/app/services/project-post/project-post.service';

@Injectable({
  providedIn: 'root'
})
export class UserPostGuard implements CanActivate {

  constructor(
    private projectPostService: ProjectPostService, 
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // for simulation purposes only - delete after inspection
      return true;

      // if post with postId parameter was not created by user with userId parameter redirect to login 
      const routeParamUserId = parseInt(route.paramMap.get('userId') ?? '0');
      const routeParamPostId = parseInt(route.paramMap.get('postId') ?? '0');

      return new Promise<boolean>((resolve, reject) => {
      this.projectPostService.getProjectPost(routeParamPostId).subscribe(response => {
          if (response != undefined && response.status == HttpStatusCode.Ok && response.body != null && response.body.appUserId == routeParamUserId) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      }).then(result =>{
        return result;
      }).catch(error => {
        return false;
      });
  }
  
}
