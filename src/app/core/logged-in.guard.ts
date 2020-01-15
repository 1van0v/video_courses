import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, tap } from 'rxjs/operators';

import { State, getLoginStatus } from '../store/index';
import { lookUpLocalToken } from '../store/actions/login.actions';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  public constructor(
    private store: Store<State>,
    private router: Router
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(getLoginStatus).pipe(
        tap((loginError: boolean): void => {
          if (this.isInitialLoginState(loginError)) {
            this.store.dispatch(lookUpLocalToken());
          }
        }),
        skipWhile(this.isInitialLoginState),
        map(
          (isLoginError: boolean) => {
            if (isLoginError) {
              this.router.navigate(['login']);
            }
            return !isLoginError;
          }
        ));
  }

  private isInitialLoginState(loginError: boolean): boolean {
    return loginError === null;
  }
}
