import { Action, createReducer, on } from '@ngrx/store';

import * as CourseAuthorsActions from '../actions/course-authors.actions';
import { Author } from '../../courses-list/course-detail/course-authors/course-authors.model';

export const courseAuthorsReducerFeatureKey = 'courseAuthorsReducer';

export interface SuggestedAuthorsState {
  authors: Author[];
}

const initialState: SuggestedAuthorsState = {
  authors: []
};

const courseAuthorsReducer = createReducer(
  initialState,
  on(CourseAuthorsActions.setSuggestedAuthors, (state, newState) => ({ ...state, ...newState })),
  on(CourseAuthorsActions.resetSuggestedAuthors, state => ({ ...state, authors: [] }))
);

export function SuggestedAuthorsReducers(state: SuggestedAuthorsState | undefined, action: Action) {
  return courseAuthorsReducer(state, action);
}
