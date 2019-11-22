import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private user: User;
  private appKey = 'video_courses_key';
  private password = 'password';
  private login = 'test@user.com';
  public authListener = new Subject();

  constructor() { }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getUserInfo(): User {
    return this.user;
  }

  public logIn(login: string, password: string): boolean {
    this.authenticated = this.checkCredentials(login, password);
    if (this.authenticated) {
      this.user = { login };
      localStorage.setItem(this.appKey, JSON.stringify({ login, password }));
    }
    return this.authenticated;
  }

  private checkCredentials(login: string, password: string): boolean {
    this.authenticated = this.login === login && this.password === password;
    this.authListener.next(this.authenticated);
    return this.authenticated;
  }

  public lookupLocalStorage(): boolean {
    const credentials = JSON.parse(localStorage.getItem(this.appKey));
    let isValid = false;
    if (credentials) {
      const { login, password } = credentials;
      isValid = this.checkCredentials(login, password);
    }
    if (isValid) {
      this.user = { login: credentials.login };
    }
    return this.authenticated;
  }

  public logOut(): void {
    console.log('I am logging out');
    this.user = null;
    this.authenticated = false;
    localStorage.removeItem(this.appKey);
  }
}
