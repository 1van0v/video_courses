import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingNotifierService } from '../shared/loading-notifier.service';

@Injectable()
export class LoadSpinner implements HttpInterceptor {
  public constructor(
    private loadingNotifierService: LoadingNotifierService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingNotifierService.loading(true);

    return next.handle(request).pipe(
      finalize(() => this.loadingNotifierService.loading(false))
    );
  }
}
