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
    this.notifyAuth();
    return this.authenticated;
  }

  private checkCredentials(login: string, password: string): boolean {
    this.authenticated = this.login === login && this.password === password;
    return this.authenticated;
  }

  public lookupLocalStorage(): boolean {
    const savedCredentials = localStorage.getItem(this.appKey);
    if (savedCredentials) {
      const { login, password } = JSON.parse(savedCredentials);
      return this.logIn(login, password);
    }
  }

  public logOut(): void {
    console.log('I am logging out');
    this.user = null;
    this.authenticated = false;
    localStorage.removeItem(this.appKey);
    this.notifyAuth();
  }

  private notifyAuth(): void {
    this.authListener.next(this.authenticated);
  }
}
