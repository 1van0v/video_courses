import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CourseDurationPipe } from './pipes/course-duration.pipe';

import { CoursesListRoutingModule } from './courses-list-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseItemBorderDirective } from './course-item-border.directive';
import { SearchCoursesPipe } from './pipes/search-courses.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesListItemComponent,
    CourseDurationPipe,
    CourseDetailComponent,
    CourseItemBorderDirective,
    SearchCoursesPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    FormsModule
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
