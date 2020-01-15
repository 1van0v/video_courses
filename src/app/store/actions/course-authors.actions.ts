import { createAction, props } from '@ngrx/store';

import { SuggestedAuthorsState } from '../reducers/course-authors.reducer';

export const getSuggestedAuthors = createAction(
  '[CourseAuthors] Load suggested authors',
  props<{ textFragment: string }>()
);

export const setSuggestedAuthors = createAction(
  '[CourseAuthors] Set loaded suggestions',
  props<SuggestedAuthorsState>()
);

export const resetSuggestedAuthors = createAction('[CourseAuthors] Wipe the loaded authors');

