import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CoursesListItem } from '../courses-list-item.class';
import { State, getCourses } from '../../store/index';
import { loadCoursesList, deleteCourse, searchCourses, cancelSearching } from '../../store/actions/courses-list.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnDestroy {
  public courses$: Observable<CoursesListItem[]>;
  public searchString: string;
  public showModal = false;
  public selectedCourse: CoursesListItem;
  private searchListener = new Subject();
  private searchSubscription: Subscription;

  public constructor( private store: Store<State> ) {
    this.courses$ = this.store.select(getCourses).pipe(
      tap((courses: CoursesListItem[]) => {
        if (courses.length < 1 && !this.searchString) {
          this.loadCourses();
        }
      })
    );

    this.searchSubscription = this.initSearchLister();
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public onDeleteItem(course: CoursesListItem) {
    this.selectedCourse = course;
    this.showModal = true;
  }

  public onLoadMore(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.store.dispatch(loadCoursesList());
  }

  public onInput(searchString: string): void {
    if (!searchString.length) {
      this.store.dispatch(cancelSearching());
    } else {
      this.searchListener.next(searchString);
    }
  }

  private initSearchLister(): Subscription {
    return this.searchListener.pipe(
      filter((searchString: string): boolean => searchString.length >= 3),
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe((searchString) => {
      this.searchString = searchString;
      this.store.dispatch(searchCourses({ searchString }));
    });
  }

  public cancelDelete() {
    this.showModal = false;
    this.selectedCourse = null;
  }

  public deleteCourse(course: CoursesListItem) {
    this.store.dispatch(deleteCourse({id: course.id}));
    this.showModal = false;
  }

}
