import { createAction, props } from '@ngrx/store';

import { User } from '../../core/user.class';
import { Token } from '../../core/token.class';

export const login = createAction(
  '[Login] Login',
  props<{login: string, password: string}>()
);

export const loginSucceed = createAction(
  '[Login] Login succeed',
  props<User>()
);

export const logOut = createAction('[Login] Log Out');

export const loginFailed = createAction('[Login] Login failed');

export const lookUpLocalToken = createAction('[Login] Check for local token');

export const checkLocalToken = createAction(
  '[Login] send local token',
  props<Token>()
);
