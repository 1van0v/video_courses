import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map } from 'rxjs/operators';

import * as CourseAuthorsActions from '../actions/course-authors.actions';
import { State } from '../index';
import { ApiUrlHelper } from '../../core/api-url-helper';
import { Author } from '../../courses-list/course-detail/course-authors/course-authors.model';

@Injectable()
export class CourseAuthorsEffects {

  public constructor(
    private actions$: Actions,
    private store: Store<State>,
    private http: HttpClient
  ) {}

  public loadSuggestions$ = createEffect(() => this.actions$.pipe(
    ofType(CourseAuthorsActions.getSuggestedAuthors),
    mergeMap((payload: {textFragment: string}) => {
      return this.http.get(ApiUrlHelper.searchAuthorsUrl(payload.textFragment))
        .pipe(
          map((authors: Author[]) => CourseAuthorsActions.setSuggestedAuthors({ authors }))
        );
    })
  ));
}
