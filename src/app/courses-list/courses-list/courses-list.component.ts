import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesListResponse } from '../courses-list-response.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CoursesListItem[] = [];
  public searchString: string;
  public constructor( private coursesService: CoursesService ) { }

  public ngOnInit() {
    this.coursesService.getCourses()
      .subscribe((data: CoursesListResponse) => this.courses = data.courses);
  }

  public onDeleteItem(course: CoursesListItem) {
    console.log(`Course with ID = ${course.id} is about to be deleted`);
  }

  public onLoadMore() {
    console.log('Loading more courses...');
  }

  public onSearch() {
    console.log(`We are looking for "${this.searchString}". Please wait...`);
  }

}
