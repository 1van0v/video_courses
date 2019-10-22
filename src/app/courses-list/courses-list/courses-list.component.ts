import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public courses: CoursesListItem[] = [];
  constructor( private coursesService: CoursesService ) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

}
