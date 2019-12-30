import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { mergeMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../core/auth-service.service';
import * as LoginActions from '../actions/login.actions';

@Injectable()
export class LoginEffects {

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.login),
    mergeMap(({login, password}) => this.authService.logIn(login, password)
      .pipe(
        map(userInfo => LoginActions.loginSucceed(userInfo)),
      ))
  ));

  public authenticate$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.checkLocalToken),
    mergeMap(({token}) => this.authService.authenticate(token)
      .pipe(
        map(userInfo => LoginActions.loginSucceed(userInfo))
      ))
  ));

  public goToHome$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.loginSucceed),
    tap(() => this.router.navigate(['courses']))
  ), {dispatch: false});

  public logOut$ = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.logOut),
    tap(() => {
      this.router.navigate(['login']);
      this.authService.logOut();
    })
  ), {dispatch: false});

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

}
