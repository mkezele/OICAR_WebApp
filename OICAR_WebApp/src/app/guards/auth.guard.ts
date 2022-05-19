import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if user is not logged in or id route parameter is not equal to logged user id -> redirect to login
      const routeParamId = parseInt(route.paramMap.get('id') ?? '0');
      if (!this.authService.userLoggedIn() || routeParamId == 0 || routeParamId != this.authService.getLoggedUserId()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
  
}
