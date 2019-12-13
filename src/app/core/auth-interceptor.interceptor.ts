import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        headers: request.headers.set('Authorization', this.authService.getApiToken())
      });
    }

    return next.handle(request).pipe(
      catchError(response => {
        if (response.statusText === 'Unauthorized') {
          this.authService.logOut();
        }
        return throwError(response);
      })
    );
  }
}
