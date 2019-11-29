import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CourseDurationPipe } from '../pipes/course-duration.pipe';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public course = new CoursesListItem();

  public constructor() { }

  public ngOnInit() {
  }

}
