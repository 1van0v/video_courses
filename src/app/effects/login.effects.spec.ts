import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  const actions$: Observable<any> = null;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<LoginEffects>(LoginEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});