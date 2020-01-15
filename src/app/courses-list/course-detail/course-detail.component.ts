import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public course = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(500)]),
    date: new FormControl(''),
    length: new FormControl(''),
    authors: new FormControl([])
  });
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
        if (params.id) {
          this.fetchCourse(Number(params.id));
          this.windowTitle = 'Edit';
        }
      });
  }

  public cancelEditing(): void {
    this.goToCourses();
  }

  public saveCourse(): void {
    const formData = this.course.value;
    const { authors } = formData;
    this.getSaveAction({ ...formData, ...authors }).subscribe(() => {
      this.goToCourses();
    });
  }

  private getSaveAction(course: CoursesListItem): Observable<CoursesListItem> {
    if (course.id) {
      return this.coursesService.updateCourse(course);
    } else {
      return this.coursesService.createCourse(course);
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
        this.course.patchValue({ ...course });
        const { breadcrumb } = this.activatedRoute.routeConfig.data;
        this.breadcrumbsService.updateTitle(breadcrumb.title, course.name);
      });
  }

  public get name() {
    return this.course.get('name');
  }

  public get description() {
    return this.course.get('description');
  }

}
