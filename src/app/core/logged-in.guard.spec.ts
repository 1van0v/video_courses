import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from './auth-service.service';

describe('LoggedInGuard', () => {
  let authService;
  let guard;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', [ 'isAuthenticated', 'lookupLocalStorage' ]);
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        { provide: AuthService, useValue: authService }
      ],
      imports: [ RouterTestingModule ]
    });
    guard = TestBed.get(LoggedInGuard);
  });

  it('should not activate a route when isAuthenticated and lookupLocalStorage return false', () => {
    authService.lookupLocalStorage.and.returnValue(false);
    authService.isAuthenticated.and.returnValue(false);
    expect(guard.canActivate()).toEqual(false);
  });

  it('should activate a route when isAuthenticated is true', () => {
    authService.lookupLocalStorage.and.returnValue(false);
    authService.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });

});
