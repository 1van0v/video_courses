import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  let service;
  const login = 'test@user.com';
  const password = 'password';

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  it('should authenticate user with valid login and password', () => {
    service.logIn(login, password);
    expect(service.isAuthenticated()).toEqual(true);
  });

  it('should forbid authentication of user with invalid login and password', () => {
    service.logIn(login + 'e', password);
    expect(service.isAuthenticated()).toEqual(false);
  });

  it('should return false on isAuthenticated method call after logging out', () => {
    service.logIn(login, password);
    expect(service.isAuthenticated()).toEqual(true);
    service.logOut();
    expect(service.isAuthenticated()).toEqual(false);
  });
});
