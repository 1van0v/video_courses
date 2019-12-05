import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public course = new CoursesListItem();
  public windowTitle = 'New';

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        if (params.id) {
          this.fetchCourse(Number(params.id));
          this.windowTitle = 'Edit';
        }
      });
  }

  public getDateString(): string {
    const dateObj = new Date(this.course.creationDate);
    let dateString = '';
    dateString += dateObj.getFullYear() + '-';
    dateString += this.addZeros( dateObj.getMonth() + 1 ) + '-';
    dateString += this.addZeros( dateObj.getDate() );
    return dateString;
  }

  private addZeros(date: number): string {
    return String(date).padStart(2, '0');
  }

  public cancelEditing(): void {
    this.goToCourses();
  }

  public saveCourse(): void {
    this.coursesService.updateCourse(this.course);
    this.goToCourses();
  }

  private goToCourses(): void {
    this.router.navigate([ 'courses' ]);
  }

  private fetchCourse(id: number): void {
    this.coursesService.getCourse(id)
      .subscribe((course: CoursesListItem) => {
        if (!course) {
          this.router.navigate([ 'PageNotFound' ]);
        }
        this.course = { ...course };
        const { breadcrumb } = this.activatedRoute.routeConfig.data;
        breadcrumb.title = this.course.title;
      });
  }

}
