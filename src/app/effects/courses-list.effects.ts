import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';

import * as CoursesListActions from '../actions/courses-list.actions';
import { CoursesService } from '../courses-list/courses.service';
import { State, getCourses } from '../reducers/index';
import { CoursesListItem } from '../courses-list/courses-list-item.class';

@Injectable()
export class CoursesListEffects {

  public constructor(
    private actions$: Actions,
    private store: Store<State>,
    private coursesService: CoursesService
  ) {}

  public loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesListActions.loadCoursesList),
    withLatestFrom(this.store.select(getCourses)),
    mergeMap(([action, storedCourses]) => {
      return this.coursesService.getCourses(storedCourses.length)
        .pipe(
          map(courses => CoursesListActions.updateCoursesList({ courses })));
    })
  ));

  public deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesListActions.deleteCourse),
    tap(({id}) => this.coursesService.deleteCourse(id).subscribe(
      () => this.store.dispatch(CoursesListActions.removeDeletedCourse({id}))
    ))
  ), {dispatch: false});

  public searchCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesListActions.searchCourses),
    tap(({searchString}) => this.coursesService.findCourses(searchString).subscribe(
      (courses: CoursesListItem[]) => {
        this.store.dispatch(CoursesListActions.addFoundCourses({ courses }));
      }
    ))
  ), {dispatch: false});

}
