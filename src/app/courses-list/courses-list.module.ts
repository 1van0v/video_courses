import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CourseDurationPipe } from './course-duration.pipe';

import { CoursesListRoutingModule } from './courses-list-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [CoursesListComponent, CoursesListItemComponent, CourseDurationPipe, CourseDetailComponent],
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    FormsModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class CoursesListModule { }
