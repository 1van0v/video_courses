import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';
import { SearchCoursesPipe } from '../pipes/search-courses.pipe';
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

  public constructor(
    private coursesService: CoursesService,
    private searchCourses: SearchCoursesPipe,
    private orderCourses: OrderByPipe
  ) { }

  public ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((courses: CoursesListItem[]) => {
        if (this.searchString) {
          courses = this.searchCourses.transform(courses, this.searchString);
        }
        this.courses = this.orderCourses.transform(courses, 'asc');
      });
  }

  public onDeleteItem(course: CoursesListItem) {
    this.selectedCourse = course;
    this.showModal = true;
  }

  public onLoadMore() {
    console.log('Loading more courses...');
  }

  public onSearch() {
    this.ngOnInit();
  }

  public cancelDelete() {
    this.showModal = false;
    this.selectedCourse = null;
  }

  public deleteCourse(course: CoursesListItem) {
    this.coursesService.deleteCourse(course.id);
    this.showModal = false;
    this.ngOnInit();
  }
}
