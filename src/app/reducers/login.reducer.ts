import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../core/user.class';
import * as LoginActions from '../actions/login.actions';

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: null,
};

const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSucceed, (state, user) => ({...state, user})),
  on(LoginActions.logOut, (state) => ({...state, user: null}))
);

export function authReducers(state: UserState | undefined, action: Action): UserState {
  return loginReducer(state, action);
}
