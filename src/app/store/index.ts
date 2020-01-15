import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { UserState, authReducers } from './reducers/login.reducer';
import { CoursesListState, coursesListReducers } from './reducers/courses-list.reducer';
import { SuggestedAuthorsState, SuggestedAuthorsReducers } from './reducers/course-authors.reducer';

export interface State {
  userState: UserState;
  coursesListState: CoursesListState;
  authorsState: SuggestedAuthorsState;
}

export const reducers: ActionReducerMap<State> = {
  userState: authReducers,
  coursesListState: coursesListReducers,
  authorsState: SuggestedAuthorsReducers
};

const userStateFeature = (state: State) => state.userState;

export const getUser = createSelector(
  userStateFeature,
  (state: UserState) => state.user
);

export const getLoginStatus = createSelector(
  userStateFeature,
  (state: UserState) => state.loginError
);

export const getCourses = createSelector(
  (state: State) => state.coursesListState,
  (state: CoursesListState) => state.courses
);

export const getAuthors = createSelector(
  (state: State) => state.authorsState,
  (state: SuggestedAuthorsState) => state.authors
);

export const metaReducers: MetaReducer<State>[] = [];
