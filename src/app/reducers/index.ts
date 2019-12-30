import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { UserState, authReducers } from './login.reducer';
import { CoursesListState, coursesListReducers } from './courses-list.reducer';

export interface State {
  userState: UserState;
  coursesListState: CoursesListState;
}

export const reducers: ActionReducerMap<State> = {
  userState: authReducers,
  coursesListState: coursesListReducers
};

export const getUser = createSelector(
  (state: State) => state.userState,
  (state: UserState) => state.user
);

export const getCourses = createSelector(
  (state: State) => state.coursesListState,
  (state: CoursesListState) => state.courses
);

export const metaReducers: MetaReducer<State>[] = [];
