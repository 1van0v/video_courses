import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../../core/user.class';
import * as LoginActions from '../actions/login.actions';

export interface UserState {
  user: User;
  loginError: boolean;
}

const initialState: UserState = {
  user: null,
  loginError: null
};

const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, state => ({ ...state, loginError: false })),
  on(LoginActions.loginSucceed, (state, user) => ({ ...state, user, loginError: false })),
  on(LoginActions.logOut, (state) => ({ ...state, user: null })),
  on (LoginActions.loginFailed, state => ({ ...state, loginError: true })
  )
);

export function authReducers(state: UserState | undefined, action: Action): UserState {
  return loginReducer(state, action);
}
