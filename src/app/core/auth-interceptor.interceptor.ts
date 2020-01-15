import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, first } from 'rxjs/operators';

import { State, getUser } from '../store/index';
import { loginFailed } from '../store/actions/login.actions';
import { User } from './user.class';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private store: Store<State>) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getUser).pipe(
      first(),
      flatMap((user: User) => {
        if (user) {
          request = request.clone({
            headers: request.headers.set('Authorization', user.fakeToken)
          });
        }
        return next.handle(request).pipe(
          catchError(response => {
            if (response.statusText === 'Unauthorized') {
              this.store.dispatch(loginFailed());
            }
            return throwError(response);
          })
        );
      })
    );
  }
}
