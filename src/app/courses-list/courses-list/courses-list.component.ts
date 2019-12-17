import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Subject, Subscription } from 'rxjs';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  public courses: CoursesListItem[] = [];
  public searchString: string;
  public showModal = false;
  public selectedCourse: CoursesListItem;
  private pageSize = 5;
  private searchListener = new Subject();
  private searchSubscription: Subscription;

  public constructor(
    private coursesService: CoursesService,
    private orderCourses: OrderByPipe
  ) { }

  public ngOnInit() {
    this.loadCourses(this.pageSize);
    this.searchSubscription = this.initSearchLister();
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  public onDeleteItem(course: CoursesListItem) {
    this.selectedCourse = course;
    this.showModal = true;
  }

  public onLoadMore() {
    const offset = this.courses.length + 1;
    this.coursesService.getCourses(offset, this.pageSize)
      .subscribe((courses: CoursesListItem[]) => {
        this.courses.push(...this.sortCourses(courses));
      });
  }

  private loadCourses(count: number): void {
    this.coursesService.getCourses(0, count)
    .subscribe((courses: CoursesListItem[]) => {
      this.courses = this.sortCourses(courses);
    });
  }

  private sortCourses(newCourses: CoursesListItem[]): CoursesListItem[] {
    return this.orderCourses.transform(newCourses, 'asc');
  }

  public onInput(searchStr: string): void {
    if (!searchStr.length) {
      this.loadCourses(this.pageSize);
    } else {
      this.searchListener.next(searchStr);
    }
  }

  private initSearchLister(): Subscription {
    return this.searchListener.pipe(
      filter((searchStr: string): boolean => searchStr.length >= 3),
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(this.lookUpCourses);
  }

  private lookUpCourses = (searchStr: string): void => {
    this.coursesService.findCourses(searchStr)
      .subscribe((courses: CoursesListItem[]) => {
        this.courses = this.sortCourses(courses);
      });
  }

  public cancelDelete() {
    this.showModal = false;
    this.selectedCourse = null;
  }

  public deleteCourse(course: CoursesListItem) {
    this.coursesService.deleteCourse(course.id)
      .subscribe(() => {
        this.showModal = false;
        this.loadCourses(this.courses.length);
      });
  }

}
