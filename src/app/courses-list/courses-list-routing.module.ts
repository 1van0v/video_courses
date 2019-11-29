import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LoggedInGuard } from '../core/logged-in.guard';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    data: { title: 'Courses List'},
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'course/new',
    component: CourseDetailComponent,
    canActivate: [ LoggedInGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesListRoutingModule { }
