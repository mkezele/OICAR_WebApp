import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<boolean>((resolve, reject) => {
        const routeParamId = parseInt(route.paramMap.get('userId') ?? '0');
        if(routeParamId === 0 || !this.authService.userLoggedIn() || routeParamId != this.authService.getLoggedUserId()) {
          this.router.navigate(['login']);
          reject(false);
        }
        this.userService.getUser(routeParamId).subscribe(result => {
          if(result.body?.userLevelId === 2){
            resolve(true);
          } else {
            this.router.navigate(['login']);
            reject(false);
          }
        })
      }).then(
        function(value: boolean = true) { return value; }, 
        function(value: boolean = false) { return value; }
      );
  }
  
}
