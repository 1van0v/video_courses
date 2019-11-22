import { Injectable } from '@angular/core';
import { CoursesListResponse } from './courses-list-response.model';
import { CoursesListItem } from './courses-list-item.class';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, mergeMap, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: CoursesListItem[];

  public constructor(private http: HttpClient) { }

  private loadCourses(): Observable<CoursesListItem[]> {
    return this.http
      .get<CoursesListResponse>('assets/courses.json')
      .pipe(
        map((data) => {
          return this.courses = data.courses;
        })
      );
  }

  public getCourses(): Observable<CoursesListItem[]> {
    return this.courses ? of(this.courses) : this.loadCourses();
  }

  public getCourse(id: number): Observable<CoursesListItem> {
    return this.getCourses()
      .pipe(
        mergeMap(courses => from(courses)),
        find(course => course.id === id)
      );
  }

  public updateCourse(id: number, field: string, value: number | string | boolean): Observable<CoursesListItem> {
    return this.getCourse(id)
      .pipe(
        map(course => {
          if (course && field !== 'id') {
            course[field] = value;
          }
          return course;
        })
      );
  }

  public deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
