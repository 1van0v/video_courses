import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesListResponse } from '../courses-list-response.model';
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
  private originCourses: CoursesListItem[] = [];
  public searchString: string;

  public constructor(
    private coursesService: CoursesService,
    private searchCourses: SearchCoursesPipe,
    private orderCourses: OrderByPipe
  ) { }

  public ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((data: CoursesListResponse) => {
        this.courses = this.orderCourses.transform(data.courses, 'asc');
      });
  }

  public onDeleteItem(course: CoursesListItem) {
    console.log(`Course with ID = ${course.id} is about to be deleted`);
  }

  public onLoadMore() {
    console.log('Loading more courses...');
  }

  public onSearch() {
    if (!this.originCourses.length) {
      this.originCourses = [ ...this.courses ];
    }
    this.courses = this.searchCourses.transform(this.originCourses, this.searchString);
  }
}
