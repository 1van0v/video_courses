import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CoursesListItem } from '../courses-list-item.class';
import { CoursesService } from '../courses.service';
import { BreadcrumbsService } from '../../shared/breadcrumbs.service';

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
    private coursesService: CoursesService,
    private breadcrumbsService: BreadcrumbsService
  ) { }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        if (params.id !== 'new') {
          this.fetchCourse(Number(params.id));
          this.windowTitle = 'Edit';
        }
      });
  }

  public getDateString(): string {
    const dateString = this.course.date as string;
    return dateString && dateString.split('T')[0];
  }

  public setDateString(dateStr: string): void {
    this.course.date = (new Date(dateStr)).toISOString();
  }

  public cancelEditing(): void {
    this.goToCourses();
  }

  public saveCourse(): void {
    this.getSaveAction(this.course).subscribe(() => {
      this.goToCourses();
    });
  }

  private getSaveAction(course: CoursesListItem): Observable<CoursesListItem> {
    if (course.id) {
      return this.coursesService.updateCourse(this.course);
    } else {
      return this.coursesService.createCourse(this.course);
    }
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
        this.breadcrumbsService.updateTitle(breadcrumb.title, this.course.name);
      });
  }

}
