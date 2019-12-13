import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoursesListItem } from './courses-list-item.class';
import { ApiUrlHelper } from '../core/api-url-helper';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public constructor(private http: HttpClient) { }

  public getCourses(start: number, count: number): Observable<CoursesListItem[]> {
    return this.http
      .get(ApiUrlHelper.getCoursesUrl(start, count))
      .pipe(map(this.parseDate));
  }

  public getCourse(id: number): Observable<CoursesListItem> {
    return this.http
      .get<CoursesListItem>(ApiUrlHelper.coursesUrl(id));
  }

  public updateCourse(updatedItem: CoursesListItem): Observable<CoursesListItem> {
    return this.http
      .patch<CoursesListItem>(ApiUrlHelper.coursesUrl(updatedItem.id), updatedItem);
  }

  public deleteCourse(id: number): Observable<{}> {
    return this.http.delete(ApiUrlHelper.coursesUrl(id));
  }

  private parseDate(courses: CoursesListItem[]): CoursesListItem[] {
    return courses.map((course: CoursesListItem) => {
      course.date = new Date(course.date as string);
      return course;
    });
  }

  public findCourses(searchStr: string): Observable<CoursesListItem[]> {
    return this.http
      .get<CoursesListItem[]>(ApiUrlHelper.searchCoursesUrl(searchStr))
      .pipe(map(this.parseDate));
  }

  public createCourse(course: Partial<CoursesListItem>): Observable<CoursesListItem> {
    return this.http
      .post<CoursesListItem>(ApiUrlHelper.coursesUrl(), course);
  }
}
