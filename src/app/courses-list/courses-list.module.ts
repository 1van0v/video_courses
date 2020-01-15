import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CourseDurationPipe } from './pipes/course-duration.pipe';

import { CoursesListRoutingModule } from './courses-list-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseItemBorderDirective } from './course-item-border.directive';
import { SearchCoursesPipe } from './pipes/search-courses.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CourseDateComponent } from './course-detail/course-date/course-date.component';
import { CourseDurationComponent } from './course-detail/course-length/course-length.component';
import { CourseAuthorsComponent } from './course-detail/course-authors/course-authors.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CourseDurationPipe,
    CourseDetailComponent,
    CourseItemBorderDirective,
    SearchCoursesPipe,
    OrderByPipe,
    CourseDateComponent,
    CourseDurationComponent,
    CourseAuthorsComponent
  ],
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoursesListComponent
  ],
  providers: [
    SearchCoursesPipe,
    OrderByPipe
  ]
})
export class CoursesListModule { }
