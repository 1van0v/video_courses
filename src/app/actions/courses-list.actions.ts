import { createAction, props } from '@ngrx/store';
import { CoursesListState } from '../reducers/courses-list.reducer';

export const loadCoursesList = createAction('[CoursesList] Load Courses List');

export const updateCoursesList = createAction(
  '[CoursesList] Update Courses List',
  props<CoursesListState>()
);

export const deleteCourse = createAction(
  '[CoursesList] Delete Course',
  props<{id: number}>()
);

export const removeDeletedCourse = createAction(
  '[CoursesList] Remove Deleted Course',
  props<{id: number}>()
);

export const searchCourses = createAction(
  '[CoursesList] Search Courses',
  props<{searchString: string}>()
);

export const addFoundCourses = createAction(
  '[CoursesList] Add found courses to the store',
  props<CoursesListState>()
);

export const cancelSearching = createAction('[CoursesList] Restore courses before search');
