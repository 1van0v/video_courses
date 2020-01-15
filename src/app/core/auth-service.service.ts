import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { User } from './user.class';
import { Token } from './token.class';
import { ApiUrlHelper } from './api-url-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appKey = 'video_courses_key';

  constructor( private http: HttpClient ) { }

  public logIn(login: string, password: string): Observable<User> {
    return this.http
      .post<Token>(ApiUrlHelper.loginUrl(), { login, password })
      .pipe(
        concatMap(({ token }: Token): Observable<User> => {
          return this.authenticate(token);
        })
      );
  }

  public lookupLocalStorage(): string {
    return localStorage.getItem(this.appKey);
  }

  public logOut(): void {
    localStorage.removeItem(this.appKey);
  }

  public authenticate(token: string): Observable<User> {
    localStorage.setItem(this.appKey, token);
    return this.loadUserInfo(token);
  }

  private loadUserInfo(token?: string): Observable<User> {
    return this.http.post<User>(ApiUrlHelper.userInfoUrl(), { token });
  }

}
