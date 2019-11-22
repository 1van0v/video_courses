import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let authenticated = this.authService.isAuthenticated();
      if (authenticated) {
        return authenticated;
      }
      authenticated = this.authService.lookupLocalStorage();
      if (authenticated) {
        return authenticated;
      }
      this.router.navigate(['login']);
      return authenticated;
  }
}
