import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.class';
import { Token } from './token.class';
import { ApiUrlHelper } from './api-url-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private appKey = 'video_courses_key';
  private apiToken: string;
  public authListener = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public logIn(login: string, password: string): Observable<boolean> {
    return this.http
      .post<Token>(ApiUrlHelper.loginUrl(), { login, password })
      .pipe(
        map((token: Token): boolean => {
          return this.authenticate(token);
        })
      );
  }

  public lookupLocalStorage(): boolean {
    const savedToken: string = localStorage.getItem(this.appKey);
    if (savedToken) {
      this.apiToken = savedToken;
      this.loadUserInfo();
      return this.authenticated = true;
    }
  }

  public logOut(): void {
    console.log('I am logging out');
    this.authListener.next(null);
    this.authenticated = false;
    localStorage.removeItem(this.appKey);
    this.router.navigate([ 'login' ]);
  }

  private authenticate(token: Token): boolean {
    this.authenticated = true;
    this.apiToken = token.token;
    this.loadUserInfo();
    localStorage.setItem(this.appKey, this.apiToken);
    return this.authenticated;
  }

  private loadUserInfo(): void {
    this.http
      .post<User>(ApiUrlHelper.userInfoUrl(), { token: this.apiToken })
      .subscribe(
        (user: User) => { this.authListener.next(user); }
      );
  }

  public getApiToken(): string {
    return this.apiToken;
  }

}
