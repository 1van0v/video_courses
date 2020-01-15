import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LoggedInGuard } from '../core/logged-in.guard';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    data: { title: 'Courses List', breadcrumb: { title: 'courses', link: 'courses' } },
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'course/new',
    component: CourseDetailComponent,
    canActivate: [ LoggedInGuard ],
    data: { breadcrumb: { title: 'New' } }
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
    canActivate: [ LoggedInGuard ],
    data: { breadcrumb: { title: 'course' } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesListRoutingModule { }
