import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // const isAuth = this.authService.getIsAuth();
    // if (!isAuth) {
    //   return this.router.createUrlTree(['home/auth/login']);
    // }
    // return isAuth;

    const isAuth = this.authService.getIsAuth();
    if (isAuth) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
