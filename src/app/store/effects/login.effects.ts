import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '../../core/auth-service.service';
import * as LoginActions from '../actions/login.actions';
import { State, getUser } from '../index';

@Injectable()
export class LoginEffects {

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.login),
    mergeMap(({login, password}) => this.authService.logIn(login, password)
      .pipe(
        map(userInfo => LoginActions.loginSucceed(userInfo))
      ))
  ));

  public loginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.loginFailed),
    withLatestFrom(this.store.select(getUser)),
    map(([, user]) => {
      if (user) {
        return LoginActions.logOut();
      }
    })
  ), {dispatch: false});

  public lookUpLocalToken$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.lookUpLocalToken),
    map(() => {
      const token = this.authService.lookupLocalStorage();
      if (token) {
        return this.store.dispatch(LoginActions.checkLocalToken({ token }));
      }
      this.router.navigate(['login']);
    })
  ), { dispatch: false });

  public authenticate$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.checkLocalToken),
    mergeMap(({token}) => this.authService.authenticate(token)
      .pipe(
        map(userInfo => LoginActions.loginSucceed(userInfo))
      ))
  ));

  public goToHome$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.loginSucceed),
    tap(() => {
      const destUrl = this.router.routerState.snapshot.url;
      if (destUrl === '/login') {
        this.router.navigate(['courses']);
      }
    })
  ), {dispatch: false});

  public logOut$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.logOut),
    tap(() => {
      this.router.navigate(['login']);
      this.authService.logOut();
    })
  ), {dispatch: false});

}
