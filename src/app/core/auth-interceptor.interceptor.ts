import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthService } from './auth-service.service';
import { LoadingNotifierService } from '../shared/loading-notifier.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private authService: AuthService,
    private loadingNotifierService: LoadingNotifierService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingNotifierService.loading(true);

    if (this.authService.isTokenValid()) {
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
      }),
      finalize(() => this.loadingNotifierService.loading(false))
    );
  }
}
