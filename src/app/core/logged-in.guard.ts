import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skip, distinctUntilChanged } from 'rxjs/operators';

import { State, getUser } from '../reducers/index';
import { User } from './user.class';

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
      return this.store.select(getUser).pipe(
        map(
          (user: User) => {
            if (!user) {
              this.router.navigate(['login']);
            }
            return !!user;
          }
        ));
  }
}
