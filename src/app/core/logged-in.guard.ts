import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isAuthenticated()
        .pipe(map(
          (isAuthenticated: object) => {
            if (!isAuthenticated) {
              this.router.navigate(['login']);
            }
            return !!isAuthenticated;
          }
        ));
  }
}
