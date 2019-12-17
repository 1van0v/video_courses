import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotifierService {
  private loadingListener = new Subject<boolean>();

  public getListener(): Observable<boolean> {
    return this.loadingListener;
  }

  public loading(state: boolean): void {
    this.loadingListener.next(state);
  }
}
