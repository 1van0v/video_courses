import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { User } from './user.class';
import { Token } from './token.class';
import { ApiUrlHelper } from './api-url-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: User;
  private appKey = 'video_courses_key';
  private apiToken: string;
  public authListener = new Subject<User>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public isAuthenticated(): Observable<User> {
    if (!this.userInfo && this.lookupLocalStorage()) {
      return this.authenticate(this.apiToken);
    } else {
      return of(this.userInfo);
    }
  }

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
    const savedToken: string = localStorage.getItem(this.appKey);
    if (savedToken) {
      return this.apiToken = savedToken;
    }
  }

  public logOut(): void {
    console.log('I am logging out');
    this.setUserInfo(null);
    localStorage.removeItem(this.appKey);
    this.router.navigate([ 'login' ]);
  }

  private authenticate(token: string): Observable<User> {
    this.apiToken = token;
    localStorage.setItem(this.appKey, this.apiToken);
    return this.loadUserInfo(token);
  }

  private loadUserInfo(token?: string): Observable<User> {
    if (this.userInfo) {
      return of(this.userInfo);
    }
    return this.http
    .post<User>(ApiUrlHelper.userInfoUrl(), { token })
    .pipe(
      map((user: User) => {
          return this.setUserInfo(user);
        })
      );
  }

  private setUserInfo(userInfo: User): User {
    this.authListener.next(userInfo);
    return this.userInfo = userInfo;
  }

  public getApiToken(): string {
    return this.apiToken;
  }

  public isTokenValid(): boolean {
    return !!this.userInfo;
  }

}
