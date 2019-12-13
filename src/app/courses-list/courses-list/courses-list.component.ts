import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from '../pipes/order-by.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CoursesListItem[] = [];
  public searchString: string;
  public showModal = false;
  public selectedCourse: CoursesListItem;
  private pageSize = 5;

  public constructor(
    private coursesService: CoursesService,
    private orderCourses: OrderByPipe
  ) { }

  public ngOnInit() {
    this.loadCourses(this.pageSize);
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

  public onSearch() {
    if (this.searchString) {
      this.coursesService.findCourses(this.searchString)
        .subscribe((courses: CoursesListItem[]) => {
          this.courses = this.sortCourses(courses);
        });
    }
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
