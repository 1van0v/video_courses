import { Action, createReducer, on } from '@ngrx/store';

import { CoursesListItem } from '../../courses-list/courses-list-item.class';
import * as CoursesListActions from '../actions/courses-list.actions';

export interface CoursesListState {
  courses: CoursesListItem[];
  previouslyLoaded?: CoursesListItem[];
}

const initialState: CoursesListState = {
  courses: [],
  previouslyLoaded: []
};

const coursesListReducer = createReducer(
  initialState,
  on(CoursesListActions.updateCoursesList, (state, newState) => {
    return {...state, courses: state.courses.concat(newState.courses)};
  }),
  on(CoursesListActions.addFoundCourses, (state, newState) => {
    const updatedState = {...state};
    if (!updatedState.previouslyLoaded.length) {
      updatedState.previouslyLoaded = [...state.courses];
    }
    updatedState.courses = [ ...newState.courses ];
    return updatedState;
  }),
  on(CoursesListActions.cancelSearching, (state) => {
    return { ...state, courses: [...state.previouslyLoaded], previouslyLoaded: [] };
  }),
  on(CoursesListActions.deleteCourse, (state, {id}) => {
    return {
      courses: state.courses.filter(course => course.id !== id)
    };
  })
);

export function coursesListReducers(state: CoursesListState | undefined, action: Action) {
  return coursesListReducer(state, action);
}
